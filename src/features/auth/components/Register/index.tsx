import { useRegistration } from "@features/auth/hooks/useRegistration";
import RegisterView from "./RegisterView";

export default function Register() {
  const { registrationForm, errors, isLoading, handleInputChange, handleRegister } =
    useRegistration();

  return (
    <RegisterView
      registrationForm={registrationForm}
      error={errors}
      isLoading={isLoading}
      onInputChange={handleInputChange}
      onRegisterPress={handleRegister}
    />
  );
}
