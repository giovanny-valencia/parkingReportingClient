import * as Location from "expo-location";
import { Alert, Linking } from "react-native";

function promptEnableLocationAlert() {
  Alert.alert(
    "Location Required",
    "Please enable location access in settings.",
    [
      { text: "Cancel", style: "cancel" },
      { text: "Open Settings", onPress: () => Linking.openSettings() },
    ]
  );
}

export const getLatLongWithPermission = async (): Promise<{
  latitude: number;
  longitude: number;
} | null> => {
  const { status: initialStatus } =
    await Location.getForegroundPermissionsAsync();

  if (initialStatus !== "granted") {
    // request permission
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      promptEnableLocationAlert();
      return null;
    }
  }

  // otherwise granted, get lat long
  try {
    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
  } catch (error) {
    try {
      // fallback, lower accuracy
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      return {
        latitude: coords.latitude,
        longitude: coords.longitude,
      };
    } catch (finalError) {
      Alert.alert(
        "Location Error",
        "We couldn't get your current location. Please try again or check your device settings.",
        [{ text: "ok" }]
      );
      return null;
    }
  }
};
