import ReportView from "@components/compound/userForms/ReportView";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { IMAGE_TYPES, ImageContent } from "@constants/imageContent";
import { useState } from "react";
import { router } from "expo-router";
import { useEffect } from "react";
import { useCheckLocationPermission } from "@queries/usePermissionChecks";
import { useRequestLocationPermission } from "@queries/useRequestPermissions";
import { useGetCurrentLocation } from "@queries/useGetCurrentLocation";
import { useGetJurisdiction } from "@queries/useGetJurisdiction";
import { Alert } from "react-native";
import { ScrollView } from "moti";
import { FIELD_INDICES, FieldError } from "@constants/userReportFieldErrors";

const navigateBackOrHome = () => {
  router.canGoBack() ? router.back() : router.replace("/screens/user/HomePage");
};

export default function ReportPage() {
  const MAX_LENGTH_VIOLATION = 256;
  const [step, setStep] = useState(1);
  const [plateStateInitials, setPlateStateInitials] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [violation, setViolation] = useState("");
  const [licensePlateImage, setLicensePlateImage] = useState<ImageContent>({
    id: 0,
    uri: "",
    type: IMAGE_TYPES.licensePlate,
  });

  // creates the error array
  const initialErrors: FieldError[] = Object.values(FIELD_INDICES).map(
    (index) => ({
      id: index,
      message: "",
    })
  );

  const [error, setError] = useState<FieldError[]>(initialErrors);

  function handleSetError(errorIndex: number, errorMessage: string) {
    setError((prevErrors) =>
      prevErrors.map((error) =>
        error.id === errorIndex ? { ...error, message: errorMessage } : error
      )
    );
  }

  // creates the image state array, size of 5 images, (1-5): violations images
  const [supportingImages, setSupportingImages] = useState<ImageContent[]>(() =>
    Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      uri: "",
      type: IMAGE_TYPES.violation,
    }))
  );

  // hooks
  const { data: isLocationGranted, isLoading: initialLoad } =
    useCheckLocationPermission();
  console.log("1 PG: ", isLocationGranted);

  const { data: isRequestGranted, isLoading: requestLoad } =
    useRequestLocationPermission({
      enabled: isLocationGranted === false,
      contextMessage: "goCite needs your location to create a report",
    });
  console.log("2 RG: ", isRequestGranted);

  const { data: isLoc } = useGetCurrentLocation(
    isLocationGranted === true || isRequestGranted === true
  );
  console.log("3 Loc: ", isLoc);

  const { data: jurisdictionMap, error: jurisdictionError } =
    useGetJurisdiction();

  const showUnsupportedLocationAlert = (message: string): Promise<void> => {
    return new Promise((resolve) => {
      Alert.alert(
        "Location Not Supported",
        message,
        [{ text: "OK", onPress: () => resolve() }],
        { onDismiss: () => resolve() }
      );
    });
  };

  useEffect(() => {
    if (isRequestGranted === false || jurisdictionError) {
      console.log("bye");
      navigateBackOrHome();
    } else if (isLoc && jurisdictionMap) {
      const state = isLoc.state.toUpperCase();
      const city = isLoc.city.toUpperCase().trim().replace(/\s+/g, "-");
      const key = `${state}-${city}`;
      const isLocationSupported = jurisdictionMap.get(key);

      console.log("m: ", isLocationSupported);
      console.log("key: ", key);

      if (!isLocationSupported) {
        let message =
          "Your current city is not supported yet. Check back later!";
        if (isLoc.city && isLoc.state) {
          message = `${isLoc.city}, ${isLoc.state} is not supported yet. Check back later!`;
        }
        showUnsupportedLocationAlert(message).then(() => navigateBackOrHome());
      }
    }
  }, [isRequestGranted, jurisdictionError, isLoc, jurisdictionMap]);

  const handleNext = () => {
    console.log("Next func!");

    console.log("LPS: ", plateStateInitials);

    if (!licensePlateImage.uri) {
      handleSetError(
        FIELD_INDICES.licensePlateImage,
        "License Plate Photo Required"
      );
    } else {
      handleSetError(FIELD_INDICES.licensePlateImage, "");
    }

    if (!plateStateInitials) {
      handleSetError(
        FIELD_INDICES.licensePlateStateSelection,
        "License Plate State Required"
      );
    } else {
      handleSetError(FIELD_INDICES.licensePlateStateSelection, "");
    }

    // skipping the API check for now, just if it's empty rn.
    if (!licensePlate) {
      handleSetError(
        FIELD_INDICES.licensePlateTextInput,
        "License Plate Field Required"
      );
    }

    if (!supportingImages[0].uri) {
      handleSetError(
        FIELD_INDICES.supportingImage,
        "At Least 1 Violation Image Required"
      );
    } else {
      handleSetError(FIELD_INDICES.supportingImage, "");
    }

    if (!violation) {
      handleSetError(
        FIELD_INDICES.violationDetails,
        "Violation Information Required"
      );
    } else {
      handleSetError(FIELD_INDICES.violationDetails, "");
    }

    return;
  };

  const handleBack = () => {};

  const handleSubmit = () => {};

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View style={styles.header}></View>

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {step === 1 && (
          <View style={styles.container}>
            <ReportView
              licensePlateImage={licensePlateImage}
              setLicensePlateImage={setLicensePlateImage}
              plateStateInitials={plateStateInitials}
              setPlateStateInitials={setPlateStateInitials}
              licensePlate={licensePlate}
              setLicensePlate={setLicensePlate}
              errors={error}
              handleNext={handleNext}
            ></ReportView>
          </View>
        )}

        {step === 2 && (
          <View style={styles.container}>
            <h1>Step 2 </h1>
          </View>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <View>
          <TouchableOpacity>
            <Text style={styles.backButton}>Back</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity>
            <Text style={styles.nextButton}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// styles
const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },

  header: {
    height: 60,
    width: "100%",
    backgroundColor: "black",
  },

  footer: {
    alignContent: "center",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,

    position: "absolute",
    bottom: "5%",
    left: "15%",
    right: "15%",
  },
  backButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1,
    color: "skyblue",
  },
  nextButton: {
    backgroundColor: "skyblue",
    padding: 10,
    borderRadius: 5,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1,
    color: "white",
  },
});
