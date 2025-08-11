import styled from 'styled-components';

import {breakpoints, colors} from 'styles';

export const Avatar = styled.div`
  margin-right: 1rem;
`;

export const AvatarContainer = styled.div`
  align-items: center;
  display: flex;
`;

export const Container = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.palette.gray[200]};
  border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow-x: hidden;
  padding: 20px 24px;

  @media (max-width: ${breakpoints.mini}) {
    border: none;
    border-bottom: 1px solid ${colors.palette.gray[200]};
    border-radius: 0;
    box-shadow: none;
    padding: 16px;
  }
`;

export const SkeletonSection = styled.div`
  margin: 10px 0;
`;
