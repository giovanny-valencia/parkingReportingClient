import { View, StyleSheet, Text } from "react-native";

interface Props {
  currentIndex: number; // Current index of the image
  totalImages: number; // Total number of images
}

export default function DotIndicator({ currentIndex, totalImages }: Props) {
  return (
    <View style={styles.dotContainer}>
      {Array.from({ length: totalImages }, (_, index) => (
        <View
          key={index}
          style={[styles.dot, currentIndex === index ? styles.activeDot : null]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "gray", // Default color for inactive dots
  },
  activeDot: {
    backgroundColor: "skyblue", // Color for the active dot
  },
});
