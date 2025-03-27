/**
 * UI for the report Page
 *
 * Displays the images, License plate input, dropdown violation selection, and the next button.
 */

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { IMAGE_TYPES, ImageContent } from "@constants/imageContent";
import ImagesView from "./ImagesView";
import { FIELD_INDICES, FieldError } from "@constants/userReportFieldErrors";
import { stateAbbreviations } from "@utils/stateAbbreviation";
import DropDownSelection from "@components/common/DropDownSelection";
import { useState } from "react";

// creates the states selection array
const stateOptions = Object.entries(stateAbbreviations).map(([name, abbr]) => ({
  label: name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
  value: abbr,
}));

interface ReportViewProps {
  licensePlateImage: ImageContent;
  setLicensePlateImage: (image: ImageContent) => void;

  plateStateInitials: string;
  setPlateStateInitials: (state: string) => void;

  licensePlate: string;
  setLicensePlate: (licensePlate: string) => void;

  errors: FieldError[];
  handleNext: () => void;
}

export default function ReportView({
  licensePlateImage,
  setLicensePlateImage,

  plateStateInitials,
  setPlateStateInitials,

  licensePlate,
  setLicensePlate,

  errors,
  handleNext,
}: ReportViewProps) {
  
    const [open, setOpen] = useState(false);
  
  return (
    <View style={styles.container}>
      <Text style={styles.imageTitles}>License Plate Image </Text>
      <ImagesView
        type={IMAGE_TYPES.licensePlate}
        reportImages={[licensePlateImage]}
        handler={() => {
          console.log("clicked: ", licensePlateImage.id);
        }}
      />

      {errors[FIELD_INDICES.licensePlateImage].message.length > 0 && (
        <Text style={styles.error}>
          {errors[FIELD_INDICES.licensePlateImage].message}
        </Text>
      )}

      <Text style={styles.imageTitles}>Confirm License Plate Details</Text>

      <View style={styles.licenseDetailsBox}>
        <View style={styles.dropDownContainer}>
          <DropDownSelection
            data={stateOptions}
            placeholder="Select State"
            value={plateStateInitials}
            onChange={setPlateStateInitials}
          />
        </View>

        {errors[FIELD_INDICES.licensePlateStateSelection].message.length >
          0 && (
          <Text style={styles.error}>
            {errors[FIELD_INDICES.licensePlateStateSelection].message}
          </Text>
        )}

        <View style={styles.marginSpace}></View>

        <TextInput
          placeholder="Enter Plate Number..."
          placeholderTextColor="black"
          value={licensePlate}
          onChangeText={(text) => setLicensePlate(text.replace(/\s/g, ""))}
          autoCapitalize="characters"
          autoCorrect={false}
          style={styles.licensePlateInput}
          maxLength={10}
        />
      </View>
      {errors[FIELD_INDICES.licensePlateTextInput].message.length > 0 && (
        <Text style={styles.error}>
          {errors[FIELD_INDICES.licensePlateTextInput].message}
        </Text>
      )}
    </View>
  );
}

//styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageTitles: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },

  licensePlateInput: {
    borderWidth: 1,
    height: 40,
    marginBottom: 10,
    width: 175,
    borderColor: "black",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
    alignSelf: "center",
  },
  error: {
    width: "100%",
    textAlign: "center", // Center for consistency
    color: "red",
    fontSize: 12,
    marginTop: 5,
    padding: 5,
    borderRadius: 4,
  },
  dropDownContainer: {
    width: 175,
    alignSelf: "center",
    marginVertical: 10,
  },
  marginSpace: {
    marginBottom: 20,
  },

  licenseDetailsBox: {
    width: 200,
    alignSelf: "center",
  },
});
