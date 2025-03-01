import { StyleSheet, Text, View } from "react-native";
import InputField from "../../common/inputField";
import { InputType } from "../../common/inputField";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { FieldError } from "@/app/screens/homePage/signup";

interface SignUpFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string; // Align with string
  error: FieldError[];
  setFirstName: (text: string) => void;
  setLastName: (text: string) => void;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  setConfirmPassword: (text: string) => void;
  setDateOfBirth: (text: string) => void; // Align with string
}

export default function SignUpForm({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  dateOfBirth,
  error,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword,
}: // setDateOfBirth,
SignUpFormProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Your Account</Text>

      <InputField
        label={InputType.firstName}
        value={firstName}
        onChangeText={setFirstName}
      />

      <InputField
        label={InputType.lastName}
        value={lastName}
        onChangeText={setLastName}
      />

      <InputField
        label={InputType.email}
        value={email}
        onChangeText={setEmail}
      />

      <InputField
        label={InputType.password}
        value={password}
        onChangeText={setPassword}
      />

      <InputField
        label={InputType.confirmPassword}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <InputField
        label={InputType.dateOfBirth}
        value={dateOfBirth}
        onChangeText={(date: string) => {
          // resolve this later
        }}
      />
    </View>
  );
}

//styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 16,
  },
});
