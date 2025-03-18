import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router, useRouter } from "expo-router"; // Import useRouter

function handleBack() {
  router.back(); // Go back to the previous screen
}

export default function ForgotPasswordScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Automated process not yet built, send us a quick email at:{" "}
      </Text>
      <Text></Text>
      <Text style={styles.text}> "passwordReset@placeHolder.com "</Text>

      <TouchableOpacity onPress={handleBack} style={styles.button}>
        <Text style={styles.boxText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up full screen height
    justifyContent: "center", // Centers vertically
    alignItems: "center", // Centers horizontally
    marginHorizontal: 20, // Optional: adds space on the sides
  },
  text: {
    fontSize: 18, // Optional: make it more readable
  },
  button: {
    borderWidth: 2,
    borderColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20, // Space above the button
  },
  boxText: {
    color: "#007AFF", // Blue text to match outline
    fontSize: 16,
    fontWeight: "bold",
  },
});
