import React from 'react';
import { render, waitFor, RenderAPI } from '@testing-library/react-native';
import TicketCard from './index';
import AppContextProvider from '@contexts/appContext';

let wrapper: RenderAPI;

describe('TicketCard', () => {
  beforeEach(async () => {
    await waitFor(() => {
      wrapper = render(
        <AppContextProvider>
          <TicketCard
            item={{
              assignee_id: 1,
              created_at: '2021-03-01T00:00:00.000Z',
              description: 'description',
              id: 1,
              location: 'location',
              opener_id: 1,
              priority: 'low',
              status: 'open',
              title: 'title',
              updated_at: '2021-03-01T00:00:00.000Z',
            }}
          />
        </AppContextProvider>
      );
    });
  });

  it('should render', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('ticketCard-container')).toBeTruthy();
  });
});
