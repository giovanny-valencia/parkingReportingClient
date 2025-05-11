import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import { useMemo, useCallback, useState, useEffect } from "react";
import getReportData from "@queries/useReportData";
import { fullReportData } from "@models/activeReport";
import { reverseGeocodeAsync } from "expo-location";

interface Props {
  reportID: number | null;
  ref: React.Ref<BottomSheetModal>;
  onClose: () => void;
}

const dismissIcon = require("@assets/images/buttonImages/dismissIcon.png");

export default function ReportBottomSheetModal({
  reportID,
  ref,
  onClose,
}: Props) {
  const snapPoints = useMemo(
    () => ["15%", "25%", "35%", "45%", "55%", "65%", "75%", "85%", "95%"],
    []
  );

  // query to get full report data
  const { data, isError, isLoading } = getReportData({ reportID });
  console.log("");

  const [report, setReport] = useState<fullReportData | null>(null);

  // library seems to be broken so this is a workaround to close the modal...
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("BottomSheet Index Changed:", index);
    // console.log("SP: ", snapPoints.at(index));
    if (index <= 0) {
      onClose();
    }
  }, []);

  return (
    <BottomSheetModal
      style={styles.contentContainer}
      ref={ref}
      index={3}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: "#131315",
      }}
    >
      <View style={{ marginBottom: 20, paddingHorizontal: 20 }}>
        <TouchableOpacity style={styles.dismissIconContainer} onPress={onClose}>
          <Image source={dismissIcon} style={styles.dismissIcon} />
        </TouchableOpacity>
      </View>

      <BottomSheetView>
        <Text style={styles.text}>Custom Bottom Sheet Modal</Text>
        <Text style={styles.text}>Content goes here...</Text>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    //alignItems: "center",
    justifyContent: "center",
  },

  dismissIconContainer: {
    width: 30,
    height: 30,
  },

  dismissIcon: {
    width: "100%",
    height: "100%",
  },

  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    //backgroundColor: "blue",
  },
});
