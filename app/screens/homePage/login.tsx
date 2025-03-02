import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { router, useRouter } from "expo-router"; // Import useRouter
import { useState } from "react";
import LoginForm from "@/app/components/compound/auth/loginForm";
import validateEmail from "@/app/utils/validateEmail";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const forgotPasswordPath = "/screens/homePage/forgot-password";
  const signupPath = "/screens/homePage/signUp";

  // Handle text input changes (React Native passes the text directly)
  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleForgotPassword = () => {
    console.log("Forgot password pressed");
    router.push(forgotPasswordPath); // transition to the forgot password screen
  };

  const handleLogin = () => {
    if (email.length === 0 || password.length === 0) {
      console.log("Email and password are required");
    } else {
      console.log("Login attempted with:", { email, password });
      // Add your login logic here (e.g., API call)
    }
  };

  const handleSignUp = () => {
    console.log("Sign up pressed");
    router.push(signupPath); // Navigate to the sign-up screen
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <LoginForm
          email={email}
          password={password}
          error={error}
          setEmail={handleEmailChange}
          setPassword={handlePasswordChange}
          //setError={setError}
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
    </TouchableWithoutFeedback>
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
  },
  signupLink: {
    fontSize: 16, // Same size as signupText
    color: "#007AFF", // Blue link color (iOS-like)
    fontWeight: "bold", // Optional: make it stand out
  },
});
