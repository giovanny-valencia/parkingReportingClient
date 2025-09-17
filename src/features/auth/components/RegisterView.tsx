import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { appStyles } from "@common/styles/appStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedInput from "@common/components/AnimatedInput";
import DateField from "@common/components/DateField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import { ROUTES } from "@common/constants/routes";

interface RegistrationProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: any;
  date: Date;
  setFirstName: (text: string) => void;
  setLastName: (text: string) => void;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  setConfirmPassword: (text: string) => void;
  setDate: (date: Date) => void;
}

/**
 * UI for the registration page
 *
 * @param param0 - State variables and state setters for the user registration
 * @returns View - UI for the registration page
 */

export default function RegisterView({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  error,
  date,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setDate,
}: RegistrationProps) {
  return (
    <SafeAreaView style={[appStyles.safeAreaContainer]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formWrapper}>
            <Text style={[appStyles.title, { marginBottom: 24 }]}>Create an account</Text>

            <View style={styles.inputSpacer}>
              <AnimatedInput
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                keyboardType="default"
                autoCapitalize="words"
                autocorrect={true}
              />
            </View>

            <View style={styles.inputSpacer}>
              <AnimatedInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                keyboardType="default"
                autoCapitalize="words"
                autocorrect={true}
              />
            </View>

            <View style={styles.inputSpacer}>
              <AnimatedInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autocorrect={false}
              />
            </View>

            <View style={styles.inputSpacer}>
              <AnimatedInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={true}
                autocorrect={false}
              />
            </View>

            <View style={styles.inputSpacer}>
              <AnimatedInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={true}
                autocorrect={false}
              />
            </View>

            <View style={styles.inputSpacer}>
              <Text style={[appStyles.title, { fontSize: 24, marginBottom: 8 }]}>
                Date of Birth
              </Text>
              <DateField value={date} onChange={(selectedDate) => setDate(selectedDate)} />
            </View>

            <TouchableOpacity
              style={appStyles.submitButton}
              onPress={() => {
                console.log("clicked Register");
              }}
              disabled={true}
            >
              <Text style={appStyles.submitButtonText}>Register Account</Text>
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
    marginBottom: 20,
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
    marginTop: 20,
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
});
