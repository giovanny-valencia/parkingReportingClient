import { useQuery } from "@tanstack/react-query";
import { Jurisdiction } from "_refactor/constants/jurisdiction";
import { Alert } from "react-native";

/**
 * Query hook that returns a hashmap of supported jurisdictions.
 *
 * Fetches the API and converts Jurisdiction[] data into a map. Shows an alert and throws errors if it fails, triggering navigation in the caller.
 *
 * @returns {Object} - { data: Map<string, Jurisdiction>, isLoading: boolean, error: any }
 */

const JurisdictionAPI = process.env.EXPO_PUBLIC_BACKEND_API;

export const useGetJurisdiction = () => {
  const SIX_HOURS = 1000 * 60 * 60 * 6;

  return useQuery({
    queryKey: ["getJurisdiction"],
    queryFn: async () => {
      console.log(`${JurisdictionAPI}/api/v1/jurisdictions`);

      const response = await fetch(`${JurisdictionAPI}/api/v1/jurisdictions`);
      if (!response.ok) {
        throw new Error(`Failed to fetch, retry or come back later`);
      }
      const data = await response.json();
      if (!data || !Array.isArray(data)) {
        throw new Error("No valid jurisdiction data found");
      }

      console.log("response: ", data);

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
      `${item.state.toUpperCase()}-${item.city
        .trim()
        .toUpperCase()
        .replace(/\s+/g, "-")}`,
      item,
    ])
  );
};
