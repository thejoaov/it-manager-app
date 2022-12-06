import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import DashboardTemplate from './index';
import AppContextProvider from '@contexts/appContext';

let wrapper: RenderAPI;

describe('DashboardTemplate', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <DashboardTemplate />
        </AppContextProvider>
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('dashboardTemplate-container')).toBeTruthy();
  });
});
