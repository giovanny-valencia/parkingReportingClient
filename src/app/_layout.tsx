import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import this
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <Stack
            screenOptions={{
              headerShown: false,
              title: "",
              headerStyle: { backgroundColor: "black" },
            }}
          />
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
