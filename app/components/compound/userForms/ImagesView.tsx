import { IMAGE_TYPES, ImageContent } from "@/app/constants/imageContent";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

interface props {
  type: typeof IMAGE_TYPES.licensePlate | typeof IMAGE_TYPES.violation;
  reportImages: ImageContent[];
  handler: () => void;
}

export default function ImagesView({ type, reportImages, handler }: props) {
  const addImageIcon = require("../../../../assets/images/buttonImages/addImageIcon.png");

  if (type === IMAGE_TYPES.licensePlate) {
    return (
      <TouchableOpacity onPress={() => handler()}>
        <View style={styles.imageContainer}>
          {
            <Image
              style={styles.LpImage}
              key={reportImages[0].id}
              source={
                reportImages[0].uri
                  ? { uri: reportImages[0].uri }
                  : addImageIcon
              }
            />
          }
        </View>
      </TouchableOpacity>
    );
  } else {
    // supporting images
    const stopIndex = reportImages.findIndex((img) => !img.uri);
    const imagesToShow =
      stopIndex === -1 ? reportImages : reportImages.slice(0, stopIndex);

    return (
      <View style={styles.imageContainer}>
        {imagesToShow.map((img) => (
          <View key={img.id} style={styles.LpImage}>
            <TouchableOpacity
              onPress={() => {
                handler;
              }}
            >
              <Image source={{ uri: img.uri }} />
            </TouchableOpacity>
          </View>
        ))}

        {imagesToShow.length < 5 && (
          <TouchableOpacity
            onPress={() => {
              console.log("clicked add image");
            }}
          >
            <Image source={addImageIcon} style={styles.LpImage} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

//styles

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  LpImage: {
    width: 50,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
  },
});
