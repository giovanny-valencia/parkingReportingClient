import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import MapView, { MAP_TYPES, Marker } from "react-native-maps";
import { useLocationData } from "@hooks/screens/user/ReportPage/useLocationData";
import { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import useGetActiveReports from "@queries/useGetActiveReports";
import { activeReport } from "@models/activeReport";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import ReportBottomSheetModal from "@components/compound/officers/ReportBottomSheetModal";

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

  const {
    data,
    isLoading: isActiveReportsLoading,
    isError,
  } = useGetActiveReports();

  // map where keys are the reportID and values are the report data
  const [activeReportsMap, setActiveReportsMap] = useState<
    Map<number, activeReport>
  >(new Map());

  // map over data, adding new reports to the Map
  //todo: write this in a useMemo hook
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setActiveReportsMap((prevMap) => {
        // Use a functional update to ensure you're working with the latest state
        const newActiveReportsMap = new Map(prevMap.entries());

        data.forEach((report) => {
          if (!newActiveReportsMap.has(report.id)) {
            newActiveReportsMap.set(report.id, {
              id: report.id,
              location: {
                latitude: report.location.latitude,
                longitude: report.location.longitude,
              },
              createdOn: report.createdOn,
              status: "new",
            });
          }
        });
        console.log("new active reports for rendering: ", newActiveReportsMap); // Added for clarity
        return newActiveReportsMap;
      });
    }
  }, [data]);

  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

  // what's this for again?
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = (reportID: number) => {
    if (reportID) {
      const report = activeReportsMap.get(reportID);

      const updatedReport: activeReport = {
        ...report!,
        status: "opened",
      };

      const newActiveReportsMap = new Map(activeReportsMap.entries());
      newActiveReportsMap.set(reportID, updatedReport);
      setActiveReportsMap(newActiveReportsMap);
    }

    setSelectedReportId(reportID);

    // for now, handling API call in useEffect

    // bottomSheetRef.current?.present();
  };

  const handleDismissModalPress = () => {
    setSelectedReportId(null);
    //bottomSheetRef.current?.close();
  };

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
      >
        {Array.from(activeReportsMap.values()).map((report) => (
          // todo: make a custom marker component. Ios marker has onPress radius issues as the onPress is not registered unless he little "dot" is pressed.
          <Marker
            key={
              Platform.OS === "android"
                ? `${report.id}-${report.status}`
                : report.id
            }
            coordinate={{
              latitude: report.location.latitude,
              longitude: report.location.longitude,
            }}
            pinColor={
              report.status === "opened"
                ? "blue"
                : report.status === "hidden"
                ? "gray"
                : "red" // default is new, red
            }
            onPress={() => {
              console.log("marker pressed: ", report.id);
              handlePresentModalPress(report.id);
            }}
          />
        ))}
      </MapView>
      <TouchableOpacity onPress={handleRecenter} style={style.recenterButton}>
        <Image
          source={require("@assets/images/buttonImages/recenterIcon.png")}
          style={{
            width: 50,
            height: 50,
          }}
        />
      </TouchableOpacity>

      {selectedReportId && (
        <ReportBottomSheetModal
          reportID={selectedReportId}
          ref={bottomSheetRef}
          setCoordinates={setCoordinates}
          onClose={handleDismissModalPress}
        />
      )}
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
