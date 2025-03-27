import { useState } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface Item {
  label: string;
  value: string; // this might need revision later
}

interface DropDownPickerProps {
  placeholder: string;
  data: Item[];
  value: string | null;
  onChange: (value: any) => void; // Callback to update parent
}

export default function DropDownSelection({
  placeholder,
  data,
  value,
  onChange,
}: DropDownPickerProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(data);

  return (
    <DropDownPicker
      placeholder={placeholder}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={onChange} // Parent handles value updates
      setItems={setItems}
      dropDownContainerStyle={{ maxHeight: 150 }} // Limit dropdown height
      listMode="SCROLLVIEW"
    />
  );
}
