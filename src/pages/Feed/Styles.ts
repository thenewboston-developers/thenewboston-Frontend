import styled from 'styled-components';

import {breakpoints, feedPagePadding} from 'styles';

export const Container = styled.div`
  ${feedPagePadding};
  height: 100%;
  overflow-y: auto;
`;

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 24px auto;
  max-width: 720px;

  @media (max-width: ${breakpoints.mobile}) {
    margin: 16px auto;
  }
`;
