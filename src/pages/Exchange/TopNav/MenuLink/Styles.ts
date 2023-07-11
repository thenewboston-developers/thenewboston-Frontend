import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {fonts} from 'styles';

export const Container = styled(ULink)<{$isActive: boolean}>`
  background: ${({$isActive}) => ($isActive ? 'rgba(144, 157, 171, 0.2)' : 'transparent')};
  color: #fff;
  font-weight: ${fonts.weight.semiBold};
  padding: 12px 8px;

  &:hover {
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    text-decoration: none;
  }
`;
