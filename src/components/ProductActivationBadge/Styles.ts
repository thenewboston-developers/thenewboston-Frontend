import styled, {css} from 'styled-components';

import {ActivationStatus} from 'enums';
import {colors} from 'styles';

const activeMixin = css`
  background-color: ${colors.palette.green['400']};
`;

const draftMixin = css`
  background-color: ${colors.palette.darkGray['100']};
`;

export const Container = styled.div<{$activationStatus: ActivationStatus}>`
  border-radius: 4px;
  color: #fff;
  font-size: 10px;
  font-weight: 500;
  padding: 2px 4px;
  white-space: nowrap;
  width: fit-content;

  ${({$activationStatus}) => {
    if ($activationStatus === ActivationStatus.ACTIVE) return activeMixin;
    if ($activationStatus === ActivationStatus.DRAFT) return draftMixin;
    return;
  }}
`;
