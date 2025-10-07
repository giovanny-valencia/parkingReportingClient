import { ChevronRight, LucideIcon } from "lucide-react-native";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

interface Props {
  title: string;
  Icon: LucideIcon;
  isServiceSupported: boolean; //TODO: this should come from the location/jurisdiction hook
  handleRoute: () => void;
}

export default function Card({ title, Icon, isServiceSupported, handleRoute }: Props) {
  const textColor = isServiceSupported ? Colors.textPrimary : Colors.textSecondary;
  return (
    <TouchableOpacity
      onPress={handleRoute}
      disabled={!isServiceSupported}
      style={[Styles.cardContainer, !isServiceSupported && Styles.cardDisabled]}
      activeOpacity={0.7}
    >
      <View style={Styles.contentWrapper}>
        {/* Icon and title */}
        <View style={Styles.iconTitleGroup}>
          {Icon ? (
            <Icon color={isServiceSupported ? Colors.primary : Colors.textSecondary} size={24} />
          ) : null}
          <Text style={[Styles.titleText, { color: textColor }]}>{title}</Text>
        </View>

        {/* Right side: Chevron and Status */}
        <View style={Styles.rightGroup}>
          {isServiceSupported && (
            <ChevronRight color={Colors.textSecondary} size={24} style={Styles.chevronIcon} />
          )}
        </View>
      </View>
      {/* Unsupported Message */}
      {!isServiceSupported && (
        <View style={Styles.unsupportedMessageContainer}>
          <Text style={Styles.unsupportedMessageText}>Service not supported in this city</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

// Define some standard colors for a modern look
const Colors = {
  primary: "#4F46E5", // Indigo for the icon
  textPrimary: "#1F2937", // Dark gray for main text
  textSecondary: "#6B7280", // Medium gray for details
  backgroundLight: "#FFFFFF", // White card background
  borderGray: "#E5E7EB", // Light gray border
  // disabledOverlay: "rgba(249, 250, 251, 0.7)", // Very light gray/white with transparency
  //errorText: "#EF4444", // Red for unsupported message
};
const Styles = StyleSheet.create({
  cardContainer: {
    // Basic modern card design
    backgroundColor: Colors.backgroundLight,
    padding: 16,
    borderRadius: 12, // Slightly rounded corners
    borderWidth: 1,
    borderColor: Colors.borderGray,
    marginBottom: 10, // Space between cards
    shadowColor: "#000", // Subtle shadow for depth
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden", // Ensures everything respects the border radius
  },

  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Allows text to take up most of the space
  },

  titleText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "600", // Semi-bold for a modern, readable look
  },

  rightGroup: {
    flexDirection: "row",
    alignItems: "center",
    // No explicit content if unsupported, only chevron if supported
  },

  chevronIcon: {
    marginLeft: 10,
  },

  // --- Disabled State Styling ---
  cardDisabled: {
    opacity: 0.6, // Fades the whole card to indicate disabled state
    // We can also change the border color or background if a different visual cue is preferred
    // borderColor: Colors.textSecondary,
  },

  unsupportedMessageContainer: {
    // Position this message clearly below the main content
    marginTop: 8,
    paddingTop: 8,
    //borderTopWidth: 1,
    //borderTopColor: Colors.borderGray,
    alignItems: "flex-start",
  },

  unsupportedMessageText: {
    fontSize: 20,
    color: "red", // Clear error color
    fontWeight: "bold",
  },
});
