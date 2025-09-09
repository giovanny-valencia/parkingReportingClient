import * as Location from "expo-location";
import { useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useGetCurrentLatLong = (enabled: boolean) => {
  const query = useQuery({
    queryKey: ["getCurrentLocation"],
    queryFn: async () => {
      try {
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        return {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
      } catch (error) {
        try {
          // fallback, lower accuracy
          const { coords } = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });

          return {
            latitude: coords.latitude,
            longitude: coords.longitude,
          };
        } catch (finalError) {
          Alert.alert(
            "Location Error",
            "We couldn't get your current location. Please try again or check your device settings.",
            [{ text: "ok" }]
          );
          //return null;
        }
      }
    },
    enabled,
    staleTime: 0,
    gcTime: 0,
  });

  return {
    latitude: query.data?.latitude,
    longitude: query.data?.longitude,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
