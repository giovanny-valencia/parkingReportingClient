import { View, Text, StyleSheet } from "react-native";
import UserHomeLayout from "../../components/compound/userForms/HomeView";
import { useState } from "react";
import { router } from "expo-router";

function handleReportButtonClick() {
  console.log("Report Clicked!");
  // Navigate to the report page
  router.push("./reportPage"); // Relative, works within user/ stack
}

function handleSettingsButtonClick() {
  console.log("Settings Clicked!");
}

export default function UserHome() {
  return (
    <UserHomeLayout
      onReportClick={handleReportButtonClick}
      onSettingsClick={handleSettingsButtonClick}
    ></UserHomeLayout>
  );
}
