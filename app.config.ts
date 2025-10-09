import { ConfigContext, ExpoConfig } from "@expo/config";

const environment = process.env.APP_VARIANT || "development";
const IS_DEV = environment === "development";
const IS_PREVIEW = environment === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.anonymous.parkingClient.dev";
  }

  if (IS_PREVIEW) {
    return "com.anonymous.parkingClient.preview";
  }

  return "com.anonymous.parkingClient";
};

const getAppName = () => {
  if (IS_DEV) {
    return "parkingClient (Dev)";
  }

  if (IS_PREVIEW) {
    return "parkingClient (Preview)";
  }

  return "parkingClient";
};

export default ({ config }: ConfigContext): ExpoConfig => {
  // *** VERIFICATION LOG ***
  console.log("✅ app.config.ts is running. Current App Name:", getAppName());
  console.log("Current Bundle ID:", getUniqueIdentifier());
  console.log("*** environment: ", environment, " ***");

  // ************************

  return {
    ...config,
    name: getAppName(),
    slug: "parkingClient",
    version: "1.0.0",
    orientation: "portrait",
    icon: "src/assets/images/icon.png",
    scheme: "parkingClient",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
      bundleIdentifier: getUniqueIdentifier(), // think this  gets updated later
      config: {
        googleMapsApiKey: process.env.EXPO_PUBLIC_IOS_GOOGLE_DIRECTIONS_API_KEY,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "src/assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      permissions: ["ACCESS_COARSE_LOCATION", "ACCESS_FINE_LOCATION"],
      softwareKeyboardLayoutMode: "pan",
      package: getUniqueIdentifier(),
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_ANDROID_GOOGLE_DIRECTIONS_API_KEY as string,
        },
      },
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "src/assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      "expo-secure-store",
      "expo-web-browser",
    ],
    experiments: {
      typedRoutes: true,
    },
    // This is where you add your other environment variables
    extra: {
      EXPO_PUBLIC_BASE_URL: process.env.EXPO_PUBLIC_BASE_URL,

      EXPO_PUBLIC_IOS_GOOGLE_DIRECTIONS_API_KEY:
        process.env.EXPO_PUBLIC_IOS_GOOGLE_DIRECTIONS_API_KEY,

      EXPO_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
    },
  };
};
