import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import SelectInput from './index';

let wrapper: RenderAPI;

describe('SelectInput', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <SelectInput
          onPress={() => jest.fn()}
          values={[
            {
              title: 'title',
              onPress: () => jest.fn(),
              leadingIcon: 'account',
            },
            {
              title: 'title',
              onPress: () => jest.fn(),
              leadingIcon: 'account',
            },
          ]}
        />
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('selectInput-container')).toBeTruthy();
  });
});
