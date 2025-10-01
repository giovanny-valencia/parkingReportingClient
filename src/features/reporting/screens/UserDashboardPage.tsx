import { useAuthStore } from "@features/auth/stores/useAuthStore";
import { View, Text, TouchableOpacity } from "react-native";
import { appStyles } from "@common/styles/appStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import useDashboard from "../hooks/useDashboard";

export default function UserDashboardPage() {
  const { user } = useAuthStore();
  const { isLoading } = useDashboard();
  return (
    <SafeAreaView style={appStyles.safeAreaContainer}>
      <View>
        {/* junk */}
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
        {/* junk */}
      </View>
    </SafeAreaView>
  );
}
