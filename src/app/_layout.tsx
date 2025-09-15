import { useAuthStore } from "@features/auth/store/useAuthStore";
import { router } from "expo-router"; // Import router
import { useEffect, useState } from "react";
import { StatusBar, View, Text, ActivityIndicator } from "react-native";
import { ROUTES } from "@common/constants/routes";
import { Stack } from "expo-router"; // Re-import Stack for the final layout structure

export default function RootLayout() {
  const [isInitializing, setIsInitializing] = useState(true);
  const { user, refreshAuth } = useAuthStore();
  console.log("app start layout");

  // This effect handles the initial authentication check on app load.
  useEffect(() => {
    async function loadAuth() {
      await refreshAuth();
      setIsInitializing(false);
    }
    loadAuth();
  }, [refreshAuth]);

  // This effect handles the navigation once the user state changes.
  useEffect(() => {
    if (!isInitializing) {
      if (user) {
        // If the user logs in, navigate to the protected dashboard.
        router.replace(ROUTES.USER_DASHBOARD);
      } else {
        // If the user logs out or is not logged in, navigate to the login screen.
        router.replace(ROUTES.LOGIN);
      }
    }
  }, [isInitializing, user]);

  // Show a loading screen while the authentication state is being initialized.
  if (isInitializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Once the app is initialized, this layout will simply render the
  // children routes. The `useEffect` above handles all navigation.
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
