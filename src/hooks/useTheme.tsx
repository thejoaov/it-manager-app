import {
  DefaultTheme as NavigationLightTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import { darkTheme, lightTheme } from '@utils/theme';
import { useColorScheme } from 'react-native';
// import { DarkTheme } from 'react-native-paper';
import { adaptNavigationTheme } from 'react-native-paper';

export default function useTheme() {
  const scheme = useColorScheme();

  return scheme === 'dark' ? darkTheme : lightTheme;
}

export const useNavigationTheme = () => {
  const scheme = useColorScheme();
  const { DarkTheme, LightTheme } = adaptNavigationTheme({
    reactNavigationDark: NavigationDarkTheme,
    materialDark: darkTheme,
    reactNavigationLight: NavigationLightTheme,
    materialLight: lightTheme,
  });

  return scheme === 'dark' ? DarkTheme : LightTheme;
};
