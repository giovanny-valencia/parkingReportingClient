/**
 * Contains:
 * Image
 * Text
 * clickable
 *
 * Usage: clickable buttons
 */

import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface ActionImageButtonProps {
  image: string;
  text: string;
  onClick: () => void;
}

export default function ActionImageButton({
  image,
  text,
  onClick,
}: ActionImageButtonProps): JSX.Element {
  return (
    <TouchableOpacity onPress={() => onClick}>
      <View style={styles.container}>
        {image.length > 0 && (
          <Image style={styles.image} source={{ uri: image }} />
        )}
        {text.length > 0 && <Text style={styles.text}>{text}</Text>}
      </View>
    </TouchableOpacity>
  );
}

// styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 20,
  },
});
