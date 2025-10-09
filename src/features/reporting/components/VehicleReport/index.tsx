import { appStyles } from "@common/styles/appStyles";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VehicleReport() {
  return (
    <SafeAreaView style={appStyles.safeAreaContainer}>
      <Text style={{ backgroundColor: "green" }}>Report Page</Text>
    </SafeAreaView>
  );
}
