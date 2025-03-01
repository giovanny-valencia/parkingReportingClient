import {
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  TextInput,
  View,
} from "react-native";
import { router, useRouter } from "expo-router"; // Import useRouter
import { useState } from "react";

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(""); // use a more suitable type for date

  function handleFirstNameChange(text: string) {
    setFirstName(text);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Text>Sign Up</Text>
        <Text>First Name: </Text>
        <TextInput
          placeholder="First name"
          value={firstName}
          onChangeText={handleFirstNameChange} // Pass the function directly
          keyboardType="name-phone-pad"
          autoCapitalize="words"
        />
        <Text>Last Name: </Text>
        <TextInput
          placeholder="Last name"
          value={lastName}
          onChangeText={(text) => setLastName(text)} // Pass the function directly
          keyboardType="name-phone-pad"
          autoCapitalize="words"
        />
        <Text>Email: </Text>
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={setEmail} // Pass the function directly
          keyboardType="email-address"
          autoCapitalize="none"
        />
        // Add a date picker for date of birth
        <Text>Password: </Text>
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword} // Pass the function directly
          secureTextEntry
          autoCapitalize="none"
        />
        <Text>Confirm Password: </Text>
        <TextInput
          placeholder="confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword} // Pass the function directly
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity>
          <Text>Create Account</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );

  /**
   * surface level validation for user input:
   * - check if all fields are filled
   * - does password and confirm password match
   * - is password strong enough (pass criteria)
   * - is date of birth valid (in the past, valid date, over 18 years from today)
   * - is email valid and not already registered //backend validation
   * - is user not already registered //backend validation
   */

  // validate email
  function validateEmail(email: string) {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  }
}
