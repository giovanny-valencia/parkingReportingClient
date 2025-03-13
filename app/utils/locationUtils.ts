import * as Location from "expo-location";
import { Alert, Linking } from "react-native";

interface LocationPermissionOptions {
  explainMessage?: string; // Optional property with a default value
}

// Request location
export default async function requestLocationPermission(
  message: LocationPermissionOptions = {}
): Promise<{ granted: boolean }> {
  const {
    explainMessage = "goCite needs your location to provide this feature.",
  } = message;

  // Check current location permission status
  const { status: initialStatus } =
    await Location.getForegroundPermissionsAsync();
  if (initialStatus === "granted") {
    return { granted: true };
  }

  // if not granted, either denied or undetermined, request permission
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status === "granted") {
    return { granted: true };
  }

  // Permission denied, alert user it's necessary to proceed
  return new Promise((resolve) => {
    Alert.alert(
      "Location Permission Required",
      explainMessage,
      [
        { text: "Cancel", onPress: () => resolve({ granted: false }) },
        {
          text: "Settings",
          onPress: () => {
            Linking.openSettings(), resolve({ granted: false });
          },
        },
      ],
      { onDismiss: () => resolve({ granted: false }) }
    );
  });
}

// Check if location permission is granted without prompting
export const checkLocationPermission = async () => {
  const { status } = await Location.getForegroundPermissionsAsync();
  return status === "granted";
};
