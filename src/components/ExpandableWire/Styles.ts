import styled from 'styled-components';

import {colors} from 'styles';

export const Amount = styled.div``;

export const Bottom = styled.div`
  margin: 8px 0 12px;
`;

export const Container = styled.div``;

export const Date = styled.div``;

export const Top = styled.div`
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  padding: 8px;

  &:hover {
    background: ${colors.whiteHover};
    cursor: pointer;
  }
`;
