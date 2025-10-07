import { View, StyleSheet, Text } from "react-native";
import CurrentLocation from "../CurrentLocation";
import ReportEntryCard from "../ReportEntryCard";
import { LocationStatusProps } from "@features/reporting/dtos";
import { ServiceAction, SupportAction } from "@features/reporting/constants";
import SupportEntry from "../SupportEntryCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { appStyles } from "@common/styles/appStyles";

interface Props {
  locationStatus: LocationStatusProps;
}
//TODO: not the prettiest of UIs
export default function UserDashboard({ locationStatus }: Props) {
  return (
    <SafeAreaView style={[appStyles.safeAreaContainer, styles.container]}>
      {/* Current Location */}
      <CurrentLocation locationStatus={locationStatus} />

      {/* Reports Group */}
      <View style={styles.mainContent}>
        <View style={styles.reportContainer}>
          <Text style={styles.supportHeader}>CREATE A NEW REPORT</Text>

          <ReportEntryCard type={ServiceAction.VehicleReport} isServiceSupported={true} />

          <ReportEntryCard type={ServiceAction.InfrastructureReport} isServiceSupported={false} />
        </View>
      </View>

      {/* Support Group - This remains the second child, pinned to the bottom */}
      <View style={styles.supportContainer}>
        <Text style={styles.supportHeader}>SUPPORT & HELP</Text>
        <View>
          <SupportEntry supportType={SupportAction.GuideAndFAQ} />
        </View>
        <View>
          <SupportEntry supportType={SupportAction.Account} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },

  mainContent: {
    gap: 15,
  },

  topContent: {
    gap: 15, // Adds spacing between the cards
  },

  reportContainer: {
    marginTop: 35,
    gap: 10,
  },

  supportHeader: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#F3F4F6", // Soft off-white against the dark background
    textTransform: "uppercase",
    marginBottom: 4, // Spacing below the header
  },

  supportContainer: {
    gap: 8, // Adds space between the two support entries
    marginTop: 10, // Add some distance from the cards above it
    marginBottom: 50,
  },
});
