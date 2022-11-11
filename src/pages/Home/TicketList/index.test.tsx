import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import TicketList from './index';
import AppContextProvider from '@contexts/appContext';
import { navigationMock, routeMock } from '@utils/testUtils';
import { NavigationContainer } from '@react-navigation/native';

let wrapper: RenderAPI;

jest.mock('@hooks/useRequest', () => {
  return jest.fn().mockImplementation(() => ({
    data: [],
    loading: false,
    error: null,
    meta: null,
    request: jest.fn(),
  }));
});

describe('TicketList', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <NavigationContainer>
            <TicketList
              navigation={navigationMock('ticket')}
              route={routeMock()}
            />
          </NavigationContainer>
        </AppContextProvider>
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('ticket-list')).toBeTruthy();
  });
});
