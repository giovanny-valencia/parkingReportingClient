/**
 * Requests active reports from the server based on current lat/long coords and specified radius.
 *
 *  - Gets officer current location in lat/lon
 *  - Makes API request by passing lat, long, radius
 */

import * as Location from "expo-location";
import { useQuery } from "@tanstack/react-query";

const activeReportsAPI = process.env.EXPO_PUBLIC_BACKEND_API;

export default function useGetActiveReports() {
 // console.log("env: ", activeReportsAPI);

  return useQuery({
    queryKey: ["getActiveReports"],
    queryFn: async () => {
      console.log("fetching");

      try {
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        const response = await fetch(
          `${activeReportsAPI}/api/v1/reports/active-summaries`
        );

        // check if response was successful
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error. Status: ${response.status}, body: ${errorText}`
          );
        }

        const data = await response.json();

        console.log(data);

        return data;
      } catch (error) {
        console.error("Error fetching active reports: ", error);

        throw error;
      }
    },
    refetchInterval: 120000, // Refetch every 120000 milliseconds (2 minutes)
  });
}
