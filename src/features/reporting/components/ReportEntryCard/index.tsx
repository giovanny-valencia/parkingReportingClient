import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  isServiceSupported: boolean;
  handleRoute: () => void;
}

export default function ReportEntryCard({ title, isServiceSupported, handleRoute }: Props) {
  return (
    <TouchableOpacity onPress={handleRoute} disabled={!isServiceSupported}>
      <View>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
