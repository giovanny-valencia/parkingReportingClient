import { useEffect } from "react";
import { useLocationRefresher } from "./useLocationRefresher";

/**
 *  -- Requirements:
 *  1. Process initial Location on mount:
 *      When a user selects to issue a report,
 *      their location must be rechecked to sure they're still in a supported region.
 *      Ensure location permissions are still enabled.
 *
 *  2. Handle camera permissions:
 *      When a user selects to take photograph,
 *      check their permissions and handle enabling.
 *
 *  3. Validate each step:
 *      Before moving to the next step, step's requirement must be satisfied.
 *
 *  4. submit data:
 *      async submission for speed?
 */
export default function useVehicleReport() {
  const { isLoading, cooldownTimer, currentCityData, refreshLocation, clearDashLocation } =
    useLocationRefresher();

  useEffect(() => {
    console.log("inside VR");

    refreshLocation();
  }, []);
}
