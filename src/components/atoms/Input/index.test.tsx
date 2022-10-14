import React from "react";
import { render, waitFor, RenderAPI } from "@testing-library/react-native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import Input from "./index";

let wrapper: RenderAPI;
const onChangeText = jest.fn();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
  },
};

describe("Input", () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <PaperProvider theme={theme}>
          <Input onChangeText={onChangeText} testID="input" />
        </PaperProvider>
      );
    });
  });

  it("should render", async () => {
    const { getByTestId } = wrapper;

    await waitFor(() => {
      expect(getByTestId("input-outlined")).toBeTruthy();
    });
  });

  it("should render with secureTextEntry", async () => {
    await waitFor(() => {
      wrapper = render(
        <Input
          ref={React.createRef()}
          onChangeText={onChangeText}
          secureTextEntry
          showSecureButton
          testID="input"
        />
      );
    });

    const { getByTestId } = wrapper;

    await waitFor(() => {
      expect(getByTestId("input-outlined")).toBeTruthy();
    });
  });
});
