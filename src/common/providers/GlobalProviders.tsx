import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    //TODO: potentially replace SafeAreaView wth this provider
    // <SafeAreaProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
    // </SafeAreaProvider>
  );
}
