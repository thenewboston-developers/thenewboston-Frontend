import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: fit-content;
  position: relative;
`;

export const Img = styled.img<{$size: string}>`
  border-radius: 50%;
  height: ${({$size}) => $size};
  object-fit: cover;
  width: ${({$size}) => $size};
`;
