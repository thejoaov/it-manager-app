import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import TicketListTemplate from './index';
import AppContextProvider from '@contexts/appContext';

let wrapper: RenderAPI;

describe('TicketListTemplate', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <TicketListTemplate />
        </AppContextProvider>
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('ticketListTemplate-container')).toBeTruthy();
  });
});
