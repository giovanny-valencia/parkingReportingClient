import * as Location from "expo-location";
import { Alert, Linking } from "react-native";
import { LocationPermissionDeniedError } from "@common/exceptions/custom/LocationPermissionDeniedError";

// -- Helper functions

/**
 * Requests location access permission to user, displays alert if rejected again
 *
 * @param message relevant message explaining why location permissions are needed
 * @throws LocationPermissionDeniedError if the user rejects permission
 */
const requestPermission = async (message: string) => {
  const { status } = await Location.requestForegroundPermissionsAsync(); // first ask

  if (status !== "granted") {
    // second time ask with an alert
    Alert.alert(
      "Location Required",
      message,
      [
        {
          text: "Open Settings",
          onPress: () => Linking.openSettings(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
    throw new LocationPermissionDeniedError();
  }
};

/**
 * Attempts to fetch the users current location
 *
 * @returns longitude and latitude coordinates of users current location
 * @throws generic error if unable to obtain location
 */
//TODO: likely add the timeout promise
const fetchCurrentLocation = async () => {
  //   // 10,000 milliseconds (10 seconds)
  //   const TIMEOUT_MS = 10000;

  //   // Define the timeout promise
  //   const timeoutPromise = new Promise((_, reject) => {
  //     setTimeout(() => {
  //       reject(
  //         new LocationTimeoutError(
  //           `Location request failed to resolve within ${TIMEOUT_MS / 1000} seconds.`
  //         )
  //       );
  //     }, TIMEOUT_MS);
  //   });

  try {
    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });

    console.log("Location fetched with BestForNavigation accuracy.");

    return {
      longitude: coords.longitude,
      latitude: coords.latitude,
    };
  } catch (error) {
    // BestForNavigation failure catch
    console.warn("BestForNavigation failed. Falling back to High accuracy...");

    try {
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      console.log("Location fetched with High accuracy.");

      return {
        longitude: coords.longitude,
        latitude: coords.latitude,
      };
    } catch (finalError) {
      console.error("Error fetching location coordinates:", finalError);
      // Rethrow a generic error for hardware/unknown issues
      throw new Error(
        "Could not fetch device location. Check if GPS is enabled or if you are indoors."
      );
    }
  }
};

// -- Public function

/**
 *
 * @param ReasonForLocationRequest Relevant error message as to why the location services is required
 * @returns longitude and latitude coordinates or
 * @throws  LocationPermissionDeniedError
 */
export const getLocationWithPermission = async (ReasonForLocationRequest: string) => {
  let { status } = await Location.getForegroundPermissionsAsync(); // check without prompting user

  if (status !== "granted") {
    // request permissions
    await requestPermission(ReasonForLocationRequest);
  }

  // permission granted -- fetch coords
  return await fetchCurrentLocation();
};
