import * as React from "react";

import AppContextProvider from "@contexts/appContext";

import Router from "@routes";
import SafeContainer from "@components/atoms/SafeContainer";

const App = () => {
  return (
    <AppContextProvider>
      <SafeContainer backgroundColor="#e3e3e3" testID="app-container">
        <Router />
      </SafeContainer>
    </AppContextProvider>
  );
};

export default App;
