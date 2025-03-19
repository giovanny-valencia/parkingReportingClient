import { StyleSheet, Text, View, ScrollView } from "react-native";
import AnimatedInput from "@components/common/AnimatedInput";
import { FieldError } from "@constants/FieldErrorConstants";

interface LoginFormProps {
  email: string;
  password: string;
  error: FieldError[];
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

export default function LoginView({
  email,
  password,
  error,
  setEmail,
  setPassword,
}: LoginFormProps) {
  const emailIndex = 0;
  const passwordIndex = 1;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>

      <View style={styles.input}>
        <AnimatedInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {error[emailIndex].message.length > 0 && (
          <Text style={styles.error}>{error[emailIndex].message}</Text>
        )}
      </View>

      <View style={styles.input}>
        <AnimatedInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />

        {error[passwordIndex].message.length > 0 && (
          <Text style={styles.error}>{error[passwordIndex].message}</Text>
        )}
      </View>
    </View>
  );
}

//styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F5F5F5",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  error: {
    alignItems: "flex-start",
    width: "100%",
    color: "red",
    fontSize: 12,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    marginBottom: 16,
  },
});
