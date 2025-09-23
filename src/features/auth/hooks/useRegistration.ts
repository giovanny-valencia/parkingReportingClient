import { useState, useCallback } from "react";
import { RegisterDto, RegistrationInputs } from "../dtos/Auth";
import { createInitialErrors, ErrorIndex, ErrorMessage } from "../utils/registrationErrorUtils";
import validateRegistrationData from "../utils/registrationUtils";
import { mapRegistrationFormToDto } from "../utils/authMapper";
import authService from "../services/authService";

export function useRegistration() {
  const [registrationForm, setRegistrationForm] = useState<RegistrationInputs>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: new Date(),
    agreedToTerms: false,
  });
  const [errors, setErrors] = useState(createInitialErrors);
  const [isLoading, setIsLoading] = useState(false);

  // --- Helper Functions

  /**
   * Validate the form data.
   * @returns {boolean} True if there are validation errors, false otherwise.
   */
  const handleValidation = useCallback((): boolean => {
    let updatedErrors: ErrorMessage[] = validateRegistrationData(registrationForm);
    setErrors(updatedErrors);
    return updatedErrors.some((err) => err.message.length > 0);
  }, [registrationForm]);

  /**
   * Execute the API call and handle success or failure.
   */
  const executeRegistration = useCallback(async () => {
    setIsLoading(true);

    try {
      const dto: RegisterDto = mapRegistrationFormToDto(registrationForm);
      const response = await authService.register(dto);

      console.log("resp: ", response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors((prevErrors) => {
          const newErrors = [...prevErrors];
          newErrors[ErrorIndex.EMAIL].message = [error.message];
          return newErrors;
        });
      } else {
        setErrors((prevErrors) => {
          const newErrors = [...prevErrors];
          newErrors[ErrorIndex.EMAIL].message = ["An unknown error occurred."];
          return newErrors;
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [registrationForm]);

  // --- Public Functions

  /**
   * Main function to handle the registration process. It orchestrates the flow
   * by first validating the data, and then executing the registration if valid.
   */
  const handleRegister = useCallback(async () => {
    const hasErrors = handleValidation();

    if (!hasErrors) {
      await executeRegistration();
    }
  }, [handleValidation, executeRegistration]);

  /**
   * RegistrationForm input change handler
   */
  const handleInputChange = useCallback(
    (field: keyof RegistrationInputs, value: string | Date | boolean) => {
      setRegistrationForm((prevForm) => ({
        ...prevForm,
        [field]: value,
      }));
    },
    []
  );

  return {
    registrationForm,
    errors,
    isLoading,
    handleRegister,
    handleInputChange,
  };
}
