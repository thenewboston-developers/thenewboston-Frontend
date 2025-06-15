import {Link as ULink} from 'react-router-dom';
import UIcon from '@mdi/react';
import styled from 'styled-components';

import UDot from 'components/Dot';
import {colors, fonts} from 'styles';

export const AvatarIcon = styled(UIcon)`
  background: ${colors.backgroundDark};
  border: 2px solid ${colors.white};
  border-radius: 50%;
  color: ${colors.white};
  margin-left: 32px;
  margin-top: -18px;
  padding: 3px;
  position: absolute;
  z-index: 100;
`;

export const Container = styled.div<{$isRead: boolean}>`
  background: ${({$isRead}) => ($isRead ? colors.background : colors.white)};
  border: 1px solid ${({$isRead}) => ($isRead ? colors.borderDarker : colors.border)};
  border-radius: 8px;
  box-shadow: ${({$isRead}) => ($isRead ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.08)')};
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
  padding: 20px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({$isRead}) => ($isRead ? colors.lightGray : colors.whiteHover)};
  }
`;

export const CurrencyLogoContainer = styled.div`
  position: relative;
`;

export const Dot = styled(UDot)`
  background: ${colors.palette.blue[700]};
  height: 8px;
  width: 8px;
`;

export const DotContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  padding-right: 8px;
`;

export const ExchangeIcon = styled(UIcon)`
  background: ${colors.backgroundDark};
  border: 2px solid ${colors.white};
  border-radius: 50%;
  bottom: -2px;
  color: ${colors.white};
  padding: 3px;
  position: absolute;
  right: -2px;
  z-index: 100;
`;

export const ExchangeIconContainer = styled.div`
  align-items: center;
  background: ${colors.backgroundDark};
  border-radius: 50%;
  display: flex;
  height: 45px;
  justify-content: center;
  position: relative;
  width: 45px;
`;

export const Link = styled(ULink)`
  color: ${colors.primary};
  font-weight: ${fonts.weight.semiBold};
  text-decoration: none;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const NotificationContainer = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 16px;
  position: relative;
  width: 100%;
`;

export const TextContainer = styled.div`
  flex: 1;
  line-height: 1.5;
`;

export const TimeStamp = styled.small`
  color: ${colors.secondary};
  font-size: 13px;
  font-weight: ${fonts.weight.regular};
`;
