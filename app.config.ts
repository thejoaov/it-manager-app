/* eslint-disable import/extensions */
import { ExpoConfig, ConfigContext } from "@expo/config";
import { version } from "./package.json";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  plugins: [],
  splash: {
    image: "./assets/splash.png",
    resizeMode: "cover",
    backgroundColor: "rgb(158, 42, 155)",
  },
  ios: {
    bundleIdentifier: "com.thejoaov.itmanager",
    jsEngine: "hermes",
  },
  android: {
    jsEngine: "hermes",
    icon: "./assets/icon.png",
    package: "com.thejoaov.itmanager",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundImage: "./assets/icon.png",
      backgroundColor: "rgb(158,42,155)",
    },
  },
  backgroundColor: "#000",
  jsEngine: "hermes",
  primaryColor: "rgb(158,42,155)",
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
