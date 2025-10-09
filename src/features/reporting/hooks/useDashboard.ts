import { useEffect } from "react";
import { useLocationRefresher } from "./useLocationRefresher";

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
