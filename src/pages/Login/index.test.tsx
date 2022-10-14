import React from "react";
import { render, waitFor, RenderAPI } from "@testing-library/react-native";
import { Login } from "./index";

let wrapper: RenderAPI;
const onChangeText = jest.fn();

describe("Login", () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(<Login />);
    });
  });

  it("should render", () => {
    const { getByTestId } = wrapper;

    expect(getByTestId("login")).toBeTruthy();
  });
});
