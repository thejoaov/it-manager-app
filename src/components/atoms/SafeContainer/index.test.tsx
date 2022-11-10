import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import SafeContainer from './index';
import AppContextProvider from '@contexts/appContext';

let wrapper: RenderAPI;

describe('SafeContainer', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <SafeContainer testID="component" />
        </AppContextProvider>
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('component')).toBeTruthy();
  });
});
