import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import SelectInput from './index';
import AppContextProvider from '@contexts/appContext';

let wrapper: RenderAPI;

describe('SelectInput', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <SelectInput />
        </AppContextProvider>
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('selectInput-container')).toBeTruthy();
  });
});
