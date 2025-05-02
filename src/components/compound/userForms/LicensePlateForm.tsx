import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { IMAGE_TYPES, ImageContent } from "@constants/imageContent";
import ImagesView from "./ImagesView";
import { ErrorIndex, ErrorField } from "@constants/userReportFieldErrors";
import { stateAbbreviations } from "@utils/stateAbbreviation";
import DropDownSelection from "@components/common/DropDownSelection";
import { useEffect } from "react";
import { useVehicleFormValidation } from "@hooks/screens/user/ReportPage/LicensePlateForm/useVehicleFormValidation";
import { router } from "expo-router";
import { useLicensePlateStore } from "@store/report/licensePlateStore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// creates the states selection array
const stateOptions = Object.entries(stateAbbreviations).map(([name, abbr]) => ({
  label: name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
  value: abbr,
}));

interface Params {
  // plateImage: ImageContent;
  // setLicensePlateImage: (image: ImageContent) => void;
  plateStateInitials: string;
  setPlateStateInitials: (state: string) => void;
  plateNumber: string;
  setPlateNumber: (licensePlate: string) => void;
  errors: ErrorField[];
  setErrors: (index: number, errMessage: string) => void;
  buttonClick: string;
  setButtonClick: (button: string) => void;
  setStep: (nextStep: number) => void;
}

export default function LicensePlateForm({
  // plateImage,
  // setLicensePlateImage,

  plateStateInitials,
  setPlateStateInitials,

  plateNumber,
  setPlateNumber,

  errors,
  setErrors,

  buttonClick,
  setButtonClick,

  setStep,
}: Params) {
  const plateImage = useLicensePlateStore((state) => state.images);
  const setPlateImage = useLicensePlateStore((state) => state.setImage);

  const res = useVehicleFormValidation({
    shouldValidate: buttonClick === "next",
    setErrors,
    plateImage,
    plateStateInitials,
    plateNumber,
  });

  useEffect(() => {
    //console.log("step 1 res: ", res);
    if (res) {
      console.log("incr");

      setStep(2);
    }
    setButtonClick("");
  });

  return (
    <KeyboardAvoidingView
      behavior={"position"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 125 : 100}
    >
      <View style={styles.container}>
        <Text style={styles.titles}>License Plate Image </Text>

        <ImagesView images={plateImage} />

        {errors[ErrorIndex.licensePlateImage].message.length > 0 && (
          <Text style={styles.error}>
            {errors[ErrorIndex.licensePlateImage].message}
          </Text>
        )}

        <Text style={styles.titles}>Confirm License Plate Details</Text>

        <View style={styles.licenseDetailsBox}>
          <View style={styles.dropDownContainer}>
            <DropDownSelection
              data={stateOptions}
              placeholder="Select State"
              value={plateStateInitials}
              onChange={setPlateStateInitials}
            />

            {errors[ErrorIndex.licensePlateStateSelection].message.length >
              0 && (
              <Text style={styles.error}>
                {errors[ErrorIndex.licensePlateStateSelection].message}
              </Text>
            )}
          </View>

          <View style={styles.test}>
            <TextInput
              placeholder="Enter plate number..."
              placeholderTextColor="black"
              value={plateNumber}
              onChangeText={(text) => setPlateNumber(text.replace(/\s/g, ""))}
              autoCapitalize="characters"
              autoCorrect={false}
              style={styles.licensePlateInput}
              maxLength={10}
            />
            {errors[ErrorIndex.licensePlateTextInput].message.length > 0 && (
              <Text style={styles.error}>
                {errors[ErrorIndex.licensePlateTextInput].message}
              </Text>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

//styles
const styles = StyleSheet.create({
  container: {
    // width: "80%",
    //height: "60%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 4 }, // Shadow direction
    shadowOpacity: 0.3, // Shadow visibility
    shadowRadius: 6, // Shadow blur
    elevation: 8, // Shadow for Android
    borderRadius: 30,
    padding: 20,
    //backgroundColor: "green",
  },
  titles: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20, // double checking later
  },

  licensePlateInput: {
    borderWidth: 1,
    height: 40,
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
    width: "100%",
    alignItems: "center", // Center children horizontally
    justifyContent: "center", // Center children vertically
    //backgroundColor: "green",
  },

  licenseDetailsBox: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    //backgroundColor: "blue",
  },

  test: {
    padding: 20,
  },
});
