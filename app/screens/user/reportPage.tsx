import ReportView from "@/app/components/compound/userForms/ReportView";
import { View, StyleSheet, Text, Alert } from "react-native";
import { IMAGE_TYPES, ImageContent } from "@/app/constants/imageContent";
import { useState } from "react";
import requestLocationPermission from "@/app/utils/locationUtils";
import requestCameraPermission from "@/app/utils/cameraUtils";
import * as Location from "expo-location";
import { LocationGeocodedAddress } from "expo-location";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { City, State } from "@/app/constants/jurisdiction";
import { Platform } from "react-native";
import { getStateAbbreviation } from "@/app/utils/stateAbbreviation";
import { createAddress } from "@/app/utils/addressUtils";
import AddressFields from "@/app/constants/AddressFields";
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

const getJurisdiction = async () => {
  const response = await fetch(
    "https://mocki.io/v1/95c8a670-bccc-4b50-a90a-53eab10558a4 "
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }
  return await response.json();
};

export default function ReportPage() {
  const [isPermissionValidated, setIsPermissionValidated] = useState(false);
  const [state, setState] = useState("NJ");
  const [city, setCity] = useState("Jersey City");
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

  const [addressState, setAddress] = useState(AddressFields);

  const updateAddress = (
    location: LocationGeocodedAddress[],
    latitude: number,
    longitude: number
  ) => {
    const newAddress = createAddress({
      location: location,
      latitude: latitude,
      longitude: longitude,
    }) as typeof AddressFields;

    if (newAddress) {
      setAddress((prevAddress) => ({
        ...prevAddress,
        ...newAddress,
      }));

      console.log("Address updated:", newAddress);
    } else {
      Alert.alert(
        "Error",
        "Unable to retrieve address. Please try again later.",
        [{ text: "OK", onPress: () => navigateBackOrHome() }]
      );
    }
  };

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
      setIsPermissionValidated(true);
      console.log("Permissions validated.");
    };
    checkPermissions();
  }, []);

  useEffect(() => {
    if (!isPermissionValidated) return;

    // grab the users current location
    const getUserLocation = async () => {
      try {
        let currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          timeInterval: 3000,
        });

        const { latitude, longitude } = currentLocation.coords;

        // convert to actual location
        const location = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        updateAddress(location, latitude, longitude);
      } catch (error) {
        Alert.alert(
          "Error Getting Location",
          "Couldn’t retrieve your current location. Returning to home screen.",
          [{ text: "Ok", onPress: () => navigateBackOrHome() }]
        );
      }
    };
    getUserLocation();
  }, [isPermissionValidated]);

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
