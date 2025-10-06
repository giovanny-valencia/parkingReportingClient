import { TouchableOpacity, View, Text, StyleSheet, Platform } from "react-native";
import { LucideIcon, Icon, ChevronRight } from "lucide-react-native";

interface Props {
  label: string;
  description: string;
  Icon: LucideIcon;
  handleRoute: () => void;
}

export default function Card({ label, description, Icon, handleRoute }: Props) {
  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity onPress={handleRoute} style={styles.card} activeOpacity={0.7}>
        <View style={styles.contentContainer}>
          <View style={styles.iconCircle}>
            <Icon color="#4F46E5" size={24} />
          </View>

          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>{label}</Text>
            <Text style={styles.subText}>{description}</Text>
          </View>
        </View>
        <ChevronRight color={"#9CA3AF"} size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    // Spacing for separation between cards
    marginVertical: 8,
    marginHorizontal: 16,
    // Modern elevation/shadow
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12, // Rounded corners
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 80, // Ensures good touch target size
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Allows content to flex
    marginRight: 10,
  },
  iconCircle: {
    padding: 10,
    backgroundColor: "#EEF2FF", // Indigo-50
    borderRadius: 9999, // Full circle
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flexShrink: 1, // Allows text to wrap
  },
  mainText: {
    fontSize: 16,
    fontWeight: "600", // Semi-bold for title
    color: "#1F2937", // Dark gray text
  },
  subText: {
    fontSize: 13,
    color: "#6B7280", // Medium gray text for description
    marginTop: 2,
  },
});
