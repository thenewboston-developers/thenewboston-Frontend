import styled from 'styled-components';

import {breakpoints, colors, fonts, radii, shadows} from 'styles';

export const Container = styled.div`
  margin-top: 16px;
`;

export const Grid = styled.div<{$count: number}>`
  aspect-ratio: 3 / 2;
  border-radius: ${radii.medium};
  display: grid;
  gap: 2px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: ${({$count}) => ($count === 2 ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))')};
  overflow: hidden;

  @media (max-width: ${breakpoints.mini}) {
    border-radius: 0;
  }
`;

export const HiddenCount = styled.span`
  align-items: center;
  background: rgba(0, 0, 0, 0.55);
  color: ${colors.white};
  display: flex;
  font-size: 28px;
  font-weight: ${fonts.weight.semiBold};
  inset: 0;
  justify-content: center;
  position: absolute;
`;

export const SingleImage = styled.img`
  border-radius: ${radii.medium};
  cursor: pointer;
  display: block;
  max-height: 600px;
  max-width: 100%;
  object-fit: cover;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: none;
  }

  @media (max-width: ${breakpoints.mini}) {
    border-radius: 0;
    width: 100%;

    /* The image is full bleed here, so an outer ring would be cut off at the screen edges. An outline is used for the
       inner ring because an inset box-shadow is painted underneath the image itself. */
    &:focus-visible {
      box-shadow: none;
      outline: 2px solid ${colors.palette.blue[500]};
      outline-offset: -2px;
    }
  }
`;

export const Tile = styled.button<{$isTall: boolean}>`
  background: ${colors.palette.gray[100]};
  border: none;
  cursor: pointer;
  grid-row: ${({$isTall}) => ($isTall ? 'span 2' : 'auto')};
  overflow: hidden;
  padding: 0;
  position: relative;

  /* The grid clips its tiles, so the ring is drawn inside the tile. An outline is used because an inset box-shadow is
     painted underneath the image itself. */
  &:focus-visible {
    outline: 2px solid ${colors.palette.blue[500]};
    outline-offset: -2px;
  }
`;

export const TileImage = styled.img`
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
`;
