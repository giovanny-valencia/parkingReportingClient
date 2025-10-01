import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { appStyles } from "@common/styles/appStyles";
import AnimatedInput from "common/components/AnimatedInput";
import LoginErrorMessage from "./LoginErrorMessage";

import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "../stores/useAuthStore";
import { LoginCredentialsDto } from "../dtos/Auth";

interface LoginViewProps {
  loginDto: LoginCredentialsDto;
  emailAndServerErrorMessage: string;
  passwordErrorMessage: string;
  isLoading: boolean;
  onInputChange: (field: keyof LoginCredentialsDto, email: string) => void;
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
  loginDto,
  emailAndServerErrorMessage,
  passwordErrorMessage,
  isLoading,
  onInputChange,
  onForgotPasswordPress,
  onLoginPress,
  onSignUpPress,
}: LoginViewProps) {
  const { refreshAuth } = useAuthStore.getState();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={appStyles.safeAreaContainer}>
        <View style={appStyles.contentContainer}>
          <Text style={appStyles.title}>Sign In</Text>

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
                value={loginDto.email}
                onChangeText={(text: string) => onInputChange("email", text)}
                keyboardType="email-address"
                autoCapitalize="words"
                autocorrect={false}
              />
            </View>

            <View style={styles.inputSpacer}>
              <AnimatedInput
                placeholder="Password"
                value={loginDto.password}
                onChangeText={(text: string) => onInputChange("password", text)}
                secureTextEntry={true}
                autoCapitalize="none"
                autocorrect={false}
              />
              <TouchableOpacity onPress={onForgotPasswordPress} style={styles.forgotPasswordLink}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={onLoginPress}
            style={appStyles.submitButton}
            disabled={isLoading}
          >
            <Text style={appStyles.submitButtonText}>{isLoading ? "Logging In..." : "Log In"}</Text>
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

  signUpText: {
    color: "#E0E0E0", // Use the primary text color for the link
    textDecorationLine: "underline", // Add an underline for clarity
  },
});
