import styled from 'styled-components';

import {fonts} from 'styles';

const themes = {
  amber: {
    accent: '#f5d9a6',
    end: '#392416',
    glow: '#946137',
    mobileGlow: '#644326',
    muted: '#e1d2c1',
    start: '#21170f',
  },
  emerald: {
    accent: '#d4ed92',
    end: '#174a3b',
    glow: '#3d8065',
    mobileGlow: '#275c46',
    muted: '#c2d7ca',
    start: '#081f19',
  },
  ocean: {
    accent: '#b3eaf3',
    end: '#143e5c',
    glow: '#26748b',
    mobileGlow: '#20546b',
    muted: '#c0d5e1',
    start: '#081c30',
  },
};

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
  margin-top: 30px;

  @media (max-width: 600px) {
    gap: 10px 12px;
    margin-top: 24px;

    a {
      font-size: 0.875rem;
    }
  }
`;

export const Artwork = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  justify-content: center;
  min-width: 0;
  padding: 24px 24px 24px 0;
  position: relative;

  @media (max-width: 1100px) {
    justify-self: center;
    max-width: 560px;
    padding: 0 28px 28px;
    width: 100%;
  }

  @media (max-width: 600px) {
    padding: 0 16px 20px;
  }
`;

export const ChallengeLink = styled.a`
  align-items: center;
  border-radius: 8px;
  color: #f5f8f7;
  display: inline-flex;
  font-size: 0.9375rem;
  font-weight: ${fonts.weight.semiBold};
  gap: 8px;
  min-height: 48px;
  text-decoration: none;

  &:hover {
    color: var(--hero-accent);
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid var(--hero-accent);
    outline-offset: 5px;
  }
`;

export const Content = styled.div`
  align-self: center;
  min-width: 0;
  padding: 48px 0 48px 40px;
  position: relative;
  z-index: 1;

  @media (max-width: 1100px) {
    padding: 36px 36px 12px;
  }

  @media (max-width: 600px) {
    padding: 32px 24px 8px;
  }
`;

export const Description = styled.p`
  color: var(--hero-muted);
  font-size: 1rem;
  line-height: 1.7;
  margin: 18px 0 0;
  max-width: 430px;
`;

export const Eyebrow = styled.p`
  color: var(--hero-accent);
  font-size: 0.75rem;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: 0.12em;
  line-height: 1.6;
  margin: 0 0 20px;
  text-transform: uppercase;
`;

export const Hero = styled.section<{$theme: keyof typeof themes}>`
  --hero-accent: ${({$theme}) => themes[$theme].accent};
  --hero-muted: ${({$theme}) => themes[$theme].muted};
  align-items: center;
  background:
    radial-gradient(ellipse at 84% 36%, ${({$theme}) => themes[$theme].glow}, transparent 65%),
    linear-gradient(115deg, ${({$theme}) => themes[$theme].start} 10%, ${({$theme}) => themes[$theme].end});
  border: 1px solid #ffffff14;
  border-radius: 24px;
  box-shadow: 0 16px 40px #10251f14;
  color: #ffffff;
  display: grid;
  gap: 8px;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  isolation: isolate;
  margin-bottom: 28px;
  overflow: hidden;

  @media (max-width: 1100px) {
    background:
      radial-gradient(ellipse at 84% 80%, ${({$theme}) => themes[$theme].mobileGlow}, transparent 65%),
      linear-gradient(115deg, ${({$theme}) => themes[$theme].start} 10%, ${({$theme}) => themes[$theme].end});
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Image = styled.img`
  aspect-ratio: 1;
  display: block;
  filter: drop-shadow(0 18px 24px #00000030);
  height: auto;
  max-width: 640px;
  object-fit: contain;
  object-position: center;
  width: 100%;
`;

export const Note = styled.p`
  color: var(--hero-muted);
  font-size: 0.8125rem;
  line-height: 1.6;
  margin: 14px 0 0;
`;

export const PlayLink = styled.a`
  align-items: center;
  background: var(--hero-accent);
  border-radius: 10px;
  color: #14251f;
  display: inline-flex;
  font-size: 0.9375rem;
  font-weight: ${fonts.weight.bold};
  gap: 6px;
  justify-content: center;
  min-height: 48px;
  padding: 0 22px;
  text-decoration: none;

  @media (max-width: 600px) {
    padding: 0 16px;
  }

  &:hover {
    background: #ffffff;
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid var(--hero-accent);
    outline-offset: 5px;
  }
`;

export const Tagline = styled.p`
  color: #f2f5f3;
  font-size: clamp(1.125rem, 1.6vw, 1.5rem);
  font-weight: ${fonts.weight.medium};
  letter-spacing: -0.025em;
  line-height: 1.4;
  margin: 16px 0 0;
`;

export const Title = styled.h1`
  font-size: clamp(2.375rem, 4.5vw, 4rem);
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.055em;
  line-height: 1.1;
  margin: 0;
  overflow-wrap: anywhere;

  @media (max-width: 600px) {
    font-size: clamp(2rem, 8.8vw, 3rem);
  }
`;
