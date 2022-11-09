import React from "react";
import { render, waitFor, RenderAPI } from "@testing-library/react-native";
import Flexbox from "./index";

let wrapper: RenderAPI;
const onChangeText = jest.fn();

describe("Flexbox", () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(<Flexbox testID="component" />);
    });
  });

  it("should render", () => {
    const { getByTestId } = wrapper;

    expect(getByTestId("component")).toBeTruthy();
  });
});
