import React from "react";
import { render, waitFor, RenderAPI } from "@testing-library/react-native";
import App from "./index";

let wrapper: RenderAPI;

describe("App", () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(<App />);
    });
  });

  it("should render", () => {
    const { getByTestId } = wrapper;

    expect(getByTestId("app-container")).toBeTruthy();
  });
});
