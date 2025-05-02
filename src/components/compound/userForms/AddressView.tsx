import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { getFullStateName } from "@utils/stateAbbreviation";
import MapView, { MAP_TYPES, Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { useLocationStore } from "@store/report/locationStore";
import { Jurisdiction } from "@constants/jurisdiction";
import { validateAddressForm } from "@utils/screens/user/ReportPage/AddressForm/validateAddressForm";
import { Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Params {
  jurisdictionMap: Map<string, Jurisdiction>;
  buttonClick: string;
  setButtonClick: (button: string) => void;
  setStep: (nextStep: number) => void;
  addressNotes: string;
  setAddressNotes: (notes: string) => void;
}

export default function AddressView({
  jurisdictionMap,
  buttonClick,
  setButtonClick,
  setStep,
  addressNotes,
  setAddressNotes,
}: Params) {
  const initialLocation = useLocationStore((state) => state.currentLocation);
  const vehicleLocation = useLocationStore((state) => state.vehicleLocation);
  const resetVehicleLocation = useLocationStore(
    (state) => state.updateVehicleLocation
  );
  const updateVehicleLocation = useLocationStore(
    (state) => state.setVehicleByCoords
  );

  const [region, setRegion] = useState({
    latitude: vehicleLocation?.latitude ? vehicleLocation.latitude : 0,
    longitude: vehicleLocation?.longitude ? vehicleLocation.longitude : 0,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const MAX_NOTES_LENGTH = 128;

  const handleMarkerDraggable = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    console.log("Marker Coords: ", latitude, " ", longitude);

    updateVehicleLocation(latitude, longitude);

    setRegion((prev) => ({
      ...prev,
      latitude,
      longitude,
    }));
  };

  console.log(
    "VL: ",
    vehicleLocation?.latitude,
    " ",
    vehicleLocation?.longitude
  );

  console.log("IL: ", initialLocation);
  console.log("VL: ", vehicleLocation);

  const handleResetMarker = () => {
    resetVehicleLocation({
      city: initialLocation?.city || "",
      state: initialLocation?.state || "",
      streetAddress: initialLocation?.streetAddress || "",
      zipCode: initialLocation?.zipCode?.toString() || "",
      latitude: initialLocation?.latitude || 0,
      longitude: initialLocation?.longitude || 0,
    });

    setRegion({
      latitude: initialLocation?.latitude ? initialLocation.latitude : 0,
      longitude: initialLocation?.longitude ? initialLocation.longitude : 0,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
  };

  useEffect(() => {
    if (buttonClick === "next") {
      const isValidLocation = validateAddressForm({
        address: vehicleLocation,
        jurisdictionMap,
      });

      if (isValidLocation === null) {
        Alert.alert(
          "Address Error",
          "Unable to obtain vehicle address. Try again or come back later.",
          [{ text: "ok" }]
        );
        return;
      }

      if (!isValidLocation) {
        let message = "This location is not supported.";
        let followUp =
          "Adjust your pinned location, or click reset location. If this seems like an error, please contact support in the gear icon in the homepage.";

        if (
          vehicleLocation &&
          vehicleLocation.city.length > 0 &&
          vehicleLocation.state.length > 0
        ) {
          const { city, state, streetAddress } = vehicleLocation;

          message = `${
            streetAddress ? streetAddress + ", " : ""
          }${city}, ${state} is not currently supported.`;
        }

        const adjusted = message + "\n\n" + followUp;

        Alert.alert("City Not Supported", adjusted, [{ text: "ok" }]);
        setButtonClick("");
        return;
      }

      setButtonClick("");
      setStep(4);
    }
  }, [buttonClick]);

  if (
    vehicleLocation === null ||
    vehicleLocation.latitude === null ||
    vehicleLocation.longitude === null
  ) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={style.container}
      enableOnAndroid={true}
      extraScrollHeight={100}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={style.titles}>Report Address</Text>

      <View style={style.addressBox}>
        {vehicleLocation?.state ? (
          <Text>State: {getFullStateName(vehicleLocation.state)}</Text>
        ) : (
          <Text></Text>
        )}
        {vehicleLocation?.city ? (
          <Text>City: {vehicleLocation.city}</Text>
        ) : (
          <Text></Text>
        )}

        {vehicleLocation?.streetAddress?.trim().length > 0 && (
          <Text>Street: {vehicleLocation.streetAddress}</Text>
        )}
      </View>

      <View style={style.mapContainer}>
        <MapView
          style={style.map}
          region={region}
          showsUserLocation={false}
          mapType={MAP_TYPES.STANDARD}
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

      <View style={style.notesContainer}>
        <Text>Extra Location Info (Optional)</Text>
        <TextInput
          value={addressNotes}
          onChangeText={setAddressNotes}
          placeholder="e.g. 3rd floor of parking garage"
          placeholderTextColor="black"
          autoCapitalize="sentences"
          style={style.notesTextContainer}
          autoCorrect={true}
          multiline={true}
          maxLength={MAX_NOTES_LENGTH}
          textAlignVertical="top" // Add this for android
        />
      </View>

      <Text
        style={[
          style.notesCounterBase,
          addressNotes.length === MAX_NOTES_LENGTH && style.maxNotesLengthColor,
        ]}
      >
        {addressNotes.length}/{MAX_NOTES_LENGTH}
      </Text>
    </KeyboardAwareScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    //flex: 1,
    //width: "100%",
    //height: "80%",
    minHeight: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    shadowColor: "#000",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.3,
    // shadowRadius: 6,
    // elevation: 8,
    // borderRadius: 30,
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.4,
    padding: 20,
    alignSelf: "center",
    justifyContent: "center",
    //backgroundColor: "yellow",
  },

  map: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    justifyContent: "center",
    //backgroundColor: "red",
  },

  notesContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  notesTextContainer: {
    height: "auto", // Increased height to accommodate multiple lines
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: Dimensions.get("window").width * 0.8,
    borderColor: "black",
    padding: 10,
    borderRadius: 5,
  },

  notesCounterBase: {
    width: "80%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    //backgroundColor: "blue",
    color: "black", // Default color
  },
  maxNotesLengthColor: {
    color: "red",
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
