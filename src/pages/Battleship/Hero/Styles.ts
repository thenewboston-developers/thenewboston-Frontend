import styled from 'styled-components';

import {fonts} from 'styles';

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 22px;
  margin-top: 28px;
`;

export const Artwork = styled.div`
  height: 100%;
  mask-image: linear-gradient(90deg, transparent, #000000 35%);
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  width: 78%;

  &::after {
    background: linear-gradient(0deg, #061323, transparent 24%), linear-gradient(180deg, #06132380, transparent 20%);
    content: '';
    inset: 0;
    position: absolute;
  }

  @media (max-width: 1100px) {
    align-self: center;
    height: auto;
    mask-image: linear-gradient(180deg, transparent, #000000 18%);
    max-width: 720px;
    order: 2;
    position: relative;
    width: 100%;
  }
`;

export const ChallengeLink = styled.a`
  border-radius: 4px;
  color: #e5f3fc;
  display: inline-flex;
  font-size: 0.875rem;
  font-weight: ${fonts.weight.semiBold};
  min-height: 44px;
  padding: 12px 0;
  text-decoration: underline;
  text-underline-offset: 5px;

  &:hover {
    color: #ffbc82;
  }

  &:focus-visible {
    outline: 2px solid #ffbc82;
    outline-offset: 5px;
  }
`;

export const Content = styled.div`
  max-width: 550px;
  padding: 44px 0 44px 40px;
  position: relative;
  width: 52%;
  z-index: 1;

  @media (max-width: 1100px) {
    max-width: none;
    padding: 32px 32px 0;
    width: 100%;
  }

  @media (max-width: 600px) {
    padding: 26px 22px 0;
  }
`;

export const Description = styled.p`
  color: #b7cbdc;
  font-size: 1rem;
  line-height: 1.65;
  margin: 16px 0 0;
  max-width: 335px;

  @media (max-width: 1100px) {
    max-width: 520px;
  }

  @media (max-width: 600px) {
    margin-top: 12px;
  }
`;

export const Eyebrow = styled.p`
  align-items: center;
  color: #ffbc82;
  display: flex;
  font-size: 0.6875rem;
  font-weight: ${fonts.weight.bold};
  gap: 12px;
  letter-spacing: 0.18em;
  line-height: 1.5;
  margin: 0 0 26px;
  text-transform: uppercase;

  @media (max-width: 600px) {
    margin-bottom: 18px;
  }
`;

export const Facts = styled.ul`
  border-top: 1px solid #33516a;
  color: #aac2d5;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.75rem;
  gap: 8px 18px;
  line-height: 1.5;
  list-style: none;
  margin: 26px 0 0;
  max-width: 330px;
  padding: 16px 0 0;

  @media (max-width: 600px) {
    margin-top: 20px;
    padding-top: 12px;
  }
`;

export const Hero = styled.section`
  align-items: center;
  background: #061323;
  border: 1px solid #223f56;
  border-radius: 20px;
  box-shadow: 0 18px 42px #0613231a;
  color: #f1f8fc;
  display: flex;
  isolation: isolate;
  margin-bottom: 28px;
  min-height: 500px;
  overflow: hidden;
  position: relative;

  &::before {
    background: radial-gradient(
      circle at center,
      transparent 31%,
      #639cc520 32%,
      transparent 33%,
      transparent 49%,
      #639cc518 50%,
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

  @media (max-width: 1100px) {
    align-items: stretch;
    flex-direction: column;
    min-height: 0;
  }
`;

export const Image = styled.img`
  display: block;
  height: 100%;
  object-fit: contain;
  object-position: right center;
  width: 100%;

  @media (max-width: 1100px) {
    aspect-ratio: 3 / 2;
    height: auto;
    object-fit: contain;
  }
`;

export const Note = styled.p`
  color: #a7bdce;
  font-size: 0.75rem;
  line-height: 1.6;
  margin: 12px 0 0;
`;

export const PlayButton = styled.button`
  align-items: center;
  background: #ffad6a;
  border: 1px solid #ffc18f;
  border-radius: 6px;
  color: #171c27;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: ${fonts.weight.bold};
  gap: 8px;
  justify-content: center;
  min-height: 48px;
  padding: 0 22px;
  text-decoration: none;

  &:hover {
    background: #ffd0ab;
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid #ffbc82;
    outline-offset: 5px;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.7;
  }
`;

export const RadarMark = styled.span`
  background: conic-gradient(from 30deg, #ffbc8240, transparent 80deg);
  border: 1px solid #ffbc82;
  border-radius: 50%;
  flex: 0 0 auto;
  height: 25px;
  position: relative;
  width: 25px;

  &::after {
    border: 1px solid #ffbc8280;
    border-radius: 50%;
    content: '';
    inset: 5px;
    position: absolute;
  }
`;

export const Tagline = styled.p`
  color: #e2eef7;
  font-size: clamp(1.25rem, 1.7vw, 1.6rem);
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.035em;
  line-height: 1.4;
  margin: 18px 0 0;
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
