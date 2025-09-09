// DataCard.tsx
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import type { ImageSourcePropType } from "react-native"; // Make sure to import this type

interface DataCardProps {
  image: ImageSourcePropType;
  text: string;
}

export default function DataCard({ image, text }: DataCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    //backgroundColor: "blue",
  },
  imageWrapper: {
    width: 40, // Fixed width for the image area
    height: 40, // Fixed height for the image area
    marginRight: 10, // Space between image and text
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    marginLeft: 5, // Space between image and left edge
    //backgroundColor: "green",
  },
  image: {
    width: "100%", // Make image fill wrapper
    height: "100%", // Make image fill wrapper
    resizeMode: "contain",
    //backgroundColor: "red",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center", // Center text vertically
    //alignItems: "center", // Align text to the left
    //backgroundColor: "red",
  },
  text: {
    fontSize: 16,
    color: "white",
    textAlign: "left", // Align text to the left
    marginLeft: 15, // Space between image and text
    //backgroundColor: "green",
  },
});
