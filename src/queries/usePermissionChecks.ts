import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";
import { Camera } from "expo-camera";

/**
 * Query hook to check if location permission is granted.
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

/**
 * Query hook to check if camera permission is granted.
 *
 * @returns {Object} - { data: boolean | undefined, isLoading: boolean, error: any }
 */
export const useCheckCameraPermission = () => {
  return useQuery({
    queryKey: ["cameraPermission"],
    queryFn: async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      return status === "granted";
    },
    staleTime: 0,
    gcTime: 0,
  });
};
