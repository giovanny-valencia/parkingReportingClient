import { Stack } from "expo-router";

export default function HomePageLayout() {
  return (
    <Stack>
      <Stack.Screen name="loginPage" options={{ headerShown: false }} />
      <Stack.Screen
        name="forgotPasswordPage"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="signUpPage" options={{ headerShown: false }} />
    </Stack>
  );
}
 