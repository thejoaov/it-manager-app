import '@i18n';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import Router from '@routes';
import AppContextProvider from '@contexts/appContext';
import { loadBaseUrl } from '@services/api/config';

const App = () => {
  useEffect(() => {
    loadBaseUrl();
  }, []);

  return (
    <AppContextProvider>
      <StatusBar style="auto" translucent />
      <Router />
    </AppContextProvider>
  );
};

export default App;
