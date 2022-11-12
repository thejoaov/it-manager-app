import '@i18n';
import * as React from 'react';

import Router from '@routes';
import AppContextProvider from '@contexts/appContext';
import SafeContainer from '@components/atoms/SafeContainer';
import useTheme from '@hooks/useTheme';

const App = () => {
  const { colors } = useTheme();
  return (
    <AppContextProvider>
      <SafeContainer backgroundColor={colors.background} testID="app-container">
        <Router />
      </SafeContainer>
    </AppContextProvider>
  );
};

export default App;
