import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { router, useRouter } from "expo-router"; // Import useRouter
import { useState, useEffect } from "react";
import LoginView from "@/app/components/compound/auth/LoginView";
import validateEmail from "@/app/utils/validateEmail";
import validatePassword from "@/app/utils/validatePassword";
import { VALIDATION_TYPE } from "@/app/utils/validatePassword";
import { QueryClient } from "react-query";

const queryClient = new QueryClient();

export interface errorIndex {
  id: number;
  message: string;
}

const handleForgotPassword = () => {
  console.log("Forgot password pressed");

  router.push("./forgotPasswordPage"); // transition to the forgot password screen
};

const handleSignUp = () => {
  router.push("./signUpPage"); // Navigate to the sign-up screen
};

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationTriggered, setValidationTriggered] = useState(false); // Track validation start

  const errorI = {
    email: 0,
    password: 1,
  } as const;

  const initialErrors: errorIndex[] = Object.values(errorI).map((index) => ({
    id: index,
    message: "",
  }));

  const [error, setError] = useState<errorIndex[]>(initialErrors);

  const handleLogin = () => {
    // Validate the email and password
    handleCredentialVerification();
  };

  const handleCredentialVerification = () => {
    // Validate the new email input
    validateEmail({
      email,
      handleSetError: handleError,
      errorIndex: errorI.email,
    });

    // validate password input, can't be null before sending to backend
    validatePassword({
      type: VALIDATION_TYPE.LOGIN,
      password,
      handleSetError: handleError,
      errorIndex: errorI.password,
    });

    setValidationTriggered(true); // Validation has been triggered
  };

  function handleError(errorIndex: number, errorMessage: string) {
    setError((prevError) =>
      prevError.map((item) =>
        item.id === errorIndex ? { ...item, message: errorMessage } : item
      )
    );
  }

  useEffect(() => {
    if (!validationTriggered) return;

    console.log("Errors after validation:", error);

    if (
      error[errorI.email].message.length === 0 &&
      error[errorI.password].message.length === 0
    ) {
      // API call to login attempt
      console.log("Login attempted with:", { email, password });

      // If the login is successful, navigate to the home screen

      // if regular user -> navigate to user home screen
      router.replace("../user/homePage");

      // if officer -> navigate to officer home screen

      // Otherwise, show an error message
    }

    // Reset the validation trigger
    setValidationTriggered(false);
  }, [error, validationTriggered]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <LoginView
          email={email}
          password={password}
          error={error}
          setEmail={setEmail}
          setPassword={setPassword}
        />

        <Text style={styles.forgotPassword} onPress={handleForgotPassword}>
          Forgot Password?
        </Text>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Need an account? </Text>
          <Text style={styles.signupLink} onPress={handleSignUp}>
            Sign up
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

// Styles for the HomeScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  loginButton: {
    borderWidth: 2,
    borderColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  loginButtonText: {
    color: "#007AFF", // Blue text to match outline
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "bold",
    alignSelf: "flex-end", // Right-align under the input
    marginBottom: 15, // Space before the Login button
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 15, // Space above the row
    alignItems: "center", // Vertically center the text and link
  },
  signupText: {
    fontSize: 16, // Match size with signupLink
    color: "#000", // Default text color
    textAlign: "center", // Center the text
  },
  signupLink: {
    fontSize: 16, // Same size as signupText
    color: "#007AFF", // Blue link color (iOS-like)
    fontWeight: "bold", // Optional: make it stand out
  },
});
