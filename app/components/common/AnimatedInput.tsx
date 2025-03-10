import { useRef, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  KeyboardTypeOptions,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { MotiText, motify } from "moti";

const TouchableMotiText = motify(MotiText)();

export interface InputFieldProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  viewStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

export default function AnimatedInput({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "sentences",
  viewStyle,
  inputStyle,
  titleStyle,
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;
  const inputRef = useRef<TextInput>(null);

  const handlePlaceholderPress = () => {
    inputRef.current?.focus(); // Focus the input when placeholder is clicked
  };

  return (
    <View style={[styles.container, viewStyle]}>
      <TouchableMotiText
        style={[
          styles.label,
          isActive ? styles.titleActive : styles.titleInactive,
          titleStyle,
        ]}
        from={{ top: 18 }}
        animate={{ top: isActive ? -10 : 18 }}
        transition={{ type: "timing", duration: 200 }}
        onPress={handlePlaceholderPress} // Add this to make it clickable
      >
        {placeholder}
      </TouchableMotiText>
      <TextInput
        ref={inputRef}
        style={[styles.input, isFocused && styles.inputFocused, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    marginBottom: 6,
  },
  label: {
    position: "absolute",
    left: 10,
    fontWeight: "bold",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 4,
    zIndex: 1,
  },
  titleInactive: {
    fontSize: 16,
    color: "grey",
  },
  titleActive: {
    fontSize: 12,
    color: "black",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingLeft: 10,
    paddingTop: 15,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#007AFF",
    borderWidth: 2,
  },
});
