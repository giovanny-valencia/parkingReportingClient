import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  isServiceSupported: boolean;
  handleRoute: () => void;
}

export default function ReportEntryCard({ title, isServiceSupported, handleRoute }: Props) {
  const cardStyle = isServiceSupported ? styles.cardActive : styles.cardDisabled;
  const titleStyle = isServiceSupported ? styles.titleText : styles.unsupportedText;
  return (
    <TouchableOpacity
      onPress={handleRoute}
      disabled={!isServiceSupported}
      style={cardStyle}
      activeOpacity={0.8}
    >
      <View>
        <Text style={titleStyle}>{title}</Text>
        {!isServiceSupported && (
          <Text style={styles.supportLabel}>Service Unsupported within this city</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // --- BASE CARD STYLES (Active State) ---
  cardActive: {
    backgroundColor: "#FFFFFF",
    padding: 20, // Generous padding
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 16, // Soft, modern rounded corners

    // Modern, subtle shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    // Elevation (Android)
    elevation: 8,

    // Light border for subtle definition
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  // --- DISABLED CARD STYLES ---
  cardDisabled: {
    // Inherit active styles but override key visual properties
    backgroundColor: "#F3F4F6", // Lighter, neutral background
    opacity: 0.8,
    shadowOpacity: 0, // Remove shadow when disabled for a flatter look
    borderColor: "#D1D5DB",
    marginVertical: 10,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 0, // Remove Android elevation
  },

  // --- TYPOGRAPHY (Active State) ---
  titleText: {
    fontSize: 18,
    fontWeight: "700", // Bold title for prominence
    color: "#1F2937", // Dark gray for high contrast
  },

  // --- TYPOGRAPHY (Disabled State) ---
  unsupportedText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#9CA3AF", // Grayed-out text
  },

  // --- SUPPORT LABEL FOR DISABLED STATE ---
  supportLabel: {
    fontSize: 14,
    color: "#EF4444", // A clear warning/status color
    fontWeight: "600",
    marginTop: 4,
  },
});
