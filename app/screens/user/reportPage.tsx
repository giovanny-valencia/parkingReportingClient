import ReportView from "@/app/components/compound/userForms/ReportView";
import { View, Text, StyleSheet } from "react-native";
import { IMAGE_TYPES, ImageContent } from "@/app/constants/imageContent";
import { useState } from "react";
import requestLocationPermission from "@/app/utils/locationUtils";
import requestCameraPermission from "@/app/utils/cameraUtils";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

/**
 * The logic for the report page.
 *
 * handles the responsibility of:
 * 1. displaying the report page form
 * 2. check permission settings, must allow location and camera (if fail, display alert)
 * 3. handle validation messages from backend (if fail, display alert)
 *
 * @returns
 */

const handleLocationAccess = async (): Promise<boolean> => {
  // check if location permission is granted
  const { granted } = await requestLocationPermission({
    explainMessage: "goCite needs your location to create a report.",
  });
  if (granted) {
    console.log("Location permission granted.");
    return true;
  } else {
    console.log("Location permission denied.");
    return false;
  }
};

const handleCameraAccess = async (): Promise<boolean> => {
  // check if camera permission is granted
  const { granted } = await requestCameraPermission({
    explainMessage:
      "goCite needs access to your camera to take live photos for the report.",
  });
  if (granted) {
    console.log("Camera permission granted.");
    return true;
  } else {
    console.log("Camera permission denied.");
    return false;
  }
};

const navigateBackOrHome = () => {
  router.canGoBack() ? router.back() : router.replace("/screens/user/homePage");
};

// const getJurisdiction = async () => {
//   const response = await fetch(
//     "https://mocki.io/v1/95c8a670-bccc-4b50-a90a-53eab10558a4 "
//   );
//   return await response.json();
// };

export default function ReportPage() {
  const [licensePlate, setLicensePlate] = useState("");
  const [violation, setViolation] = useState("");
  const [licensePlateImage, setLicensePlateImage] = useState<ImageContent>({
    id: 0,
    uri: "",
    type: IMAGE_TYPES.licensePlate,
  });
  const MAX_LENGTH_VIOLATION = 256;
  // creates the image state array, size of 5 images, (1-5): violations images
  const [supportingImages, setSupportingImages] = useState<ImageContent[]>(() =>
    Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      uri: "",
      type: IMAGE_TYPES.violation,
    }))
  );

  useEffect(() => {
    const checkPermissions = async () => {
      const locationGranted = await handleLocationAccess();
      if (!locationGranted) {
        return navigateBackOrHome();
      }

      const cameraGranted = await handleCameraAccess();
      if (!cameraGranted) {
        return navigateBackOrHome();
      }
    };
    checkPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <ReportView
        licensePlateImage={licensePlateImage}
        setLicensePlateImage={setLicensePlateImage}
        SupportingImages={supportingImages}
        setSupportingImages={setSupportingImages}
        licensePlate={licensePlate}
        setLicensePlate={setLicensePlate}
        violation={violation}
        setViolation={setViolation}
        maxLengthViolation={MAX_LENGTH_VIOLATION}
      ></ReportView>
    </View>
  );
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});
