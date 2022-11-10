import React from 'react';
import { AuthProvider } from '@contexts/auth';
import { Provider as PaperProvider } from 'react-native-paper';
import { ToastProvider } from './toast';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useTheme from '@hooks/useTheme';

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

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
