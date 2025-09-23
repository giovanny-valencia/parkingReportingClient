import { StyleSheet } from "react-native";

export const appStyles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    //backgroundColor: "#1E1E1E",
    backgroundColor: "#111827",
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E0E0E0",
    marginBottom: 48, // More space to separate from the form
    alignSelf: "flex-start", // Left-align for a cleaner look
  },

  //buttons
  submitButton: {
    backgroundColor: "#BB86FC", // Your accent color for buttons
    paddingVertical: 14,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  submitButtonText: {
    color: "#121212", // Dark text on a light background for contrast
    fontSize: 18,
    fontWeight: "bold",
  },
});
