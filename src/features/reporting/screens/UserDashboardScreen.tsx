import { useAuthStore } from "@features/auth/store/useAuthStore";
import { View, Text, TouchableOpacity } from "react-native";
import { appStyles } from "@common/styles/appStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

export default function UserDashboardScreen() {
  const { user } = useAuthStore();
  return (
    <SafeAreaView style={appStyles.safeAreaContainer}>
      <View>
        <View style={{ backgroundColor: "red", alignItems: "center" }}>
          <Text>User Dashboard Screen</Text>
          <Text>
            {user?.email}, {user?.role}, {user?.exp}{" "}
          </Text>

          <TouchableOpacity
            style={{ backgroundColor: "green" }}
            onPress={() => {
              SecureStore.deleteItemAsync("userAuthToken");
              useAuthStore.getState().refreshAuth();
            }}
          >
            <Text style={{ fontWeight: "bold" }}>kill key</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
