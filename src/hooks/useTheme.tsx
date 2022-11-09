import { DefaultTheme } from "@react-navigation/native";
import { darkTheme, lightTheme } from "@utils/theme";
import { useColorScheme } from "react-native";
import { adaptNavigationTheme } from "react-native-paper";

export default function useTheme() {
  const scheme = useColorScheme();

  return scheme === "dark" ? darkTheme : lightTheme;
}

export const useNavigationTheme = () => {
  const scheme = useColorScheme();
  const { DarkTheme, LightTheme } = adaptNavigationTheme({
    light: DefaultTheme,
    dark: DefaultTheme,
  });

  return scheme === "dark" ? DarkTheme : LightTheme;
};
