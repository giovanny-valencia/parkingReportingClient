/**
 * UI for the report Page
 *
 * Displays the images, License plate input, dropdown violation selection, and the submit button.
 */

import { View, Text, Image } from "react-native";
import InputField from "../../common/InputField";
import { useState } from "react";
import { InputType } from "../../common/InputField";

export default function ReportView() {
  const [licensePlate, setLicensePlate] = useState("");
  return (
    <View>
      <Text>Images:</Text>

      <Text>License Plate Image (Required)</Text>
      <>
        <Text>Supporting Violation Images</Text>
        <Text>(At least 1 required)</Text>
      </>

      <InputField
        label={InputType.licensePlate}
        value={licensePlate}
        onChangeText={setLicensePlate}
      />

      <Text>Violation Type:</Text>

      <Text
        onPress={() => {
          console.log("submit Selected");
        }}
      >
        Submit
      </Text>
    </View>
  );
}
