import Container from '@components/atoms/Container';
import TicketCard from '@components/molecules/TicketCard';
import useRequest from '@hooks/useRequest';
import useTheme from '@hooks/useTheme';
import { Ticket } from '@models/tickets';
import apiService from '@services/api';
import { ResponseGetTickets } from '@services/api/types';
import { uniqBy } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Badge, IconButton, Text } from 'react-native-paper';
import { Carousel } from 'react-native-snap-carousel';

export type AdminDashboardTemplateProps = {
  open: Ticket[];
  solving: Ticket[];
  reload: () => void;
  reloading: boolean;
};

const AdminDashboardTemplate: React.FC<AdminDashboardTemplateProps> = ({
  open,
  solving,
  reload,
  reloading,
}) => {
  const { width } = useWindowDimensions();
  const { t } = useTranslation('dashboard');
  const { colors } = useTheme();

  const [closedTickets, setClosedTickets] = useState<Ticket[]>([]);
  const [closedTicketsPage, setClosedTicketsPage] = useState(1);
  const [closedTicketsVisible, setClosedTicketsVisible] = useState(false);

  const { request, meta, loading } = useRequest<ResponseGetTickets>();

  const unassigned = useMemo(() => {
    const tickets = [...open, ...solving];

    return tickets.filter((ticket) => !ticket.assignee_id);
  }, [open, solving]);

  const getClosedTicketsPaginated = useCallback(async () => {
    try {
      const response = await request(
        apiService.getTickets({
          page: closedTicketsPage,
          status: 'closed',
          sort: 'asc',
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

  useEffect(() => {
    getClosedTicketsPaginated();
  }, [getClosedTicketsPaginated]);

  return (
    <FlatList
      testID="AdminDashboardTemplate-container"
      refreshing={reloading}
      onRefresh={reload}
      data={
        closedTicketsVisible ? uniqBy(closedTickets, (data) => data.id) : []
      }
      keyExtractor={(item) => item.id.toString()}
      onEndReached={onScrollEnd}
      onEndReachedThreshold={0.8}
      ListFooterComponent={
        loading ? (
          <Container m={10}>
            <ActivityIndicator />
          </Container>
        ) : (
          <Container mb={2} />
        )
      }
      ListHeaderComponent={
        <>
          <Container my={1}>
            <Container ml={3} alignItems="center" flexDirection="row">
              <Text variant="headlineSmall">{t('solvingTitle')}</Text>
              <Container ml={2}>
                <Badge>{solving.length}</Badge>
              </Container>
            </Container>
            {solving.length ? (
              <Carousel
                data={solving}
                itemWidth={width * 0.93}
                vertical={false}
                renderItem={({ item }) => (
                  <TicketCard
                    item={item}
                    refreshList={() => {
                      reload();
                      getClosedTicketsPaginated();
                    }}
                  />
                )}
                sliderWidth={width}
                inactiveSlideScale={0.97}
              />
            ) : (
              <Container ml={3} justifyContent="center" my={2}>
                <Text variant="bodySmall" style={{ color: colors.outline }}>
                  {t('noSolvingTickets')}
                </Text>
              </Container>
            )}
          </Container>

          <Container my={1}>
            <Container ml={3} alignItems="center" flexDirection="row">
              <Text variant="headlineSmall">{t('openTitle')}</Text>
              <Container ml={2}>
                <Badge>{open.length}</Badge>
              </Container>
            </Container>
            {open.length ? (
              <Carousel
                data={open}
                itemWidth={width * 0.93}
                vertical={false}
                renderItem={({ item }) => (
                  <TicketCard
                    item={item}
                    refreshList={() => {
                      reload();
                      getClosedTicketsPaginated();
                    }}
                  />
                )}
                sliderWidth={width}
                inactiveSlideScale={0.97}
              />
            ) : (
              <Container ml={3} justifyContent="center" my={2}>
                <Text variant="bodySmall" style={{ color: colors.outline }}>
                  {t('noUnassignedTickets')}
                </Text>
              </Container>
            )}
          </Container>

          <Container my={1}>
            <Container ml={3} alignItems="center" flexDirection="row">
              <Text variant="headlineSmall">{t('unassignedTitle')}</Text>
              <Container ml={2}>
                <Badge>{unassigned.length}</Badge>
              </Container>
            </Container>
            {unassigned.length ? (
              <Carousel
                data={unassigned}
                itemWidth={width * 0.93}
                vertical={false}
                renderItem={({ item }) => (
                  <TicketCard
                    item={item}
                    refreshList={() => {
                      reload();
                      getClosedTicketsPaginated();
                    }}
                  />
                )}
                sliderWidth={width}
                inactiveSlideScale={0.97}
              />
            ) : (
              <Container ml={3} justifyContent="center" my={2}>
                <Text variant="bodySmall" style={{ color: colors.outline }}>
                  {t('noUnassignedTickets')}
                </Text>
              </Container>
            )}
          </Container>

          <Container ml={3} my={1} alignItems="center" flexDirection="row">
            <Text variant="headlineSmall">{t('closedTitle')}</Text>
            <Container ml={2}>{meta && <Badge>{meta?.total}</Badge>}</Container>
            <IconButton
              icon={closedTicketsVisible ? 'chevron-down' : 'chevron-right'}
              onPress={() => setClosedTicketsVisible((prevState) => !prevState)}
            />
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

export default AdminDashboardTemplate;
