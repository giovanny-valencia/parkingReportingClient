import { View, Text, StyleSheet } from "react-native";
import CurrentLocation from "../common/CurrentLocation";
import { cityDto } from "@features/reporting/dtos/Location";

interface Props {
  currentLocation: cityDto | null;
  refreshLocation: () => void;
}

export default function UserDashboard({ currentLocation, refreshLocation }: Props) {
  return (
    <View>
      <View>
        <CurrentLocation currentLocation={currentLocation} refreshLocation={refreshLocation} />
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
