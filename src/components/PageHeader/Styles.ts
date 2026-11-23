import styled from 'styled-components';

import {BANNER_ART_ACCENTS} from 'components/BannerArt';
import {BannerArtVariant} from 'enums';
import {breakpoints, colors, fonts, radii} from 'styles';

const BUTTON_HOVER_BACKGROUND = 'rgb(255 255 255 / 86%)';
const COPY_COLOR = 'rgb(255 255 255 / 84%)';

export const Actions = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 12px;
  position: relative;

  a {
    align-items: center;
    background: ${colors.white};
    border: 1px solid ${colors.white};
    border-radius: ${radii.medium};
    color: ${colors.primary};
    display: inline-flex;
    font-size: 14px;
    font-weight: ${fonts.weight.semiBold};
    gap: 8px;
    justify-content: center;
    min-height: 44px;
    padding: 10px 18px;
    text-decoration: none;
    transition:
      background 0.15s ease,
      border-color 0.15s ease;

    &:focus-visible {
      outline: 2px solid ${colors.white};
      outline-offset: 4px;
    }

    &:hover {
      background: ${BUTTON_HOVER_BACKGROUND};
      border-color: transparent;
      text-decoration: none;
    }
  }
`;

// The surface and the artwork come from BannerArt, which fills the header behind the copy and the actions
export const Container = styled.header`
  align-items: center;
  background: ${colors.nav.background};
  border-radius: ${radii.large};
  color: ${colors.white};
  display: flex;
  flex-shrink: 0;
  gap: 28px;
  isolation: isolate;
  justify-content: space-between;
  margin-bottom: 24px;
  overflow: hidden;
  padding: 32px;
  position: relative;

  @media (max-width: ${breakpoints.tablet}) {
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
  }

  @media (max-width: ${breakpoints.mini}) {
    padding: 24px;
  }
`;

export const Copy = styled.div`
  min-width: 0;
  position: relative;
`;

export const Description = styled.p`
  color: ${COPY_COLOR};
  font-size: 16px;
  line-height: 1.65;
  margin: 12px 0 0;
  max-width: 640px;
`;

export const Eyebrow = styled.div<{$art: BannerArtVariant}>`
  color: ${({$art}) => BANNER_ART_ACCENTS[$art]};
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: 0.12em;
  margin-bottom: 12px;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  color: ${colors.white};
  font-size: clamp(26px, 2.5vw, 36px);
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.04em;
  line-height: 1.2;
  overflow-wrap: anywhere;
`;
