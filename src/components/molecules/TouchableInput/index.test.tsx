import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import TouchableInput from './index';
import AppContextProvider from '@contexts/appContext';

let wrapper: RenderAPI;

describe('TouchableInput', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <TouchableInput onPress={jest.fn()} />
        </AppContextProvider>
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('TouchableInput-container')).toBeTruthy();
  });
});
