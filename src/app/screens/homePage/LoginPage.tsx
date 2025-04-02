import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router"; // Import useRouter
import { useState, useEffect, useRef } from "react";
import LoginView from "@components/compound/auth/LoginView";
import validateEmail from "@utils/validateEmail";
import validatePassword from "@utils/validatePassword";
import { VALIDATION_TYPE } from "@utils/validatePassword";

export interface errorIndex {
  id: number;
  message: string;
}

const handleForgotPassword = () => {
  console.log("Forgot password pressed");

  router.push("./ForgotPasswordPage"); // transition to the forgot password screen
};

const handleSignUp = () => {
  router.push("./SignUpPage"); // Navigate to the sign-up screen
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
      router.replace("/screens/user/HomePage");

      // if officer -> navigate to officer home screen

      // Otherwise, show an error message
    }

    // Reset the validation trigger
    setValidationTriggered(false);
  }, [error, validationTriggered]);

  return (
    <View style={styles.scrollView}>
      <KeyboardAwareScrollView
        scrollEnabled={true}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center", // Center vertically
        }}
      >
        <View style={styles.screen}>
          <View style={styles.loginView}>
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
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

// Styles for the HomeScreen component
const styles = StyleSheet.create({
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

    marginBottom: 150,
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

  screen: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    marginTop: 40,
    marginBottom: 40,
  },

  loginView: {
    width: "80%",
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#F5F5F5",
  },

  scrollView: {
    flex: 1, // Fill the entire screen
    backgroundColor: "black",
  },
});
