import React from 'react';
import Container from '@components/atoms/Container';
import TicketCard from '@components/molecules/TicketCard';
import { Ticket } from '@models/tickets';
import { useTranslation } from 'react-i18next';
import { FlatList, useWindowDimensions } from 'react-native';
import { Badge, Text } from 'react-native-paper';
import { Carousel } from 'react-native-snap-carousel';

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

  return (
    <FlatList
      testID="technicianDashboardTemplate-container"
      refreshing={reloading}
      onRefresh={reload}
      data={open}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <>
          <Container ml={20} my={1} alignItems="center" flexDirection="row">
            <Text variant="headlineSmall">{t('currentlySolvingTitle')}</Text>
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
        </>
      }
      renderItem={({ item, index }) => (
        <Container key={item.id} mx={1} mb={index === open.length - 1 ? 10 : 0}>
          <TicketCard item={item} />
        </Container>
      )}
    />
  );
};

export default TechnicianDashboardTemplate;
