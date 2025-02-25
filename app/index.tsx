import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle text input changes (React Native passes the text directly)
  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
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
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>LOGIN</Text>

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={handleEmailChange} // Pass the function directly
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="password"
          value={password}
          onChangeText={handlePasswordChange} // Pass the function directly
          secureTextEntry
        />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
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
