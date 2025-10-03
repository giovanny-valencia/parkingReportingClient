import { cityDto } from "@features/reporting/dtos/Location";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { appStyles } from "@common/styles/appStyles";
import { Image } from "expo-image";

const userLocationImage = "/src/assets/images/buttonImages/UserLocationPin.png";

interface Props {
  currentLocation: cityDto | null;
  refreshLocation: () => void;
}

export default function CurrentLocation({ currentLocation, refreshLocation }: Props) {
  return (
    <View style={[styles.container]}>
      <View>
        <Image source={userLocationImage} />
        <Text>Current Location:</Text>
      </View>
      {currentLocation ? (
        <Text>
          {currentLocation?.state}, {currentLocation?.city}
        </Text>
      ) : (
        <Text>Not Supported</Text>
      )}
      <TouchableOpacity onPress={refreshLocation}>
        <Text>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
