import LoginView from "./LoginView";
import { useLogin } from "@features/auth/hooks/useLogin";

//TODO: refactor out these screens, removing redundant proxy
export default function LoginPage() {
  const {
    loginDto,
    emailAndServerErrorMessage,
    passwordErrorMessage,
    isLoading,
    handleInputChange,
    handleLogin,
    handleSignUp,
    handleForgotPassword,
  } = useLogin();
  return (
    <LoginView
      loginDto={loginDto}
      emailAndServerErrorMessage={emailAndServerErrorMessage}
      passwordErrorMessage={passwordErrorMessage}
      isLoading={isLoading}
      onInputChange={handleInputChange}
      onLoginPress={handleLogin}
      onSignUpPress={handleSignUp}
      onForgotPasswordPress={handleForgotPassword}
    />
  );
}
