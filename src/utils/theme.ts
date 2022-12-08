import {
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  DefaultTheme,
} from 'react-native-paper';
// import { DefaultTheme, Theme } from 'react-native-paper';

// const MD3DarkTheme = DefaultTheme;
// const MD3LightTheme = DefaultTheme;

export type ITheme = MD3Theme & {
  colors: {
    semantic: {
      high: string;
      medium: string;
      low: string;
    };
    status: {
      open: string;
      closed: string;
      solving: string;
    };
  };
};
// export type ITheme = Theme;

export const theme: ITheme = {
  ...DefaultTheme,
  roundness: 3,
  colors: {
    ...DefaultTheme.colors,
    semantic: {
      high: '#FF2200',
      medium: '#FFC107',
      low: '#0099FF',
    },
    status: {
      open: '#FFFF00',
      closed: '#0099FF',
      solving: '#00FF00',
    },
  },
};

export const lightTheme: ITheme = {
  ...MD3LightTheme,
  roundness: 3,
  colors: {
    ...MD3LightTheme.colors,
    semantic: {
      high: '#FF2200',
      medium: '#FFA100',
      low: '#0099FF',
    },
    status: {
      open: '#FFA100',
      closed: '#0099FF',
      solving: '#00FF00',
    },
  },
};

export const darkTheme: ITheme = {
  ...MD3DarkTheme,
  roundness: 3,
  colors: {
    ...MD3DarkTheme.colors,
    semantic: {
      high: '#FF2200',
      medium: '#FFC107',
      low: '#0099FF',
    },
    status: {
      open: '#FFC107',
      closed: '#0099FF',
      solving: '#00FF00',
    },
  },
};
