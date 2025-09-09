import { IMAGE_TYPES, ImageContent } from "_refactor/constants/imageContent";
import { router } from "expo-router";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useLicensePlateStore } from "_refactor/store/report/licensePlateStore";
import { JSX } from "react";

/**
 * Is responsible for displaying all the images in the image array.
 *
 * - Receives the image array and the setter function.
 * - Displays all the images in the array, if it encounters an empty uri image, then it stops and displays an addImage instead.
 * - Each displayed image contains the associated ID which is needed for the deletion feature.
 * - onPress handler: if there's an image, open it. If that slot doesn't contain an image then open the camera.
 *
 * @param images: the image array. Each index contains an {@link imageContent} object
 */

interface Params {
  images: ImageContent[];
}

export default function ImagesView({ images }: Params) {
  const addImageIcon = require("@assets/images/buttonImages/addImageIcon.png");

  const handleImageClick = (image: ImageContent) => {
    const id = image.id;
    console.log("id: ", id);

    router.push({
      pathname: "/screens/user/CameraScreen",
      params: { imageId: id },
    });
  };

  /**
   * Cycles through the images array, returning a JSX component for each image.
   * When an image object with an empty 'uri' is encountered, the 'addImageIcon' is displayed for that slot, and further processing of the array is halted.
   *
   * Each displayed image is interactive. Clicking an image triggers the 'handleImageClick' function, which is intended to eventually allow
   * image enlargement in a preview with deletion capabilities.
   * If an image object has an empty 'uri', the 'addImageIcon' is displayed, and clicking it opens the camera.
   *
   * @returns {JSX.Element[]} elements: An array of TouchableOpacity components, each containing an Image.
   */
  const renderImages = () => {
    const elements: JSX.Element[] = [];

    for (const image of images) {
      const key = image.id ?? String(elements.length);

      elements.push(
        <TouchableOpacity key={key} onPress={() => handleImageClick(image)}>
          <Image
            source={image.uri ? { uri: image.uri } : addImageIcon}
            style={style.image}
          />
        </TouchableOpacity>
      );

      if (image.uri.length === 0) break;
    }

    return elements;
  };

  return <View style={style.imageContainer}>{renderImages()}</View>;
}

//styles

const style = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
});
