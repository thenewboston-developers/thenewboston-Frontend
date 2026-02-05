import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const ToolButton = styled.button<{$isActive: boolean; $isDisabled: boolean}>`
  align-items: center;
  background: ${({$isActive, $isDisabled}) => {
    if ($isDisabled) return colors.palette.gray[100];
    if ($isActive) return colors.palette.blue[100];
    return colors.white;
  }};
  border: 0;
  border-radius: 0;
  border-right: 1px solid ${colors.border};
  box-shadow: ${({$isActive, $isDisabled}) =>
    $isActive && !$isDisabled ? `inset 0 0 0 2px ${colors.palette.blue[500]}` : 'none'};
  cursor: ${({$isDisabled}) => ($isDisabled ? 'not-allowed' : 'pointer')};
  display: flex;
  filter: ${({$isDisabled}) => ($isDisabled ? 'grayscale(1)' : 'none')};
  height: 52px;
  justify-content: center;
  opacity: ${({$isDisabled}) => ($isDisabled ? 0.5 : 1)};
  padding: 6px;
  position: relative;
  width: 52px;

  &:first-child {
    border-bottom-left-radius: 12px;
    border-top-left-radius: 12px;
  }

  &:last-child {
    border-bottom-right-radius: 12px;
    border-right: 0;
    border-top-right-radius: 12px;
  }
`;

export const ToolButtonReadOnly = styled.div<{$isDisabled: boolean}>`
  align-items: center;
  background: ${({$isDisabled}) => ($isDisabled ? colors.palette.gray[100] : colors.white)};
  border-radius: 0;
  border-right: 1px solid ${colors.border};
  display: flex;
  filter: ${({$isDisabled}) => ($isDisabled ? 'grayscale(1)' : 'none')};
  height: 52px;
  justify-content: center;
  opacity: ${({$isDisabled}) => ($isDisabled ? 0.5 : 1)};
  padding: 6px;
  position: relative;
  width: 52px;

  &:first-child {
    border-bottom-left-radius: 12px;
    border-top-left-radius: 12px;
  }

  &:last-child {
    border-bottom-right-radius: 12px;
    border-right: 0;
    border-top-right-radius: 12px;
  }
`;

export const ToolCount = styled.span`
  background: ${colors.white};
  border-radius: 6px;
  bottom: 4px;
  color: ${colors.palette.gray[700]};
  font-size: 10px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1;
  padding: 1px 4px;
  pointer-events: none;
  position: absolute;
  right: 4px;
`;

export const ToolIcon = styled.svg<{$variant: 'black' | 'white'}>`
  color: ${({$variant}) => ($variant === 'black' ? colors.black : colors.white)};
  display: block;
  filter: ${({$variant}) => ($variant === 'white' ? 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))' : 'none')};
  height: 24px;
  width: 24px;
`;

export const Toolbar = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  display: flex;
  flex-wrap: nowrap;
  gap: 0;
  overflow: hidden;
`;
