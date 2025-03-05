import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import SignUpForm from "@/app/components/compound/auth/signUpForm";
import { router } from "expo-router";
import validateName from "@/app/utils/validateName";
import validateEmail from "@/app/utils/validateEmail";
import validatePassword from "@/app/utils/validatePassword";
import { VALIDATION_TYPE } from "@/app/utils/validatePassword";

export interface FieldError {
  id: number;
  message: string;
}

export const FIELD_INDICES = {
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
  const [validationTriggered, setValidationTriggered] = useState(false); // Track validation start

  const initialErrors: FieldError[] = Object.values(FIELD_INDICES).map(
    (index) => ({
      id: index,
      message: "",
    })
  );

  const [error, setError] = useState<FieldError[]>(initialErrors);

  //temp
  const tempDate = new Date(date);
  const fDate = tempDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  //temp

  function handleSignUp() {
    validateSignUp();

    signUpTest(firstName, lastName, email, password, confirmPassword, fDate);
  }

  function validateSignUp() {
    //first name
    validateName({
      name: firstName,
      handleSetError: handleSetError,
      errorIndex: FIELD_INDICES.firstName,
    });

    //last name
    validateName({
      name: lastName,
      handleSetError: handleSetError,
      errorIndex: FIELD_INDICES.lastName,
    });

    //email
    validateEmail({
      email: email,
      handleSetError: handleSetError,
      errorIndex: FIELD_INDICES.email,
    });

    //password
    validatePassword({
      type: VALIDATION_TYPE.SIGNUP,
      password: password,
      handleSetError: handleSetError,
      errorIndex: FIELD_INDICES.password,
    });

    //confirm password
    if (password !== confirmPassword) {
      handleSetError(FIELD_INDICES.confirmPassword, "Passwords do not match");
    } else {
      handleSetError(FIELD_INDICES.confirmPassword, "");
    }

    //date of birth
    if (!dobOver18()) {
      handleSetError(FIELD_INDICES.dateOfBirth, "Must be over 18 years old");
    } else {
      handleSetError(FIELD_INDICES.dateOfBirth, "");
    }

    setValidationTriggered(true);
  }

  function handleSetError(errorIndex: number, errorMessage: string) {
    setError((prevErrors) =>
      prevErrors.map((error) =>
        error.id === errorIndex ? { ...error, message: errorMessage } : error
      )
    );
  }

  // not changing DOB so I didn't bother making it into a util file
  function dobOver18() {
    const today = new Date();
    const dob = new Date(date);
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if (age > 18) {
      return true;
    }

    if (age === 18) {
      if (monthDiff > 0) {
        return true;
      }
      if (monthDiff === 0 && dayDiff >= 0) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    if (!validationTriggered) return;

    console.log("Errors after validation:", error);

    if (error.every((field) => field.message.length === 0)) {
      console.log("All fields are valid");
    }
  }, [error, validationTriggered]);

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
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          setDate={setDate}
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.label}>
          Already have an account?{" "}
          <Text style={styles.backLoginText} onPress={() => router.back()}>
            Log in
          </Text>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
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

function signUpTest(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  fDate: string
) {
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
