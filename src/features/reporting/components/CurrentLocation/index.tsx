import { LocationStatusProps } from "@features/reporting/dtos";
import { View, StyleSheet } from "react-native";
import LocationDisplay from "./LocationDisplay";
import RefreshButton from "./RefreshButton";

interface Props {
  locationStatus: LocationStatusProps;
}

export default function CurrentLocation({ locationStatus }: Props) {
  return (
    <View style={[styles.card]}>
      <View style={styles.locationHeader}>
        <LocationDisplay
          currentCityData={locationStatus.currentCityData}
          isLoading={locationStatus.isLoading}
        />

        <RefreshButton
          cooldownTimer={locationStatus.cooldownTimer}
          isLoading={locationStatus.isLoading}
          getUserLocation={locationStatus.refreshLocation}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    margin: 8,
    // Subtle elevation (consistent with modern card design)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },

  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
});
