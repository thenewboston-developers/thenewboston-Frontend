import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
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
