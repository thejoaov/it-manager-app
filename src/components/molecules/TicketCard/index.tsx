import Container from '@components/atoms/Container';
import { useAuthContext } from '@contexts/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTheme from '@hooks/useTheme';
import { TicketFull } from '@models/tickets';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
// import { useColorScheme } from 'react-native';
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

  const getPriorityIcon = useMemo(() => {
    const iconByPriority: Record<typeof item['priority'], string> = {
      low: 'arrow-down',
      medium: 'minus',
      high: 'arrow-up',
    };

    return iconByPriority[item.priority];
  }, [item.priority]);

  const getPriorityColor = useMemo(() => {
    const colorByPriority: Record<typeof item['priority'], string> = {
      low: colors.secondaryContainer,
      medium: colors.onPrimaryContainer,
      high: colors.error,
    };

    return colorByPriority[item.priority];
  }, [colors, item.priority]);

  const getRightContent = useCallback(
    () => (
      <Container mr={10}>
        <MaterialCommunityIcons
          size={20}
          name={getPriorityIcon as keyof typeof MaterialCommunityIcons.glyphMap}
          color={getPriorityColor}
        />
      </Container>
    ),
    [getPriorityIcon, getPriorityColor]
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
          {['manager', 'admin'].includes(String(user?.profile?.role)) && (
            <Button onPress={handlePress}>{t('common:buttons.edit')}</Button>
          )}
        </Card.Actions>
      </Card>
    </TicketCardContainer>
  );
};

export default TicketCard;
