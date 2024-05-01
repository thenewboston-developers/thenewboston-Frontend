import styled from 'styled-components';

export const InfiniteScrollContainer = styled.div`
  overflow: hidden;

  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  width: 100%;
  height: 100%;
`;

export const LoaderContainer = styled.div`
  margin-top: 10px;
`;
