import styled from 'styled-components';

import {breakpoints, colors} from 'styles';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 980px;
  width: 100%;

  @media (max-width: ${breakpoints.mini}) {
    max-width: 100%;
  }
`;

export const EndMessageContainer = styled.div`
  margin-top: 16px;
`;

export const Grid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));

  @media (max-width: ${breakpoints.mobile}) {
    gap: 8px;
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  }
`;

export const LoaderContainer = styled.div`
  margin: 24px 0;

  @media (max-width: ${breakpoints.mini}) {
    margin: 16px 0;
  }
`;

export const PhotoButton = styled.button`
  aspect-ratio: 1 / 1;
  background: ${colors.palette.gray[100]};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  padding: 0;
  position: relative;

  &:focus-visible {
    outline: 2px solid ${colors.palette.blue[500]};
    outline-offset: 2px;
  }

  &:hover img {
    transform: scale(1.03);
  }
`;

export const PhotoImage = styled.img`
  display: block;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
  width: 100%;
`;
