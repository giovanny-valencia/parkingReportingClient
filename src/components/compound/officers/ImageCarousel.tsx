/**
 * ImageCarousel component to display the report images.
 *
 * - Uses FlatList to render images in a horizontal scrollable view.
 * - Slide to the left or right to view more images.
 * - Display dots to indicate the current image and total images in slider.
 */

import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import { NavigatorContextValue } from "expo-router/build/views/Navigator";
import { useCallback, useState } from "react";
import DotIndicator from "./DotIndicator";
import { ScrollView, FlatList } from "react-native-gesture-handler";

interface Props {
  ref: React.Ref<BottomSheetFlatListMethods>;
  images: {
    id: number; // Added ID as key
    uri: string; // Image URL
  }[];
}

export default function ImageCarousel({ ref, images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(1); // State to hold the current index
  console.log("currentIndex: ", currentIndex);

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    // Check if there are viewable items and if the first one has a valid index
    if (
      viewableItems &&
      viewableItems.length > 0 &&
      viewableItems[0].index !== null &&
      viewableItems[0].index !== undefined
    ) {
      // Update the state with the 0-based index
      setCurrentIndex(viewableItems[0].index + 1);
    }
  }, []); // Empty dependency array - the callback doesn't depend on state or props that change its logic

  return (
    <View>
      <FlatList
        ref={ref as any} // Type assertion to avoid TypeScript error
        data={images}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GestureHandlerRootView style={styles.imageContainer}>
            <Image
              source={{ uri: item.uri }}
              style={{
                width: "100%",
                height: 300,
                resizeMode: "cover",
              }} // Adjust height as needed
            />
          </GestureHandlerRootView>
        )}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={"center"}
        snapToEnd
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50, // Adjust this value as needed
        }}
      />

      <View style={styles.counterContainer}>
        <DotIndicator
          currentIndex={currentIndex - 1} // Convert to 0-based index for DotIndicator
          totalImages={images.length}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: Dimensions.get("window").width,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },

  counterContainer: {
    position: "absolute",
    bottom: 10,
    left: 0, // Add this
    right: 0, // Add this
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    // backgroundColor: "red",
  },
});
