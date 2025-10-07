import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Image, ImageSource } from "expo-image";
import { Navigation } from "lucide-react-native";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

interface Props {
  cooldownTimer: number;
  isLoading: boolean;
  getUserLocation: () => void;
}

export default function RefreshButton({ cooldownTimer, isLoading, getUserLocation }: Props) {
  const isOnCooldown = cooldownTimer > 0;
  const isDisabled = isOnCooldown || isLoading;
  const iconColor = !isDisabled || isLoading ? Colors.activeIcon : Colors.disabledIcon;
  const buttonOpacity = isDisabled ? 0.6 : 1;

  return (
    <TouchableOpacity
      onPress={getUserLocation}
      style={[styles.refreshButtonBase, styles.refreshButtonActive, { opacity: buttonOpacity }]}
      disabled={isOnCooldown || isLoading}
    >
      {isLoading ? (
        // Show Activity Indicator when loading
        <ActivityIndicator color={Colors.activeIcon} size="large" />
      ) : !isOnCooldown ? (
        /* Show Navigation Icon */
        <Navigation color={iconColor} size={28} />
      ) : null}

      {isOnCooldown && (
        <View style={styles.cooldownOverlay}>
          <Text style={styles.cooldownText}>{cooldownTimer}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

// Define the colors for clarity and easy modification
const Colors = {
  activeBackground: "#1F2937", // Near-black for a premium, modern feel
  activeIcon: "#FFFFFF", // Pure White for max contrast on black
  shadow: "rgba(0, 0, 0, 0.4)", // Black shadow for a natural float
  disabledIcon: "#9CA3AF", // Muted icon color
  cooldownOverlay: "rgba(0, 0, 0, 0.7)",
  cooldownText: "#FFFFFF",
};
const styles = StyleSheet.create({
  // --- Refresh Button Styles ---
  refreshButtonBase: {
    marginLeft: 12, // Increased margin for visual separation
    borderRadius: 50,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: 60, // Slightly smaller touch target but still generous
    width: 60,
    overflow: "hidden",
  },
  refreshButtonActive: {
    // Vibrant background color for the active state (FAB look)
    backgroundColor: Colors.activeBackground, // Additional elevation to make it pop when active
    shadowColor: Colors.shadow, // <--- Corrected Shadow Color to match black button    shadowOffset: { width: 0, height: 4 },
    shadowOffset: { width: 0, height: 6 }, // Deeper float
    shadowOpacity: 0.6, // Darker shadow for more impact
    shadowRadius: 12, // Wider blur
    elevation: 10,
  },
  // refreshButtonDisabled: {
  //   backgroundColor: "Red",
  // },

  // --- Cooldown Overlay Styles (Kept largely the same for functionality) ---
  cooldownOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: Colors.cooldownOverlay,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  cooldownText: {
    color: Colors.cooldownText,
    fontSize: 20,
    fontWeight: "bold",
  },
});
