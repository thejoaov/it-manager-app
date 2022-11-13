import {
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  DefaultTheme,
} from 'react-native-paper';
// import { DefaultTheme, Theme } from 'react-native-paper';

// const MD3DarkTheme = DefaultTheme;
// const MD3LightTheme = DefaultTheme;

export type ITheme = MD3Theme;
// export type ITheme = Theme;

export const theme: ITheme = {
  ...DefaultTheme,
  roundness: 3,
  colors: {
    ...DefaultTheme.colors,
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
