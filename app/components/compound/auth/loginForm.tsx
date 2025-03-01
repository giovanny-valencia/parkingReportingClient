import { StyleSheet, Text, View } from "react-native";
import InputField from "../../common/inputField";
import { InputType } from "../../common/inputField";

interface LoginFormProps {
  email: string;
  password: string;
  error: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  // setError: (error: string) => void;
}

export default function LoginForm({
  email,
  password,
  error,
  setEmail,
  setPassword,
}: // setError,
LoginFormProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>

      <InputField
        label={InputType.email}
        value={email}
        onChangeText={setEmail}
      />

      {error && error.length > 0 && <Text style={styles.error}>{error}</Text>}

      <InputField
        label={InputType.password}
        value={password}
        onChangeText={setPassword}
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
});
