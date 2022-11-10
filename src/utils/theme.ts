import { MD3DarkTheme, MD3LightTheme, MD3Theme } from 'react-native-paper';

export type ITheme = MD3Theme;

export const theme: ITheme = {
  ...MD3LightTheme,
  roundness: 3,
  colors: {
    ...MD3LightTheme.colors,
  },
};

export const lightTheme: ITheme = {
  ...MD3LightTheme,
  roundness: 3,
  colors: {
    ...MD3LightTheme.colors,
  },
};

export const darkTheme: ITheme = {
  ...MD3DarkTheme,
  roundness: 3,
  colors: {
    ...MD3DarkTheme.colors,
  },
};
