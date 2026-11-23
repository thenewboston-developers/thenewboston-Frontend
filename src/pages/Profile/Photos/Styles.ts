import styled from 'styled-components';

import {breakpoints, colors, fonts, radii} from 'styles';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 980px;
  width: 100%;

  @media (max-width: ${breakpoints.mini}) {
    max-width: 100%;
    width: calc(100% - 48px);
  }
`;

export const EndMessageContainer = styled.div`
  margin-top: 16px;
`;

export const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));

  @media (max-width: ${breakpoints.mobile}) {
    gap: 12px;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
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

export const PhotoCount = styled.span`
  align-items: center;
  background: rgba(0, 0, 0, 0.65);
  border-radius: ${radii.pill};
  color: ${colors.white};
  display: flex;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  gap: 4px;
  padding: 4px 8px;
  position: absolute;
  right: 8px;
  top: 8px;
`;

export const PhotoImage = styled.img`
  display: block;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
  width: 100%;
`;
