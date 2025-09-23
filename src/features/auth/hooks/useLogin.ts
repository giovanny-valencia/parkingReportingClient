import { useState, useCallback } from "react";
import { LoginCredentialsDto } from "../dtos/Auth";
import { router } from "expo-router";
import { ROUTES } from "@common/constants/routes";
import { validateEmail } from "../utils/validationUtils";
import authService from "../services/authService";

export function useLogin() {
  const [loginDto, setLoginDto] = useState<LoginCredentialsDto>({
    email: "",
    password: "",
  });
  const [emailAndServerErrorMessage, setEmailAndServerErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- Helper Functions

  /**
   * Helper function to validate the form data.
   * @returns {boolean} True if there are validation errors, false otherwise.
   */
  const handleValidation = useCallback(() => {
    const emailErrorMessage: string[] = validateEmail(loginDto.email);
    const passwordErrorMessage: string = loginDto.password.length > 0 ? "" : "Password is required";

    setEmailAndServerErrorMessage(emailErrorMessage[0] || "");
    setPasswordErrorMessage(passwordErrorMessage);

    return emailErrorMessage[0]?.length > 0 || passwordErrorMessage.length > 0;
  }, [loginDto]);

  /**
   * Helper function to execute the API call and handle success or failure.
   */
  const executeLogin = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.login(loginDto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setEmailAndServerErrorMessage(error.message);
      } else {
        setEmailAndServerErrorMessage("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [loginDto]);

  // --- Public Functions

  /**
   * Handles changes to the form inputs.
   */
  const handleInputChange = useCallback((field: keyof LoginCredentialsDto, value: string) => {
    setLoginDto((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);

  /**
   * Orchestrates the login process by validating the data and executing the API call.
   */
  const handleLogin = useCallback(() => {
    const hasErrors = handleValidation();

    if (!hasErrors) {
      executeLogin();
    }
  }, [handleValidation, executeLogin]);

  /**
   * Navigates to the sign up page.
   */
  const handleSignUp = useCallback(() => {
    router.push(ROUTES.REGISTER);
  }, []);

  /**
   * Navigates to the forgot password page.
   */
  const handleForgotPassword = useCallback(() => {
    router.push(ROUTES.FORGOT_PASSWORD);
  }, []);

  return {
    loginDto,
    emailAndServerErrorMessage,
    passwordErrorMessage,
    isLoading,
    handleInputChange,
    handleLogin,
    handleSignUp,
    handleForgotPassword,
  };
}
