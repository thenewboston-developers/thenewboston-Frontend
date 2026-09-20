import styled from 'styled-components';

import {hiddenScroll, pagePadding, radii} from 'styles';

import {contentWidthStyle} from '../mixins';

const ORDER_GAP = 12;

export const Container = styled.div`
  ${pagePadding};
  ${hiddenScroll};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

// Grows with the container, so the empty page stays vertically centered
export const Content = styled.div`
  ${contentWidthStyle};
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const EndMessageContainer = styled.div`
  margin-top: 16px;
`;

export const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${`${ORDER_GAP}px`};
`;

// The skeleton takes the shape of the order card it stands in for
export const OrderSkeletonContainer = styled.div`
  .react-loading-skeleton {
    border-radius: ${radii.large};
  }
`;

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${`${ORDER_GAP}px`};

  /* The skeletons of the next page follow the orders that are already listed */
  ${OrderContainer} + & {
    margin-top: ${`${ORDER_GAP}px`};
  }
`;
