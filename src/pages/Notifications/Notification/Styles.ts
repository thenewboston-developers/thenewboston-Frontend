import UIcon from '@mdi/react';
import {Link as ULink} from 'react-router-dom';

import styled from 'styled-components';
import {colors, fonts} from 'styles';

export const ArtworkPurchaseNotificationContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 0 16px;
`;

export const Container = styled.div<{$isRead: boolean}>`
  background: ${({$isRead}) => ($isRead ? colors.white : colors.border)};
  border-radius: 16px;
  border: 1px solid ${colors.borderDarker};
  display: flex;
  gap: 16px;
  margin-top: 16px;
  padding: 16px 0;
`;

export const Link = styled(ULink)`
  font-weight: ${fonts.weight.semiBold};

  &:hover {
    cursor: pointer;
  }
`;

export const TextContainer = styled.div`
  margin-left: 15px;
`;

export const TimeStamp = styled.small`
  font-weight: ${fonts.weight.semiBold};
  color: ${colors.gray};
`;

export const IconBrush = styled(UIcon)`
  background: ${colors.backgroundDark};
  border-radius: 50%;
  border: 1px solid ${colors.border};
  color: ${colors.white};
  margin-left: 28px;
  margin-top: -16px;
  padding: 2px;
  position: absolute;
`;

export const DotContainer = styled.div`
  margin-top: -50px;
  position: absolute;
  right: 45px;
`;
