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

  //buttonClick: string;
  //  setButtonClick: (clearButton: string) => void;
  setErrors: (index: number, message: string) => void;

  plateImage: ImageContent;
  plateStateInitials: string;
  plateNumber: string;
};

const plateImageValidation = ({ plateImage }: Pick<Params, "plateImage">) => {
  return plateImage?.uri.length === 0 ? "License Plate Image Required" : "";
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

export const useVehicleFormValidation = ({
  shouldValidate,
  //buttonClick,
  //setButtonClick,
  setErrors,
  plateImage,
  plateStateInitials,
  plateNumber,
}: Params) => {
  console.log("SV: ", shouldValidate);

  

};
