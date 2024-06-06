import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

export const TextSkeleton = styled(Skeleton)<{$width?: string}>`
  margin-top: 0.6rem;
  width: ${({$width}) => $width};
`;

export const BoxSkeleton = styled(Skeleton)`
  min-height: 250px;
`;
