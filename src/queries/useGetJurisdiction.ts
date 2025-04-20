import { useQuery } from "@tanstack/react-query";
import { Jurisdiction } from "@constants/jurisdiction";
import { Alert } from "react-native";

const SIX_HOURS = 1000 * 60 * 60 * 6;

/**
 * Query hook that returns a hashmap of supported jurisdictions.
 *
 * Fetches the API and converts Jurisdiction[] data into a map. Shows an alert and throws errors if it fails, triggering navigation in the caller.
 *
 * @returns {Object} - { data: Map<string, Jurisdiction>, isLoading: boolean, error: any }
 */
export const useGetJurisdiction = () => {
  return useQuery({
    queryKey: ["getJurisdiction"],
    queryFn: async () => {
      const response = await fetch(
        "https://mocki.io/v1/e3d587f7-a23f-4e48-9d0b-a8ef2d8137c7"
      );
      if (!response.ok) {
        // await showFetchErrorAlert("Retry or come back later");
        throw new Error(`Failed to fetch, retry or come back later`);
      }
      const data = await response.json();
      if (!data || !Array.isArray(data)) {
        // await showFetchErrorAlert(
        //   "Failed to retrieve supported areas, contact support or try again later"
        // );
        throw new Error("No valid jurisdiction data found");
      }

      const jurisdictions = data as Jurisdiction[];

      return createMap(jurisdictions);
    },
    staleTime: SIX_HOURS,
    gcTime: SIX_HOURS,
  });
};

/**
 * Creates a hash map from jurisdiction data for O(1) lookups.
 * @param {Jurisdiction[]} data - Array of jurisdiction objects
 * @returns {Map<string, Jurisdiction>} Map with "stateInitials-city" as key and jurisdiction as value
 */
const createMap = (jurisdiction: Jurisdiction[]) => {
  return new Map(
    jurisdiction.map((item) => [
      `${item.stateInitials.toUpperCase()}-${item.city
        .trim()
        .toUpperCase()
        .replace(/\s+/g, "-")}`,
      item,
    ])
  );
};

/**
 * Displays an alert for fetch-related errors.
 * @param {string} message - Error message to display
 * @returns {Promise<void>} Resolves when alert is dismissed
 */
const showFetchErrorAlert = (message: string): Promise<void> => {
  return new Promise((resolve) => {
    Alert.alert(
      "Error Connecting to Server",
      message,
      [{ text: "Ok", onPress: () => resolve() }],
      {
        onDismiss: () => resolve(),
      }
    );
  });
};
