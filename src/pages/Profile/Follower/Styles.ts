import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const BtnText = styled.div`
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
`;

export const Container = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  margin-top: 16px;
  padding: 20px;
`;

export const Counter = styled.div`
  align-items: center;
  color: ${colors.gray};
  display: flex;
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
`;

export const AvatarLink = styled(ULink)`
  display: flex;
  align-items: center;
`;

export const UsernameLink = styled(ULink)`
  display: inline-flex;
  align-items: center;
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const FollowerContainer = styled.div`
  align-items: center;
  border-bottom: 1px solid ${colors.border};
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  padding: 8px 0;

  &:first-child {
    padding-top: 20px;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 20px;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 13px;
  color: ${colors.secondary};
`;

export const FollowButton = styled.button`
  align-items: center;
  background-color: ${colors.palette.blue['500']};
  border: none;
  border-radius: 6px;
  color: ${colors.white};
  cursor: pointer;
  display: flex;
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
  gap: 5px;
  padding: 6px 12px;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${colors.palette.blue['600']};
  }

  svg {
    fill: ${colors.white};
  }
`;

export const Grid = styled.div`
  align-items: center;
  display: grid;
  gap: 16px;
  grid-template-columns: 40px 48px 1fr auto;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
`;

export const Heading = styled.div`
  color: ${colors.gray};
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};

  & span {
    color: ${colors.black};
  }
`;

export const TextMuted = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
`;

export const UnFollowButton = styled.button`
  align-items: center;
  background-color: ${colors.palette.gray['50']};
  border: 1px solid ${colors.palette.gray['300']};
  border-radius: 8px;
  color: ${colors.primary};
  cursor: pointer;
  display: flex;
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
  gap: 5px;
  padding: 8px 16px;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${colors.palette.red['50']};
    border-color: ${colors.palette.red['200']};
    color: ${colors.palette.red['600']};
  }

  svg {
    fill: ${colors.primary};
  }

  &:hover svg {
    fill: ${colors.palette.red['600']};
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const Username = styled.div`
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
  text-transform: capitalize;
`;
