import { getLocationWithPermission } from "@features/reporting/utils/locationUtils";
import { useEffect, useState } from "react";
import { useDashboardStore } from "../stores/useDashboardStore";
import { fetchJurisdiction } from "@features/reporting/services/reportingService";
import { useNavigation } from "@react-navigation/native";
import { cityDto, LocationDto } from "../dtos/Location";

export default function useDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const { currentCityData, setCurrentCity, clearDeashBoardStore } = useDashboardStore();
  // current location (string name and boundaries for fast lookup) -- should be a store
  // Report History (?)

  const getUserLocation = async () => {
    const message = "Location access while using this application is required to continue.";
    const userLocation: LocationDto = await getLocationWithPermission(message);

    console.log("user loc coord: " + userLocation.longitude + "\t" + userLocation.latitude);
    const data = await fetchJurisdiction(userLocation);

    if (!data) {
      console.log("no data");
      clearDeashBoardStore();
    } else {
      const cityData: cityDto = { state: data.state, city: data.city };
      console.log("state, city: ", cityData.state, cityData.city);
      setCurrentCity(userLocation, cityData);
      console.log("store: ", currentCityData);
    }
  };

  // run on first mount
  useEffect(() => {
    getUserLocation();
  }, []);

  return {
    isLoading,
    currentCityData,
    clearDeashBoardStore,
    getUserLocation,
  };
}
