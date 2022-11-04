import React from "react";
import { render, waitFor, RenderAPI } from "@testing-library/react-native";
import Register from "./index";
import AppContextProvider from "@contexts/appContext";
import { navigationMock, routeMock } from "@utils/testUtils";

let wrapper: RenderAPI;
const onChangeText = jest.fn();

describe("Register", () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <Register navigation={navigationMock()} route={routeMock()} />
        </AppContextProvider>
      );
    });
  });

  it("should render", () => {
    const { getByTestId } = wrapper;

    expect(getByTestId("login")).toBeTruthy();
  });
});
