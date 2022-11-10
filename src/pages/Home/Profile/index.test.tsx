import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import Profile from './index';
import { navigationMock, routeMock } from '@utils/testUtils';

jest.mock('@contexts/auth', () => ({
  useAuthContext: () => ({
    user: {
      email: 'johndoe@gmail.com',
      username: 'johndoe',
      created_at: '2021-01-01T00:00:00.000Z',
      updated_at: '2021-01-01T00:00:00.000Z',
      profile: {
        name: 'John Doe',
        job_title: 'Developer',
        role: 'admin',
        birthdate: '1990-01-01',
        start_date: '2020-01-01',
        telephone: '86 999766527',
      },
    },
    requestLogout: jest.fn(),
  }),
}));

let wrapper: RenderAPI;

describe('Profile', () => {
  beforeEach(() => {
    wrapper = render(
      <>
        <Profile navigation={navigationMock()} route={routeMock()} />
      </>
    );
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('profile')).toBeTruthy();
    expect(getByTestId('profile-avatar')).toBeTruthy();
    expect(getByTestId('profile-info-container')).toBeTruthy();
    expect(getByTestId('profile-info-chip-job-title')).toBeTruthy();
    expect(getByTestId('profile-info-chip-role')).toBeTruthy();
    expect(getByTestId('profile-info-chip-birthdate')).toBeTruthy();
    expect(getByTestId('profile-info-chip-start-date')).toBeTruthy();
    expect(getByTestId('profile-info-chip-telephone')).toBeTruthy();
    expect(getByTestId('profile-name')).toBeTruthy();
    expect(getByTestId('profile-username')).toBeTruthy();
    expect(getByTestId('profile-email')).toBeTruthy();
    expect(getByTestId('profile-logout-button')).toBeTruthy();
    expect(getByTestId('profile-edit-button')).toBeTruthy();
  });
});
