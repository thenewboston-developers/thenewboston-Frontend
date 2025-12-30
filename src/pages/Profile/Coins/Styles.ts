import styled from 'styled-components';

import {breakpoints} from 'styles';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 720px;
  width: 100%;

  @media (max-width: ${breakpoints.mini}) {
    width: calc(100% - 48px);
  }
`;

export const LoaderContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 40px;
`;

export const WalletsGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;
