import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import EasterEgg from './index';
import AppContextProvider from '@contexts/appContext';
import { navigationMock, routeMock } from '@utils/testUtils';

let wrapper: RenderAPI;

describe('EasterEgg', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <EasterEgg navigation={navigationMock()} route={routeMock()} />
        </AppContextProvider>
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('easterEgg')).toBeTruthy();
  });
});
