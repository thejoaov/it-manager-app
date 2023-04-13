import Container from '@components/atoms/Container';
import { useAuthContext } from '@contexts/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useRequest from '@hooks/useRequest';
import useTheme from '@hooks/useTheme';
import { Ticket } from '@models/tickets';
import { useNavigation } from '@react-navigation/native';
import apiService from '@services/api';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Card, Paragraph, Text } from 'react-native-paper';
import { TicketCardContainer } from './styles';

export type TicketCardProps = {
  item: Ticket;
  refreshList?: () => void;
};

const TicketCard: React.FC<TicketCardProps> = ({ item, refreshList }) => {
  const { colors, roundness } = useTheme();
  const { t } = useTranslation('ticketCard');
  const navigation = useNavigation();
  const { user } = useAuthContext();

  const { request: requestAssign, loading: loadingAssign } = useRequest();
  const { request: requestClose, loading: loadingClose } = useRequest();
  const { request: requestProgress, loading: loadingProgress } = useRequest();

  const getPriority = useMemo(() => {
    const iconByPriority: Record<
      (typeof item)['priority'],
      keyof typeof MaterialCommunityIcons.glyphMap
    > = {
      low: 'arrow-down',
      medium: 'minus',
      high: 'arrow-up',
    };

    const colorByPriority: Record<(typeof item)['priority'], string> = {
      high: colors.semantic.high,
      medium: colors.semantic.medium,
      low: colors.semantic.low,
    };

    return {
      icon: iconByPriority[item.priority],
      color: colorByPriority[item.priority],
    };
  }, [colors, item.priority]);

  const getStatus = useMemo(() => {
    const iconByStatus: Record<
      (typeof item)['status'],
      keyof typeof MaterialCommunityIcons.glyphMap
    > = {
      open: 'alert-circle',
      solving: 'circle-double',
      closed: 'check-circle',
    };

    const colorByStatus: Record<(typeof item)['status'], string> = {
      open: colors.status.open,
      solving: colors.status.solving,
      closed: colors.status.closed,
    };

    return {
      icon: iconByStatus[item.status],
      color: colorByStatus[item.status],
    };
  }, [colors, item.status]);

  const getRightContent = useCallback(
    () => (
      <Container mr={10}>
        <MaterialCommunityIcons
          size={20}
          name={
            getPriority.icon as keyof typeof MaterialCommunityIcons.glyphMap
          }
          color={getPriority.color}
        />

        <MaterialCommunityIcons
          size={20}
          name={getStatus.icon as keyof typeof MaterialCommunityIcons.glyphMap}
          color={getStatus.color}
        />
      </Container>
    ),
    [getPriority.color, getPriority.icon, getStatus.color, getStatus.icon]
  );

  const handleEdit = useCallback(() => {
    navigation.navigate('Ticket', {
      type: 'edit',
      ticket: item,
    });
  }, [item, navigation]);

  const assignTo = useCallback(
    async (profileId: number) => {
      try {
        await requestAssign(
          apiService.putTicketById({
            id: item.id,
            assignee_id: profileId,
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
    [item.id, requestAssign]
  );

  const handleAssign = useCallback(() => {
    navigation.navigate('SearchProfile', {
      roleFilter: 'admin-personel',
      handleSelect: async (profile) => {
        await assignTo(profile.user_id);
      },
    });
  }, [assignTo, navigation]);

  const handleClose = useCallback(async () => {
    try {
      await requestClose(
        apiService.putTicketById({
          id: item.id,
          status: 'closed',
        })
      );
      refreshList?.();
    } catch (error) {
      console.log(error);
    }
  }, [item.id, refreshList, requestClose]);

  const handleProgressToSolving = useCallback(async () => {
    try {
      await requestProgress(
        apiService.putTicketById({
          id: item.id,
          status: 'solving',
          assignee_id: user?.profile?.id,
        })
      );
      refreshList?.();
    } catch (error) {
      console.log(error);
    }
  }, [item.id, refreshList, requestProgress, user?.profile?.id]);

  return (
    <TicketCardContainer testID="ticketCard-container">
      <Card style={{ borderRadius: roundness * 3 }}>
        <Card.Title
          title={item.title}
          subtitle={item.opener?.name ?? item.opener?.user.email}
          right={getRightContent}
          // left={getLeftContent}
        />

        <Card.Content>
          {item.description && (
            <Paragraph numberOfLines={2}>{item.description}</Paragraph>
          )}
          <Container flexDirection="row" alignItems="center" marginTop={10}>
            <Container marginRight={2}>
              <MaterialCommunityIcons
                size={20}
                name="map-marker"
                color={colors.onSurface}
              />
            </Container>
            <Text numberOfLines={1} variant="labelSmall">
              {item.location}
            </Text>
          </Container>
          <Container flexDirection="row" alignItems="center">
            <Container marginRight={2}>
              <MaterialCommunityIcons
                size={20}
                name="account-alert"
                color={colors.onSurface}
              />
            </Container>
            <Text numberOfLines={1} variant="labelSmall">
              {item.assignee?.name ?? (
                <Text
                  numberOfLines={1}
                  variant="labelSmall"
                  style={{ color: colors.error }}
                >
                  {t('unassigned')}
                </Text>
              )}
            </Text>
          </Container>
        </Card.Content>
        <Card.Actions>
          <>
            {['admin', 'manager', 'support'].includes(
              user?.profile?.role || ''
            ) &&
              !item.assignee_id && (
                <Button onPress={handleAssign} loading={loadingAssign}>
                  {t('common:buttons.assignTicket')}
                </Button>
              )}

            {(item.status === 'open' ||
              ['admin', 'manager', 'support'].includes(
                user?.profile?.role || ''
              )) && (
              <Button onPress={handleEdit}>{t('common:buttons.edit')}</Button>
            )}

            {item.status === 'open' &&
              ['technician'].includes(user?.profile?.role as string) && (
                <Button
                  onPress={handleProgressToSolving}
                  loading={loadingProgress}
                  mode="contained"
                >
                  {t('common:buttons.progressToSolving')}
                </Button>
              )}

            {item.status === 'solving' && (
              <Button
                onPress={handleClose}
                loading={loadingClose}
                mode="outlined"
              >
                {t('common:buttons.closeTicket')}
              </Button>
            )}
          </>
        </Card.Actions>
      </Card>
    </TicketCardContainer>
  );
};

export default TicketCard;
