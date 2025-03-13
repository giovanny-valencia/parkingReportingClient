import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// include screens folder stacks here as well, to disable headerShown. See line 8
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="screens/homePage"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="screens/user" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
