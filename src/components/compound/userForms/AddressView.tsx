import { ErrorIndex, ErrorField } from "@constants/userReportFieldErrors";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import addressFields from "@constants/addressFields";
import { getFullStateName } from "@utils/stateAbbreviation";
import MapView, { MAP_TYPES, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useGetCurrentLatLong } from "@queries/useGetCurrentLatLong";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

interface Params {
  initialVehicleLocation: typeof addressFields; // check this
}

export default function AddressView({ initialVehicleLocation }: Params) {
  const [vehicleLocation, setVehicleLocation] = useState({
    latitude: initialVehicleLocation.latitude,
    longitude: initialVehicleLocation.longitude,
    state: initialVehicleLocation.state,
    city: initialVehicleLocation.city,
    streetAddress: initialVehicleLocation.streetAddress,
    zipCode: initialVehicleLocation.zipCode,
  });

  const [region, setRegion] = useState({
    latitude: initialVehicleLocation.latitude,
    longitude: initialVehicleLocation.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const handleMarkerDraggable = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    setVehicleLocation((prev) => ({
      ...vehicleLocation,
      latitude,
      longitude,
    }));

    setRegion((prev) => ({
      ...prev,
      latitude,
      longitude,
    }));
  };

  const handleResetMarker = () => {
    setVehicleLocation({ ...initialVehicleLocation }); // Simplified, no need for prev here
    setRegion({
      latitude: initialVehicleLocation.latitude,
      longitude: initialVehicleLocation.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
  };

  return (
    <View style={style.container}>
      <Text style={style.titles}>Report Address</Text>

      <View style={style.addressBox}>
        <Text>State: {getFullStateName(vehicleLocation.state)}</Text>
        <Text>City: {vehicleLocation.city}</Text>
        <Text>Street: {vehicleLocation.streetAddress}</Text>
      </View>

      <View style={style.mapContainer}>
        <MapView
          style={style.map}
          region={region}
          showsUserLocation
          mapType={MAP_TYPES.HYBRID}
          toolbarEnabled={false}
        >
          {vehicleLocation && (
            <Marker
              coordinate={{
                latitude: vehicleLocation.latitude,
                longitude: vehicleLocation.longitude,
              }}
              title="Vehicle Location"
              draggable={true}
              onDragEnd={handleMarkerDraggable}
            />
          )}
        </MapView>
        <TouchableOpacity
          onPress={handleResetMarker}
          style={style.resetButton}
          activeOpacity={0.7}
        >
          <Text style={style.resetButtonText}>Reset Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "90%",
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderRadius: 30,
    backgroundColor: "#F5F5F5",
    paddingVertical: 20, // Add vertical padding
    // backgroundColor: "red",
  },
  titles: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
  },

  addressBox: {
    // backgroundColor: "red",
  },

  addressFields: {
    borderWidth: 1,
    height: 40,
    width: 175,
    borderColor: "black",
    // padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
    alignSelf: "center",
  },

  mapContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    height: "80%",
    //backgroundColor: "green",
    padding: 20,
  },

  map: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    justifyContent: "center",
    //backgroundColor: "red",
  },
  resetButton: {
    position: "absolute",
    bottom: 30, // Position it above the map’s bottom edge
    right: 30, // Align to the right
    backgroundColor: "#007AFF", // A clean, modern blue (iOS-like)
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25, // Rounded pill shape
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // Android shadow
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
