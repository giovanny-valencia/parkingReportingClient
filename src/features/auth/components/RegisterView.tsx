import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { appStyles } from "@common/styles/appStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedInput from "@common/components/AnimatedInput";
import DateField from "@common/components/DateField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import { ROUTES } from "@common/constants/routes";
import { ErrorIndex, ErrorMessage } from "../utils/registrationErrorUtils";
import { Checkbox } from "react-native-paper";
import { useEffect, useRef } from "react";
import { RegistrationInputs } from "../dtos/Auth";

interface RegisterProps {
  registrationForm: RegistrationInputs;
  error: ErrorMessage[];
  isLoading: boolean;
  onInputChange: (field: keyof RegistrationInputs, value: string | Date | boolean) => void;
  onRegisterPress: () => void;
}

/**
 * UI for the registration page
 *
 * @param params - State variables and state setters for the user registration
 * @returns View - UI for the registration page
 */

export default function RegisterView({
  registrationForm,
  error,
  isLoading,
  onInputChange,
  onRegisterPress,
}: RegisterProps) {
  const scrollViewRef = useRef<KeyboardAwareScrollView | null>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd(true);
    }
  }, [error]);

  return (
    <SafeAreaView style={[appStyles.safeAreaContainer]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          indicatorStyle="white" // iOS scrollbar; Android cannot be controlled unfortunately.
          innerRef={(ref) => {
            scrollViewRef.current = ref;
          }}
        >
          <View style={styles.formWrapper}>
            <Text style={[appStyles.title, { marginBottom: 24 }]}>Create an account</Text>

            <View style={styles.inputSpacer}>
              <AnimatedInput
                placeholder="First Name"
                value={registrationForm.firstName}
                onChangeText={(text: string) => onInputChange("firstName", text)}
                keyboardType="default"
                autoCapitalize="words"
                autocorrect={true}
              />
              {error[ErrorIndex.FIRST_NAME].message.length > 0 && !isLoading && (
                <Text style={styles.errorText}>{error[ErrorIndex.FIRST_NAME].message}</Text>
              )}
            </View>

            <View style={styles.inputSpacer}>
              <AnimatedInput
                placeholder="Last Name"
                value={registrationForm.lastName}
                onChangeText={(text: string) => onInputChange("lastName", text)}
                keyboardType="default"
                autoCapitalize="words"
                autocorrect={true}
              />
              {error[ErrorIndex.LAST_NAME].message.length > 0 && !isLoading && (
                <Text style={styles.errorText}>{error[ErrorIndex.LAST_NAME].message}</Text>
              )}
            </View>

            <View style={styles.inputSpacer}>
              <AnimatedInput
                placeholder="Email"
                value={registrationForm.email}
                onChangeText={(text: string) => onInputChange("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autocorrect={false}
              />

              {error[ErrorIndex.EMAIL].message.length > 0 && !isLoading && (
                <Text style={styles.errorText}>{error[ErrorIndex.EMAIL].message}</Text>
              )}
            </View>

            <View style={styles.inputSpacer}>
              <AnimatedInput
                placeholder="Password"
                value={registrationForm.password}
                onChangeText={(text: string) => onInputChange("password", text)}
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={true}
                autocorrect={false}
              />
              {error[ErrorIndex.PASSWORD].message.length > 0 && !isLoading && (
                <View>
                  {error[ErrorIndex.PASSWORD].message.map((message, index) => (
                    <Text key={index} style={styles.errorText}>
                      {message}
                    </Text>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.inputSpacer}>
              <AnimatedInput
                placeholder="Confirm Password"
                value={registrationForm.confirmPassword}
                onChangeText={(text: string) => onInputChange("confirmPassword", text)}
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={true}
                autocorrect={false}
              />
              {error[ErrorIndex.CONFIRM_PASSWORD].message.length > 0 && !isLoading && (
                <Text style={styles.errorText}>{error[ErrorIndex.CONFIRM_PASSWORD].message}</Text>
              )}
            </View>

            <View style={styles.inputSpacer}>
              <Text style={[appStyles.title, { fontSize: 24, marginBottom: 8 }]}>
                Date of Birth
              </Text>
              <DateField
                value={registrationForm.dateOfBirth}
                onChange={(selectedDate: Date) => onInputChange("dateOfBirth", selectedDate)}
              />

              {error[ErrorIndex.DATE_OF_BIRTH].message.length > 0 && !isLoading && (
                <Text style={styles.errorText}>{error[ErrorIndex.DATE_OF_BIRTH].message}</Text>
              )}
            </View>

            <View style={styles.inputSpacer}>
              <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                <Checkbox.Android
                  status={registrationForm.agreedToTerms ? "checked" : "unchecked"}
                  onPress={() => onInputChange("agreedToTerms", !registrationForm.agreedToTerms)}
                />
                <Text style={styles.signInText}>Agree to Terms of Service</Text>
              </View>
              {error[ErrorIndex.AGREED_TO_TOS].message.length > 0 && !isLoading && (
                <Text style={styles.errorText}>{error[ErrorIndex.AGREED_TO_TOS].message}</Text>
              )}
            </View>

            <TouchableOpacity
              style={appStyles.submitButton}
              onPress={onRegisterPress}
              disabled={isLoading}
            >
              <Text style={appStyles.submitButtonText}>
                {isLoading ? "Processing..." : "Register Account"}
              </Text>
            </TouchableOpacity>

            <View style={styles.signInWrapper}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => (router.canGoBack() ? router.back() : router.replace(ROUTES.LOGIN))}
              >
                <Text style={styles.signInLink}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputSpacer: {
    marginBottom: 15,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  formWrapper: {
    marginTop: 25,
    width: "100%",
    marginBottom: 32,
  },
  signInWrapper: {
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    color: "#E0E0E0",
  },
  signInLink: {
    color: "#BB86FC",
  },

  errorText: {
    color: "red",
  },
});
