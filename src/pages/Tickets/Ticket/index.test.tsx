import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import Ticket from './index';
import AppContextProvider from '@contexts/appContext';
import { navigationMock, routeMock } from '@utils/testUtils';

let wrapper: RenderAPI;

describe('Ticket', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <Ticket
            navigation={navigationMock()}
            route={routeMock('Ticket', { type: 'new' })}
          />
        </AppContextProvider>
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('ticket-container')).toBeTruthy();
  });
});
