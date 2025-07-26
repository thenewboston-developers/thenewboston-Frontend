import UIcon from '@mdi/react';
import styled from 'styled-components';

import {colors} from 'styles';

export const Button = styled.button`
  align-items: center;
  background: ${colors.palette.blue[500]};
  border: none;
  border-radius: 50%;
  bottom: 80px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: ${colors.white};
  cursor: pointer;
  display: flex;
  height: 56px;
  justify-content: center;
  position: fixed;
  right: 20px;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
  width: 56px;
  z-index: 999;

  &:hover {
    background: ${colors.palette.blue[600]};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const Icon = styled(UIcon)`
  color: ${colors.white};
`;
