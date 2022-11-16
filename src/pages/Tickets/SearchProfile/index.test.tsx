import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import SearchProfile from './index';
import AppContextProvider from '@contexts/appContext';
import { navigationMock, routeMock } from '@utils/testUtils';

let wrapper: RenderAPI;

describe('SearchProfile', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <SearchProfile
            navigation={navigationMock()}
            route={{
              ...routeMock(),
              params: {
                type: 'assignee',
              },
            }}
          />
        </AppContextProvider>
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('search-profile-list')).toBeTruthy();
  });
});
