import styled, {css} from 'styled-components';

import {colors, fonts} from 'styles';
import {BadgeStyle} from '.';

const dangerMixin = css`
  background-color: ${colors.palette.red['300']};
`;

const primaryMixin = css`
  background-color: ${colors.palette.blue['300']};
`;

const successMixin = css`
  background-color: ${colors.palette.green['300']};
`;

const warningMixin = css`
  background-color: ${colors.palette.orange['300']};
`;

export const Container = styled.div<{$badgeStyle: BadgeStyle}>`
  border-radius: 4px;
  color: #fff;
  font-size: 10px;
  font-weight: ${fonts.weight.semiBold};
  padding: 2px 4px;
  white-space: nowrap;
  width: fit-content;

  ${({$badgeStyle}) => {
    if ($badgeStyle === BadgeStyle.danger) return dangerMixin;
    if ($badgeStyle === BadgeStyle.primary) return primaryMixin;
    if ($badgeStyle === BadgeStyle.success) return successMixin;
    if ($badgeStyle === BadgeStyle.warning) return warningMixin;
    return;
  }}
`;
