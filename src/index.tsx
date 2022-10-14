import * as React from "react";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import Container from "./components/atoms/Container";
import { Login } from "./pages/Login";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Container flex={1} backgroundColor="#e3e3e3">
        <Login />
      </Container>
    </PaperProvider>
  );
};

export default App;
