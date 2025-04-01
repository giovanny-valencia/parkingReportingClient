/**
 *
 */

import { View, Text, StyleSheet, TextInput } from "react-native";
import { IMAGE_TYPES, ImageContent } from "@constants/imageContent";
import ImagesView from "./ImagesView";
import { ErrorIndex, ErrorField } from "@constants/userReportFieldErrors";
import { stateAbbreviations } from "@utils/stateAbbreviation";
import DropDownSelection from "@components/common/DropDownSelection";
import { useEffect, useState } from "react";
import { useVehicleFormValidation } from "@hooks/screens/user/ReportPage/useVehicleFormValidation";

// creates the states selection array
const stateOptions = Object.entries(stateAbbreviations).map(([name, abbr]) => ({
  label: name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
  value: abbr,
}));

interface Params {
  plateImage: ImageContent;
  setLicensePlateImage: (image: ImageContent) => void;

  plateStateInitials: string;
  setPlateStateInitials: (state: string) => void;

  plateNumber: string;
  setPlateNumber: (licensePlate: string) => void;

  errors: ErrorField[];
  setErrors: (index: number, errMessage: string) => void;

  buttonClick: string;
  setButtonClick: (button: string) => void;
}

export default function LicensePlateForm({
  plateImage,
  setLicensePlateImage,

  plateStateInitials,
  setPlateStateInitials,

  plateNumber,
  setPlateNumber,

  errors,
  setErrors,

  buttonClick,
  setButtonClick,
}: Params) {
  const res = useVehicleFormValidation({
    shouldValidate: buttonClick === "next",
    // buttonClick,
    //setButtonClick,
    setErrors,
    plateImage,
    plateStateInitials,
    plateNumber,
  });

  useEffect(() => {
    console.log(res);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.imageTitles}>License Plate Image </Text>
      <ImagesView
        type={IMAGE_TYPES.licensePlate}
        reportImages={[plateImage]}
        handler={() => {
          console.log("clicked: ", plateImage.id);
        }}
      />

      {errors[ErrorIndex.licensePlateImage].message.length > 0 && (
        <Text style={styles.error}>
          {errors[ErrorIndex.licensePlateImage].message}
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

        {errors[ErrorIndex.licensePlateStateSelection].message.length > 0 && (
          <Text style={styles.error}>
            {errors[ErrorIndex.licensePlateStateSelection].message}
          </Text>
        )}

        <View style={styles.marginSpace}></View>

        <TextInput
          placeholder="Enter Plate Number..."
          placeholderTextColor="black"
          value={plateNumber}
          onChangeText={(text) => setPlateNumber(text.replace(/\s/g, ""))}
          autoCapitalize="characters"
          autoCorrect={false}
          style={styles.licensePlateInput}
          maxLength={10}
        />
      </View>
      {errors[ErrorIndex.licensePlateTextInput].message.length > 0 && (
        <Text style={styles.error}>
          {errors[ErrorIndex.licensePlateTextInput].message}
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
    backgroundColor: "skyblue",
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

  footerSpace: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "green",
  },
});
