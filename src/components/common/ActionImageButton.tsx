/**
 * Contains:
 * Image
 * Text
 * clickable
 *
 * Usage: clickable buttons
 */

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";

interface ActionImageButtonProps {
  image: any;
  text?: string;
  onClick: () => void;
  containerStyle: StyleProp<ViewStyle>;
  imageStyle: StyleProp<ImageStyle>;
  textStyle: StyleProp<TextStyle>;
}

export default function ActionImageButton({
  image,
  text,
  onClick,
  containerStyle,
  imageStyle,
  textStyle,
}: ActionImageButtonProps): JSX.Element {
  return (
    <TouchableOpacity onPress={() => onClick()}>
      <View style={containerStyle}>
        {image && <Image style={imageStyle} source={image} />}
        {text && text.length > 0 && <Text style={textStyle}>{text}</Text>}
      </View>
    </TouchableOpacity>
  );
}
