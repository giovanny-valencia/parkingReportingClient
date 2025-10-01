import { TouchableOpacity, View, Text } from "react-native";

export default function CurrentLocation(currentLocation: string, refreshLocation: () => void) {
  return (
    <View>
      <Text>Current location: {currentLocation}</Text>
      <TouchableOpacity onPress={refreshLocation}>
        <Text>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}
