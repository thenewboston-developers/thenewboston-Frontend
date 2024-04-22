import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {fonts, TOOLBAR_HEIGHT} from 'styles';

export const Container = styled(ULink)<{$isActive: boolean}>`
  align-items: center;
  background: transparent;
  border-bottom: 2px solid ${({$isActive}) => ($isActive ? '#000' : 'transparent')};
  color: #000;
  display: flex;
  font-weight: ${({$isActive}) => ($isActive ? fonts.weight.bold : fonts.weight.regular)};
  height: ${`${TOOLBAR_HEIGHT}px`};
  padding: 0 8px;

  &:hover {
    background: rgba(144, 157, 171, 0.1);
    cursor: pointer;
    text-decoration: none;
  }
`;
