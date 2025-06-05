import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useState, useRef, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import PhotoPreview from "@components/compound/PhotoPreview";
import { useLicensePlateStore } from "@store/report/licensePlateStore";
import { useViolationImageStore } from "@store/report/violationImageStore";
import { useLocalSearchParams } from "expo-router";
import { useLocationStore } from "@store/report/locationStore";
import { getLatLongWithPermission } from "@utils/getLatLongWithPermission";

const LICENSE_PLATE_ID = 0;

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [keepPhoto, setKeepPhoto] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);

  const { imageId } = useLocalSearchParams();
  const id = parseInt(imageId as string);

  const setLocation = useLocationStore((s) => s.setLocationByCoords);

  const licensePlateImages = useLicensePlateStore((s) => s.images);
  const licensePlateUpdate = useLicensePlateStore((s) => s.setImage);

  const violationImages = useViolationImageStore((s) => s.images);
  const violationUpdate = useViolationImageStore((s) => s.setImage);

  const imageArray =
    id === LICENSE_PLATE_ID ? licensePlateImages : violationImages;
  const updateImage =
    id === LICENSE_PLATE_ID ? licensePlateUpdate : violationUpdate;
  const deleteAndShift = useViolationImageStore(
    (state) => state.deleteAndShift
  );

  function cameraInitialized() {
    if (cameraRef.current) {
      console.log("initialized");
    } else {
      console.log("not initialized");
      // maybe add an alert error message
      handleBack();
    }
  }

  function handleBack() {
    router.back();
  }

  async function HandleTakePhoto() {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        if (!data) {
          console.log("error taking photo");
          return;
        }

        const { uri, height, width } = data;
        updateImage(id, uri, height, width);

        if (id === LICENSE_PLATE_ID) {
          console.log("getting loc");
          const coords = await getLatLongWithPermission();
          if (!coords) {
            handleBack();
            return;
          }
          const latitude = coords.latitude;
          const longitude = coords.longitude;

          setLocation(latitude, longitude);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  useEffect(() => {
    if (keepPhoto) {
      setKeepPhoto(false);
      handleBack();
    }
  }, [keepPhoto]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  // todo: rework this to be automatic. Maybe in the parent comp that calls camera onPress?
  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const photo = imageArray.find((img) => img.id === id);

  if (photo?.uri) {
    return PhotoPreview({
      PhotoContent: photo,
      setKeepPhoto,
      updateImage,
      deleteAndShift,
    });
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.HeaderButtonContainer}>
          <TouchableOpacity onPress={handleBack}>
            <Image
              source={require("@assets/images/buttonImages/backIcon.png")}
              style={{
                width: 35,
                height: 35,
              }}
            />
          </TouchableOpacity>
        </View>

        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
          onCameraReady={cameraInitialized}
        />

        <View style={styles.FooterButtonContainer}>
          <TouchableOpacity onPress={HandleTakePhoto}>
            <Image
              source={require("@assets/images/buttonImages/shutterIcon.png")}
              style={{
                width: 100,
                height: 100,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  HeaderButtonContainer: {
    flexDirection: "row",
    backgroundColor: "black",
    padding: 10,
  },

  FooterButtonContainer: {
    flexDirection: "row",
    backgroundColor: "black",
    justifyContent: "center",
    padding: 20,
  },

  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
