import styled, {css} from 'styled-components';

import {colors, fonts} from 'styles';

import {BadgeStyle} from '.';

const dangerMixin = css`
  background-color: ${colors.palette.red['300']};
`;

const draftMixin = css`
  background-color: ${colors.palette.darkGray['100']};
`;

const primaryMixin = css`
  background-color: ${colors.palette.blue['300']};
`;

const successMixin = css`
  background-color: ${colors.palette.green['400']};
`;

const warningMixin = css`
  background-color: ${colors.palette.orange['300']};
`;

const internalMixin = css`
  background-color: ${colors.palette.blue[100]};
  color: ${colors.palette.blue[700]};
`;

const lightGreenMixin = css`
  background-color: ${colors.lightGreen};
  color: ${colors.palette.green['600']};
`;
const lightRedMixin = css`
  background-color: ${colors.lightRed};
  color: ${colors.palette.red['700']};
`;
export const Text = styled.div`
  display: flex;
  align-items: center;
`;

export const Container = styled.div<{$badgeStyle: BadgeStyle}>`
  border-radius: 4px;
  color: #fff;
  display: inline-block;
  font-size: 10px;
  font-weight: ${fonts.weight.semiBold};
  padding: 2px 6px;
  white-space: nowrap;
  width: fit-content;

  ${({$badgeStyle}) => {
    if ($badgeStyle === BadgeStyle.danger) return dangerMixin;
    if ($badgeStyle === BadgeStyle.draft) return draftMixin;
    if ($badgeStyle === BadgeStyle.internal) return internalMixin;
    if ($badgeStyle === BadgeStyle.lightGreen) return lightGreenMixin;
    if ($badgeStyle === BadgeStyle.lightRed) return lightRedMixin;
    if ($badgeStyle === BadgeStyle.primary) return primaryMixin;
    if ($badgeStyle === BadgeStyle.success) return successMixin;
    if ($badgeStyle === BadgeStyle.warning) return warningMixin;

    return;
  }}
`;
