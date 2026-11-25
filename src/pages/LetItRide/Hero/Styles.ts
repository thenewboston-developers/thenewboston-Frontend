import styled from 'styled-components';

import {fonts} from 'styles';

import {table} from '../theme';

const HERO_BLUE = '#0a1a40';

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 22px;
  margin-top: 26px;
`;

export const Artwork = styled.div`
  height: 100%;
  mask-image: linear-gradient(90deg, transparent, #000000 38%);
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  width: 62%;

  &::after {
    background:
      linear-gradient(0deg, ${HERO_BLUE}, transparent 22%), linear-gradient(180deg, ${HERO_BLUE}99, transparent 18%);
    content: '';
    inset: 0;
    position: absolute;
  }

  @media (max-width: 820px) {
    align-self: center;
    height: auto;
    margin-top: -6px;
    mask-image: radial-gradient(ellipse 62% 66% at 50% 52%, #000000 62%, transparent 100%);
    max-width: 440px;
    order: 2;
    position: relative;
    width: 100%;

    &::after {
      display: none;
    }
  }
`;

export const Content = styled.div`
  max-width: 540px;
  padding: 40px 0 40px 40px;
  position: relative;
  width: 50%;
  z-index: 1;

  @media (max-width: 820px) {
    max-width: none;
    padding: 32px 32px 0;
    width: 100%;
  }

  @media (max-width: 600px) {
    padding: 26px 22px 0;
  }
`;

export const Description = styled.p`
  color: #c3d0ee;
  font-size: 1rem;
  line-height: 1.65;
  margin: 14px 0 0;
  max-width: 370px;

  @media (max-width: 820px) {
    max-width: 520px;
  }
`;

export const Eyebrow = styled.p`
  align-items: center;
  color: ${table.goldLight};
  display: flex;
  font-size: 0.6875rem;
  font-weight: ${fonts.weight.bold};
  gap: 12px;
  letter-spacing: 0.18em;
  line-height: 1.5;
  margin: 0 0 22px;
  text-transform: uppercase;

  @media (max-width: 600px) {
    margin-bottom: 16px;
  }
`;

export const Facts = styled.ul`
  border-top: 1px solid ${table.rim};
  color: ${table.mist};
  display: flex;
  flex-wrap: wrap;
  font-size: 0.75rem;
  gap: 8px 18px;
  line-height: 1.5;
  list-style: none;
  margin: 24px 0 0;
  max-width: 420px;
  padding: 16px 0 0;

  @media (max-width: 600px) {
    margin-top: 20px;
    padding-top: 12px;
  }
`;

export const Hero = styled.section`
  align-items: center;
  background: ${HERO_BLUE};
  border: 1px solid ${table.rim};
  border-radius: 20px;
  box-shadow: 0 18px 42px #0814301a;
  color: ${table.ivory};
  display: flex;
  isolation: isolate;
  margin-bottom: 24px;
  min-height: 430px;
  overflow: hidden;
  position: relative;

  @media (max-width: 820px) {
    align-items: stretch;
    flex-direction: column;
    min-height: 0;
  }
`;

export const Image = styled.img`
  display: block;
  height: 100%;
  object-fit: cover;
  object-position: center;
  width: 100%;

  @media (max-width: 820px) {
    aspect-ratio: 3 / 2;
    height: auto;
  }
`;

export const Note = styled.p`
  color: ${table.mist};
  font-size: 0.75rem;
  line-height: 1.6;
  margin: 12px 0 0;
`;

export const PlayButton = styled.a`
  align-items: center;
  background: linear-gradient(180deg, ${table.goldLight}, ${table.gold});
  border: 1px solid ${table.goldLight};
  border-radius: 6px;
  color: ${table.ink};
  cursor: pointer;
  display: inline-flex;
  font-size: 0.9375rem;
  font-weight: ${fonts.weight.bold};
  gap: 8px;
  justify-content: center;
  min-height: 48px;
  padding: 0 22px;
  text-decoration: none;

  &:hover {
    color: ${table.ink};
    filter: brightness(1.08);
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid ${table.goldLight};
    outline-offset: 5px;
  }
`;

export const RulesLink = styled.a`
  border-radius: 4px;
  color: #e8eefc;
  display: inline-flex;
  font-size: 0.875rem;
  font-weight: ${fonts.weight.semiBold};
  min-height: 44px;
  padding: 12px 0;
  text-decoration: underline;
  text-underline-offset: 5px;

  &:hover {
    color: ${table.goldLight};
  }

  &:focus-visible {
    outline: 2px solid ${table.goldLight};
    outline-offset: 5px;
  }
`;

export const Suits = styled.span`
  color: ${table.gold};
  font-size: 0.8125rem;
  letter-spacing: 0.12em;
  white-space: nowrap;
`;

export const Tagline = styled.p`
  color: #eef2fd;
  font-size: clamp(1.25rem, 1.7vw, 1.6rem);
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.035em;
  line-height: 1.4;
  margin: 16px 0 0;
`;

export const Title = styled.h1`
  font-size: clamp(2.75rem, 4.6vw, 4.75rem);
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.065em;
  line-height: 1;
  margin: 0;
  text-transform: uppercase;

  @media (max-width: 600px) {
    font-size: clamp(2.05rem, 9.4vw, 3.6rem);
  }
`;
