import styled from 'styled-components';

import {breakpoints, colors} from 'styles';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 720px;
  width: 100%;

  @media (max-width: ${breakpoints.mini}) {
    max-width: 100%;
  }
`;

export const EndMessageContainer = styled.div`
  margin-top: 16px;
`;

export const LoaderContainer = styled.div`
  margin: 16px 0 32px;

  @media (max-width: ${breakpoints.mini}) {
    margin: 0;
  }
`;

export const PostContainer = styled.div``;

export const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: ${breakpoints.mini}) {
    gap: 0;

    & > div:first-child {
      border-top: 1px solid ${colors.palette.gray[200]};
    }
  }
`;

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: ${breakpoints.mini}) {
    gap: 0;
  }
`;
