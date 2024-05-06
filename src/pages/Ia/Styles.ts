import styled from 'styled-components';
import {colors} from 'styles';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100%;
  background: ${colors.background};
  padding: 20px 24px;
  gap: 10px;
`;
