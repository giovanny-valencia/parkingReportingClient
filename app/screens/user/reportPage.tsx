import ReportView from "@/app/components/compound/userForms/ReportView";
import { View, Text, StyleSheet } from "react-native";
import { IMAGE_TYPES, ImageContent } from "@/app/constants/imageContent";
import { useState } from "react";
/**
 * The logic for the report page.
 *
 * handles the responsibility of:
 * 1. displaying the report page form
 * 2. check permission settings, must allow location and camera (if fail, display alert)
 * 3. handle validation messages from backend (if fail, display alert)
 *
 * @returns
 */

export default function ReportPage() {
  // creates the image state array, size of 6 images, first id (0): license plate, remaining (1-5): violations
  const [reportImages, setReportImages] = useState<ImageContent[]>(() =>
    Array.from({ length: 6 }, (_, index) => ({
      id: index++,
      uri: "",
      type: index === 0 ? IMAGE_TYPES.licensePlate : IMAGE_TYPES.violation,
    }))
  );

  reportImages.map( (i) => console.log(i.id, i.type));

  return (
    <View style={styles.container}>
      <ReportView></ReportView>
    </View>
  );
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});
