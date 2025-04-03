import LicensePlateForm from "@components/compound/userForms/LicensePlateForm";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
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
import { SafeAreaView } from "react-native-safe-area-context";
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

  const handleBackClick = () => {
    if (currentStep === 1) {
      Alert.alert(
        "Discard Changes?",
        "Are you sure you want to go home? All report data will be lost.",
        [
          { text: "No", style: "cancel" },
          { text: "Yes", onPress: () => navigateBackOrHome() },
        ]
      );
    } else setStep(currentStep - 1);
  };

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "skyblue" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={"padding"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <View style={styles.fullScreen}>
            {currentStep === 1 && (
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
                setStep={setStep}
              ></LicensePlateForm>
            )}

            {currentStep === 2 && <Text>Step 2 </Text>}

            {currentStep === 3 && <Text>Step 3 </Text>}
          </View>

          <View style={styles.buttonsArea}>
            <TouchableOpacity onPress={handleBackClick}>
              <Text style={styles.backButton}>
                {currentStep === 1 ? "Home" : "Back"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPressOut={() => setButtonClick("next")}>
              <Text style={styles.nextButton}>
                {currentStep === 3 ? "Submit" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

// styles
const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "skyblue",
  },

  buttonsArea: {
    flexDirection: "row",
    justifyContent: "space-between", // Evenly distribute buttons
    alignItems: "center",
    paddingHorizontal: "10%", // Percentage-based padding
    paddingVertical: 10,
    position: "absolute",
    bottom: "5%",
    width: "100%",
    backgroundColor: "transparent",
  },
  backButton: {
    backgroundColor: "#FFFFFF", // White
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 15, // Softer curve
    fontSize: 18, // Slightly smaller
    fontWeight: "bold",
    textAlign: "center",
    color: "#007AFF", // Blue text to match theme
    shadowColor: "#000", // Subtle shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  nextButton: {
    backgroundColor: "#007AFF", // Blue
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 15, // Match backButton
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF", // White text
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
