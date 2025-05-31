import styled from 'styled-components';

export const Container = styled.div`
  overflow-y: auto;
  height: 100vh;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;
