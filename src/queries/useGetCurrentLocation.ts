import * as Location from "expo-location";
import { useQuery } from "@tanstack/react-query";
import { createAddress } from "@utils/addressUtils";

export const useGetCurrentLocation = (enabled: boolean) => {
  return useQuery({
    queryKey: ["getCurrentLocation"],
    queryFn: async () => {
      try {
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        const { latitude, longitude } = coords;

        const location = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        return createAddress({
          location,
          latitude,
          longitude,
        });
      } catch (error) {
        // fallback, lower accuracy
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        const { latitude, longitude } = coords;

        const location = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        return createAddress({
          location,
          latitude,
          longitude,
        });
      }
    },
    enabled,
    staleTime: 0,
    gcTime: 0,
  });
};
