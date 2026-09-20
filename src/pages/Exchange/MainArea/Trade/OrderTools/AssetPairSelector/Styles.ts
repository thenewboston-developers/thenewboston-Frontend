import styled from 'styled-components';

import {cardStyle, colors, fonts, shadows} from 'styles';

export const Container = styled.div`
  position: relative;
`;

// A card that reads as a control: it opens the asset pair picker
export const Content = styled.button`
  ${cardStyle};
  align-items: center;
  color: ${colors.primary};
  cursor: pointer;
  display: flex;
  font-family: ${fonts.family.default};
  gap: 12px;
  min-height: 64px;
  outline: none;
  padding: 12px 16px;
  text-align: left;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
  width: 100%;

  /* The border shares the color of shadows.focusRing, so the border and the ring read as a single outline */
  &:focus-visible {
    border-color: ${colors.palette.blue[500]};
    box-shadow: ${shadows.card}, ${shadows.focusRing};
  }

  @media (hover: hover) {
    &:hover {
      border-color: ${colors.borderDarker};
    }
  }
`;

export const Image = styled.img`
  border-radius: 50%;
  display: block;
  height: 32px;
  object-fit: cover;
  width: 32px;
`;

export const ImageContainer = styled.span`
  align-items: center;
  display: flex;
  flex-shrink: 0;
`;

export const Ticker = styled.span`
  font-size: 18px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.01em;
  line-height: 1.3;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
