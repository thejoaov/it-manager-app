import React from "react";
import { render, waitFor, RenderAPI } from "@testing-library/react-native";
import SafeContainer from "./index";

let wrapper: RenderAPI;
const onChangeText = jest.fn();

describe("SafeContainer", () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(<SafeContainer testID="component" />);
    });
  });

  it("should render", () => {
    const { getByTestId } = wrapper;

    expect(getByTestId("component")).toBeTruthy();
  });
});
