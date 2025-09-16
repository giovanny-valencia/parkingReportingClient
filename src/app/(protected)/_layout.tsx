import { Stack } from "expo-router";

export default function ProtectedLayout() {
  console.log("protected layout");

  return (
    <Stack
      screenOptions={{ headerShown: false, headerStyle: { backgroundColor: "orange" } }} // color for testing
    ></Stack>
  );
}
