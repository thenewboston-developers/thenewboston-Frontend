import styled from 'styled-components';
import {breakpoints} from 'styles';

export const Container = styled.div`
  display: flex;
  border-radius: 100px;
  background: #dfdfdf;
  padding: 6px;
  overflow-x: auto;
  @media (min-width: ${breakpoints.mobile}) {
    width: fit-content;
  }
`;
