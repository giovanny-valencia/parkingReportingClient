import { Stack } from "expo-router";

// <Stack.Screen name="signup" options={{ title: "" }} />
export default function HomePageLayout() {
  return (
    <Stack>
      <Stack.Screen name="userHome" options={{ headerShown: false }} />
      <Stack.Screen name="reportPage" options={{ headerShown: false }} />
    </Stack>
  );
}
