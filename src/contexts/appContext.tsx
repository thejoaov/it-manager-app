import React from "react";
import { AuthProvider } from "@contexts/auth";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    version: 3,
    colors: {
      ...DefaultTheme.colors,
    },
  };

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </PaperProvider>
  );
};

export default AppContextProvider;
