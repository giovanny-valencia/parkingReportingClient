import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack, router, useFocusEffect } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "@features/auth/store/useAuthStore";
import { use, useEffect } from "react";
import { View, Text } from "react-native";
import { UserJwtPayload, UserDto } from "@features/auth/dtos/Auth";
import { jwtDecode } from "jwt-decode";
import { ROUTES } from "@common/constants/routes";
import { mapJwtPayloadToUserDto } from "@features/auth/utils/authMapper";
import React from "react";

const queryClient = new QueryClient();

/**
 * The root layout for the app.
 *
 * wraps the entire app in a query client provider, so that we can use react-query to fetch data from the backend.
 *
 * @returns root layout for the app, stack navigator
 */
export default function ProtectedLayout() {
  const { token, user, checkIfSessionExpired, refreshAuth } =
    useAuthStore.getState();

  console.log("protected layout");

  if (!user) {
    console.log("this was reached, user null");
  }

  // Combined effect to handle initial authentication check and navigation.
  // useEffect(() => {
  //   const loadTokenAndNavigate = async () => {
  //     try {
  //       const storedToken = await SecureStore.getItemAsync("userAuthToken");

  //       if (storedToken) {
  //         console.log("found token: ", storedToken);
  //         const decodedJwt = jwtDecode(storedToken) as UserJwtPayload;
  //         const user: UserDto = mapJwtPayloadToUserDto(decodedJwt);
  //         console.log("user: ", user);
  //         setAuth(storedToken, user);

  //         // Now navigate based on the loaded user role
  //         if (user?.role === "USER") {
  //           router.replace(ROUTES.USER_DASHBOARD);
  //         } else {
  //           // Handle other roles or default to login
  //           router.replace(ROUTES.LOGIN);
  //         }
  //       } else {
  //         // No token found, redirect to login
  //         router.replace(ROUTES.LOGIN);
  //       }
  //     } catch (error) {
  //       console.error("Failed to load auth token from secure store", error);
  //       clearAuth();
  //       router.replace(ROUTES.LOGIN);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   loadTokenAndNavigate();
  // }, [setAuth, clearAuth, setIsLoading]);

  // // Use useFocusEffect to check auth status whenever this screen is focused.
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Check if the token is still valid. If not, the store's clearAuth() will be called.
  //     checkIfSessionExpired();

  //     // If the token is null or becomes null, redirect to the login screen.
  //     if (!token) {
  //       // Use router.replace to prevent going back to the protected route
  //       router.replace("/(auth)/login");
  //     }
  //   }, [token, checkIfSessionExpired])
  // );

  // // Show a loading screen while the app is checking for the token.
  // if (isLoading) {
  //   // You could replace this with a custom splash screen component.
  //   return (
  //     <View>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

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
