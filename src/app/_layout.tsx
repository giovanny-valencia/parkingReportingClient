import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack, router } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "@features/auth/store/useAuthStore";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { UserJwtPayload, UserDto } from "@features/auth/dtos/Auth";
import { jwtDecode } from "jwt-decode";

const queryClient = new QueryClient();

/**
 * The root layout for the app.
 *
 * wraps the entire app in a query client provider, so that we can use react-query to fetch data from the backend.
 *
 * @returns root layout for the app, stack navigator
 */
export default function RootLayout() {
  const { setAuth, clearAuth, token, user, setIsLoading, isLoading } =
    useAuthStore();

  // Combined effect to handle initial authentication check and navigation.
  useEffect(() => {
    const loadTokenAndNavigate = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("userAuthToken");

        if (storedToken) {
          console.log("found token: ", storedToken);
          const decodedJwt = jwtDecode(storedToken) as UserJwtPayload;
          const user: UserDto = {
            userId: decodedJwt.userId,
            email: decodedJwt.sub,
            role: decodedJwt.role,
          };
          console.log("user: ", user);
          setAuth(storedToken, user);

          // Now navigate based on the loaded user role
          if (user?.role === "USER") {
            router.replace("/reporting/userDashboard");
          } else {
            // Handle other roles or default to login
            router.replace("/auth/login");
          }
        } else {
          // No token found, redirect to login
          router.replace("/auth/login");
        }
      } catch (error) {
        console.error("Failed to load auth token from secure store", error);
        clearAuth();
        router.replace("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };
    loadTokenAndNavigate();
  }, [setAuth, clearAuth, setIsLoading]);

  // Show a loading screen while the app is checking for the token.
  if (isLoading) {
    // You could replace this with a custom splash screen component.
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

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
