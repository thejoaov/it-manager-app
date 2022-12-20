import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import TechnicianDashboardTemplate from './index';
import AppContextProvider from '@contexts/appContext';

let wrapper: RenderAPI;

describe('TechnicianDashboardTemplate', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <TechnicianDashboardTemplate
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

    expect(getByTestId('technicianDashboardTemplate-container')).toBeTruthy();
  });
});
