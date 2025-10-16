import { appStyles } from "@common/styles/appStyles";
import { StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Loading() {
  return (
    <SafeAreaView style={[appStyles.safeAreaContainer, styles.container]}>
      <ActivityIndicator size={"large"} color="white" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
  },
});
