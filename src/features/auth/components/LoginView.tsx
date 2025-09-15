import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AnimatedInput from "common/components/AnimatedInput";
import LoginErrorMessage from "./LoginErrorMessage";

import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "../store/useAuthStore";

interface LoginViewProps {
  email: string;
  password: string;
  emailAndServerErrorMessage: string;
  passwordErrorMessage: string;
  isLoading: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  onForgotPasswordPress: () => void;
  onLoginPress: () => void;
  onSignUpPress: () => void;
}

const getKey = async () => {
  const key = await SecureStore.getItemAsync("userAuthToken");
  console.log("SS Key:", key);
  const { user } = useAuthStore.getState();
  console.log("user: ", user);
};

const killKey = async () => {
  SecureStore.deleteItemAsync("userAuthToken");
  console.log("killed key");
};

export default function LoginView({
  email,
  password,
  emailAndServerErrorMessage,
  passwordErrorMessage,
  isLoading,
  setEmail,
  setPassword,
  onForgotPasswordPress,
  onLoginPress,
  onSignUpPress,
}: LoginViewProps) {
  const { refreshAuth } = useAuthStore.getState();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Sign In</Text>

          <TouchableOpacity onPress={getKey}>
            <Text style={styles.signUpText}>Get token</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              killKey();
              refreshAuth();
            }}
          >
            <Text style={styles.signUpText}>kill key</Text>
          </TouchableOpacity>

          <LoginErrorMessage
            emailAndServerErrorMessage={emailAndServerErrorMessage}
            passwordErrorMessage={passwordErrorMessage}
          />

          <View style={styles.formContainer}>
            <View style={styles.inputSpacer}>
              <AnimatedInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="words"
                autocorrect={false}
              />
            </View>

            <View style={styles.inputSpacer}>
              <AnimatedInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                autoCapitalize="none"
                autocorrect={false}
              />
              <TouchableOpacity
                onPress={onForgotPasswordPress}
                style={styles.forgotPasswordLink}
              >
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={onLoginPress}
            style={styles.loginButton}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? "Logging In..." : "Log In"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onSignUpPress}>
            <Text style={styles.signUpText}>Need an account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E0E0E0",
    marginBottom: 48, // More space to separate from the form
    alignSelf: "flex-start", // Left-align for a cleaner look
  },

  formContainer: {
    width: "100%", // Take up full width of parent
    marginBottom: 32,
  },

  inputSpacer: {
    marginBottom: 20, // More space between inputs
  },

  forgotPasswordLink: {
    alignSelf: "flex-end", // Align the link to the right
    marginTop: 8,
  },

  forgotPasswordText: {
    color: "#B0B0B0", // A muted color for secondary text
  },

  loginButton: {
    backgroundColor: "#BB86FC", // Your accent color for buttons
    paddingVertical: 14,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },

  loginButtonText: {
    color: "#121212", // Dark text on a light background for contrast
    fontSize: 18,
    fontWeight: "bold",
  },

  signUpText: {
    color: "#E0E0E0", // Use the primary text color for the link
    textDecorationLine: "underline", // Add an underline for clarity
  },
});
