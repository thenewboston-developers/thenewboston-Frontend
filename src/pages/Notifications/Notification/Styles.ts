import UIcon from '@mdi/react';
import {Link as ULink} from 'react-router-dom';

import UDot from 'components/Dot';
import styled from 'styled-components';
import {colors, fonts} from 'styles';

export const ArtworkPurchaseNotificationContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 0 16px;
  position: relative;
  width: 100%;
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

export const DotContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -5px;
  position: absolute;
  right: 15px;
  top: 0;
`;

export const Dot = styled(UDot)``;

export const IconBrush = styled(UIcon)`
  background: ${colors.backgroundDark};
  border-radius: 50%;
  border: 1px solid ${colors.border};
  color: ${colors.white};
  margin-left: 28px;
  margin-top: -16px;
  padding: 2px;
  position: absolute;
  z-index: 100;
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
  color: ${colors.gray};
  font-weight: ${fonts.weight.semiBold};
`;
