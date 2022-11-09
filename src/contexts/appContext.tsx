import React from "react";
import { AuthProvider } from "@contexts/auth";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { ToastProvider } from "./toast";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default AppContextProvider;
