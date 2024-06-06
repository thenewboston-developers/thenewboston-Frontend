import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

export const TextSkeleton = styled(Skeleton)<{$width?: string}>`
  margin-top: 0.6rem;
  width: ${({$width}) => $width};
`;

export const BoxSkeleton = styled(Skeleton)`
  border-radius: 14px;
  margin-top: 0px;
  min-height: 150px;
`;
export const Card = styled.div`
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 340px;
`;

export const CardFooter = styled.div`
  align-items: center;
  border-radius: 5px;
  display: flex;
  height: 100%;
  justify-content: space-between;
  width: 100%;
`;

export const Left = styled.div`
  align-items: center;
  border-radius: 5px;
  display: flex;
  height: 100%;
  margin-right: 0.6rem;
  width: 100%;
`;
export const Right = styled.div`
  float: inline-block;
  width: 40%;
`;
export const Text = styled.div`
  margin-left: 10px;
  width: 100%;
`;

export const CardBody = styled.div``;
export const Div = styled.div``;
