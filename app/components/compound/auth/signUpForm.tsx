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
import DateField from "@/app/components/common/DateField";
import { FIELD_INDICES } from "../../../screens/homePage/signUp";

interface SignUpFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: FieldError[];
  date: Date;
  setFirstName: (text: string) => void;
  setLastName: (text: string) => void;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  setConfirmPassword: (text: string) => void;
  setDate: (date: Date) => void;
}

export default function SignUpForm({
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
      {error[FIELD_INDICES.firstName].message.length > 0 && (
        <Text style={styles.error}>
          {error[FIELD_INDICES.firstName].message}
        </Text>
      )}

      <InputField
        label={InputType.lastName}
        value={lastName}
        onChangeText={setLastName}
      />
      {error[FIELD_INDICES.lastName].message.length > 0 && (
        <Text style={styles.error}>
          {error[FIELD_INDICES.lastName].message}
        </Text>
      )}

      <InputField
        label={InputType.email}
        value={email}
        onChangeText={setEmail}
      />
      {error[FIELD_INDICES.email].message.length > 0 && (
        <Text style={styles.error}>{error[FIELD_INDICES.email].message}</Text>
      )}

      <InputField
        label={InputType.password}
        value={password}
        onChangeText={setPassword}
      />
      {error[FIELD_INDICES.password].message.length > 0 && (
        <Text style={styles.error}>
          {error[FIELD_INDICES.password].message}
        </Text>
      )}

      <InputField
        label={InputType.confirmPassword}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {error[FIELD_INDICES.confirmPassword].message.length > 0 && (
        <Text style={styles.error}>
          {error[FIELD_INDICES.confirmPassword].message}
        </Text>
      )}

      <Text style={styles.label}>Date of Birth:</Text>
      <DateField
        value={date}
        onChange={(selectedDate) => setDate(selectedDate)}
      />
      {error[FIELD_INDICES.dateOfBirth].message.length > 0 && (
        <Text style={styles.error}>
          {error[FIELD_INDICES.dateOfBirth].message}
        </Text>
      )}
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
});
