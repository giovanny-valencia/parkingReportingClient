import { useState } from "react";
import RegisterView from "../components/RegisterView";
import { ErrorIndex, ErrorMessage, createInitialErrors } from "../utils/registrationErrorUtils";
import { useRegistrationErrors } from "../hooks/useRegistrationErrors";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { errors, updateError, resetErrors } = useRegistrationErrors();
  const [date, setDate] = useState(new Date());

  return (
    <RegisterView
      firstName={firstName}
      lastName={lastName}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      error={errors}
      date={date}
      setFirstName={setFirstName}
      setLastName={setLastName}
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      setDate={setDate}
    />
  );
}
