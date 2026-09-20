import styled from 'styled-components';

export const Container = styled.div`
  flex-shrink: 0;
`;

export const Img = styled.img`
  border-radius: 50%;
  display: block;
  height: 100%;
  object-fit: cover;
  position: absolute;
  width: 100%;
`;

export const ImgWrapper = styled.div<{width?: string}>`
  padding-bottom: 100%;
  position: relative;
  width: ${({width}) => width || '36px'};
`;
