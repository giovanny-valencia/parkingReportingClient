import { View, Text, StyleSheet } from "react-native";
import { router, useRouter } from "expo-router"; // Import useRouter

export default function ForgotPasswordScreen() {
    return <View style={styles.container}>
        <Text style={styles.text}>Automated process not yet built, send us a quick email at: </Text>
        <Text></Text>
        <Text style={styles.text}> "passwordReset@placeHolder.com "</Text>
  </View>;
}

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up full screen height
    justifyContent: "center", // Centers vertically
    alignItems: "center", // Centers horizontally
  },
  text: {
    fontSize: 18, // Optional: make it more readable
  },
});
