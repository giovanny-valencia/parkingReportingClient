import { getLocationWithPermission } from "@features/reporting/utils/locationUtils";
import { useEffect, useState } from "react";
import { useDashLocationStore } from "../stores/useDashLocationStore";
import { fetchJurisdiction } from "@features/reporting/services/reportingService";
import { useNavigation } from "@react-navigation/native";
import { cityDto, LocationDto } from "../dtos/Location";
import { TooManyRequestsError } from "@common/exceptions/custom/TooManyRequestsError";

export default function useDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [cooldownTimer, setCooldownTimer] = useState(0);
  const { currentCityData, setDashCurrentCity, clearDashLocation } = useDashLocationStore();

  // -- Helper Functions
  const decrementTimer = () => {
    setCooldownTimer((prev) => {
      if (prev <= 1) {
        return 0;
      } else return prev - 1;
    });
  };

  // Report History (?)

  const getUserLocation = async () => {
    setIsLoading(true);
    const message = "Location access while using this application is required to continue.";
    const userLocation: LocationDto = await getLocationWithPermission(message);

    console.log("user loc coord: " + userLocation.longitude + "\t" + userLocation.latitude);

    try {
      const data = await fetchJurisdiction(userLocation);

      if (!data) {
        clearDashLocation();
      } else {
        const cityData: cityDto = { state: data.state, city: data.city };
        setDashCurrentCity(userLocation, cityData);
      }
    } catch (error) {
      if (error instanceof TooManyRequestsError) {
        setCooldownTimer(10);
      } else {
        // Handle all other errors (connection, unknown server errors, etc.)
        console.error("Jurisdiction fetch failed:", error);
      }
    }

    setIsLoading(false);
  };

  // run on first mount
  useEffect(() => {
    getUserLocation();
  }, []);

  // manage cooldown timer
  useEffect(() => {
    let intervalId = null;

    if (cooldownTimer > 0) {
      intervalId = setInterval(() => {
        decrementTimer();
      }, 1000);
    }

    // cleanup function
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [cooldownTimer]);

  // -- Public

  const locationStatus = {
    isLoading,
    cooldownTimer,
    currentCityData,
    clearDashLocation,
    getUserLocation,
  };

  return {
    locationStatus,
  };
}
