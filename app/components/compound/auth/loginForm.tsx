import { StyleSheet, Text, View } from "react-native";
import InputField from "../../common/inputField";
import { InputType } from "../../common/inputField";
import { errorIndex } from "@/app/screens/homePage/login";

interface LoginFormProps {
  email: string;
  password: string;
  error: errorIndex[];
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

export default function LoginForm({
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

      <InputField
        label={InputType.email}
        value={email}
        onChangeText={setEmail}
      />

      {error[emailIndex].message.length > 0 && (
        <Text style={styles.error}>{error[emailIndex].message}</Text>
      )}

      <InputField
        label={InputType.password}
        value={password}
        onChangeText={setPassword}
      />

      {error[passwordIndex].message.length > 0 && (
        <Text style={styles.error}>{error[passwordIndex].message}</Text>
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
});
