import styled from 'styled-components';

import USectionHeading from 'components/SectionHeading';

export const Container = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 24px 32px;
`;

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 auto;
  max-width: 720px;
`;

export const SectionHeading = styled(USectionHeading)``;
