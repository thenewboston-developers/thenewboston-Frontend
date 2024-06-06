import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import {colors} from 'styles';
import {Col} from 'styles/components/GridStyle';

export const Avatar = styled.div`
  margin-right: 1rem;
`;

export const Text = styled.div`
  width: 100%;
`;

export const TextSkeleton = styled(Skeleton)<{$float?: string; $marginLeft?: string; $width?: string}>`
  float: ${({$float}) => $float};
  margin-left: ${({$marginLeft}) => $marginLeft};
  margin-top: 0.6rem;
  width: ${({$width}) => $width};
`;

export const Box = styled.div<{$padding?: string}>`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: ${({$padding}) => $padding};
  width: 100%;
`;
export const BoxLeft = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`;
export const BoxRight = styled.div`
  width: 100%;
`;

export const Column = styled(Col)`
  border-radius: 14px;
  border: 1px solid ${colors.border};
  padding: 10px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 276px;
`;

export const Div = styled.div`
  margin-top: 10px;
`;
