import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Alert,
  FlatList,
  Dimensions,
} from "react-native";
import { useMemo, useCallback, useState, useEffect, use, useRef } from "react";
import getReportData from "@queries/useReportData";
import { fullReportData } from "@models/activeReport";
import { reverseGeocodeAsync } from "expo-location";
import { createAddress } from "@utils/addressUtils";
import { Fields } from "@constants/addressFields";
import { ScrollView } from "react-native-gesture-handler";
import ImageCarousel from "@components/compound/officers/ImageCarousel";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import DataCard from "./DataCard";

interface Props {
  reportID: number | null;
  ref: React.Ref<BottomSheetModal>;
  setCoordinates: (coordinates: {
    latitude: number;
    longitude: number;
  }) => void;
  onClose: () => void;
}

const dismissIcon = require("@assets/images/buttonImages/dismissIcon.png");

const clockIcon = require("@assets/images/buttonImages/clock.png");
const locationIcon = require("@assets/images/buttonImages/location.png");
const carPlateIcon = require("@assets/images/buttonImages/carPlateIcon.png");
const reportIcon = require("@assets/images/buttonImages/report.png");
const mapIcon = require("@assets/images/buttonImages/map.png");

const convertTime = (createdAt: string) => {
  const date = new Date(createdAt);

  const time12HourFormat = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  console.log("converted time: ", time12HourFormat);
  return time12HourFormat;
};

const mockImages = [
  {
    id: 1, // Added ID as key
    uri: "https://media.istockphoto.com/id/184096116/photo/california-license-plate-1947.jpg?s=612x612&w=0&k=20&c=wC6bPPgmzxnGuTiSP-LSr66YdEPe9KXhn-cnqk8Yj0A=", // Replaced first image URL
  },
  {
    id: 2, // Added ID as key
    uri: "https://i.pinimg.com/736x/e8/c4/9b/e8c49be35a390d0562dcefb67fa1e5d5.jpg", // Original second image URL
  },
];
export default function ReportBottomSheetModal({
  reportID,
  ref,
  setCoordinates,
  onClose,
}: Props) {
  const flatListRef = useRef<BottomSheetFlatListMethods>(null);

  const snapPoints = useMemo(
    () => ["15%", "25%", "35%", "45%", "55%", "65%", "75%", "90%"],
    []
  );
  // query to get full report data
  const { data, isError, isLoading } = getReportData({ reportID });
  console.log("");

  const reportTime = useMemo(() => {
    if (data) {
      const createdAt = data.createdAt;
      const time = convertTime(createdAt);
      return time;
    }
    return null;
  }, [data]);

  const [address, setAddress] = useState<Fields | null>(null);

  // library seems to be broken so this is a workaround to close the modal...
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("BottomSheet Index Changed:", index);
    // console.log("SP: ", snapPoints.at(index));
    if (index <= 0) {
      onClose();
    }
  }, []);

  useEffect(() => {
    const fetchAddress = async () => {
      if (data && data.latitude && data.longitude) {
        setCoordinates({
          latitude: data.latitude,
          longitude: data.longitude,
        });

        try {
          const location = await reverseGeocodeAsync({
            latitude: data.latitude,
            longitude: data.longitude,
          });

          if (!location) {
            throw new Error("No address found");
          }

          const formattedAddress = createAddress({
            location: location,
            latitude: data.latitude,
            longitude: data.longitude,
          });

          setAddress(formattedAddress);
        } catch (error) {
          console.error("Error fetching address: ", error);
          setAddress(null);

          Alert.alert(
            "Location Error",
            "We couldn't convert report location to a valid address. Please try again.",
            [{ text: "OK" }]
          );

          onClose();
        }
      }
    };
    fetchAddress();
  }, [data]);

  const scrollRef = useRef<any>(null);

  return (
    <BottomSheet
      //style={styles.contentContainer}
      ref={ref}
      index={3}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: "#131315",
      }}
      // failOffsetX={5}
      // activeOffsetY={[-5, 5]}
    >
      {/* dismiss button */}
      <View
        style={{
          padding: 20,
        }}
      >
        <TouchableOpacity style={styles.dismissIconContainer} onPress={onClose}>
          <Image source={dismissIcon} style={styles.dismissIcon} />
        </TouchableOpacity>
      </View>

      {/* content */}
      <BottomSheetScrollView>
        <View>
          {data && (
            <View>
              <ImageCarousel images={data.images} ref={flatListRef} />

              {/* Hide report button */}
              <View>
                <TouchableOpacity
                  onPress={() => console.log("Hide Report")}
                  style={styles.hideReportButton}
                >
                  <Text style={styles.hideReportButtonText}>Hide Report</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.line} />

              {/* Report Time */}
              <DataCard
                image={clockIcon}
                text={reportTime ? reportTime : "loading..."}
              />
              <View style={styles.line} />

              {/* Report Vehicle License Plate number */}
              <DataCard image={carPlateIcon} text={data.licensePlate} />
              <View style={styles.line} />

              {/* Report Description */}
              <DataCard image={reportIcon} text={data.reportDescription} />
              <View style={styles.line} />

              {/* Report Location */}
              <DataCard
                image={locationIcon}
                text={`${
                  address?.streetAddress ? address.streetAddress + ", " : ""
                }${address?.city ? address.city + ", " : ""}${
                  address?.state ? address.state : ""
                }${address?.zipCode ? " " + address.zipCode : ""}`}
              />
              <View style={styles.line} />

              {/* Optional Report Address Notes */}
              {data.addressNotes && (
                <>
                  <DataCard image={mapIcon} text={data.addressNotes} />
                  <View style={styles.line} />
                </>
              )}
              {/* Button container for remove and start */}
              <View style={styles.bottomButtonContainer}>
                <View>
                  <TouchableOpacity
                    onPress={() => console.log("Remove Report")}
                    style={[styles.bottomButton, styles.removeButton]}
                  >
                    <Text style={styles.hideReportButtonText}>
                      Remove Report
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => console.log("Start")}
                    style={[styles.bottomButton, styles.startButton]}
                  >
                    <Text style={styles.hideReportButtonText}>Start</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    //flex: 1,
    //alignItems: "center",
    justifyContent: "center",
  },

  dismissIconContainer: {
    width: 30,
    height: 30,
  },

  hideReportButton: {
    backgroundColor: "gray", // Example: Orange-red color
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 8, // Rounded corners
    marginVertical: 10, // Space above and below the button
    justifyContent: "center", // Center text horizontally if padding is uneven
    alignItems: "center", // Center text vertically if needed (usually not needed with padding)
    width: "50%", // Full width of the parent container
    alignSelf: "center", // Center the button horizontally
  },
  hideReportButtonText: {
    color: "white", // White text color
    fontSize: 16, // Text size
    fontWeight: "bold", // Bold text
    textAlign: "center", // Center text horizontally within the button
  },

  dismissIcon: {
    width: "100%",
    height: "100%",
  },

  imageSlider: {
    // Add margin, padding, or height if needed for the FlatList specifically
    height: 300, // Example: Give the FlatList a specific height
    marginBottom: 15, // Space below the slider
    // backgroundColor: "red",
  },
  image: {
    width: "100%", // Image takes the full width of its parent View (which is screenWidth)
    height: "100%", // Image takes the full height of its parent View
    // borderRadius: 10, // Apply border radius here if desired on the image itself
  },

  line: {
    height: 1, // Set the thickness of the line
    backgroundColor: "#636267", // Set the color of the line (e.g., a light grey)
    width: "100%", // Make the line span the full width
    marginTop: 5, // Add some space between the FlatList and the line (adjust as needed)
    marginBottom: 5,
  },

  bottomButtonContainer: {
    flexDirection: "row", // <-- Arrange children horizontally
    justifyContent: "space-around", // <-- Distribute space around the buttons
    alignItems: "center", // <-- Vertically center the buttons in the row
    padding: 10, // <-- Padding around the buttons
    // backgroundColor: "blue", // Debug color
    marginBottom: 100, // Space below the button container
    marginTop: 10, // Space above the button container
  },
  // Common styles for the bottom buttons
  bottomButton: {
    paddingVertical: 12,
    paddingHorizontal: 10, // Adjust padding for side-by-side
    borderRadius: 8,
    // flex: 1, // Use flex if you want buttons to take equal space
    width: "100%", // <-- Example: Make buttons take ~half the width minus padding
    justifyContent: "center",
    alignItems: "center",
  },
  removeButton: {
    backgroundColor: "#DC143C",
  },
  startButton: {
    backgroundColor: "#32CD32",
  },
});
