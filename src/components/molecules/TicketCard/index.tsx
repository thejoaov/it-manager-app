import Container from '@components/atoms/Container';
import { useAuthContext } from '@contexts/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTheme from '@hooks/useTheme';
import { TicketFull } from '@models/tickets';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Card, Paragraph, Text } from 'react-native-paper';
import { TicketCardContainer } from './styles';

export type TicketCardProps = {
  item: TicketFull;
};

const TicketCard: React.FC<TicketCardProps> = ({ item }) => {
  const { colors, roundness } = useTheme();
  const { t } = useTranslation('ticketCard');
  const navigation = useNavigation();
  const { user } = useAuthContext();

  const getPriority = useMemo(() => {
    const iconByPriority: Record<
      typeof item['priority'],
      keyof typeof MaterialCommunityIcons.glyphMap
    > = {
      low: 'arrow-down',
      medium: 'minus',
      high: 'arrow-up',
    };

    const colorByPriority: Record<typeof item['priority'], string> = {
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
      typeof item['status'],
      keyof typeof MaterialCommunityIcons.glyphMap
    > = {
      open: 'alert-circle',
      solving: 'circle-double',
      closed: 'check-circle',
    };

    const colorByStatus: Record<typeof item['status'], string> = {
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

  const handlePress = useCallback(() => {
    navigation.navigate('Ticket', {
      type: 'edit',
      ticket: item,
    });
  }, [item, navigation]);

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
          <Paragraph numberOfLines={2}>{item.description}</Paragraph>
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
          {(item.status === 'open' ||
            ['admin', 'manager', 'support'].includes(
              user?.profile?.role || ''
            )) && (
            <Button onPress={handlePress}>{t('common:buttons.edit')}</Button>
          )}
        </Card.Actions>
      </Card>
    </TicketCardContainer>
  );
};

export default TicketCard;
