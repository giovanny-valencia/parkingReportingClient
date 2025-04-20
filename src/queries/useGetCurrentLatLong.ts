import * as Location from "expo-location";
import { useQuery } from "@tanstack/react-query";

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

        // const { latitude, longitude } = coords;

        // const location = await Location.reverseGeocodeAsync({
        //   latitude,
        //   longitude,
        // });

        // return createAddress({
        //   location,
        //   latitude,
        //   longitude,
        // });
      } catch (error) {
        // fallback, lower accuracy
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        return {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };

        // const { latitude, longitude } = coords;

        // const location = await Location.reverseGeocodeAsync({
        //   latitude,
        //   longitude,
        // });

        // return createAddress({
        //   location,
        //   latitude,
        //   longitude,
        // });
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
