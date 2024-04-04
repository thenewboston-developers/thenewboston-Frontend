import styled from 'styled-components';

export const InfiniteScrollContainer = styled.div`
  overflow: hidden;

  .infinite-scroll-component {
    overflow-y: scroll;
    scrollbar-width: none; // For Firefox

    &::-webkit-scrollbar {
      display: none; // For Chrome, Safari, and Opera
    }
  }
`;

export const LoaderContainer = styled.div`
  margin-top: 10px;
`;
