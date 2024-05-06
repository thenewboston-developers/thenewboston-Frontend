import styled from 'styled-components';
import {breakpoints} from 'styles';

export const Container = styled.div`
  display: flex;
  border-radius: 100px;
  background: #f4f5f6;
  border: 1px solid #dfdfdf;
  padding: 6px;
  overflow-x: auto;
  @media (min-width: ${breakpoints.mobile}) {
    width: fit-content;
  }
`;
