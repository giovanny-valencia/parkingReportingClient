import { useState, useEffect } from "react";
import { Camera, useCameraPermissions } from "expo-camera";
import { Alert, Linking } from "react-native";
/**
 * Responsible for checking and requesting access to camera.
 *
 * 1. Check initial permission
 *  - If granted, return
 * 2. Not granted -> request
 *  - If granted, return
 * 3. else denied -> alert message with option to open settings or cancel. Nav back
 */

export const useCamera = () => {
  // Check initial
  const [permission, requestPermission] = useCameraPermissions();

  // after requesting permission, if granted is denied, then display alert message and resolve false to parent to navigate out
  const handleRequestPermissionRejection = async () => {
    return new Promise((resolve) => {
      Alert.alert(
        "Camera Permission Required",
        "goCite needs camera access to take live photos for a report.",
        [
          { text: "Cancel", onPress: () => resolve(false) },
          {
            text: "Settings",
            onPress: () => {
              Linking.openSettings();
              resolve(false);
            },
          },
        ],
        {
          onDismiss: () => resolve(false),
        }
      );
    });
  };

  // after permission is done loading, return the values
  return {
    permission: permission,
    requestCameraPermission: requestPermission,
    handleCameraPermissionRejection: handleRequestPermissionRejection,
  };
};
