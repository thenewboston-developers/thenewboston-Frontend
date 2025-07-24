import styled from 'styled-components';

import {colors} from 'styles';

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
  color: ${colors.palette.gray[600]};
  display: flex;
  height: 36px;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.palette.gray[100]};
    color: ${colors.palette.gray[900]};
    transform: translateY(-2px);
  }
`;
