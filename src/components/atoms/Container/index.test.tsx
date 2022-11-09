import React from "react";
import { render, waitFor, RenderAPI } from "@testing-library/react-native";
import Container from "./index";
import AppContextProvider from "@contexts/appContext";

let wrapper: RenderAPI;
const onChangeText = jest.fn();

describe("Container", () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <Container testID="component" />
        </AppContextProvider>
      );
    });
  });

  it("should render", () => {
    const { getByTestId } = wrapper;

    expect(getByTestId("component")).toBeTruthy();
  });
});
