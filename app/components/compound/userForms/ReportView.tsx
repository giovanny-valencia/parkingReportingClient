/**
 * UI for the report Page
 *
 * Displays the images, License plate input, dropdown violation selection, and the submit button.
 */

import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import AnimatedInput from "../../common/AnimatedInput";
import { useState } from "react";
import { IMAGE_TYPES, ImageContent } from "@/app/constants/imageContent";
import ImagesView from "./ImagesView";

const addImageIcon = require("../../../../assets/images/buttonImages/addImageIcon.png");

interface ReportViewProps {
  licensePlateImage: ImageContent;
  setLicensePlateImage: (image: ImageContent) => void;
  SupportingImages: ImageContent[];
  setSupportingImages: (images: ImageContent[]) => void;
  licensePlate: string;
  setLicensePlate: (licensePlate: string) => void;
  violation: string;
  setViolation: (violation: string) => void;
  maxLengthViolation: number;
}

export default function ReportView({
  licensePlateImage,
  setLicensePlateImage,
  SupportingImages,
  setSupportingImages,
  licensePlate,
  setLicensePlate,
  violation,
  setViolation,
  maxLengthViolation,
}: ReportViewProps) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View>
          <Text style={styles.imageTitles}>License Plate Image </Text>
          <Text style={styles.text}>(Required)</Text>

          <View style={styles.imageContainer}>
            <ImagesView
              type={IMAGE_TYPES.licensePlate}
              reportImages={[licensePlateImage]}
              handler={() => {
                console.log("clicked: " + licensePlateImage.id);
              }}
            />
          </View>
        </View>

        <View>
          <Text style={styles.imageTitles}>Supporting Violation Images</Text>
          <Text style={styles.text}>(At least 1 required)</Text>
          <View style={styles.imageContainer}>
            <ImagesView
              type={IMAGE_TYPES.violation}
              reportImages={SupportingImages}
              handler={() => {
                console.log("clicked: " + "idk");
              }}
            />
          </View>
        </View>

        <View style={styles.textInputContainer}>
          <Text style={styles.textTitles}>Confirm License Plate:</Text>
          <TextInput
            placeholder="Enter License Plate..."
            value={licensePlate}
            onChangeText={setLicensePlate}
            style={styles.licensePlateInput}
          />

          <Text style={styles.textTitles}>Violation Type:</Text>
          <TextInput
            placeholder="Enter violation details..."
            value={violation}
            onChangeText={setViolation}
            style={styles.reportInput}
            maxLength={maxLengthViolation}
            multiline={true}
            textAlignVertical="top" // Ensures text starts at the top of the TextInput
          />
          <Text
            style={
              violation.length === maxLengthViolation
                ? styles.maxViolationReached
                : {}
            }
          >
            {violation.length}/256
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            console.log("submit Selected");
          }}
        >
          <Text style={styles.submitButton}>Submit</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
  },
  textTitles: {
    fontSize: 16,
    width: "100%",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  text: {
    width: "100%",
    fontSize: 16,
    alignSelf: "center",
    marginBottom: 5,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  LpImage: {
    width: 50,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "skyblue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  textInputContainer: {
    width: "50%",
    marginTop: 20,
  },
  licensePlateInput: {
    borderWidth: 1,
    height: 40,
    marginBottom: 10,
    width: "100%",
    borderColor: "black",
    padding: 10,
    borderRadius: 5,
  },
  reportInput: {
    height: 80,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
    borderColor: "black",
    padding: 10,
    borderRadius: 5,
  },
  maxViolationReached: {
    color: "red",
  },
});
