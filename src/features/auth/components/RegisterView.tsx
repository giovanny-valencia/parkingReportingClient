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
      <KeyboardAwareScrollView contentContainerStyle={appStyles.contentContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formWrapper}>
            <Text style={appStyles.title}>Register Page</Text>

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
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputSpacer: {
    marginBottom: 20, // More space between inputs
  },

  formWrapper: {
    width: "100%", // Take up full width of parent
    marginBottom: 32,
  },
  signInWrapper: {
    marginTop: 20, // Add space above the text
    flexDirection: "row", // Align the children horizontally
    justifyContent: "center", // Center the content
    alignItems: "center",
  },
  signInText: {
    color: "#E0E0E0",
  },
  signInLink: {
    color: "#BB86FC",
  },
});
