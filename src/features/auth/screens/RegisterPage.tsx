import { useEffect, useState } from "react";
import RegisterView from "../components/RegisterView";
import { useNavigationState } from "@react-navigation/native";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [date, setDate] = useState(new Date());

  const navigationState = useNavigationState((state) => state);

  useEffect(() => {
    if (navigationState) {
      console.log(
        "Current Navigation Stack (RegisterPage):",
        navigationState.routes.map((route) => route.name)
      );
    }
  }, [navigationState]);

  return (
    <RegisterView
      firstName={firstName}
      lastName={lastName}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      error={error}
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
