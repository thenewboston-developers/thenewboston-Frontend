import styled from 'styled-components';

import UEmptyState from 'components/EmptyState';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
`;

export const EmptyState = styled(UEmptyState)`
  flex: auto;
  height: 100%;
  justify-content: center;
`;
