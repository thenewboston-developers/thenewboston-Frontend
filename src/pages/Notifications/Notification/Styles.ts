import {Link as ULink} from 'react-router-dom';
import UIcon from '@mdi/react';
import styled from 'styled-components';

import UDot from 'components/Dot';
import {colors, fonts} from 'styles';

export const AvatarContainer = styled.div`
  position: relative;
`;

export const AvatarIcon = styled(UIcon)`
  background: ${colors.backgroundDark};
  border: 2px solid ${colors.white};
  border-radius: 50%;
  bottom: -2px;
  color: ${colors.white};
  padding: 3px;
  position: absolute;
  right: -2px;
  z-index: 1;
`;

export const CommentText = styled.div`
  background: ${colors.background};
  border-left: 3px solid ${colors.palette.gray[300]};
  border-radius: 6px;
  color: ${colors.palette.gray[700]};
  font-size: 14px;
  line-height: 1.4;
  margin-top: 8px;
  overflow-wrap: break-word;
  padding: 8px 12px;
  word-wrap: break-word;
`;

export const Container = styled.div<{$isRead: boolean}>`
  background: ${({$isRead}) => ($isRead ? colors.background : colors.white)};
  border: 1px solid ${({$isRead}) => ($isRead ? colors.borderDarker : colors.border)};
  border-radius: 8px;
  box-shadow: ${({$isRead}) => ($isRead ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.08)')};
  cursor: pointer;
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
  padding: 20px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({$isRead}) => ($isRead ? colors.lightGray : colors.whiteHover)};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  z-index: 1;
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

export const MainText = styled.div`
  color: ${colors.palette.gray[700]};
  font-size: 14px;
  line-height: 1.4;
`;

export const NotificationContainer = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 16px;
  position: relative;
  width: 100%;
`;

export const PostPreviewText = styled.div`
  color: ${colors.palette.gray[800]};
  font-size: 15px;
  line-height: 1.4;
  margin-top: 8px;
  overflow-wrap: break-word;
  word-wrap: break-word;
`;

export const PostThumbnail = styled.img`
  border-radius: 6px;
  flex-shrink: 0;
  height: 48px;
  margin-left: 8px;
  object-fit: cover;
  width: 48px;
`;

export const TextContainer = styled.div`
  flex: 1;
  line-height: 1.5;
`;

export const TimeStamp = styled.small`
  color: ${colors.palette.gray[500]};
  display: block;
  font-size: 13px;
  font-weight: ${fonts.weight.regular};
  line-height: 1.2;
  margin-top: 8px;
`;
