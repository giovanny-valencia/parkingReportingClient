import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { router } from "expo-router"; // Import useRouter
import { useState, useEffect } from "react";
import LoginView from "@components/compound/auth/LoginView";
import validateEmail from "@utils/validateEmail";
import validatePassword from "@utils/validatePassword";
import { VALIDATION_TYPE } from "@utils/validatePassword";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        // Need to rework LoginView to use any of this
        //behavior={Platform.OS === "ios" ? "padding" : undefined}
        //keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <View style={styles.loginMenuArea}>
              <View style={styles.loginView}>
                <LoginView
                  email={email}
                  password={password}
                  error={error}
                  setEmail={setEmail}
                  setPassword={setPassword}
                />

                <Text
                  style={styles.forgotPassword}
                  onPress={handleForgotPassword}
                >
                  Forgot Password?
                </Text>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                >
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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Styles for the HomeScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen
    backgroundColor: "skyblue",
  },

  loginButton: {
    backgroundColor: "#007AFF", // Filled blue
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  loginButtonText: {
    color: "#FFFFFF", // White text on blue
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
    alignSelf: "center",

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

  loginMenuArea: {
    flex: 1,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",

    marginTop: 30,
    marginBottom: 30,
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 4 }, // Shadow direction
    shadowOpacity: 0.3, // Shadow visibility
    shadowRadius: 6, // Shadow blur
    elevation: 8, // Shadow for Android
    borderRadius: 30,
    //padding: 20,
  },

  loginView: {
    width: "80%",
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#F5F5F5",
  },

  screen: {
    flex: 1, // Fill the entire screen
  },
});
