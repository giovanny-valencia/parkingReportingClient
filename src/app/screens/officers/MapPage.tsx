import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import MapView, { MAP_TYPES, Marker } from "react-native-maps";
import { Polygon } from "react-native-maps";
import { useNavigation } from "expo-router";
import { useLocationData } from "@hooks/screens/user/ReportPage/useLocationData";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

/**
 * The screen for the officer map view.
 *
 * Displays the officer's current location.
 * API requests active reports by sending (their officerID, latitude, longitude, radius request).
 * on response will then populate "map pins" which contain the reportID and pin them on the map by lat long coords.
 * On pin select, will request the full report from the API by sending the reportID,
 * on response a slider (slide up) will open which contains the full report contents.
 * Selecting "start" on the report slider will result in live navigation.
 */
export default function MapPage() {
  // Location hooks
  const { isLocationGranted, isRequestGranted, currentLocation, isLoading } =
    useLocationData();

  const [region, setRegion] = useState({
    latitude: currentLocation?.latitude ? currentLocation.latitude : 0,
    longitude: currentLocation?.longitude ? currentLocation.longitude : 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  return (
    <MapView
      style={style.map}
      region={region}
      showsUserLocation
      mapType={MAP_TYPES.STANDARD}
      toolbarEnabled={false}
    ></MapView>
  );
}

const style = StyleSheet.create({
  container: {
    //flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,

    justifyContent: "flex-start",
    alignItems: "center",

    //backgroundColor: "#F5F5F5",
    padding: 10,
    backgroundColor: "red",
  },
  map: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    justifyContent: "center",

    backgroundColor: "green",
  },
});
