import React from "react";
import { render, waitFor, RenderAPI } from "@testing-library/react-native";
import TicketCard from "./index";
import AppContextProvider from "@contexts/appContext";

let wrapper: RenderAPI;

describe("TicketCard", () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <TicketCard />
        </AppContextProvider>
      );
    });
  });

  it("should render", () => {
    const { getByTestId } = wrapper;

    expect(getByTestId("ticketCard-container")).toBeTruthy();
  });
});
