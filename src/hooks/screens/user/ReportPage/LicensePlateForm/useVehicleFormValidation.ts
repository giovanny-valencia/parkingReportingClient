import { ImageContent } from "@constants/imageContent";
import { ErrorIndex } from "@constants/userReportFieldErrors";
import { useEffect, useState } from "react";

/**
 * Handles the validation for the {@link LicensePlateForm}, if valid allows next step increment.
 * Sets errors to add or clear the previous error message if resolved
 *
 * Was a hook because it was intended to do an API look up on the plate number but that was scrapped.
 */

type Params = {
  shouldValidate: boolean;
  setErrors: (index: number, message: string) => void;
  plateImage: ImageContent[];
  plateStateInitials: string;
  plateNumber: string;
};

const plateImageValidation = (image: ImageContent) => {
  return image?.uri.length === 0 ? "License Plate Image Required" : "";
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
  const image = plateImage[0];

  const imageError = plateImageValidation(image);
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
