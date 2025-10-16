import { appStyles } from "@common/styles/appStyles";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useVehicleReport from "./useVehicleReport";
import Loading from "./Loading";
import FirstForm from "./FirstForm/";
import ProgressBar from "./ProgressBar";

export default function VehicleReport() {
  const { ReportLocationRefresh, Store } = useVehicleReport();

  if (ReportLocationRefresh.isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={appStyles.safeAreaContainer}>
      {Store.currentStep === 1 && <FirstForm />}
      <ProgressBar />
      <View>
        <Text style={{ color: "red" }}>Back</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
