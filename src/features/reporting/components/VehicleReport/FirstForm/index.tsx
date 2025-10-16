import { View, Text, StyleSheet } from "react-native";

export default function FirstForm() {
  return (
    <View style={styles.container}>
      <Text style={{ color: "red" }}>First form</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "skyblue",
  },
});
