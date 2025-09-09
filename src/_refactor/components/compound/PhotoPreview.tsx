import { CameraCapturedPicture } from "expo-camera";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import { ImageContent } from "_refactor/constants/imageContent";
import { useViolationImageStore } from "_refactor/store/report/violationImageStore";

interface Params {
  PhotoContent: ImageContent;
  updateImage: (id: number, uri: string, height: number, width: number) => void;
  setKeepPhoto: (bool: boolean) => void;
  deleteAndShift: (id: number) => void;
}

const handleKeepPhoto = ({
  PhotoContent,
  updateImage,
  setKeepPhoto,
}: Pick<Params, "PhotoContent" | "updateImage" | "setKeepPhoto">) => {
  console.log("keep");

  updateImage(
    PhotoContent.id,
    PhotoContent.uri,
    PhotoContent.height,
    PhotoContent.width
  );

  setKeepPhoto(true);
  //router.back(); -- had to remove this, some expo update seems to handle this so now this was causing returning to home screen instead of the previous screen
};

const PhotoPreview = ({
  PhotoContent,
  updateImage,
  setKeepPhoto,
  deleteAndShift,
}: Params) => {
  const { uri, width, height } = PhotoContent;

  const handleDiscardPhoto = (id: number) => {
    const LICENSE_PLATE_ID = 0;

    if (id === LICENSE_PLATE_ID) {
      updateImage(id, "", 0, 0);
    } else {
      deleteAndShift(id);
      router.back();
    }
    console.log("discard");
  };

  //console.log("PP: ", width, height);

  return (
    <View style={styles.container}>
      <View style={styles.HeaderButtonContainer}>
        <TouchableOpacity
          onPress={() => handleDiscardPhoto(PhotoContent.id)}
          style={styles.discardButton}
        >
          <Image
            source={require("@assets/images/buttonImages/retakeIcon.png")}
            style={styles.retakeIcon}
          />
          <Text style={styles.text}>Retake</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri }}
          style={[styles.image, { aspectRatio: width / height }]}
        />
      </View>

      <View style={styles.footerButtonContainer}>
        <TouchableOpacity
          onPress={() =>
            handleKeepPhoto({ PhotoContent, updateImage, setKeepPhoto })
          }
          style={styles.acceptButton}
        >
          <Text style={styles.text}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PhotoPreview;

const { width: screenWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally},
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: screenWidth,
    resizeMode: "contain",
  },

  HeaderButtonContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,
    //  backgroundColor: "yellow",
  },

  discardButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333", // Red
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  retakeIcon: {
    width: 20,
    height: 20,
    marginRight: 4, // Space between icon and text
    tintColor: "white",
  },

  footerButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,
    // backgroundColor: "#333",
  },

  acceptButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  text: {
    fontWeight: "600",
    fontSize: 16,
    color: "white",
    textAlign: "center", // Ensure text is centered in buttons
  },
});
