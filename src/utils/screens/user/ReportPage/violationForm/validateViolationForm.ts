import { IMAGE_TYPES, ImageContent } from "@constants/imageContent";
import { ErrorIndex, ErrorField } from "@constants/userReportFieldErrors";

interface Params {
  supportingImages: ImageContent[];
  violation: string;
  setErrors: (index: number, errMessage: string) => void;
}

const validateSupportingImages = ({
  supportingImages,
}: Pick<Params, "supportingImages">) => {
  //console.log("SI Length: ", supportingImages[0].uri.length);

//   return supportingImages[0].uri.length === 0
//     ? "At least 1 violation image is required"
//     : "";

  return "";
};

const validateViolationInput = ({ violation }: Pick<Params, "violation">) => {
  return violation.length === 0 ? "Description of violation is required" : "";
};

export default ({ violation, supportingImages, setErrors }: Params) => {
  const imageErrorMessage = validateSupportingImages({ supportingImages });
  const violationErrorMessage = validateViolationInput({ violation });

  setErrors(ErrorIndex.supportingImage, imageErrorMessage);
  setErrors(ErrorIndex.violationDetails, violationErrorMessage);

  return !(imageErrorMessage.length > 0 || violationErrorMessage.length > 0);
};
