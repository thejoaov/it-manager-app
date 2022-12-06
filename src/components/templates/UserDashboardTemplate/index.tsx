import Container from '@components/atoms/Container';
import TicketCard from '@components/molecules/TicketCard';
import useRequest from '@hooks/useRequest';
import { TicketFull } from '@models/tickets';
import apiService from '@services/api';
import { ResponseGetTickets } from '@services/api/types';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Badge, Text } from 'react-native-paper';
import { Carousel } from 'react-native-snap-carousel';

export type UserDashboardTemplateProps = {
  open: TicketFull[];
  solving: TicketFull[];
  reload: () => void;
  reloading: boolean;
};

const UserDashboardTemplate: React.FC<UserDashboardTemplateProps> = ({
  open,
  solving,
  reload,
  reloading,
}) => {
  const [closedTickets, setClosedTickets] = useState<TicketFull[]>([]);
  const [closedTicketsPage, setClosedTicketsPage] = useState(1);

  const { request, meta, loading } = useRequest<ResponseGetTickets>();

  const getClosedTicketsPaginated = useCallback(async () => {
    try {
      const response = await request(
        apiService.getTickets({
          page: closedTicketsPage,
          status: 'closed',
          sort: 'closed_at',
          per_page: 10,
        })
      );

      setClosedTickets((old) => [...old, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  }, [closedTicketsPage, request]);

  const onScrollEnd = useCallback(() => {
    if ((meta?.current_page || 0) < (meta?.last_page || 1)) {
      setClosedTicketsPage((old) => old + 1);
    }
  }, [meta?.current_page, meta?.last_page]);

  const { width } = useWindowDimensions();
  const { t } = useTranslation('userDashboard');

  useEffect(() => {
    getClosedTicketsPaginated();
  }, [getClosedTicketsPaginated]);

  return (
    <FlatList
      testID="userDashboardTemplate-container"
      refreshing={reloading}
      onRefresh={reload}
      data={closedTickets}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={onScrollEnd}
      onEndReachedThreshold={0.8}
      ListFooterComponent={
        loading ? (
          <Container m={10}>
            <ActivityIndicator />
          </Container>
        ) : null
      }
      ListHeaderComponent={
        <>
          <Container ml={20} my={1} alignItems="center" flexDirection="row">
            <Text variant="headlineSmall">{t('solvingTitle')}</Text>
            <Container ml={2}>
              <Badge>{solving.length}</Badge>
            </Container>
          </Container>
          <Carousel
            data={solving}
            itemWidth={width * 0.93}
            vertical={false}
            renderItem={({ item }) => <TicketCard item={item} />}
            sliderWidth={width}
            inactiveSlideScale={0.97}
          />

          <Container
            ml={20}
            mb={1}
            mt={20}
            alignItems="center"
            flexDirection="row"
          >
            <Text variant="headlineSmall">{t('openTitle')}</Text>
            <Container ml={2}>
              <Badge>{open.length}</Badge>
            </Container>
          </Container>
          <Carousel
            data={open}
            itemWidth={width * 0.93}
            vertical={false}
            renderItem={({ item }) => <TicketCard item={item} />}
            sliderWidth={width}
            inactiveSlideScale={0.97}
          />

          <Container
            ml={20}
            mb={1}
            mt={30}
            alignItems="center"
            flexDirection="row"
          >
            <Text variant="headlineSmall">{t('closedTitle')}</Text>
            <Container ml={2}>{meta && <Badge>{meta?.total}</Badge>}</Container>
          </Container>
        </>
      }
      renderItem={({ item, index }) => (
        <Container
          key={item.id}
          mx={1}
          mb={index === closedTickets.length - 1 ? 10 : 0}
        >
          <TicketCard item={item} />
        </Container>
      )}
    />
  );
};

export default UserDashboardTemplate;
