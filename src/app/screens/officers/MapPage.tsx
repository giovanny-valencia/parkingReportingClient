import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import MapView, { MAP_TYPES, Marker, Polyline } from "react-native-maps"; // Ensure Polyline is imported
import { useLocationData } from "@hooks/screens/user/ReportPage/useLocationData";
import { useEffect, useState, useRef, useMemo } from "react"; // Added useMemo
import * as Location from "expo-location";
import useGetActiveReports from "@queries/useGetActiveReports";
import { activeReport } from "@models/activeReport";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import ReportBottomSheetModal from "@components/compound/officers/ReportBottomSheetModal";
import { LatLng } from "@utils/officerMaps/polylineDecoder"; // Import LatLng

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
  // REMOVED DUPLICATE STATE DECLARATIONS:
  // const travelMode = useState<"driving" | "walking">("walking"); // Default to walking
  // const [polylineCoordinates, setPolylineCoordinates] = useState([] as LatLng[]);
  // const [distance, setDistance] = useState("");
  // const [duration, setDuration] = useState("");

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
  // Changed from useEffect to useMemo for map population logic for potential optimization
  const memoizedActiveReportsMap = useMemo(() => {
    if (data && Array.isArray(data)) {
      // Create a new map to ensure immutability for state updates
      const newActiveReportsMap = new Map();
      data.forEach((report) => {
        newActiveReportsMap.set(report.id, {
          id: report.id,
          location: {
            latitude: report.location.latitude,
            longitude: report.location.longitude,
          },
          createdOn: report.createdOn,
          status: "new",
        });
      });
      // Merge with previous map if needed, but for initial load, this is simpler
      // For more complex updates (adding/removing), you'd merge new data with prevMap
      console.log("new active reports for rendering: ", newActiveReportsMap);
      return newActiveReportsMap;
    }
    return new Map(); // Return an empty map if no data
  }, [data]);

  // Update activeReportsMap state when memoizedActiveReportsMap changes
  useEffect(() => {
    setActiveReportsMap(memoizedActiveReportsMap);
  }, [memoizedActiveReportsMap]);

  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

  // This state is set by the ReportBottomSheetModal to centralize the map view
  const [targetReportCoordinates, setTargetReportCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // States to receive polyline, distance, and duration from the modal (These are the correct declarations)
  const [polylineCoordinates, setPolylineCoordinates] = useState<LatLng[]>([]);
  const [distance, setDistance] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);

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
    // bottomSheetRef.current?.present(); // Uncomment if you manage modal presentation directly here
  };

  const handleDismissModalPress = () => {
    setSelectedReportId(null);
    // Clear polyline and estimates when the modal is closed
    setPolylineCoordinates([]);
    setDistance(null);
    setDuration(null);
    // bottomSheetRef.current?.close(); // Uncomment if you manage modal dismissal directly here
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

  // Effect to animate map to targetReportCoordinates when set by the modal
  useEffect(() => {
    if (targetReportCoordinates) {
      mapRef.current?.animateToRegion({
        latitude: targetReportCoordinates.latitude,
        longitude: targetReportCoordinates.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [targetReportCoordinates]);

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

        {/* Display the Polyline if coordinates are available - MOVED HERE */}
        {polylineCoordinates.length > 0 && (
          <Polyline
            coordinates={polylineCoordinates}
            strokeColor="#4285F4" // Google Maps blue
            strokeWidth={4} // Increased stroke width for better visibility
          />
        )}
      </MapView>

      {/* Display distance and duration */}
      {distance && duration && (
        <View style={style.infoBox}>
          <Text style={style.infoText}>Distance: {distance}</Text>
          <Text style={style.infoText}>Duration: {duration}</Text>
        </View>
      )}

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
          bottomSheetRef={bottomSheetRef} // Corrected prop name from 'ref' to 'bottomSheetRef'
          setCoordinates={setTargetReportCoordinates} // Renamed prop for clarity
          onClose={handleDismissModalPress}
          setPolylineCoordinates={setPolylineCoordinates}
          setDistance={setDistance}
          setDuration={setDuration}
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
  infoBox: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 20, // Adjust for iOS notch/status bar
    left: 15,
    backgroundColor: "rgba(255, 255, 255, 0.85)", // Semi-transparent white
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoText: {
    color: "#333", // Dark text on light background
    fontSize: 14,
    fontWeight: "bold",
  },
});
