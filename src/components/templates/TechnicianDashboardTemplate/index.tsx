import { Ticket } from '@models/tickets';
import React from 'react';
import { TechnicianDashboardTemplateContainer } from './styles';

export type TechnicianDashboardTemplateProps = {
  open: Ticket[];
  solving: Ticket[];
  reload: () => void;
  reloading: boolean;
};

const TechnicianDashboardTemplate: React.FC<
  TechnicianDashboardTemplateProps
> = () => {
  return (
    <TechnicianDashboardTemplateContainer testID="technicianDashboardTemplate-container">
      {/* TechnicianDashboardTemplate component */}
    </TechnicianDashboardTemplateContainer>
  );
};

export default TechnicianDashboardTemplate;
