import { SupportAction } from "@features/reporting/constants";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  supportType: SupportAction;
}

export default function SupportEntry({ supportType }: Props) {
  const handleRoute = () => {
    if (supportType === SupportAction.Account) {
      console.log("Account");
    } else if (supportType === SupportAction.GuideAndFAQ) {
      console.log("guide and FAQ");
    }
  };
  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity onPress={handleRoute} style={styles.card} activeOpacity={0.7}>
        <View style={styles.contentContainer}>
          <Text>{supportType.toString()}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    // Ensures a small margin between cards if they are stacked
    marginVertical: 8,
    marginHorizontal: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12, // Rounded corners
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 80, // Ensure minimum tap size
    width: 150,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Allows the content to take available space
    marginRight: 10, // Space before the right chevron
  },
  mainText: {
    fontSize: 16,
    fontWeight: "600", // Semi-bold for main title
    color: "#1F2937", // Dark gray text
  },
  subText: {
    fontSize: 13,
    color: "#6B7280", // Medium gray text for description
    marginTop: 2,
  },
});
