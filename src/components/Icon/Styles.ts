import styled, {css} from 'styled-components';

import {colors} from 'styles';

const buttonStyle = css`
  cursor: pointer;

  &:hover {
    background: ${colors.whiteHover};
  }
`;

const disabledStyle = css`
  color: #a3acb9;
  cursor: default;

  &:hover {
    background: transparent;
  }
`;

const sizeStyle = (size = 24, totalSize = 30) => css`
  height: ${Math.max(size, totalSize)}px;
  width: ${Math.max(size, totalSize)}px;
`;

interface WrapperProps {
  $hasOnClickHandler: boolean;
  $totalSize?: number | 'unset';
  disabled: boolean;
  size?: number;
}

export const Wrapper = styled.div<WrapperProps>`
  align-items: center;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  transition:
    background-color 0.3s,
    color 0.3s;

  ${({$totalSize, size}) => $totalSize !== 'unset' && sizeStyle(size, $totalSize)};
  ${({$hasOnClickHandler}) => !!$hasOnClickHandler && buttonStyle};
  ${({disabled}) => !!disabled && disabledStyle};
`;
