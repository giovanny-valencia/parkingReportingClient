import { useEffect } from "react";
import { useLocationRefresher } from "../../hooks/useLocationRefresher";
import { router } from "expo-router";
import { useVehicleReportStore } from "./useVehicleReportStore";

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
  const {
    currentStep,
    stepOneData,
    stepTwoData,
    stepThreeData,
    updateFormStep,
    updateStepOneData,
    updateStepTwoData,
    updateStepThreeData,
    clearVehicleReportStore,
  } = useVehicleReportStore();

  // TODO: validation and errors missing

  /**
   * If the users current location is not supported, server returns null and kicks the user out of the report process.
   */
  //TODO: add an alert
  useEffect(() => {
    const onMountLocationRefresh = async () => {
      await refreshLocation();
      //BUG: too many requests does nothing here, uses previous city data, maybe that's okay?
      //console.log("CD: " + currentCityData?.state + " " + currentCityData?.city);

      if (currentCityData == null) {
        console.log("current city was null");
        router.back();
      }
    };
    onMountLocationRefresh();
  }, []);

  // -- public

  const ReportLocationRefresh = {
    isLoading,
    currentCityData,
    refreshLocation,
    clearDashLocation,
  };

  const Store = {
    currentStep,
    stepOneData,
    stepTwoData,
    stepThreeData,
    updateFormStep,
    updateStepOneData,
    updateStepTwoData,
    updateStepThreeData,
    clearVehicleReportStore,
  };

  return { ReportLocationRefresh, Store };
}
