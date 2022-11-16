import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import SearchTemplate from './index';
import AppContextProvider from '@contexts/appContext';

let wrapper: RenderAPI;

describe('SearchTemplate', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <SearchTemplate />
        </AppContextProvider>
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('searchTemplate-container')).toBeTruthy();
  });
});
