import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import ModalTemplate from './index';
import AppContextProvider from '@contexts/appContext';
import { Text } from 'react-native-paper';

let wrapper: RenderAPI;

describe('ModalTemplate', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <ModalTemplate onBackPress={jest.fn()} title="title">
            <Text testID="modal-content">children</Text>
          </ModalTemplate>
        </AppContextProvider>
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('modal-template-container')).toBeTruthy();
    expect(getByTestId('modal-appbar')).toBeTruthy();
    expect(getByTestId('modal-appbar-backbutton')).toBeTruthy();
    expect(getByTestId('modal-appbar-title')).toBeTruthy();
    expect(getByTestId('modal-body')).toBeTruthy();
    expect(getByTestId('modal-content')).toBeTruthy();
  });
});
