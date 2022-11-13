import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import DateInput from './index';
import AppContextProvider from '@contexts/appContext';

let wrapper: RenderAPI;

describe('DateInput', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <DateInput
            inputMode="end"
            label="test"
            onChange={jest.fn()}
            value={new Date()}
          />
        </AppContextProvider>
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('dateInput-container')).toBeTruthy();
  });
});
