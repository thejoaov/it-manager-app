import * as React from "react";

import Container from "@components/atoms/Container";
import AppContextProvider from "@contexts/appContext";
import Login from "@pages/Login";

const App = () => {
  return (
    <AppContextProvider>
      <Container flex={1} backgroundColor="#e3e3e3">
        <Login />
      </Container>
    </AppContextProvider>
  );
};

export default App;
