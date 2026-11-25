import styled, {keyframes} from 'styled-components';

import {fonts} from 'styles';

import {room} from '../theme';

const HERO_GREEN = '#062b1f';

const turn = keyframes`
  to { transform: rotate(360deg); }
`;

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
      linear-gradient(0deg, ${HERO_GREEN}, transparent 22%), linear-gradient(180deg, ${HERO_GREEN}99, transparent 18%);
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
  color: #bcd3c7;
  font-size: 1rem;
  line-height: 1.65;
  margin: 14px 0 0;
  max-width: 350px;

  @media (max-width: 820px) {
    max-width: 520px;
  }
`;

export const Eyebrow = styled.p`
  align-items: center;
  color: ${room.brassLight};
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
  border-top: 1px solid #1f5d47;
  color: #a9c4b6;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.75rem;
  gap: 8px 18px;
  line-height: 1.5;
  list-style: none;
  margin: 24px 0 0;
  max-width: 400px;
  padding: 16px 0 0;

  @media (max-width: 600px) {
    margin-top: 20px;
    padding-top: 12px;
  }
`;

export const Hero = styled.section`
  align-items: center;
  background: ${HERO_GREEN};
  border: 1px solid ${room.rim};
  border-radius: 20px;
  box-shadow: 0 18px 42px #051b141a;
  color: ${room.ivory};
  display: flex;
  isolation: isolate;
  margin-bottom: 24px;
  min-height: 430px;
  overflow: hidden;
  position: relative;

  &::before {
    background: radial-gradient(
      circle at center,
      transparent 31%,
      #d9b25f24 32%,
      transparent 33%,
      transparent 49%,
      #d9b25f1a 50%,
      transparent 51%
    );
    content: '';
    height: 340px;
    left: -165px;
    pointer-events: none;
    position: absolute;
    top: -150px;
    width: 340px;
  }

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
  color: #a9c4b6;
  font-size: 0.75rem;
  line-height: 1.6;
  margin: 12px 0 0;
`;

export const PlayButton = styled.a`
  align-items: center;
  background: linear-gradient(180deg, ${room.brassLight}, ${room.brass});
  border: 1px solid ${room.brassLight};
  border-radius: 6px;
  color: ${room.ink};
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
    color: ${room.ink};
    filter: brightness(1.08);
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid ${room.brassLight};
    outline-offset: 5px;
  }
`;

export const RulesLink = styled.a`
  border-radius: 4px;
  color: #e6f2ec;
  display: inline-flex;
  font-size: 0.875rem;
  font-weight: ${fonts.weight.semiBold};
  min-height: 44px;
  padding: 12px 0;
  text-decoration: underline;
  text-underline-offset: 5px;

  &:hover {
    color: ${room.brassLight};
  }

  &:focus-visible {
    outline: 2px solid ${room.brassLight};
    outline-offset: 5px;
  }
`;

export const Tagline = styled.p`
  color: #e9f3ee;
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

// A tiny wheel that keeps turning beside the eyebrow
export const WheelMark = styled.span`
  animation: ${turn} 9s linear infinite;
  background: conic-gradient(
    ${room.red} 0 12.5%,
    ${room.black} 0 25%,
    ${room.red} 0 37.5%,
    ${room.black} 0 50%,
    ${room.red} 0 62.5%,
    ${room.black} 0 75%,
    ${room.red} 0 87.5%,
    ${room.green} 0
  );
  border: 1px solid ${room.brassLight};
  border-radius: 50%;
  flex: 0 0 auto;
  height: 25px;
  position: relative;
  width: 25px;

  &::after {
    background: radial-gradient(circle, ${room.brassLight} 0 28%, ${room.brassDeep} 30%);
    border-radius: 50%;
    content: '';
    inset: 7px;
    position: absolute;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
