import styled from 'styled-components';

import {breakpoints, feedPagePadding} from 'styles';

export const Container = styled.div`
  ${feedPagePadding};
  height: 100%;
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
`;

export const LoaderContainer = styled.div`
  margin: 16px 0 32px;
`;

export const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 auto;
  max-width: 720px;
`;
