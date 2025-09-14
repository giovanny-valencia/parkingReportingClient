import { router } from "expo-router";
import { useState } from "react";
import validateEmail from "@features/auth/utils/validateEmail";
import LoginView from "../components/LoginView";
import validateSimpleLoginPassword from "../utils/validateSimpleLoginPassword";
import { LoginCredentialsDto, RegistrationDto } from "@features/auth/dtos/Auth";
import authService from "../services/authService";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../store/useAuthStore";
import { ROUTES } from "@common/constants/routes";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailAndServerErrorMessage, setEmailAndServerErrorMessage] =
    useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { token, user } = useAuthStore();

  const handleForgotPassword = () => {
    console.log("Forgot password pressed");
    router.push(ROUTES.FORGOT_PASSWORD);
  };

  const handleLogin = async () => {
    // validate email field
    const isEmailValid = validateEmail({
      email,
      handleSetError: setEmailAndServerErrorMessage,
    });

    // validate password field
    const isPasswordValid = validateSimpleLoginPassword({
      password,
      setPasswordError: setPasswordErrorMessage,
    });

    if (isEmailValid && isPasswordValid) {
      setIsLoading(true);

      try {
        const userLoginCredentials: LoginCredentialsDto = {
          email: email,
          password: password,
        };

        const res = await authService.login(userLoginCredentials);

        console.log("data: ", user, token);

        console.log(jwtDecode(res));
      } catch (error: any) {
        console.log("failed in Page: ", error.message);
        setEmailAndServerErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSignUp = () => {
    router.push(ROUTES.REGISTER);
  };

  return (
    <LoginView
      email={email}
      password={password}
      emailAndServerErrorMessage={emailAndServerErrorMessage}
      passwordErrorMessage={passwordErrorMessage}
      isLoading={isLoading}
      setEmail={setEmail}
      setPassword={setPassword}
      onForgotPasswordPress={handleForgotPassword}
      onLoginPress={handleLogin}
      onSignUpPress={handleSignUp}
    />
  );
}
