import { useAuthStore } from "@features/auth/store/useAuthStore";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

export default function UserDashboardScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>User Dashboard Screen</Text>

        <TouchableOpacity
          onPress={() => {
            SecureStore.deleteItemAsync("userAuthToken");
            useAuthStore.getState().refreshAuth();
          }}
        >
          <Text>kill key</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
