import { SupportAction } from "@features/reporting/constants";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getSupportDetails } from "./getSupportDetails";
import Card from "./Card";

interface Props {
  supportType: SupportAction;
}

export default function SupportEntry({ supportType }: Props) {
  const { label, description, Icon, handleRoute } = getSupportDetails(supportType);

  return <Card label={label} description={description} Icon={Icon} handleRoute={handleRoute} />;
}
