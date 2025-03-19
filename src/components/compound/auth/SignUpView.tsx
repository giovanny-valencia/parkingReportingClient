import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AnimatedInput from "@components/common/AnimatedInput";
import { useState } from "react";
import DateField from "@components/common/DateField";
import { FIELD_INDICES, FieldError } from "@constants/FieldErrorConstants";

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

      <View style={styles.inputFieldsAndErrorMessage}>
        <AnimatedInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        {error[FIELD_INDICES.firstName].message.length > 0 && (
          <Text style={styles.error}>
            {error[FIELD_INDICES.firstName].message}
          </Text>
        )}
      </View>

      <View style={styles.inputFieldsAndErrorMessage}>
        <AnimatedInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        {error[FIELD_INDICES.lastName].message.length > 0 && (
          <Text style={styles.error}>
            {error[FIELD_INDICES.lastName].message}
          </Text>
        )}
      </View>

      <View style={styles.inputFieldsAndErrorMessage}>
        <AnimatedInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {error[FIELD_INDICES.email].message.length > 0 && (
          <Text style={styles.error}>{error[FIELD_INDICES.email].message}</Text>
        )}
      </View>

      <View style={styles.inputFieldsAndErrorMessage}>
        <AnimatedInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        {error[FIELD_INDICES.password].message.length > 0 && (
          <Text style={styles.error}>
            {error[FIELD_INDICES.password].message}
          </Text>
        )}
      </View>

      <View style={styles.inputFieldsAndErrorMessage}>
        <AnimatedInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        {error[FIELD_INDICES.confirmPassword].message.length > 0 && (
          <Text style={styles.error}>
            {error[FIELD_INDICES.confirmPassword].message}
          </Text>
        )}
      </View>

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
  },
  label: {
    width: "100%",
    fontSize: 16,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  datePicker: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    justifyContent: "center",
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
  inputFieldsAndErrorMessage: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    marginBottom: 16,
  },
});
