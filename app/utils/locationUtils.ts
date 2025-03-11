import * as Location from "expo-location";
import { Alert, Linking } from "react-native";

interface LocationPermissionOptions {
  explainMessage?: string; // Optional property with a default value
}

// Request location
export const requestLocationPermission = async (options: LocationPermissionOptions = {}) => {
  
  const { explainMessage = "goCite needs your location to provide this feature." } = options;

  // check current location permission
  const { status: initialStatus } = await Location.requestForegroundPermissionsAsync();

  if (initialStatus === "granted") {
    return { granted: true };
  }

  // Request permission if undetermined
  if (initialStatus === "undetermined") {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      return { granted: true };
    }
  }

  // Permission denied
  return new Promise((resolve) => {
    Alert.alert(
      "Location Permission Required",
      explainMessage,
      [
        { text: "Cancel", onPress: () => resolve({ granted: false }) },
        { text: "Settings", onPress: () => Linking.openSettings() },
      ],
      { onDismiss: () => resolve({ granted: false }) } // handle dismiss required -- return to home or error screen
    );
  });
};

// Check if location permission is granted without prompting
export const checkLocationPermission = async () => {
  const { status } = await Location.getForegroundPermissionsAsync();
  return status === "granted";
};
