/* eslint-disable import/extensions */
import { ExpoConfig, ConfigContext } from "@expo/config";
import { version } from "./package.json";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  plugins: [],
  splash: {
    image: "./assets/splash.png",
    resizeMode: "cover",
    backgroundColor: "#5691C8",
  },
  ios: {
    bundleIdentifier: "com.thejoaov.itmanager",
  },
  android: {
    icon: "./assets/icon.png",
    package: "com.thejoaov.itmanager",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundImage: "./assets/icon.png",
      backgroundColor: "#5691C8",
    },
  },
  backgroundColor: "#FFFFFF",
  jsEngine: "hermes",
  primaryColor: "#5691C8",
  entryPoint: "./App.tsx",
  name: "IT Manager",
  slug: "it-manager",
  version,
  orientation: "portrait",
  icon: "./assets/icon.png",
  platforms: ["ios", "android"],
  userInterfaceStyle: "automatic",
  assetBundlePatterns: ["**/*"],
});
