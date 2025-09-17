import { useState } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
} from "react-native";
import { TextInput, DefaultTheme } from "react-native-paper";

/**
 * AnimatedInput TextInput Component
 *
 * This refactored version ensures the TextInput is the sole touch target,
 * which reliably opens the keyboard. The label is now purely a visual
 * component that animates based on the input's state.
 */

export interface InputFieldProps {
  placeholder: string;
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
  placeholderColor?: string;
  inputTextColor?: string;
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
  backgroundColor = "#2C2C2C",
  placeholderColor = "#E0E0E0", // Default color for the stationary label
  inputTextColor = "#B0B0B0", // Default color for the input text
}: InputFieldProps) {
  // Create a custom theme object to override the background and text colors.
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: backgroundColor,
      // This color applies to the stationary label text
      onSurface: placeholderColor,
      // This color applies to the main input text
      onSurfaceVariant: inputTextColor,
    },
  };

  return (
    <View style={[styles.container, viewStyle]}>
      <TextInput
        label={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        autoCorrect={autocorrect}
        style={[styles.input, { backgroundColor }, inputStyle]}
        mode="outlined"
        outlineColor="#444"
        activeOutlineColor="#BB86FC"
        // Pass the theme prop here to apply the custom colors
        theme={theme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 6,
    borderRadius: 8,
    overflow: "visible",
  },
  input: {
    height: 50,
  },
});
