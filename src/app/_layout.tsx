import { useAuthStore } from "@features/auth/store/useAuthStore";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { Stack } from "expo-router";
import GlobalProviders from "@common/providers/GlobalProviders";

export default function RootLayout() {
  const { refreshAuth, user } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);
  const isLoggedIn = user ? true : false;

  console.log("app start layout");

  useEffect(() => {
    if (isInitializing) {
      refreshAuth();
      setIsInitializing(false);
    }
  }, [refreshAuth]);

  return (
    <GlobalProviders>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(protected)" />
        </Stack.Protected>
      </Stack>
    </GlobalProviders>
  );
}
