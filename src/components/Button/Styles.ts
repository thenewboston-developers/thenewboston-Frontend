import UIcon from '@mdi/react';
import styled, {css} from 'styled-components';

import {colors, fonts} from 'styles';

import {ButtonColor} from './types';

const BUTTON_HEIGHT = 36;

const disabledMixin = css`
  background: ${colors.buttonDarkDisabledBackground};
  color: ${colors.buttonDarkDisabledText};
  cursor: not-allowed;

  &:hover {
    background: ${colors.buttonDarkDisabledBackground};
  }
`;

const hasIconMixin = css`
  align-items: center;
  border-radius: 6px;
  display: flex;
  width: auto;
`;

const secondaryMixin = css`
  background: transparent;
  border-color: rgb(207, 217, 222);
  color: ${colors.primary};

  &:hover {
    background: ${colors.whiteHover};
  }
`;

const successMixin = css`
  background: ${colors.palette.green[300]};

  &:hover {
    background: ${colors.palette.green[400]};
  }
`;

export const Button = styled.button<{$color: ButtonColor; $hasIcon: boolean}>`
  background: ${colors.buttonDark};
  border: 1px solid transparent;
  border-radius: ${`${BUTTON_HEIGHT / 2}px`};
  color: ${colors.white};
  cursor: pointer;
  display: block;
  font-family: ${fonts.family.default};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  height: ${`${BUTTON_HEIGHT}px`};
  padding: 0 16px;
  transition: all 0.1s;

  &:hover {
    background: ${colors.buttonDarkHover};
  }

  ${({$color}) => {
    if ($color === ButtonColor.secondary) return secondaryMixin;
    if ($color === ButtonColor.success) return successMixin;
    return;
  }}

  ${({disabled}) => disabled && disabledMixin}

  ${({$hasIcon}) => $hasIcon && hasIconMixin}
`;

export const IconLeft = styled(UIcon)`
  margin-right: 6px;
`;

export const IconRight = styled(UIcon)`
  margin-left: 6px;
`;
