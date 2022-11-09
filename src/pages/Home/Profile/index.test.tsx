import React from "react";
import { render, waitFor, RenderAPI } from "@testing-library/react-native";
import Profile from "./index";
import AppContextProvider from "@contexts/appContext";
import { navigationMock, routeMock } from "@utils/testUtils";

let wrapper: RenderAPI;

describe("Profile", () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <Profile navigation={navigationMock()} route={routeMock()} />
        </AppContextProvider>
      );
    });
  });

  it("should render", () => {
    const { getByTestId } = wrapper;

    expect(getByTestId("profile")).toBeTruthy();
  });
});
