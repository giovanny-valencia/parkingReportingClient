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
import { activeReport } from "@models/activeReport";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import ReportBottomSheetModal from "@components/compound/officers/ReportBottomSheetModal";
import { transform } from "@babel/core";

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

  // // testing. Delete this later
  // if (data) {
  //   console.log(data);
  // }

  // map where keys are the reportID and values are the report data
  const [activeReportsMap, setActiveReportsMap] = useState<
    Map<number, activeReport>
  >(new Map());

  // map over data, adding new reports to the Map
  //todo: write this in a useMemo hook
  useEffect(() => {
    if (data && Array.isArray(data)) {
      console.log("new render");

      //todo: clean this up when the API is connected.
      console.log("new data: ");
      data.forEach((e) => {
        console.log("id: ", e.reportID);
        console.log("coords: ", e.lat, e.long);
      });

      //todo: when the API gets connected, makes changes to activeReports.ts
      //const activeReports = data as activeReport[];

      const newActiveReportsMap = new Map(activeReportsMap.entries());

      data.forEach((report) => {
        if (!newActiveReportsMap.has(report.reportID)) {
          newActiveReportsMap.set(report.reportID, {
            reportID: report.reportID,
            latitude: report.lat,
            longitude: report.long,
            expiresAt: 0,
            status: "new",
          });
        }
      });

      // console.log("new active reports: ");
      // newActiveReportsMap.forEach((e) => {
      //   console.log("id: ", e.reportID);
      //   console.log("lat, long: ", e.latitude, e.longitude);
      //   console.log("exp: ", e.expiresAt);
      //   console.log("stat: ", e.status);
      //   console.log("\n");
      // });

      // size might not be enough for this check.
      // Removing a report then adding a report would result in the same size, potentially?
      if (activeReportsMap.size !== newActiveReportsMap.size) {
        setActiveReportsMap(newActiveReportsMap);
      }
    }
  }, [data, activeReportsMap]);

  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
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

  useEffect(() => {
    if (data) {
    }
  }, [data]);

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
                ? `${report.reportID}-${report.status}`
                : report.reportID
            }
            coordinate={{
              latitude: report.latitude,
              longitude: report.longitude,
            }}
            pinColor={
              report.status === "opened"
                ? "blue"
                : report.status === "hidden"
                ? "gray"
                : "red" // default is new, red
            }
            onPress={() => {
              console.log("marker pressed: ", report.reportID);
              handlePresentModalPress(report.reportID);
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
