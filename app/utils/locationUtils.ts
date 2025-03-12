import * as Location from "expo-location";
import { Alert, Linking } from "react-native";

interface LocationPermissionOptions {
  explainMessage?: string; // Optional property with a default value
}

// Request location
export const requestLocationPermission = async (
  message: LocationPermissionOptions = {}
): Promise<{ granted: boolean }> => {
  const {
    explainMessage = "goCite needs your location to provide this feature.",
  } = message;

  // Check current location permission, avoid prompting if already granted
  const { status: initialStatus } =
    await Location.getForegroundPermissionsAsync();
  if (initialStatus === "granted") {
    return { granted: true };
  }

  // Request permission if undetermined (first time prompt)
  if (initialStatus === "undetermined") {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      return { granted: true };
    }
  }

  // Denying the first prompt needs we need to explain to user that it's required to continue
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
      {
        onDismiss: () => resolve({ granted: false }), // dismiss handled in caller
      }
    );
  });
};

// Check if location permission is granted without prompting
export const checkLocationPermission = async () => {
  const { status } = await Location.getForegroundPermissionsAsync();
  return status === "granted";
};
