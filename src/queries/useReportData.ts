import { fullReportData } from "@models/activeReport";
import { useQuery } from "@tanstack/react-query";

interface Props {
  reportID: number | null;
}

const fullReportAPI = process.env.EXPO_PUBLIC_BACKEND_API;

export default function getReportData({ reportID }: Props) {
  console.log("getReportData: ", reportID);

  return useQuery({
    queryKey: ["fullReportData", reportID],
    queryFn: async () => {
      console.log("fetching full report data");

      const response = await fetch(
        `${fullReportAPI}/api/v1/reports/${reportID}`
      );

      // check if response was successful
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error. Status: ${response.status}, body: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("data: ", data);

      const fullReport = createFullReportData(reportID, data);

      console.log("full report: ", fullReport);

      return fullReport;
    },
    enabled: !!reportID, // Only run the query if reportID is not null
  });
}

const createFullReportData = (id: number | null, data: any) => {
  if (!id || !data) {
    return null;
  }

  const fullReport: fullReportData = {
    id: id,
    addressDto: {
      streetAddress: data.addressDto.streetAddress || "",
      zipCode: data.addressDto.zipCode || "",
      locationNotes: data.addressDto.locationNotes || "",
      location: {
        latitude: data.addressDto.location.latitude || 0,
        longitude: data.addressDto.location.longitude || 0,
      },
      jurisdiction: {
        state: data.addressDto.jurisdiction.state || "",
        city: data.addressDto.jurisdiction.city || "",
      },
    },
    vehicleDto: {
      state: data.vehicleDto.state || "",
      plateNumber: data.vehicleDto.plateNumber || "",
    },
    reportImageDto: [
      ...(data.reportImageDto || []).map((image: any) => ({
        url: image.url || "",
      })),
    ],
    description: data.description || "",
    createdOn: data.createdOn || "",
  };

  return fullReport;
};
