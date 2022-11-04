import * as React from "react";

import Container from "@components/atoms/Container";
import AppContextProvider from "@contexts/appContext";

import Router from "@routes";

const App = () => {
  return (
    <AppContextProvider>
      <Container flex={1} backgroundColor="#e3e3e3" testID="app-container">
        <Router />
      </Container>
    </AppContextProvider>
  );
};

export default App;
