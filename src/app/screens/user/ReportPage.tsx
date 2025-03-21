import ReportView from "@components/compound/userForms/ReportView";
import { View, StyleSheet } from "react-native";
import { IMAGE_TYPES, ImageContent } from "@constants/imageContent";
import { useState } from "react";
import { router } from "expo-router";
import { useEffect } from "react";
import { useCheckLocationPermission } from "@queries/usePermissionChecks";
import { useRequestLocationPermission } from "@queries/useRequestPermissions";
import { useGetCurrentLocation } from "@queries/useGetCurrentLocation";
import { useGetJurisdiction } from "@queries/useGetJurisdiction";
import { Alert } from "react-native";

const navigateBackOrHome = () => {
  router.canGoBack() ? router.back() : router.replace("/screens/user/HomePage");
};

export default function ReportPage() {
  const MAX_LENGTH_VIOLATION = 256;
  const [licensePlate, setLicensePlate] = useState("");
  const [violation, setViolation] = useState("");
  const [licensePlateImage, setLicensePlateImage] = useState<ImageContent>({
    id: 0,
    uri: "",
    type: IMAGE_TYPES.licensePlate,
  });
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

  return (
    <View style={styles.container}>
      <ReportView
        licensePlateImage={licensePlateImage}
        setLicensePlateImage={setLicensePlateImage}
        supportingImages={supportingImages}
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
