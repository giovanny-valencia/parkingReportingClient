import { View, Text, StyleSheet, TextInput } from "react-native";
import ImagesView from "./ImagesView";
import { IMAGE_TYPES, ImageContent } from "@constants/imageContent";
import { ErrorIndex, ErrorField } from "@constants/userReportFieldErrors";
import { useEffect } from "react";
import validateViolationForm from "utils/screens/user/ReportPage/violationForm/validateViolationForm";
import { useViolationImageStore } from "@store/report/violationImageStore";

/**
 * This is the Page that handles the logic and view of a report Violation
 * - Violation Images (1 minimum)
 * - Violation field (not empty)
 */
interface Params {
  violation: string;
  setViolation: (text: string) => void;
  errors: ErrorField[];
  setErrors: (index: number, errMessage: string) => void;
  buttonClick: string;
  setButtonClick: (button: string) => void;
  setStep: (nextStep: number) => void;
}

export const ViolationForm = ({
  violation,
  setViolation,
  errors,
  setErrors,
  buttonClick,
  setButtonClick,
  setStep,
}: Params) => {
  const MAX_LENGTH_VIOLATION = 256;

  const supportingImages = useViolationImageStore((state) => state.images);
  const updateImages = useViolationImageStore((state) => state.setImage);

  useEffect(() => {
    if (buttonClick === "next") {
      const isValid = validateViolationForm({
        supportingImages,
        violation,
        setErrors,
      });

      if (isValid) {
        setStep(3);
      }

      setButtonClick("");
    }
  }, [buttonClick]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.titles}> Supporting Violation Images </Text>

        <ImagesView
          images={supportingImages} />
        {errors[ErrorIndex.supportingImage].message.length > 0 && (
          <Text style={styles.error}>
            {errors[ErrorIndex.supportingImage].message}
          </Text>
        )}
      </View>

      <View style={styles.violationContainer}>
        <Text style={styles.titles}> Violation Description </Text>
        <TextInput
          value={violation}
          onChangeText={setViolation}
          placeholder="Enter details of violation..."
          placeholderTextColor="black"
          autoCapitalize="sentences"
          autoCorrect={true}
          style={styles.violationTextContainer}
          multiline={true}
          maxLength={MAX_LENGTH_VIOLATION}
          textAlignVertical="top" // Add this for android
        />
        {errors[ErrorIndex.violationDetails].message.length > 0 && (
          <Text style={styles.error}>
            {errors[ErrorIndex.violationDetails].message}
          </Text>
        )}

        <Text
          style={[
            styles.violationCounterBase,
            violation.length === MAX_LENGTH_VIOLATION &&
              styles.maxViolationColor,
          ]}
        >
          {violation.length}/{MAX_LENGTH_VIOLATION}
        </Text>
      </View>
    </View>
  );
};

//styles
const styles = StyleSheet.create({
  container: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 4 }, // Shadow direction
    shadowOpacity: 0.3, // Shadow visibility
    shadowRadius: 6, // Shadow blur
    elevation: 8, // Shadow for Android
    borderRadius: 30,
    backgroundColor: "#F5F5F5",

    padding: 10,

    //    backgroundColor: "#F5F5F5",
  },

  titles: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20, // double checking later
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    //  backgroundColor: "red",
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

  textInputContainer: {
    width: "50%",
    marginTop: 20,
  },

  violationContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  violationTextContainer: {
    height: "auto", // Increased height to accommodate multiple lines
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "80%",
    borderColor: "black",
    padding: 10,
    borderRadius: 5,
  },

  violationCounterBase: {
    width: "80%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    //backgroundColor: "blue",
    color: "black", // Default color
  },
  maxViolationColor: {
    color: "red",
  },
});
