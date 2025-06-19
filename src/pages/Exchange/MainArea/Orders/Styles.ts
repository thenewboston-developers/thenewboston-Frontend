import styled from 'styled-components';

import {hiddenScroll, pagePadding} from 'styles';

export const Container = styled.div`
  ${pagePadding};
  ${hiddenScroll};
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

export const EndMessageContainer = styled.div`
  margin: 8px 0;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrderSkeletonContainer = styled.div`
  margin-bottom: 12px;
`;

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
