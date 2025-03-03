import {
  Text,
  StyleSheet,
  View,
  Platform,
  useColorScheme,
  Button,
} from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";

interface DateFieldProps {
  value: Date;
  onChange: (date: Date) => void; // Still typed to expect a Date
}

export default function DateField({ value, onChange }: DateFieldProps) {
  const [show, setShow] = useState(true);

  const handleChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (selectedDate) {
      onChange(selectedDate);
    }
    setShow(Platform.OS === "ios");
  };

  const showDatepicker = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value,
        mode: "date",
        display: "spinner",
        onChange: handleChange,
      });
    } else {
      setShow(true);
    }
    setShow(true);
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && show && (
        <View>
          <DateTimePicker
            value={value}
            mode="date"
            onChange={handleChange}
            display="compact"
          />
        </View>
      )}

      {Platform.OS === "android" && (
        <>
          <Text onPress={showDatepicker} style={styles.input}>
            {value.getMonth()}/{value.getDate()}/{value.getFullYear()}
          </Text>
        </>
      )}
    </View>
  );
}

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 50,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
