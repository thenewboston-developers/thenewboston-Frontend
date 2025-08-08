import styled from 'styled-components';

import {breakpoints, colors, feedPagePadding} from 'styles';

export const Container = styled.div`
  ${feedPagePadding};
  height: 100%;

  @media (max-width: ${breakpoints.mini}) {
    padding: 0;
  }
`;

export const EndMessageContainer = styled.div`
  margin: 16px 0 32px;
`;

export const PostContainer = styled.div`
  margin: 24px auto 16px;
  max-width: 720px;

  @media (max-width: ${breakpoints.mobile}) {
    margin: 16px auto;
  }

  @media (max-width: ${breakpoints.mini}) {
    margin: 0;
    max-width: 100%;
  }
`;

export const LoaderContainer = styled.div`
  margin: 16px 0 32px;
`;

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
  margin: 0 auto;
  max-width: 720px;
`;
