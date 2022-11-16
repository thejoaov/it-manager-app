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
              assignee: {
                id: 1,
                birthdate: '2021-01-01',
                created_at: '2021-01-01',
                job_title: 'job_title',
                role: 'admin',
                start_date: '2021-01-01',
                telephone: '86 9927373823',
                updated_at: '2021-01-01',
                user_id: 1,
                name: 'John Doe',
                user: {
                  id: 1,
                  email: '',
                  created_at: '',
                  updated_at: '',
                  remember_me_token: null,
                  username: '',
                },
              },
              assignee_id: 1,
              created_at: '2021-01-01T00:00:00.000Z',
              description: 'Description',
              id: 1,

              location: 'Location',
              opener: {
                id: 1,
                birthdate: '2021-01-01',
                created_at: '2021-01-01',
                job_title: 'job_title',
                role: 'admin',
                start_date: '2021-01-01',
                telephone: '86 9927373823',
                updated_at: '2021-01-01',
                user_id: 1,
                name: 'John Doe',
                user: {
                  id: 1,
                  email: '',
                  created_at: '',
                  updated_at: '',
                  remember_me_token: null,
                  username: '',
                },
              },
              opener_id: 1,
              priority: 'low',
              status: 'open',
              title: 'Title',
              updated_at: '2021-01-01T00:00:00.000Z',
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
