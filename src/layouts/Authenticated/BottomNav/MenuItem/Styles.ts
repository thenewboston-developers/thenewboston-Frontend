import {Link as ULink} from 'react-router-dom';
import UIcon from '@mdi/react';
import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Icon = styled(UIcon)`
  color: ${colors.palette.gray[300]};
`;

export const IconWrapper = styled.div`
  position: relative;
`;

export const MenuItem = styled(ULink)<{$isActive: boolean}>`
  align-items: center;
  color: ${({$isActive}) => ($isActive ? colors.palette.blue[300] : colors.palette.gray[300])};
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 8px;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.palette.blue[300]};

    ${Icon} {
      color: ${colors.palette.blue[300]};
    }
  }

  ${({$isActive}) =>
    $isActive &&
    `
    ${Icon} {
      color: ${colors.palette.blue[300]};
    }
  `}
`;

export const Text = styled.span`
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
`;
