import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Container = styled.div``;

export const SelectorButton = styled.button`
  background: transparent;
  border: 1px solid rgb(207, 217, 222);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  padding: 8px 16px;
  transition: all 0.1s;

  &:hover {
    background: ${colors.whiteHover};
  }
`;
