import LicensePlateForm from "@components/compound/userForms/LicensePlateForm";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useRef, useState } from "react";
import { router } from "expo-router";
import { useEffect } from "react";
import { useGetJurisdiction } from "@queries/useGetJurisdiction";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ErrorIndex, ErrorField } from "@constants/userReportFieldErrors";
import { ViolationForm } from "@components/compound/userForms/ViolationForm";
import { useLocationData } from "@hooks/screens/user/ReportPage/useLocationData";
import { Fields } from "constants/addressFields";
import { Jurisdiction } from "@constants/jurisdiction";
import { useNavigation } from "expo-router";
import { useLicensePlateStore } from "@store/report/licensePlateStore";
import { useViolationImageStore } from "@store/report/violationImageStore";
import { useLocationStore } from "@store/report/locationStore";
import AddressView from "@components/compound/userForms/AddressView";
import * as ImageManipulator from "expo-image-manipulator";

export default function ReportPage() {
  // Transition states
  const [currentStep, setStep] = useState(1);
  const [buttonClick, setButtonClick] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status

  const navigation = useNavigation();

  const navigateBackOrHome = () => {
    clearLicensePlateImages();
    clearViolationImages();
    clearLocation();
    router.replace("/screens/user/HomePage");
  };

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

  const [violation, setViolation] = useState("");

  const [addressNotes, setAddressNotes] = useState("");

  // Location hooks
  const { isRequestGranted, currentLocation } = useLocationData();

  console.log("IRG, isRequestGranted: ", isRequestGranted);

  console.log("current location: ", currentLocation);

  const {
    data: jurisdictionMap,
    error: jurisdictionError,
    isLoading: JurisdictionLoading,
  } = useGetJurisdiction();

  // check if location is in supported Jurisdiction
  // todo: refactor out, identical implementation in validateAddressForm.ts
  const isLocationSupported = (
    address: Fields,
    jurisdictionMap: Map<string, Jurisdiction>
  ): boolean => {
    const state = address.state.toUpperCase();
    const city = address.city.toUpperCase().trim().replace(/\s+/g, "-");
    const key = `${state}-${city}`;

    // returns the jurisdiction object
    const isLocationSupported = jurisdictionMap.get(key);

    // simple boolean supported statement
    if (!isLocationSupported) {
      showUnsupportedLocationAlert(
        `${address.city}, ${address.state} is not currently a supported city. Please try again later when it is.`
      );

      return false;
    }
    return true;
  };

  const showUnsupportedLocationAlert = (message: string) => {
    Alert.alert("Location Not Supported", message, [{ text: "OK" }]);
  };

  /**
   * Displays an alert for fetch-related errors.
   * @param {string} message - Error message to display
   * @returns {Promise<void>} Resolves when alert is dismissed
   */
  const showFetchErrorAlert = (message: string): Promise<void> => {
    return new Promise((resolve) => {
      Alert.alert(
        "Error Connecting to Server",
        message,
        [{ text: "Ok", onPress: () => resolve() }],
        {
          onDismiss: () => resolve(),
        }
      );
    });
  };

  const clearLicensePlateImages = useLicensePlateStore(
    (state) => state.clearImages
  );
  const clearViolationImages = useViolationImageStore(
    (state) => state.clearImages
  );
  const clearLocation = useLocationStore((state) => state.clearLocation);

  useEffect(() => {
    clearLicensePlateImages();
    clearViolationImages();
    clearLocation();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
    });
  }, [navigation]);

  const hasNavigatedRef = useRef(false);
  useEffect(() => {
    if (hasNavigatedRef.current) return;

    if (jurisdictionError) {
      showFetchErrorAlert(jurisdictionError.message);
      hasNavigatedRef.current = true;
      navigateBackOrHome();
    }

    if (isRequestGranted === false) {
      hasNavigatedRef.current = true;
      navigateBackOrHome();
      return;
    } else if (jurisdictionMap && currentLocation !== null) {
      const LocationSupported = isLocationSupported(
        currentLocation,
        jurisdictionMap
      );
      console.log("res: ", LocationSupported);

      console.log("address: ", currentLocation);

      if (!LocationSupported) {
        hasNavigatedRef.current = true;
        navigateBackOrHome();
        return;
      }
    }
  }, [currentLocation, jurisdictionMap, isRequestGranted, jurisdictionError]);

  /**
   * Gathers all report data points and sends it to the backend to process.
   *
   * - Current user (email, or an ID?)
   * - License plate image
   * - License plate number
   * - Violation image(s)
   * - Violation text report
   * - vehicle location
   * - optional location notes
   */
  const backendAPI = `http://192.168.1.154:8080/api/v1/reports`; // for physical device testing
  const testBackendAPI = `http://localhost:8080/api/v1/reports`; // for emulator testing

  const handleSubmit = async () => {
    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    // vehicle location is what is relevant to the report
    const locationStore = useLocationStore.getState().vehicleLocation;

    console.log("start handleSubmit");

    // Sending the report didn't really work. Using it as a visual model for now.
    const report = {
      vehicle: {
        state: plateState.toUpperCase(),
        plateNumber: plateNumber.toUpperCase(),
      },

      address: {
        streetAddress: locationStore?.streetAddress || "",
        zipCode: locationStore?.zipCode?.toString() || "",
        locationNotes: addressNotes || "",
        location: {
          latitude: locationStore?.latitude || 0,
          longitude: locationStore?.longitude || 0,
        },

        jurisdiction: {
          state: locationStore?.state.toUpperCase() || "",
          city: locationStore?.city.trim() || "",
        },
      },

      description: violation || "",
    };

    const licensePlateStoreState = useLicensePlateStore.getState();
    const violationImageStoreState = useViolationImageStore.getState();

    const imageUri = licensePlateStoreState.images[0].uri;
    //console.log("Attempting to send image from URI:", imageUri);

    console.log("logging violation images uri:");
    violationImageStoreState.images.forEach((image, i) => {
      console.log("Violation image URI :", "i = ", i, "\t", image.uri);
    });

    try {
      console.log("Attempting to send report to backend...");

      const formData = new FormData();

      formData.append("report", JSON.stringify(report)); // Plain string, matches Postman
      // formData.append(
      //   "report",
      //   new Blob([JSON.stringify(testJSON)], { type: "application/json" })
      // ); // Blob, no filename

      console.log("DEBUG: FormData object created. Will be sent to backend.");

      // create the licensePlateImage formData
      formData.append("licensePlateImage", {
        uri: imageUri,
        name: "license_plate.jpg",
        type: "image/jpeg",
      } as unknown as Blob); // Cast to Blob for FormData compatibility (not sure about the 'unknown' but it works)

      // create the violationImage formData
      violationImageStoreState.images.forEach((image, i) => {
        if (image.uri) {
          formData.append(`violationImages`, {
            uri: image.uri,
            name: `violation_image_${i}.jpg`, // Unique name for each image
            type: "image/jpeg", // Assuming JPEG format
          } as unknown as Blob); // Cast to Blob for FormData compatibility
        }
      });

      console.log(`Sending FormData with image from URI: ${imageUri}`);

      const response = await fetch(backendAPI, {
        method: "POST",
        headers: {
          // 'Authorization': 'Bearer YOUR_TOKEN',
        },
        body: formData,
      });

      const responseStatus = response.status;
      const responseBody = await response.text();
      console.log(`Backend response status: ${responseStatus}`);
      console.log(`Backend response body: ${responseBody}`);

      if (response.ok) {
        Alert.alert("Success", "Report submitted successfully!");
        console.log("Image sent successfully!");
      } else {
        console.error(
          `Backend returned an error: ${responseStatus} - ${responseBody}`
        );
        Alert.alert(
          "Submission Error",
          `Failed to submit report. Server responded with status ${responseStatus}.`
        );
      }
    } catch (error) {
      console.log("failed API call: ", error);
    }
  };

  if (currentStep === 4) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Thanks! Your report is being processed.</Text>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.replace("/screens/user/HomePage")}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Go Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "skyblue" }}>
      {JurisdictionLoading ? (
        <Text style={{ textAlign: "center" }}>Connecting to server...</Text>
      ) : (
        ""
      )}

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.fullScreen}>
          {currentStep === 1 && (
            <LicensePlateForm
              plateStateInitials={plateState}
              setPlateStateInitials={setPlateState}
              plateNumber={plateNumber}
              setPlateNumber={setPlateNumber}
              errors={error}
              setErrors={handleSetError}
              buttonClick={buttonClick}
              setButtonClick={setButtonClick}
              setStep={setStep}
            />
          )}

          {currentStep === 2 && (
            <ViolationForm
              violation={violation}
              setViolation={setViolation}
              errors={error}
              setErrors={handleSetError}
              buttonClick={buttonClick}
              setButtonClick={setButtonClick}
              setStep={setStep}
            />
          )}

          {currentStep === 3 &&
            currentLocation !== undefined &&
            jurisdictionMap !== undefined && (
              <AddressView
                jurisdictionMap={jurisdictionMap}
                buttonClick={buttonClick}
                setButtonClick={setButtonClick}
                setStep={setStep}
                addressNotes={addressNotes}
                setAddressNotes={setAddressNotes}
              />
            )}

          <View style={styles.buttonsArea}>
            <TouchableOpacity onPress={handleBackClick} disabled={isSubmitting}>
              <Text style={styles.backButton}>
                {currentStep === 1 ? "Home" : "Back"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                if (currentStep === 3) {
                  await handleSubmit();
                }
                setButtonClick("next");
              }}
              disabled={isSubmitting}
            >
              <Text style={styles.nextButton}>
                {currentStep === 3 ? "Submit" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    //backgroundColor: "blue",
    marginBottom: 10,
  },

  buttonsArea: {
    flexDirection: "row",
    justifyContent: "space-between", // Evenly distribute buttons
    alignItems: "center",
    paddingHorizontal: "10%", // Percentage-based padding
    // paddingVertical: 10,
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
