import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import AppContextProvider from '@contexts/appContext';
import Input from './index';

let wrapper: RenderAPI;
const onChangeText = jest.fn();

describe('Input', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <Input
            ref={React.createRef()}
            onChangeText={onChangeText}
            testID="input-outlined"
          />
        </AppContextProvider>
      );
    });
  });

  it('should render', async () => {
    const { getByTestId } = wrapper;

    await waitFor(() => {
      expect(getByTestId('input-outlined')).toBeTruthy();
    });
  });

  it('should render with secureTextEntry', async () => {
    await waitFor(() => {
      wrapper = render(
        <Input
          ref={React.createRef()}
          onChangeText={onChangeText}
          secureTextEntry
          showSecureButton
          testID="input-outlined"
        />
      );
    });

    const { getByTestId } = wrapper;

    await waitFor(() => {
      expect(getByTestId('input-outlined')).toBeTruthy();
    });
  });
});
