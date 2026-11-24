import styled from 'styled-components';

import {fonts} from 'styles';

import {reversi, SPLIT_DISK} from '../theme';

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 22px;
  margin-top: 28px;

  @media (max-width: 600px) {
    gap: 12px 18px;
    margin-top: 24px;
  }
`;

export const Artwork = styled.div`
  height: 100%;
  mask-image: linear-gradient(90deg, transparent, #000000 36%);
  pointer-events: none;
  position: absolute;
  right: -3%;
  top: 0;
  width: 78%;

  &::after {
    background:
      linear-gradient(0deg, ${reversi.night}, transparent 24%),
      linear-gradient(180deg, ${reversi.night}a6, transparent 18%);
    content: '';
    inset: 0;
    position: absolute;
  }

  @media (max-width: 1100px) {
    height: 340px;
    margin-top: -8px;
    mask-image: linear-gradient(180deg, transparent, #000000 20%);
    order: 2;
    position: relative;
    right: auto;
    width: 100%;
  }

  @media (max-width: 600px) {
    height: auto;
    margin-top: 0;
  }
`;

export const ChallengeLink = styled.a`
  border-bottom: 1px solid ${reversi.edgeBright};
  color: ${reversi.text};
  font-size: 0.875rem;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.5;
  padding: 11px 0;
  text-decoration: none;

  &:hover {
    border-color: ${reversi.mint};
    color: ${reversi.mint};
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid ${reversi.mint};
    outline-offset: 6px;
  }
`;

export const Content = styled.div`
  max-width: 490px;
  padding: 46px 0 44px 42px;
  position: relative;
  width: 47%;
  z-index: 1;

  @media (max-width: 1100px) {
    max-width: none;
    order: 1;
    padding: 36px 32px 0;
    width: 100%;
  }

  @media (max-width: 600px) {
    padding: 28px 22px 0;
  }
`;

export const Description = styled.p`
  color: ${reversi.mist};
  font-size: 1rem;
  line-height: 1.7;
  margin: 18px 0 0;
  max-width: 355px;

  @media (max-width: 1100px) {
    max-width: 550px;
  }

  @media (max-width: 600px) {
    margin-top: 14px;
  }
`;

export const DiskMark = styled.span`
  background: ${SPLIT_DISK};
  border: 1px solid ${reversi.mint};
  border-radius: 50%;
  box-shadow: 0 0 18px ${reversi.mint}26;
  flex: 0 0 auto;
  height: 23px;
  width: 23px;
`;

export const Eyebrow = styled.p`
  align-items: center;
  color: ${reversi.mint};
  display: flex;
  font-size: 0.6875rem;
  font-weight: ${fonts.weight.bold};
  gap: 11px;
  letter-spacing: 0.15em;
  line-height: 1.6;
  margin: 0 0 22px;
  text-transform: uppercase;

  @media (max-width: 600px) {
    margin-bottom: 18px;
  }
`;

export const Facts = styled.ul`
  color: ${reversi.mist};
  display: flex;
  flex-wrap: wrap;
  font-size: 0.75rem;
  gap: 8px 16px;
  line-height: 1.5;
  list-style: none;
  margin: 30px 0 0;
  padding: 0;

  li + li {
    border-left: 1px solid ${reversi.edge};
    padding-left: 16px;
  }

  @media (max-width: 600px) {
    gap: 6px 12px;
    margin-top: 22px;

    li + li {
      padding-left: 12px;
    }
  }
`;

export const Hero = styled.section`
  align-items: center;
  background: ${reversi.night};
  border: 1px solid ${reversi.edge};
  border-radius: 24px;
  box-shadow: 0 18px 46px ${reversi.night}1a;
  color: ${reversi.text};
  display: flex;
  isolation: isolate;
  margin-bottom: 28px;
  min-height: 520px;
  overflow: hidden;
  position: relative;

  @media (max-width: 1100px) {
    align-items: stretch;
    flex-direction: column;
    min-height: 0;
  }

  @media (max-width: 600px) {
    border-radius: 20px;
  }
`;

export const Image = styled.img`
  display: block;
  height: 100%;
  object-fit: contain;
  object-position: right center;
  width: 100%;

  @media (max-width: 1100px) {
    object-fit: contain;
    object-position: center 45%;
  }

  @media (max-width: 600px) {
    aspect-ratio: 3 / 2;
    height: auto;
  }
`;

export const Note = styled.p`
  color: ${reversi.mist};
  font-size: 0.75rem;
  line-height: 1.6;
  margin: 12px 0 0;
`;

export const PlayButton = styled.button`
  align-items: center;
  background: ${reversi.mint};
  border: 1px solid ${reversi.mintLight};
  border-radius: 8px;
  box-shadow: 0 4px 24px ${reversi.felt}20;
  color: ${reversi.ink};
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
    background: ${reversi.mintLight};
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid ${reversi.mint};
    outline-offset: 5px;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.7;
  }
`;

export const Tagline = styled.p`
  color: ${reversi.text};
  font-size: clamp(1.25rem, 1.8vw, 1.65rem);
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.035em;
  line-height: 1.4;
  margin: 20px 0 0;
  max-width: 350px;

  @media (max-width: 600px) {
    margin-top: 14px;
  }
`;

export const Title = styled.h1`
  font-size: clamp(3.5rem, 5.8vw, 6.25rem);
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.075em;
  line-height: 0.95;
  margin: 0;
  text-transform: uppercase;

  @media (max-width: 600px) {
    font-size: clamp(2.75rem, 12.7vw, 4.75rem);
  }
`;
