import { useQuery } from "@tanstack/react-query";
import { FIELD_INDICES, FieldError } from "@constants/userReportFieldErrors";

interface LicensePlateValidationParams {
  stateInitials: string;
  plateNumber: string;
  //   index: number;
  //   errors: FieldError[];
}

const getVehicleDetails = async ({
  stateInitials,
  plateNumber,
}: LicensePlateValidationParams) => {
  const response = await fetch(
    `https://api.licenseplatelookup.org/?state=${stateInitials}&plate=${plateNumber}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  console.log("response: ", response);
  if (!response.ok) {
    console.log("failed to get data");
    throw new Error("Failed to fetch vehicle details");
  }

  const data = await response.json();

  console.log("data: ", data);
  return data;
};

export const useValidateLicensePlateEntry = ({
  stateInitials,
  plateNumber,
}: //   index,
//   errors,
LicensePlateValidationParams) => {
  return useQuery({
    queryKey: ["vehicleDetails", stateInitials, plateNumber],
    queryFn: () => getVehicleDetails({ stateInitials, plateNumber }),
    enabled: !!stateInitials && !!plateNumber, // Only run if both are non-empty
  });
};
