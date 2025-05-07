/**
 * Requests active reports from the server based on current lat/long coords and specified radius.
 *
 *  - Gets officer current location in lat/lon
 *  - Makes API request by passing lat, long, radius
 */

import * as Location from "expo-location";
import { useQuery } from "@tanstack/react-query";

const URL_BASE = "https://mocki.io/v1/155d3f40-8e05-4944-a0ce-66ddcbc2b687";

export default function useGetActiveReports() {
  return useQuery({
    queryKey: ["getActiveReports"],
    queryFn: async () => {
      try {
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        const params = new URLSearchParams({
          latitude: coords.latitude.toString(),
          longitude: coords.longitude.toString(),
        });

        const formattedURL = `${URL_BASE}?${params.toString()}`;
        console.log("FURL: ", formattedURL);

        const response = await fetch(URL_BASE);
        const data = await response.json();

        console.log(data);

        return data;
      } catch (error) {}
    },
  });
}
