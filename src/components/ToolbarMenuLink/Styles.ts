import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {fonts, TOOLBAR_HEIGHT} from 'styles';

export const Container = styled(ULink)<{$isActive: boolean}>`
  align-items: center;
  background: ${({$isActive}) => ($isActive ? 'rgba(144, 157, 171, 0.2)' : 'transparent')};
  color: #fff;
  display: flex;
  font-weight: ${fonts.weight.semiBold};
  height: ${`${TOOLBAR_HEIGHT}px`};
  padding: 0 8px;

  &:hover {
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    text-decoration: none;
  }
`;
