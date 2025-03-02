import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import InputField from "../../common/inputField";
import { InputType } from "../../common/inputField";
import { FieldError } from "../../../screens/homePage/signUp";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker"; // For month dropdown

interface SignUpFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: FieldError[];

  month: number | string;
  day: number | string;
  year: number | string;

  setFirstName: (text: string) => void;
  setLastName: (text: string) => void;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  setConfirmPassword: (text: string) => void;

  setMonth: (month: number | string) => void;
  setDay: (day: number | "") => void;
  setYear: (year: number | string) => void;
}

interface Month {
  index: number ;
  name: string;
}

const MONTHS = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const months: Month[] = Object.entries(MONTHS).map(([name, index]) => ({
  index,
  name,
}));

export default function SignUpForm({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  error,

  month,
  day,
  year,

  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword,

  setMonth,
  setDay,
  setYear,
}: SignUpFormProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

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
  label: {
    width: "100%",
    fontSize: 16,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  monthBox: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "45%",
    marginBottom: 15,
  },
  dayBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
    marginBottom: 15,
  },
});
