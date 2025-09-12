import { router } from "expo-router";
import { useState } from "react";
import validateEmail from "@features/auth/utils/validateEmail";
import LoginView from "../components/LoginView";
import validateSimpleLoginPassword from "../utils/validateSimpleLoginPassword";
import { LoginCredentialsDto, RegistrationDto } from "@features/auth/dtos/Auth";
import authService from "../services/authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailAndServerErrorMessage, setEmailAndServerErrorMessage] =
    useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [validationTriggered, setValidationTriggered] = useState(false);

  const handleForgotPassword = () => {
    console.log("Forgot password pressed");
    router.push("./forgotPassword");
  };

  const handleLogin = async () => {
    console.log("Login pressed");

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
      console.log("No errors, sending data to backend...");

      try {
        const userLoginCredentials: LoginCredentialsDto = {
          email: email,
          password: password,
        };

        console.log("data being sent... ");
        console.log("email:", userLoginCredentials.email);
        console.log("password:", userLoginCredentials.password);

        await authService.login(userLoginCredentials);
        console.log("login successful!");
      } catch (error: any) {
        console.log("failed in Page: ", error.message);
      }
    } else console.log("errors found");
  };

  const handleSignUp = () => {
    router.push("./register");
  };

  return (
    <LoginView
      email={email}
      password={password}
      emailAndServerErrorMessage={emailAndServerErrorMessage}
      passwordErrorMessage={passwordErrorMessage}
      setEmail={setEmail}
      setPassword={setPassword}
      onForgotPasswordPress={handleForgotPassword}
      onLoginPress={handleLogin}
      onSignUpPress={handleSignUp}
    />
  );
}
