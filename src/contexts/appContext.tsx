import React from 'react';
import { AuthProvider } from '@contexts/auth';
import { Provider as PaperProvider } from 'react-native-paper';
import { ToastProvider } from './toast';
import useTheme from '@hooks/useTheme';
import SafeContainer from '@components/atoms/SafeContainer';

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <SafeContainer
      backgroundColor={theme.colors.background}
      testID="app-container"
    >
      <PaperProvider theme={theme}>
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </PaperProvider>
    </SafeContainer>
  );
};

export default AppContextProvider;
