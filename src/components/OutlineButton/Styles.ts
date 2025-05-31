import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Button = styled.button`
  align-items: center;
  background-color: transparent;
  border: 1px solid ${colors.palette.gray[200]};
  border-radius: 24px;
  color: ${colors.palette.gray[700]};
  cursor: pointer;
  display: flex;
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
  gap: 5px;
  height: 34px;
  padding: 0 18px;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: ${colors.palette.gray[100]};
    border-color: ${colors.palette.gray[300]};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    color: ${colors.palette.gray[900]};
  }

  &:active {
    background-color: ${colors.palette.gray[200]};
    box-shadow: none;
  }

  svg {
    fill: ${colors.palette.gray[600]};
    transition: fill 0.15s ease;
  }

  &:hover svg {
    fill: ${colors.palette.gray[800]};
  }
`;

export const ButtonText = styled.span`
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
`;
