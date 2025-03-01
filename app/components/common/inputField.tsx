import { useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardTypeOptions,
  TouchableOpacity,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

export enum InputType {
  email = "Email",
  password = "Password",
  firstName = "First Name",
  lastName = "Last Name",
  dateOfBirth = "Date of Birth",
  phoneNumber = "Phone Number",
  confirmPassword = "Confirm Password",
}

export interface InputFieldProps {
  label: InputType; // label for the input field, e.g., "Email" or "Password"
  value: string; // value of the input field to display to user
  onChangeText: (text: string) => void; // Always expects a string
}

const renderers: Record<InputType, (props: InputFieldProps) => JSX.Element> = {
  [InputType.email]: renderDefaultField,
  [InputType.password]: renderDefaultField,
  [InputType.firstName]: renderDefaultField,
  [InputType.lastName]: renderDefaultField,
  [InputType.phoneNumber]: renderDefaultField,
  [InputType.dateOfBirth]: renderDateField,
  [InputType.confirmPassword]: renderDefaultField,
};

const keyboardTypes: Record<InputType, KeyboardTypeOptions> = {
  [InputType.email]: "email-address",
  [InputType.password]: "default",
  [InputType.firstName]: "default",
  [InputType.lastName]: "default",
  [InputType.dateOfBirth]: "numeric", // resolve this later
  [InputType.phoneNumber]: "phone-pad",
  [InputType.confirmPassword]: "default",
};

function renderDefaultField({ label, value, onChangeText }: InputFieldProps) {
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder={label.toLowerCase()} // placeholder based on label
        placeholderTextColor={"grey"} // placeholder color
        value={value} // value of the input field
        onChangeText={onChangeText} // Pass the function directly
        keyboardType={keyboardTypes[label]} // keyboardType based on label
        secureTextEntry={label === InputType.password || label === InputType.confirmPassword} // secureTextEntry for password
        autoCapitalize={label === InputType.password ? "none" : "words"} // autoCapitalize for non-password fields
      />
    </>
  );
}

function renderDateField({ label, value, onChangeText }: InputFieldProps) {
  const [showPicker, setShowPicker] = useState(false);

  // Use DateTimePickerEvent instead of Event, ***fix later
  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      onChangeText(selectedDate.toLocaleDateString("en-US"));
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          style={styles.input}
          placeholder={"MM/DD/YYYY"}
          value={value}
          editable={false}
        />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default" // or 'spinner', 'calendar', 'clock'
          onChange={onDateChange}
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
        />
      )}
    </>
  );
}

export default function InputField(props: InputFieldProps) {
  const render = renderers[props.label];
  return (
    <View>
      <Text style={styles.label}>{props.label}:</Text>
      {render(props)}
    </View>
  );
}

// styles for the input field
const styles = StyleSheet.create({
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
