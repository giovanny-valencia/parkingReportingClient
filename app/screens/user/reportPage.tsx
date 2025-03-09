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
  const [licensePlate, setLicensePlate] = useState("");
  const [violation, setViolation] = useState("");
  const [licensePlateImage, setLicensePlateImage] = useState<ImageContent>({
    id: 0,
    uri: "",
    type: IMAGE_TYPES.licensePlate,
  });
  const MAX_LENGTH_VIOLATION = 256;
  // creates the image state array, size of 5 images, (1-5): violations images
  const [SupportingImages, setSupportingImages] = useState<ImageContent[]>(() =>
    Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      uri: "",
      type: IMAGE_TYPES.violation,
    }))
  );

  SupportingImages.map((i) => console.log(i.id, i.type));

  return (
    <View style={styles.container}>
      <ReportView
        licensePlateImage={licensePlateImage}
        setLicensePlateImage={setLicensePlateImage}

        SupportingImages={SupportingImages}
        setSupportingImages={setSupportingImages}
        
        licensePlate={licensePlate}
        setLicensePlate={setLicensePlate}
        violation={violation}
        setViolation={setViolation}
        maxLengthViolation={MAX_LENGTH_VIOLATION}
      ></ReportView>
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
