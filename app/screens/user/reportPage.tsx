import ReportView from "@/app/components/compound/userForms/ReportView";
import { View, Text, StyleSheet } from "react-native";
/**
 * The logic for the report page.
 *
 * handles the responsibility of:
 * 1. displaying the report page form
 * 2. check permission settings, must allow location and camera (if fail, display alert)
 * 3. handle validation messages from backend (if fail, display alert)
 *
 * @returns
 */

export default function ReportPage() {
  return (
    <View style={styles.container}>
      <ReportView></ReportView>
    </View>
  );
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});
