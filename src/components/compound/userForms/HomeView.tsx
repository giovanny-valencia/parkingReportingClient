/**
 * Component layout for the user home
 *
 * contains:
 * - Report button
 * - setting cog
 *
 * Will contain:
 * - Withdraw button
 */

import { View, StyleSheet } from "react-native";
import ActionImageButton from "@components/common/ActionImageButton";
import { SafeAreaView } from "react-native-safe-area-context";

interface UserHomeLayoutProps {
  onReportClick: () => void;
  onSettingsClick: () => void;
}

const cameraIcon = require("@assets/images/buttonImages/cameraIcon.png");
const settingsIcon = require("@assets/images/buttonImages/settingsIcon.png");

export default function HomeView({
  onReportClick,
  onSettingsClick,
}: UserHomeLayoutProps) {
  return (
    <>
      <SafeAreaView style={styles.Container}>
        <View style={styles.CenterWrapper}>
          <ActionImageButton
            image={cameraIcon}
            text={"Report"}
            onClick={onReportClick}
            containerStyle={styles.ReportContainer}
            imageStyle={styles.ReportImage}
            textStyle={styles.ReportText}
          />
        </View>

        <ActionImageButton
          image={settingsIcon}
          onClick={onSettingsClick}
          containerStyle={styles.SettingsContainer}
          imageStyle={styles.SettingsImage}
          textStyle={styles.ReportText}
        />
      </SafeAreaView>
    </>
  );
}

// styles
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignContent: "center", // Centers Report horizontally
    justifyContent: "center", // Centers Report vertically

    //position: "relative", // For absolute positioning of Settings
    // backgroundColor: "green",
  },

  CenterWrapper: {
    flex: 1,
    justifyContent: "center", // Centers Report vertically
    alignItems: "center", // Centers Report horizontally
  },
  ReportContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    backgroundColor: "skyblue",
    borderColor: "black",
  },
  ReportImage: {
    width: 50,
    height: 50,
    marginRight: 12, // Increased spacing for breathing room
    borderRadius: 8, // Rounded corners for a softer look
  },
  ReportText: {
    fontSize: 45,
    fontWeight: "600", // Slightly bold for emphasis
    color: "black",
    textAlign: "center",
  },
  SettingsContainer: {
    position: "absolute", // Locks it to bottom-right
    bottom: 20,
    right: 20,
  },
  SettingsImage: {
    width: 50,
    height: 50,
  },
});
