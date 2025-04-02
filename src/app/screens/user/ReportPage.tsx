import LicensePlateForm from "@components/compound/userForms/LicensePlateForm";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
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
import { ErrorIndex, ErrorField } from "@constants/userReportFieldErrors";

/**
 * This is the localized data for the entire user Report process and manages the currentStep of the process as well as the
 * buttonPresses. On the submit button, it sends the validated data to the backend server.
 *
 * On submit, displays a thank you to user for making the report. Might wait for a backend server callback to see
 * if the report was accepted (unique) and display a sorry message if it wasn't.
 */

const navigateBackOrHome = () => {
  router.canGoBack() ? router.back() : router.replace("/screens/user/HomePage");
};

export default function ReportPage() {
  // Transition states
  const [currentStep, setStep] = useState(1);
  const [buttonClick, setButtonClick] = useState("");

  // LicensePlateForm data
  const [plateState, setPlateState] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [plateImage, setPlateImage] = useState<ImageContent>({
    id: 0,
    uri: "",
    type: IMAGE_TYPES.licensePlate,
  });

  // creates the error array
  const initialErrors: ErrorField[] = Object.values(ErrorIndex).map(
    (index) => ({
      id: index,
      message: "",
    })
  );
  const [error, setError] = useState<ErrorField[]>(initialErrors);

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
  const [violation, setViolation] = useState("");

  // Location hooks
  const { data: isLocationGranted, isLoading: initialLoad } =
    useCheckLocationPermission();

  const { data: isRequestGranted, isLoading: requestLoad } =
    useRequestLocationPermission({
      enabled: isLocationGranted === false,
      contextMessage: "goCite needs your location to create a report",
    });

  const { data: isLoc } = useGetCurrentLocation(
    isLocationGranted === true || isRequestGranted === true
  );

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
      navigateBackOrHome();
    } else if (isLoc && jurisdictionMap) {
      const state = isLoc.state.toUpperCase();
      const city = isLoc.city.toUpperCase().trim().replace(/\s+/g, "-");
      const key = `${state}-${city}`;
      const isLocationSupported = jurisdictionMap.get(key);

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
        {currentStep === 1 && (
          <View style={styles.container}>
            <LicensePlateForm
              plateImage={plateImage}
              setLicensePlateImage={setPlateImage}
              plateStateInitials={plateState}
              setPlateStateInitials={setPlateState}
              plateNumber={plateNumber}
              setPlateNumber={setPlateNumber}
              errors={error}
              setErrors={handleSetError}
              buttonClick={buttonClick}
              setButtonClick={setButtonClick}
            ></LicensePlateForm>
          </View>
        )}

        {currentStep === 2 && (
          <View style={styles.container}>
            <Text>Step 2 </Text>
          </View>
        )}

        {currentStep === 3 && (
          <View style={styles.container}>
            <Text>Step 3 </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <TouchableOpacity onPress={() => console.log("back")}>
            <Text style={styles.backButton}>
              {currentStep === 1 ? "Home" : "Back"}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPressOut={() => setButtonClick("next")}>
            <Text style={styles.nextButton}>
              {currentStep === 3 ? "Submit" : "Next"}
            </Text>
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

    backgroundColor: "red",
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
