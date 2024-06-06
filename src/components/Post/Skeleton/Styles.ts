import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

export const Div = styled.div`
  align-items: center;
  border-radius: 5px;
  display: flex;
  height: 100%;
  padding: 0.5rem;
  width: 100%;
`;

export const Left = styled.div`
  margin-right: 1rem;
`;

export const Right = styled.div`
  width: 100%;
`;

export const TextSkeleton = styled(Skeleton)<{$width?: string}>`
  margin-bottom: 0.6rem;
  width: ${({$width}) => $width};
`;

export const BoxSkeleton = styled(Skeleton)`
  min-height: 250px;
`;
