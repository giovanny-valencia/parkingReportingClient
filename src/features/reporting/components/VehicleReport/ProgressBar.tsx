import { StyleSheet, View, Text } from "react-native";
import { ProgressBar as RNPaperProgressBar } from "react-native-paper";
import useVehicleReport from "./useVehicleReport";
import { appStyles } from "@common/styles/appStyles";

export default function ProgressBar() {
  const { Store } = useVehicleReport();
  const progressValue = Store.currentStep - 1 === 0 ? 0 : Store.currentStep / 5; // calculate progress by completed steps, not current
  const displayProgress = Math.round(progressValue * 100);

  return (
    <View style={styles.progressBarContainer}>
      <Text style={styles.stepLabel}>{displayProgress} %</Text>
      <RNPaperProgressBar
        progress={progressValue}
        color={appStyles.submitButton.backgroundColor}
        style={styles.progressBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    paddingHorizontal: 20, // Give some breathing room
    paddingVertical: 10, // Space above and below the bar
    // backgroundColor: "#fff", // Ensure a clean background if Safe Area is transparent
    // borderBottomWidth: 1, // Optional: Visually separate the header
    // borderBottomColor: "#eee",
  },
  progressBar: {
    height: 12, // Make it slightly thicker
    borderRadius: 6, // Rounded corners for a modern look
  },
  stepLabel: {
    position: "absolute",

    // Center the text within the *CONTAINER* (padding must be considered)
    top: 10, // Matches paddingVertical
    left: 0,
    right: 0,
    bottom: 10, // Matches paddingVertical

    textAlign: "center",
    textAlignVertical: "center", // For Android
    lineHeight: 12, // IMPORTANT: Matches the bar height for vertical centering on iOS

    color: "black",
    fontWeight: "bold",
    fontSize: 12,
    zIndex: 1, // Ensures text is above the progress bar
  },
});
