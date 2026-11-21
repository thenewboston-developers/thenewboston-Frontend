import styled from 'styled-components';

import {cardStyle, colors, fonts, shadows} from 'styles';

export const Chevron = styled.span`
  align-items: center;
  color: ${colors.palette.blue[600]};
  display: flex;
  flex-shrink: 0;
  margin-left: auto;
`;

export const Container = styled.div`
  position: relative;
`;

// A card that reads as a control: it opens the asset pair picker
export const Content = styled.button`
  ${cardStyle};
  align-items: center;
  background: ${colors.palette.blue[50]};
  border-color: ${colors.palette.blue[100]};
  color: ${colors.primary};
  cursor: pointer;
  display: flex;
  font-family: ${fonts.family.default};
  gap: 12px;
  min-height: 88px;
  outline: none;
  padding: 16px 20px;
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
      border-color: ${colors.palette.blue[300]};
    }
  }
`;

export const Image = styled.img`
  border-radius: 50%;
  display: block;
  height: 40px;
  object-fit: cover;
  width: 40px;
`;

export const ImageContainer = styled.span`
  align-items: center;
  display: flex;
  flex-shrink: 0;
`;

export const Label = styled.span`
  color: ${colors.palette.blue[600]};
  font-size: 12px;
  font-weight: ${fonts.weight.medium};
  line-height: 1.5;
`;

export const PairDetails = styled.span`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const Ticker = styled.span`
  color: ${colors.palette.blue[900]};
  font-size: 17px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.01em;
  line-height: 1.3;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
