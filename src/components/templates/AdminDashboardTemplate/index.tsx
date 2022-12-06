import { TicketFull } from '@models/tickets';
import React from 'react';
import { AdminDashboardTemplateContainer } from './styles';

export type AdminDashboardTemplateProps = {
  open: TicketFull[];
  solving: TicketFull[];
  reload: () => void;
  reloading: boolean;
};

const AdminDashboardTemplate: React.FC<AdminDashboardTemplateProps> = () => {
  return (
    <AdminDashboardTemplateContainer testID="adminDashboardTemplate-container">
      {/* AdminDashboardTemplate component */}
    </AdminDashboardTemplateContainer>
  );
};

export default AdminDashboardTemplate;
