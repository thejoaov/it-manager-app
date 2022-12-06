import React from 'react';
import { DashboardTemplateContainer } from './styles';

export type DashboardTemplateProps = {
  // text?: string;
};

const DashboardTemplate: React.FC<DashboardTemplateProps> = () => {
  return (
    <DashboardTemplateContainer testID="dashboardTemplate-container">
      {/* DashboardTemplate component */}
    </DashboardTemplateContainer>
  );
};

export default DashboardTemplate;
