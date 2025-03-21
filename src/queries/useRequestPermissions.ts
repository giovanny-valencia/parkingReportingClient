import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";
import { Alert, Linking } from "react-native";

interface RequestPermissionParams {
  enabled: boolean;
  contextMessage?: string;
}

/**
 * Hook to request location permission.
 *
 * @param enabled - boolean obtained after running useCheckLocationPermission, runs when that returns false
 * @param contextMessage: string
 * @returns {object} - { data: Map<string, Jurisdiction>, isLoading: boolean, error: Error | null }
 */
export const useRequestLocationPermission = ({
  enabled,
  contextMessage = "goCite needs your location to provide this feature.",
}: RequestPermissionParams) => {
  return useQuery({
    queryKey: ["requestPermission"],
    queryFn: async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        return true;
      }

      // otherwise, implicit request for location was denied. Show alert and settings link
      return showPermissionAlert(
        "Location Permission Required",
        contextMessage
      );
    },
    enabled,
    staleTime: 0,
    gcTime: 0,
  });
};

const showPermissionAlert = (
  title: string,
  message: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        { text: "Cancel", onPress: () => resolve(false) },
        {
          text: "Settings",
          onPress: () => {
            Linking.openSettings();
            resolve(false);
          },
        },
      ],
      {
        onDismiss: () => resolve(false),
      }
    );
  });
};
