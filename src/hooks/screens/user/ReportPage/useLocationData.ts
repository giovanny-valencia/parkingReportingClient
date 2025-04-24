import { useEffect, useState } from "react";
import { useCheckLocationPermission } from "@queries/usePermissionChecks";
import { useRequestLocationPermission } from "@queries/useRequestLocationPermissions";
import { useGetCurrentLatLong } from "@queries/useGetCurrentLatLong";
import { useLocationStore } from "@store/report/locationStore";

export const useLocationData = () => {
  const { data: isLocationGranted, isLoading: initialLoad } =
    useCheckLocationPermission();

  const { data: isRequestGranted, isLoading: requestLoad } =
    useRequestLocationPermission({
      enabled: isLocationGranted === false,
      contextMessage: "goCite needs your location to create a report",
    });

  const [initialLoc, setInitialLoc] = useState(false);

  const {
    latitude,
    longitude,
    isLoading: latLongLoading,
  } = useGetCurrentLatLong(
    isLocationGranted === true || isRequestGranted === true
  );

  const currentLocation = useLocationStore((s) => s.currentLocation);
  const setLocationByCoords = useLocationStore((s) => s.setLocationByCoords);

  useEffect(() => {
    if (
      latitude &&
      longitude &&
      !latLongLoading &&
      currentLocation === null &&
      !initialLoc
    ) {
      setInitialLoc(true);
      setLocationByCoords(latitude, longitude);
    }
  }, [latitude, longitude, latLongLoading, currentLocation]);

  return {
    isLocationGranted,
    initialLoad,
    isRequestGranted,
    requestLoad,
    latitude,
    longitude,
    isLoading: initialLoad || requestLoad || latLongLoading,
    currentLocation,
  };
};
