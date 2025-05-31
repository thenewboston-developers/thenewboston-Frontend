import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const AvatarLink = styled(ULink)`
  align-items: center;
  display: flex;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ButtonText = styled.div`
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

export const DateContainer = styled.div`
  align-items: center;
  color: ${colors.secondary};
  display: flex;
  font-size: 13px;
  gap: 8px;
`;

export const FollowButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: 1px solid ${colors.palette.gray[200]};
  border-radius: 24px;
  color: ${colors.palette.gray[700]};
  cursor: pointer;
  display: flex;
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
  gap: 5px;
  height: 34px;
  padding: 0 18px;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: ${colors.palette.gray[100]};
    border-color: ${colors.palette.gray[300]};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    color: ${colors.palette.gray[900]};
  }

  &:active {
    background-color: ${colors.palette.gray[200]};
    box-shadow: none;
  }

  svg {
    fill: ${colors.palette.gray[600]};
    transition: fill 0.15s ease;
  }

  &:hover svg {
    fill: ${colors.palette.gray[800]};
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

export const UnfollowButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: 1px solid ${colors.palette.gray[200]};
  border-radius: 24px;
  color: ${colors.palette.gray[700]};
  cursor: pointer;
  display: flex;
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
  gap: 5px;
  height: 34px;
  padding: 0 18px;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: ${colors.palette.gray[100]};
    border-color: ${colors.palette.gray[300]};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    color: ${colors.palette.gray[900]};
  }

  &:active {
    background-color: ${colors.palette.gray[200]};
    box-shadow: none;
  }

  svg {
    fill: ${colors.palette.gray[600]};
    transition: fill 0.15s ease;
  }

  &:hover svg {
    fill: ${colors.palette.gray[800]};
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
`;

export const Username = styled.div`
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
  text-transform: capitalize;
`;

export const UsernameLink = styled(ULink)`
  align-items: center;
  color: inherit;
  display: inline-flex;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
