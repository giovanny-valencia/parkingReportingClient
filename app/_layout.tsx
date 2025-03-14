import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

/**
 * The root layout for the app.
 * 
 * wraps the entire app in a query client provider, so that we can use react-query to fetch data from the backend.
 * 
 * @returns root layout for the app, stack navigator
 */
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
