import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import validateEmail from "@/app/utils/validateEmail";
import SignUpForm from "@/app/components/compound/auth/signUpForm";
import { router } from "expo-router";

export interface FieldError {
  id: number;
  message: string;
}

const FIELD_INDICES = {
  firstName: 0,
  lastName: 1,
  email: 2,
  password: 3,
  confirmPassword: 4,
  dateOfBirth: 5,
} as const;

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [date, setDate] = useState(new Date());

  const initialErrors: FieldError[] = Object.values(FIELD_INDICES).map(
    (index) => ({
      id: index,
      message: "",
    })
  );

  const [error, setError] = useState<FieldError[]>(initialErrors);

  function handleSetError(errorIndex: number, errorMessage: string) {
    const updatedErrors = error.map((fieldError) => {
      if (fieldError.id === errorIndex) {
        return {
          ...fieldError,
          message: errorMessage,
        };
      }
      return fieldError;
    });
    setError(updatedErrors);
  }

  function handleSetDate(date: Date) {
    setDate(date);
  }

  function handleFirstNameChange(text: string) {
    setFirstName(text);
  }

  function handleLastNameChange(text: string) {
    setLastName(text);
  }

  function handleEmailChange(text: string) {
    setEmail(text);
  }

  function handlePasswordChange(text: string) {
    setPassword(text);
  }

  function handleConfirmPasswordChange(text: string) {
    setConfirmPassword(text);
  }

  function handleSignUp() {
    // Add your sign-up logic here
    const tempDate = new Date(date);

    const fDate = tempDate.toLocaleDateString("en-US", {month: "2-digit", day: "2-digit", year: "numeric"});

    console.log(
      "Sign up attempted with:",
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      "DoB:",
      fDate
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SignUpForm
          firstName={firstName}
          lastName={lastName}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          error={error} // Pass error, default to empty string if null
          date={date}
          setFirstName={handleFirstNameChange}
          setLastName={handleLastNameChange}
          setEmail={handleEmailChange}
          setPassword={handlePasswordChange}
          setConfirmPassword={handleConfirmPasswordChange}
          setDate={handleSetDate}
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.label}>
          Already have an account?{" "}
          <Text style={styles.backLoginText} onPress={handleBack}>
            Log in
          </Text>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  function handleBack() {
    router.back(); // Go back to the previous screen
  }
}

/**
 * Surface-level validation for user input (to be implemented):
 * - Check if all fields are filled
 * - Does password and confirm password match
 * - Is password strong enough (pass criteria)
 * - Is date of birth valid (in the past, valid date, over 18 years from today)
 * - Is email valid and not already registered (backend validation)
 * - Is user not already registered (backend validation)
 */

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 28,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 16,
  },
  signupButton: {
    borderWidth: 2,
    borderColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  signupButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  backLoginText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "bold",
  },
  label: {
    width: "100%",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
