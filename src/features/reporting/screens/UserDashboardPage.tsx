import { useAuthStore } from "@features/auth/stores/useAuthStore";
import { View, Text, TouchableOpacity } from "react-native";
import { appStyles } from "@common/styles/appStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import useDashboard from "../hooks/useDashboard";
import UserDashboard from "../components/UserDashboard";

export default function UserDashboardPage() {
  const { user } = useAuthStore();
  const { locationStatus } = useDashboard();
  return <UserDashboard locationStatus={locationStatus} />;
}
