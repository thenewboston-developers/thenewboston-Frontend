import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 720px;
  width: 100%;
`;

export const LoadingText = styled.div`
  color: ${colors.palette.gray[600]};
  padding: 40px;
  text-align: center;
`;

export const WalletsGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;
