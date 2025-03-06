/**
 * Component layout for the user home
 *
 * contains:
 * - Report button
 * - setting cog
 *
 * Will contain:
 * - Withdraw button
 */

import { View } from "react-native";
import ActionImageButton from "../../common/ActionImageButton";

export default function UserHomeLayout() {
  return (
    <View>
      <ActionImageButton
        image="assets\images\buttonImages\cameraIcon.png"
        text={"Report"}
        onClick={() => console.log("Clicked!")}
      />
    </View>
  );
}
