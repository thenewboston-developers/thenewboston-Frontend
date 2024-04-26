import styled, {css} from 'styled-components';
import UIcon from '@mdi/react';

import {colors, fonts} from 'styles';
import {ButtonColor} from './types';

const BUTTON_HEIGHT = 36;

const disabledMixin = css`
  background: ${colors.palette.red['300']};
  cursor: not-allowed;
  opacity: 0.65;

  &:hover {
    background: ${colors.palette.red['300']};
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

const outlineMixin = css`
  background: transparent;
`;

const successMixin = css`
  background: ${colors.palette.green['300']};

  &:hover {
    background: ${colors.palette.green['400']};
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Button = styled.button<{$color: ButtonColor; $hasIcon: boolean}>`
  background: ${colors.primary};
  border-radius: ${`${BUTTON_HEIGHT / 2}px`};
  color: ${colors.white};
  cursor: pointer;
  text-align: center;
  display: block;
  font-family: ${fonts.family.default};
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
  height: ${`${BUTTON_HEIGHT}px`};
  padding: 0 12px;
  border: none;
  width: fit-content;
  line-height: 19px;
  min-width: 130px;
  transition: all 0.1s;

  &:hover {
    background: ${colors.palette.red['500']};
  }

  ${({$color}) => {
    if ($color === ButtonColor.secondary) return secondaryMixin;
    if ($color === ButtonColor.success) return successMixin;
    if ($color === ButtonColor.outline) return outlineMixin;
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
