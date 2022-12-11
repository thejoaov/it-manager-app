import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import ProfileEdit from './index';
import { navigationMock, routeMock } from '@utils/testUtils';
import { SafeAreaProvider } from 'react-native-safe-area-context';

let wrapper: RenderAPI;

jest.mock('@hooks/useRequest', () => () => ({
  loading: false,
  request: jest.fn(),
}));

jest.mock('@contexts/auth', () => ({
  useAuthContext: () => ({
    user: {
      id: 1,
      profile: {
        name: 'John Doe',
        job_title: 'Developer',
        telephone: '123456789',
      },
    },
    requestUserInfo: jest.fn(),
  }),
}));

describe('ProfileEdit', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <SafeAreaProvider>
          <ProfileEdit navigation={navigationMock()} route={routeMock()} />
        </SafeAreaProvider>
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('profileEdit')).toBeTruthy();
  });
});
