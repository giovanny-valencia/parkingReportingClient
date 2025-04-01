import { useQuery } from "@tanstack/react-query";

interface LicensePlateValidationParams {
  stateInitials: string;
  plateNumber: string;
  enabled: boolean;
}

const getVehicleDetails = async ({
  stateInitials,
  plateNumber,
}: Pick<LicensePlateValidationParams, "stateInitials" | "plateNumber">) => {
  console.log("fetching");

  try {
    const response = await fetch(
      "placeholder",

      {
        headers: {},
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to Fetch: ${response.status}`);
    }

    const data = await response.json();
    if (!data) throw new Error("No data");

    console.log("data: ", data);

    return data;
  } catch (error) {
    console.log("Fetch err: ", error);
    throw error;
  }
};

export const useValidateLicensePlateEntry = ({
  stateInitials,
  plateNumber,
  enabled,
}: LicensePlateValidationParams) => {
  console.log("Enabled:", enabled);

  return useQuery({
    queryKey: ["vehicleDetails", stateInitials, plateNumber],
    queryFn: async () => {
      const response = await getVehicleDetails({ stateInitials, plateNumber });

      return response;
    },
    staleTime: 0,
    gcTime: 0,
    enabled,
  });
};
