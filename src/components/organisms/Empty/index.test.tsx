import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import Empty from './index';
import AppContextProvider from '@contexts/appContext';

let wrapper: RenderAPI;

describe('Empty', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <Empty text="text" />
        </AppContextProvider>
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('empty-container')).toBeTruthy();
    expect(getByTestId('empty-icon')).toBeTruthy();
    expect(getByTestId('empty-text')).toBeTruthy();
  });
});
