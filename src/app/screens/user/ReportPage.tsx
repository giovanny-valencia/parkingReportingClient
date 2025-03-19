import ReportView from "@components/compound/userForms/ReportView";
import { View, StyleSheet, Text, Alert } from "react-native";
import { IMAGE_TYPES, ImageContent } from "@constants/imageContent";
import { useState } from "react";
import requestLocationPermission from "@utils/locationUtils";
import requestCameraPermission from "@utils/cameraUtils";
import * as Location from "expo-location";
import { LocationGeocodedAddress } from "expo-location";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { createAddress } from "@utils/addressUtils";
import AddressFields from "@constants/AddressFields";
import { Jurisdiction } from "@constants/Jurisdiction";

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

const SIX_HOURS = 1000 * 60 * 60 * 6;

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
  router.canGoBack() ? router.back() : router.replace("/screens/user/HomePage");
};

const getJurisdiction = async () => {
  //  await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 second delay
  const response = await fetch(
    "https://mocki.io/v1/bbb27acd-5b97-4477-9f79-3495b028025a "
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }
  const json: Jurisdiction[] = await response.json();
  if (!json) {
    throw new Error("No data found");
  }

  // create a map of jurisdiction data for quick lookup
  return new Map(
    json.map((item: Jurisdiction) => [
      `${item.stateInitials}${item.city}`,
      item,
    ])
  );
};

export default function ReportPage() {
  const [isPermissionValidated, setIsPermissionValidated] = useState(false);
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
  const [validatedAddress, setValidatedAddress] = useState(false);
  const [addressState, setAddress] = useState(AddressFields);

  /**
   * fetches the jurisdiction data from the backend and caches it for 6 hours.
   *
   * monitor this, idea is to do the heavy lifting of fetching everything once then cache it for 6 hours using a set for O(1) lookup time.
   * this is to avoid fetching the data every time the user opens the app, which can be slow and inefficient.
   *
   * If this re-fetches earlier than intended, defeats the purpose of caching.. Again, monitor this.
   * If this is done correctly, this should not refetch whatsoever for 6 hours.
   *
   * add refetchOnMount: false ?
   */
  const { data, isLoading, error } = useQuery({
    queryKey: ["jurisdiction"],
    queryFn: getJurisdiction,
    staleTime: SIX_HOURS, // 6 hours before refetching
    gcTime: SIX_HOURS, // 6 hours before garbage collection
    refetchOnWindowFocus: false, // do not refetch on window focus
    refetchOnReconnect: false, // do not refetch on reconnect
  });

  const getJurisdictionByCode = (
    state: string,
    city: string
  ): Jurisdiction | false => {
    const key = `${state}${city}`;

    console.log("key: ", key);

    console.log(data);

    return data?.get(key) ?? false;
  };

  const userInSupportedLocation = () => {
    if (!validatedAddress) return;

    const state = addressState.state;
    const city = addressState.city;

    const jurisdiction = getJurisdictionByCode(state, city);

    console.log("jurisdiction: ", jurisdiction);
    if (!jurisdiction) {
      Alert.alert(
        "Unsupported Location",
        "Your location is not supported. Please try again later.",
        [{ text: "OK", onPress: () => navigateBackOrHome() }]
      );
    }
  };

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
      setValidatedAddress(true);
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
          "Could not retrieve your current location. Returning to home screen.",
          [{ text: "Ok", onPress: () => navigateBackOrHome() }]
        );
      }
    };
    getUserLocation();
  }, [isPermissionValidated]);

  useEffect(() => {
    if (isLoading) return;
    userInSupportedLocation();
  }, [validatedAddress, isLoading]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

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
