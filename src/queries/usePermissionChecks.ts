import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";
import { Camera } from "expo-camera";

/**
 * Query hook to check if location permission is granted.
 *
 * tanstack is probably not needed for this. Was an earlier implementation.
 *
 * @returns {Object} - { data: boolean | undefined, isLoading: boolean, error: any }
 */
export const useCheckLocationPermission = () => {
  return useQuery({
    queryKey: ["locationPermission"],
    queryFn: async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      return status === "granted";
    },
    staleTime: 0,
    gcTime: 0,
  });
};
