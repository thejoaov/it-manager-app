import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import AdminDashboardTemplate from './index';
import AppContextProvider from '@contexts/appContext';

let wrapper: RenderAPI;

describe('AdminDashboardTemplate', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <AdminDashboardTemplate
            open={[]}
            reload={jest.fn()}
            reloading={false}
            solving={[]}
          />
        </AppContextProvider>
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('adminDashboardTemplate-container')).toBeTruthy();
  });
});
