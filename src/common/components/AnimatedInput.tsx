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

/**
 * AnimatedInput TextInput Component
 *
 * todo: refactor this, currently background cannot be changed and bleeds when label hovers when active.
 */

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
  backgroundColor?: string;
  autocorrect?: boolean;
}

export default function AnimatedInput({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "sentences",
  autocorrect = false,
  viewStyle,
  inputStyle,
  titleStyle,
  backgroundColor = "#2C2C2C",
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;
  const inputRef = useRef<TextInput>(null);

  const handlePlaceholderPress = () => {
    inputRef.current?.focus();
  };

  return (
    <View style={[styles.container, { backgroundColor }, viewStyle]}>
      <TouchableMotiText
        style={[
          styles.label,
          { backgroundColor },
          isActive ? styles.titleActive : styles.titleInactive,
          titleStyle,
        ]}
        from={{ top: 18 }}
        animate={{ top: isActive ? -10 : 18 }}
        transition={{ type: "timing", duration: 200 }}
        onPress={handlePlaceholderPress}
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
        autoCorrect={autocorrect}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    overflow: "visible",
  },
  label: {
    position: "absolute",
    left: 10,
    fontWeight: "bold",
    paddingHorizontal: 4,
    zIndex: 1,
  },
  titleInactive: {
    fontSize: 16,
    color: "#B0B0B0",
  },
  titleActive: {
    fontSize: 12,
    color: "#E0E0E0",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "transparent",
    color: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop: 15,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#BB86FC",
    borderWidth: 2,
  },
});
