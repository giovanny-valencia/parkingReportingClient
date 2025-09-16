import { Stack } from "expo-router";

export default function AuthLayout() {
  console.log("auth layout");

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgotPassword" />
    </Stack>
  );
}
