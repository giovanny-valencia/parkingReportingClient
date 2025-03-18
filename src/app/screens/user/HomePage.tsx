import { View, Text, StyleSheet } from "react-native";
import HomeView from "@/src/components/compound/userForms/HomeView";
import { useState } from "react";
import { router } from "expo-router";

function handleReportButtonClick() {
  console.log("Report Clicked!");
  // Navigate to the report page
  router.push("/screens/user/ReportPage"); // Relative, works within user/ stack
}

function handleSettingsButtonClick() {
  console.log("Settings Clicked!");
}

export default function UserHome() {
  return (
    <HomeView
      onReportClick={handleReportButtonClick}
      onSettingsClick={handleSettingsButtonClick}
    ></HomeView>
  );
}
