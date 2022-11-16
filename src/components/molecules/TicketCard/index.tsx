import Container from '@components/atoms/Container';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTheme from '@hooks/useTheme';
import { TicketFull } from '@models/tickets';
import React, { useCallback, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { Card, Paragraph, Text } from 'react-native-paper';
import { TicketCardContainer } from './styles';

export type TicketCardProps = {
  item: TicketFull;
};

const TicketCard: React.FC<TicketCardProps> = ({ item }) => {
  const { colors } = useTheme();
  const scheme = useColorScheme();

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

  return (
    <TicketCardContainer testID="ticketCard-container">
      <Card mode={scheme === 'dark' ? 'contained' : 'elevated'}>
        <Card.Title
          title={item.title}
          subtitle={item.opener?.name ?? item.opener?.user.email}
          right={getRightContent}
        />

        <Card.Content>
          <Paragraph numberOfLines={2}>{item.description}</Paragraph>
          <Container flexDirection="row" alignItems="center" marginTop={10}>
            <Container marginRight={1}>
              <MaterialCommunityIcons
                size={20}
                name="map-marker"
                color={colors.backdrop}
              />
            </Container>
            <Text numberOfLines={1} variant="labelSmall">
              {item.location}
            </Text>
          </Container>
          <Container flexDirection="row" alignItems="center">
            <Container marginRight={1}>
              <MaterialCommunityIcons
                size={20}
                name="account-alert"
                color={colors.backdrop}
              />
            </Container>
            <Text numberOfLines={1} variant="labelSmall">
              {item.assignee?.name ?? item.assignee?.user.email}
            </Text>
          </Container>
        </Card.Content>
      </Card>
    </TicketCardContainer>
  );
};

export default TicketCard;
