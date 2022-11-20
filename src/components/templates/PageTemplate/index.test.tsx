import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import PageTemplate from './index';
import AppContextProvider from '@contexts/appContext';
import { Text } from 'react-native-paper';

let wrapper: RenderAPI;

describe('PageTemplate', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <PageTemplate onBackPress={jest.fn()} title="title">
            <Text testID="page-content">children</Text>
          </PageTemplate>
        </AppContextProvider>
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('page-template-container')).toBeTruthy();
    expect(getByTestId('page-header')).toBeTruthy();
    expect(getByTestId('page-header-backbutton')).toBeTruthy();
    expect(getByTestId('page-header-title')).toBeTruthy();
    expect(getByTestId('page-body')).toBeTruthy();
    expect(getByTestId('page-content')).toBeTruthy();
  });
});
