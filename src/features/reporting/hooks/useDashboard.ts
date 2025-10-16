import { useEffect } from "react";
import { useLocationRefresher } from "./useLocationRefresher";

/**
 * Store shared by Dashboard and Report's on mount -- if on Report mount, user is no longer in a supported region, clear location.
 * @returns locationStatus coupled data
 */
export default function useDashboard() {
  const { isLoading, currentCityData, cooldownTimer, refreshLocation, clearDashLocation } =
    useLocationRefresher();

  // Report History (?)

  // run on first mount
  useEffect(() => {
    refreshLocation();
  }, []);

  // -- Public

  const locationStatus = {
    isLoading,
    cooldownTimer,
    currentCityData,
    clearDashLocation,
    refreshLocation,
  };

  return {
    locationStatus,
  };
}
