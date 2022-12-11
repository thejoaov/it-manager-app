import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import PressableInput from './index';
import AppContextProvider from '@contexts/appContext';

let wrapper: RenderAPI;

describe('PressableInput', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <PressableInput />
        </AppContextProvider>
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('pressableInput-container')).toBeTruthy();
  });
});
