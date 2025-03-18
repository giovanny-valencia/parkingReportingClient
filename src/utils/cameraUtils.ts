import { Camera } from "expo-camera";
import { Alert, Linking } from "react-native";

interface CameraPermissionOptions {
  explainMessage?: string; // Optional property with a default value
}

/**
 * Requests camera permission from the user.
 * @param options - Configuration options for the permission request
 * @returns Promise resolving to { granted: true } if allowed, { granted: false } if denied
 */
export default async function requestCameraPermission(
  options: CameraPermissionOptions = {}
): Promise<{ granted: boolean }> {
  const {
    explainMessage = "goCite needs your camera to provide this feature.",
  } = options;

  // check current camera permission
  const { status: initialStatus } = await Camera.getCameraPermissionsAsync();
  if (initialStatus === "granted") {
    return { granted: true };
  }

  // if not granted, either denied or undetermined, request permission
  const { status } = await Camera.requestCameraPermissionsAsync();
  if (status === "granted") {
    return { granted: true };
  }

  // Permission denied
  return new Promise((resolve) => {
    Alert.alert(
      "Camera Permission Required",
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
      { onDismiss: () => resolve({ granted: false }) } // handle dismiss required -- return to home or error screen
    );
  });
}

/**
 * Checks if camera permission is granted without prompting.
 * @returns Promise resolving to true if granted, false otherwise
 */
export async function checkCameraPermission() {
  const { status } = await Camera.getCameraPermissionsAsync();
  return status === "granted";
}
