import LoginView from "../components/LoginView";
import { useLogin } from "../hooks/useLogin";

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
