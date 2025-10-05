import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ImageStyle,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from "react-native";
import { Image, ImageSource } from "expo-image";

const refreshLocationImage = require("@assets/images/buttonImages/myLocationVector.png");

interface Props {
  cooldownTimer: number;
  isLoading: boolean;
  getUserLocation: () => void;
}

export default function RefreshButton({ cooldownTimer, isLoading, getUserLocation }: Props) {
  const isOnCooldown = cooldownTimer > 0;
  return (
    <TouchableOpacity
      onPress={getUserLocation}
      style={[
        styles.refreshButtonBase,
        isOnCooldown || isLoading ? styles.refreshButtonDisabled : styles.refreshButtonActive,
      ]}
      disabled={isOnCooldown || isLoading}
    >
      <Image
        source={refreshLocationImage}
        style={[
          styles.refreshLocationImage,
          isOnCooldown ? styles.refreshIconDisabled : styles.refreshIconActive,
        ]}
        contentFit="contain"
      />

      {isOnCooldown && (
        <View style={styles.cooldownOverlay}>
          <Text style={styles.cooldownText}>{cooldownTimer}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // --- Refresh Button Styles ---
  refreshButtonBase: {
    marginLeft: 12, // Increased margin for visual separation
    borderRadius: 50,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: 52, // Slightly smaller touch target but still generous
    width: 52,
    overflow: "hidden",
  },
  refreshButtonActive: {
    // Vibrant background color for the active state (FAB look)
    backgroundColor: "#06B6D4", // Modern Cyan/Teal
    // Additional elevation to make it pop when active
    shadowColor: "#06B6D4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  refreshButtonDisabled: {
    // Flat, neutral background when disabled
    backgroundColor: "#E5E7EB", // Light Gray
  },

  refreshLocationImage: {
    width: 32, // Slightly smaller icon size for a cleaner look
    height: 32,
  },
  refreshIconActive: {
    tintColor: "#FFFFFF", // White icon for high contrast on the teal background
  },
  refreshIconDisabled: {
    tintColor: "#9CA3AF", // Soft gray icon when disabled
  },

  // --- Cooldown Overlay Styles (Kept largely the same for functionality) ---
  cooldownOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Slightly darker for better number visibility
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  cooldownText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
