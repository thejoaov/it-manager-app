import React, { useMemo } from 'react';
import Container from '@components/atoms/Container';
import TicketCard from '@components/molecules/TicketCard';
import { Ticket } from '@models/tickets';
import { useTranslation } from 'react-i18next';
import { FlatList, useWindowDimensions } from 'react-native';
import { Badge, Text } from 'react-native-paper';
import { Carousel } from 'react-native-snap-carousel';
import { useAuthContext } from '@contexts/auth';

export type TechnicianDashboardTemplateProps = {
  open: Ticket[];
  solving: Ticket[];
  reload: () => void;
  reloading: boolean;
};

const TechnicianDashboardTemplate: React.FC<
  TechnicianDashboardTemplateProps
> = ({ open, solving, reload, reloading }) => {
  const { width } = useWindowDimensions();
  const { t } = useTranslation('dashboard');
  const { user } = useAuthContext();

  const assignedToMe = useMemo(() => {
    return open.filter((ticket) => ticket.assignee_id === user?.id);
  }, [open, user?.id]);

  return (
    <FlatList
      testID="technicianDashboardTemplate-container"
      refreshing={reloading}
      onRefresh={reload}
      data={open}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <>
          <Container
            ml={20}
            mb={1}
            mt={20}
            alignItems="center"
            flexDirection="row"
          >
            <Text variant="headlineSmall">{t('currentlySolvingTitle')}</Text>
            <Container ml={2}>
              <Badge>{solving.length}</Badge>
            </Container>
          </Container>
          <Carousel
            data={solving}
            itemWidth={width * 0.93}
            vertical={false}
            renderItem={({ item }) => (
              <Container py={1}>
                <TicketCard refreshList={reload} item={item} />
              </Container>
            )}
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
            <Text variant="headlineSmall">{t('assignedToMeTitle')}</Text>
            <Container ml={2}>
              <Badge>{assignedToMe.length}</Badge>
            </Container>
          </Container>
          <Carousel
            data={assignedToMe}
            itemWidth={width * 0.93}
            vertical={false}
            renderItem={({ item }) => (
              <TicketCard refreshList={reload} item={item} />
            )}
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
        </>
      }
      renderItem={({ item, index }) => (
        <Container key={item.id} mx={1} mb={index === open.length - 1 ? 10 : 0}>
          <TicketCard item={item} refreshList={reload} />
        </Container>
      )}
    />
  );
};

export default TechnicianDashboardTemplate;
