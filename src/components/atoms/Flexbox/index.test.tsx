import React from "react";
import { render, waitFor, RenderAPI } from "@testing-library/react-native";
import Flexbox from "./index";
import AppContextProvider from "@contexts/appContext";

let wrapper: RenderAPI;

describe("Flexbox", () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <Flexbox testID="component" />
        </AppContextProvider>
      );
    });
  });

  it("should render", () => {
    const { getByTestId } = wrapper;

    expect(getByTestId("component")).toBeTruthy();
  });
});
