import { router } from "expo-router";
import { useState } from "react";

import LoginView from "../components/LoginView";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationTriggered, setValidationTriggered] = useState(false);

  const handleForgotPassword = () => {
    console.log("Forgot password pressed");
    router.push("./forgotPassword");
  };

  const handleLogin = () => {
    console.log("Login pressed");
    // Add login logic here
  };

  const handleSignUp = () => {
    router.push("./register");
  };

  return (
    <LoginView
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      onForgotPasswordPress={handleForgotPassword}
      onLoginPress={handleLogin}
      onSignUpPress={handleSignUp}
    />
  );
}
