import { View, Text, StyleSheet } from "react-native";
import CurrentLocation from "../CurrentLocation";
import { cityDto } from "@features/reporting/dtos/Location";
import ReportEntryCard from "../ReportEntryCard";
import { LocationStatusProps } from "@features/reporting/dtos/Location";

interface Props {
  locationStatus: LocationStatusProps;
}

export default function UserDashboard({ locationStatus }: Props) {
  return (
    <View>
      <View>
        <CurrentLocation locationStatus={locationStatus} />
      </View>

      <View style={styles.ParkingReport}>
        <Text>Create Illegal Parking Report</Text>
      </View>

      <View style={styles.InfraReport}>
        <Text>Create City Infrastructure Report</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  ParkingReport: {
    backgroundColor: "blue",
  },

  InfraReport: { backgroundColor: "red" },
});
