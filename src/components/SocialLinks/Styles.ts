import styled from 'styled-components';

import colors from 'styles/colors';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
`;

export const DiscordContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export const DiscordUsername = styled.span`
  color: ${colors.black};
  font-size: 14px;
`;

export const SocialLink = styled.a`
  align-items: center;
  border-radius: 50%;
  display: flex;
  height: 36px;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;
