import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

export const TextSkeleton = styled(Skeleton)<{$width?: string}>`
  margin-top: 0.6rem;
  width: ${({$width}) => $width};
`;

export const BoxSkeleton = styled(Skeleton)`
  border-radius: 14px;
  min-height: 292px;
`;

export const Avatar = styled.div`
  margin-right: 0.5rem;
`;
export const Text = styled.div`
  width: 100%;
`;

export const Div = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`;
