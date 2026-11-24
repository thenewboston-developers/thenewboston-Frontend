import styled from 'styled-components';

import {fonts} from 'styles';

const themes = {
  amber: {accent: '#ffd18a', background: '#241c15', glow: '#62432c'},
  emerald: {accent: '#a9e9cb', background: '#102a25', glow: '#225442'},
  ocean: {accent: '#91dff1', background: '#101e30', glow: '#203e58'},
};

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
  margin-top: 28px;
`;

export const Artwork = styled.div`
  align-self: stretch;
  min-height: 360px;
  min-width: 0;
  position: relative;

  &::after {
    background:
      linear-gradient(90deg, var(--hero-background), transparent 32%),
      linear-gradient(0deg, var(--hero-background), transparent 35%);
    content: '';
    inset: 0;
    pointer-events: none;
    position: absolute;
  }

  @media (max-width: 1100px) {
    min-height: 280px;

    &::after {
      background: linear-gradient(0deg, var(--hero-background), transparent 35%);
    }
  }

  @media (max-width: 600px) {
    min-height: 220px;
  }
`;

export const ArtworkCaption = styled.span`
  align-items: center;
  backdrop-filter: blur(12px);
  background: #08141080;
  border: 1px solid #ffffff26;
  border-radius: 30px;
  bottom: 28px;
  color: #f2f6f5;
  display: flex;
  font-size: 11px;
  font-weight: ${fonts.weight.medium};
  gap: 8px;
  padding: 9px 14px;
  position: absolute;
  right: 28px;
  z-index: 1;

  @media (max-width: 1100px) {
    bottom: 24px;
    right: 24px;
  }
`;

export const ChallengeLink = styled.a`
  align-items: center;
  border-radius: 8px;
  color: #f2f5f5;
  display: inline-flex;
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
  gap: 8px;
  min-height: 46px;
  text-decoration: none;

  &:hover {
    color: var(--hero-accent);
  }

  &:focus-visible {
    outline: 2px solid var(--hero-accent);
    outline-offset: 5px;
  }
`;

export const Content = styled.div`
  align-self: center;
  min-width: 0;
  padding: 44px 0 40px 40px;
  position: relative;
  z-index: 1;

  @media (max-width: 1100px) {
    padding: 32px 32px 16px;
  }

  @media (max-width: 600px) {
    padding: 28px 24px 16px;
  }
`;

export const Description = styled.p`
  color: #c3cecc;
  font-size: 15px;
  line-height: 1.7;
  margin: 16px 0 0;
  max-width: 360px;
`;

export const Eyebrow = styled.p`
  color: var(--hero-accent);
  font-size: 10px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.15em;
  line-height: 1.6;
  margin: 0 0 18px;
  text-transform: uppercase;
`;

export const Hero = styled.section<{$theme: keyof typeof themes}>`
  --hero-accent: ${({$theme}) => themes[$theme].accent};
  --hero-background: ${({$theme}) => themes[$theme].background};
  background:
    radial-gradient(ellipse at top left, ${({$theme}) => themes[$theme].glow}, transparent 65%), var(--hero-background);
  border: 1px solid #ffffff14;
  border-radius: 24px;
  box-shadow: 0 16px 40px #10251f14;
  color: #ffffff;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  isolation: isolate;
  margin-bottom: 28px;
  overflow: hidden;

  @media (max-width: 1100px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Highlights = styled.ul`
  align-items: center;
  border-top: 1px solid #ffffff14;
  color: #d6dfdc;
  display: flex;
  flex-wrap: wrap;
  font-size: 11px;
  font-weight: ${fonts.weight.medium};
  gap: 12px 28px;
  grid-column: 1 / -1;
  list-style: none;
  margin: 0;
  padding: 18px 40px;

  li {
    align-items: center;
    display: flex;
    gap: 8px;
  }

  li::before {
    background: var(--hero-accent);
    border-radius: 50%;
    content: '';
    height: 4px;
    width: 4px;
  }

  @media (max-width: 1100px) {
    padding: 18px 32px;
  }

  @media (max-width: 600px) {
    column-gap: 18px;
    padding: 18px 24px;
  }
`;

export const Image = styled.img`
  display: block;
  height: 100%;
  inset: 0;
  object-fit: cover;
  object-position: center;
  position: absolute;
  width: 100%;
`;

export const LiveDot = styled.span`
  background: var(--hero-accent);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--hero-accent);
  height: 6px;
  width: 6px;
`;

export const Note = styled.p`
  color: #b2c1bd;
  font-size: 11px;
  line-height: 1.6;
  margin: 14px 0 0;
`;

export const PlayLink = styled.a`
  align-items: center;
  background: var(--hero-accent);
  border-radius: 10px;
  color: #14251f;
  display: inline-flex;
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
  gap: 6px;
  justify-content: center;
  min-height: 46px;
  padding: 0 20px;
  text-decoration: none;

  &:hover {
    background: #ffffff;
  }

  &:focus-visible {
    outline: 2px solid var(--hero-accent);
    outline-offset: 5px;
  }
`;

export const Tagline = styled.p`
  color: #f2f5f3;
  font-size: clamp(18px, 1.6vw, 24px);
  font-weight: ${fonts.weight.medium};
  letter-spacing: -0.035em;
  line-height: 1.4;
  margin: 14px 0 0;
`;

export const Title = styled.h1`
  font-size: clamp(38px, 4.5vw, 64px);
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.065em;
  line-height: 1.1;
  margin: 0;

  @media (max-width: 600px) {
    font-size: clamp(32px, 8.8vw, 48px);
  }
`;
