import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import Loading from './index';
import AppContextProvider from '@contexts/appContext';

let wrapper: RenderAPI;

describe('Loading', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <Loading />
        </AppContextProvider>
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('loading-container')).toBeTruthy();
  });
});
