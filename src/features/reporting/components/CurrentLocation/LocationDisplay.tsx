import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ImageStyle,
  TextStyle,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { Image, ImageSource } from "expo-image";
import { cityDto } from "@features/reporting/dtos";

const userLocationImage = require("@assets/images/buttonImages/UserLocationPin.png");

interface Props {
  currentCityData: cityDto | null;
  isLoading: boolean;
}

export default function LocationDisplay({ currentCityData, isLoading }: Props) {
  const displayLocation = currentCityData
    ? `${currentCityData.city}, ${currentCityData.state}`
    : "Location Not Supported";

  return (
    <>
      <Image source={userLocationImage} style={styles.locationPin} contentFit="contain" />

      <View style={styles.textContainer}>
        <Text style={styles.subLabel}>Current Location:</Text>

        {isLoading ? (
          <View style={styles.loadingStateRow}>
            {/* <ActivityIndicator size="small" color={styles.locationText.color} /> */}
            <Text style={[styles.locationText, styles.loadingText]}>Loading...</Text>
          </View>
        ) : (
          <Text style={styles.locationText}>{displayLocation}</Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  locationPin: {
    width: 30,
    height: 30,
    marginRight: 8,
    // Use a primary color for the pin icon
    tintColor: "#3B82F6",
  },

  textContainer: {
    flex: 1,
  },
  subLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "bold",
  },
  locationText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },

  loadingStateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingText: {
    marginLeft: 5, // Small separation between spinner and text
    color: "#4B5563", // Slightly lighter color for loading state
    fontWeight: "normal", // Use normal weight for loading text, bold for result
  },
});
