import React, { useCallback, useMemo } from 'react';
import { Appbar } from 'react-native-paper';

import { AppStackScreenProps } from '@routes/types';
import { useTranslation } from 'react-i18next';
import useRequest from '@hooks/useRequest';
import apiService from '@services/api';
import Loading from '@components/organisms/Loading';
import { ResponseGetDashboard } from '@services/api/types';

import { useFocusEffect } from '@react-navigation/native';

import { useAuthContext } from '@contexts/auth';
import { Profile } from '@models/user';
import AdminDashboardTemplate from '@components/templates/AdminDashboardTemplate';
import UserDashboardTemplate from '@components/templates/UserDashboardTemplate';
import TechnicianDashboardTemplate from '@components/templates/TechnicianDashboardTemplate';
import Page from '@components/atoms/Page';

const Dashboard: React.FC<AppStackScreenProps<'Dashboard'>> = ({
  navigation,
}) => {
  const { t } = useTranslation('dashboard');
  const { loading, request, response } = useRequest<ResponseGetDashboard>();

  const { user } = useAuthContext();

  const requestDashboard = useCallback(async () => {
    try {
      await request(apiService.getDashboard());
    } catch (err) {
      console.log(err);
    }
  }, [request]);

  useFocusEffect(
    useCallback(() => {
      requestDashboard();
    }, [requestDashboard])
  );

  const getDashboardByRole = useMemo(() => {
    const open = response?.open || [];
    const solving = response?.solving || [];

    const componetByRole: Record<Profile['role'], JSX.Element> = {
      admin: (
        <AdminDashboardTemplate
          open={open}
          solving={solving}
          reload={requestDashboard}
          reloading={loading}
        />
      ),
      manager: (
        <AdminDashboardTemplate
          open={open}
          solving={solving}
          reload={requestDashboard}
          reloading={loading}
        />
      ),
      support: (
        <AdminDashboardTemplate
          open={open}
          solving={solving}
          reload={requestDashboard}
          reloading={loading}
        />
      ),
      user: (
        <UserDashboardTemplate
          open={open}
          solving={solving}
          reload={requestDashboard}
          reloading={loading}
        />
      ),
      technician: (
        <TechnicianDashboardTemplate
          open={open}
          solving={solving}
          reload={requestDashboard}
          reloading={loading}
        />
      ),
      guest: <></>,
    };

    return componetByRole[user?.profile?.role || 'user'];
  }, [
    loading,
    requestDashboard,
    response?.open,
    response?.solving,
    user?.profile?.role,
  ]);

  return (
    <Page testID="dashboard">
      <Appbar.Header mode="small">
        <Appbar.Content title={t('title')} />
        <Appbar.Action icon="magnify" />
        <Appbar.Action
          icon="plus"
          onPress={() => {
            navigation.navigate('Ticket', {
              type: 'new',
            });
          }}
        />
      </Appbar.Header>

      {loading ? <Loading /> : getDashboardByRole}
    </Page>
  );
};
export default Dashboard;
