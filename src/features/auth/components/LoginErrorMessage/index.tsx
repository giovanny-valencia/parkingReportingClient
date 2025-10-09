import { View, Text, StyleSheet } from "react-native";
import React from "react";

/**
 * LoginErrorMessage Component
 *
 * Displays error messages for the login form. Each error message
 * is rendered on a new line with a distinct error style.
 * @param {string} emailAndServerErrorMessage - The error message for the email field or a server error.
 * @param {string} passwordErrorMessage - The error message for the password field.
 *
 */
interface LoginErrorMessageProps {
  emailAndServerErrorMessage: string;
  passwordErrorMessage: string;
}

export default function LoginErrorMessage({
  emailAndServerErrorMessage,
  passwordErrorMessage,
}: LoginErrorMessageProps) {
  return (
    <View style={styles.componentContainer}>
      {emailAndServerErrorMessage || passwordErrorMessage ? (
        <View style={styles.errorContainer}>
          {emailAndServerErrorMessage ? (
            <Text style={styles.errorText}>{emailAndServerErrorMessage}</Text>
          ) : null}
          {passwordErrorMessage ? (
            <Text style={styles.errorText}>{passwordErrorMessage}</Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  componentContainer: {
    width: "100%",
  },
  errorContainer: {
    backgroundColor: "#2C1D1D",
    borderColor: "#E53E3E",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  errorText: {
    color: "#E53E3E",
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
});
