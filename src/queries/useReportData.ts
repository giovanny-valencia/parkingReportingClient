import { useQuery } from "@tanstack/react-query";

interface Props {
  reportID: number | null;
}

const fullReportAPI = process.env.EXPO_PUBLIC_FULL_REPORT_API;

export default function getReportData({ reportID }: Props) {
  console.log("getReportData: ", reportID);

  return useQuery({
    queryKey: ["fullReportData", reportID],
    queryFn: async () => {
      console.log("fetching full report data");

      const response = await fetch(`${fullReportAPI}`);

      // check if response was successful
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error. Status: ${response.status}, body: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("full report data: ", data);

      return data;
    },
    enabled: !!reportID, // Only run the query if reportID is not null
  });
}
