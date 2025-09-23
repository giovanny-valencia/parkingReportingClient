import RegisterView from "../components/RegisterView";
import { useRegistration } from "../hooks/useRegistration";

export default function RegisterPage() {
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
