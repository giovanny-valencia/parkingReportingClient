import { getLocationWithPermission } from "@features/reporting/utils/locationUtils";
import { useEffect, useState } from "react";
import { useDashboardStore } from "../stores/useDashboardStore";
import { useNavigation } from "@react-navigation/native";

export default function useDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUserCoordinates, currentCityData, cachedCities } = useDashboardStore();
  // current location (string name and boundaries for fast lookup) -- should be a store
  // Report History (?)

  // run on first mount
  useEffect(() => {
    const getUserLocation = async () => {
      const message = "Location access while using this application is required to continue.";
      const { longitude, latitude } = await getLocationWithPermission(message);
      console.log("user loc coords: " + longitude, +" " + latitude);
    };

    getUserLocation();
  }, []);

  return { isLoading };
}
