import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import MapView, { MAP_TYPES, Marker } from "react-native-maps";
import { Polygon } from "react-native-maps";
import { useNavigation } from "expo-router";
import { useLocationData } from "@hooks/screens/user/ReportPage/useLocationData";
import { useEffect, useState, useRef } from "react";
import { Dimensions } from "react-native";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import useGetActiveReports from "@queries/useGetActiveReports";

// constants
const ANDROID_POI_CONFIG = [
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
];

const POI_CONFIG = {
  showsPointsOfInterest: Platform.OS === "ios" ? false : undefined,
  customMapStyle: Platform.OS === "android" ? ANDROID_POI_CONFIG : undefined,
};

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
  // on mount location hook. todo: perhaps merge this with a location store 'get current location' functionality
  const {
    isLocationGranted,
    isRequestGranted,
    currentLocation: initialLocation,
    isLoading,
  } = useLocationData();

  const initialRegion = initialLocation
    ? {
        latitude: initialLocation.latitude,
        longitude: initialLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : undefined;

  const { data, isLoading: isActiveReportsLoading, isError } = useGetActiveReports();
  
  if (data) {
    console.log(data);
    
  }

  const mapRef = useRef<MapView>(null);

  const handleRecenter = async () => {
    const { coords } = await Location.getCurrentPositionAsync({});
    console.log("coords: ", coords);

    mapRef.current?.animateToRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  // todo: implement permission not granted ui
  const permDenied = !isLocationGranted && !isRequestGranted;
  if (permDenied && !isLoading) {
    console.log("perm not granted");
    return <Text>Permissions are required to continue</Text>;
  }

  if (isLoading) {
    console.log("loading: ", isLoading);

    return <Text>Loading...</Text>;
  }

  // permission granted, loading done, display map
  return (
    <View style={style.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        region={initialRegion}
        showsUserLocation
        showsMyLocationButton={false}
        mapType={MAP_TYPES.STANDARD}
        toolbarEnabled={false}
        {...POI_CONFIG}
      ></MapView>
      <TouchableOpacity onPress={handleRecenter} style={style.recenterButton}>
        <Image
          source={require("@assets/images/buttonImages/recenterIcon.png")}
          style={{
            width: 50,
            height: 50,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  recenterButton: {
    position: "absolute",
    bottom: 25,
    right: 15,
    backgroundColor: "black",
    padding: 2,
    borderRadius: 999,
    elevation: 5, // for Android shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
