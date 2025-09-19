import {
  ErrorIndex,
  ErrorMessage,
  createInitialErrors,
} from "@features/auth/utils/registrationErrorUtils";
import { useState } from "react";

export const useRegistrationErrors = () => {
  const [errors, setErrors] = useState(createInitialErrors);

  /**
   * Updates a single error message in the errors state array.
   * This function ensures immutability by creating a new array.
   * @param updatedError - The ErrorMessage object with the index and new message.
   */
  const updateError = (
    errorIndex: (typeof ErrorIndex)[keyof typeof ErrorIndex],
    errorMessage: string
  ) => {
    const updatedError: ErrorMessage = {
      index: errorIndex,
      message: errorMessage,
    };

    setErrors((prevError) =>
      prevError.map((error) => (error.index === updatedError.index ? updatedError : error))
    );
  };

  /**
   * Resets all error messages to empty strings.
   */
  const resetErrors = () => {
    setErrors(createInitialErrors());
  };

  return {
    errors,
    updateError,
    resetErrors,
  };
};
