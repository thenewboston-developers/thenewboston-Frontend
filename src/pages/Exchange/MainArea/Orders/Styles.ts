import styled from 'styled-components';

import {pagePadding} from 'styles';

export const Container = styled.div`
  ${pagePadding};
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;
