import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import UserDashboardTemplate from './index';
import AppContextProvider from '@contexts/appContext';

let wrapper: RenderAPI;

describe('UserDashboardTemplate', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <UserDashboardTemplate
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

    expect(getByTestId('userDashboardTemplate-container')).toBeTruthy();
  });
});
