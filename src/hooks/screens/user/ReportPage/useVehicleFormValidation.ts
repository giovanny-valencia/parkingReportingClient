import { ImageContent } from "@constants/imageContent";
import { ErrorIndex } from "@constants/userReportFieldErrors";
import { useValidateLicensePlateEntry } from "@queries/unused/useValidateLicensePlateEntry";
import { useEffect, useState } from "react";

/**
 *
 */

// returns:

type Params = {
  shouldValidate: boolean;
  setErrors: (index: number, message: string) => void;
  plateImage: ImageContent;
  plateStateInitials: string;
  plateNumber: string;
};

const plateImageValidation = ({ plateImage }: Pick<Params, "plateImage">) => {
  //return plateImage?.uri.length === 0 ? "License Plate Image Required" : "";
  return "";
};

const plateStateValidation = ({
  plateStateInitials,
}: Pick<Params, "plateStateInitials">) => {
  return plateStateInitials?.length === 0
    ? "License Plate State Selection Required"
    : "";
};

const plateNumberValidation = ({
  plateNumber,
}: Pick<Params, "plateNumber">) => {
  return plateNumber?.length === 0 ? "License Plate Number Required" : "";
};

const validationAndErrorSet = ({
  plateImage,
  plateStateInitials,
  plateNumber,
  setErrors,
}: Pick<
  Params,
  "plateImage" | "plateStateInitials" | "plateNumber" | "setErrors"
>) => {
  const imageError = plateImageValidation({ plateImage });
  const stateError = plateStateValidation({ plateStateInitials });
  const numberError = plateNumberValidation({ plateNumber });

  setErrors(ErrorIndex.licensePlateImage, imageError);
  setErrors(ErrorIndex.licensePlateStateSelection, stateError);
  setErrors(ErrorIndex.licensePlateTextInput, numberError);

  return !(
    imageError.length > 0 ||
    stateError.length > 0 ||
    numberError.length > 0
  );
};

export const useVehicleFormValidation = ({
  shouldValidate,
  setErrors,
  plateImage,
  plateStateInitials,
  plateNumber,
}: Params) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  console.log("SV: ", shouldValidate);

  useEffect(() => {
    if (shouldValidate) {
      const result = validationAndErrorSet({
        plateImage,
        plateStateInitials,
        plateNumber,
        setErrors,
      });
      setIsValid(result);
    }
  });

  return isValid;
};
