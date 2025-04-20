import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { useCheckLocationPermission } from "@queries/usePermissionChecks";
import { useRequestLocationPermission } from "@queries/useRequestLocationPermissions";
import { useGetCurrentLatLong } from "@queries/useGetCurrentLatLong";
import { createAddress } from "@utils/addressUtils";
import addressFields from "@constants/addressFields";

export const useLocationData = () => {
  const { data: isLocationGranted, isLoading: initialLoad } =
    useCheckLocationPermission();

  const { data: isRequestGranted, isLoading: requestLoad } =
    useRequestLocationPermission({
      enabled: isLocationGranted === false,
      contextMessage: "goCite needs your location to create a report",
    });

  const {
    latitude,
    longitude,
    isLoading: latLongLoading,
  } = useGetCurrentLatLong(
    isLocationGranted === true || isRequestGranted === true
  );

  const [initialLocation, setInitialLocation] = useState<
    typeof addressFields | null
  >(null);
  const [currentLocation, setCurrentLocation] = useState<
    typeof addressFields | null
  >(null);

  // Set initial location
  useEffect(() => {
    if (latitude && longitude && !latLongLoading && !initialLocation) {
      convertLatLongToAddress(latitude, longitude).then((address) => {
        if (address) {
          // setInitialLocation(address);
          setCurrentLocation(address);
        }
      });
    }
  }, [latitude, longitude, latLongLoading]);

  const convertLatLongToAddress = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const location = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      return createAddress({ location, latitude, longitude });
    } catch (error) {
      //console.error("Error converting lat long to address: ", error);
      //console.log("here");

      return null;
    }
  };

  const updateLocation = (newLocation: Partial<typeof addressFields>) => {
    setCurrentLocation((prev) => (prev ? { ...prev, ...newLocation } : null));
  };

  return {
    isLocationGranted,
    initialLoad,
    isRequestGranted,
    requestLoad,
    latitude,
    longitude,
    isLoading: initialLoad || requestLoad || latLongLoading,
    initialLocation,
    currentLocation,
    convertLatLongToAddress,
    updateLocation,
  };
};
