import styled from 'styled-components';

import {fonts} from 'styles';

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
  margin-top: 22px;

  @media (max-width: 600px) {
    gap: 12px 18px;
    margin-top: 22px;
  }
`;

export const Artwork = styled.div`
  bottom: 0;
  max-width: 820px;
  pointer-events: none;
  position: absolute;
  right: 0;
  width: 68%;

  @media (max-width: 1100px) {
    margin: -38px auto -12px;
    max-width: 600px;
    position: relative;
    width: 100%;
  }

  @media (max-width: 600px) {
    margin: -8px auto -8px;
  }
`;

export const ChallengeLink = styled.a`
  border-radius: 4px;
  color: #4a2632;
  display: inline-flex;
  font-size: 0.875rem;
  font-weight: ${fonts.weight.bold};
  min-height: 44px;
  padding: 12px 0;
  text-decoration: underline;
  text-underline-offset: 5px;

  &:hover {
    color: #8b332c;
  }

  &:focus-visible {
    outline: 3px solid #4a2632;
    outline-offset: 5px;
  }
`;

export const Content = styled.div`
  padding: 32px 40px 60px;
  position: relative;
  z-index: 1;

  @media (max-width: 1100px) {
    order: -1;
    padding: 32px 32px 0;
  }

  @media (max-width: 600px) {
    padding: 28px 24px 0;
  }
`;

export const Description = styled.p`
  color: #684143;
  font-size: 1rem;
  line-height: 1.5;
  margin: 14px 0 0;
  max-width: 300px;

  @media (max-width: 1100px) {
    max-width: 440px;
  }
`;

export const Eyebrow = styled.p`
  color: #7c3c37;
  font-size: 0.8125rem;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.075em;
  line-height: 1.5;
  margin: 0 0 12px;
  text-transform: uppercase;
`;

export const Features = styled.ul`
  bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  left: 40px;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 1;

  li {
    background: #ffead999;
    border: 1px solid #6d3c3329;
    border-radius: 100px;
    color: #643c3d;
    font-size: 0.8125rem;
    font-weight: ${fonts.weight.semiBold};
    padding: 7px 12px;
  }

  @media (max-width: 1100px) {
    left: auto;
    padding: 0 32px 28px;
    position: relative;
  }

  @media (max-width: 600px) {
    padding: 0 24px 24px;
  }
`;

export const Hero = styled.section`
  background: linear-gradient(120deg, #ffe4cc 8%, #f6b99c 64%, #e88c70);
  border: 1px solid #e6a88b;
  border-radius: 28px;
  color: #45232f;
  isolation: isolate;
  margin-bottom: 28px;
  min-height: 550px;
  overflow: hidden;
  position: relative;

  @media (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  @media (max-width: 600px) {
    border-radius: 22px;
  }
`;

export const Image = styled.img`
  display: block;
  height: auto;
  mask-composite: intersect;
  mask-image:
    linear-gradient(90deg, transparent, #000 14%), linear-gradient(180deg, transparent, #000 20%, #000 86%, transparent);
  width: 100%;

  @media (max-width: 1100px) {
    mask-image: linear-gradient(180deg, transparent, #000 22%, #000 82%, transparent);
  }
`;

export const Note = styled.p`
  color: #795148;
  font-size: 0.8125rem;
  line-height: 1.5;
  margin: 12px 0 0;
  max-width: 300px;
`;

export const PlayLink = styled.a`
  align-items: center;
  background: #4a2632;
  border-radius: 100px;
  color: #fff1df;
  display: inline-flex;
  font-size: 0.9375rem;
  font-weight: ${fonts.weight.bold};
  gap: 7px;
  justify-content: center;
  min-height: 48px;
  padding: 0 24px;
  text-decoration: none;
  transition:
    background 150ms ease,
    box-shadow 150ms ease;

  &:hover {
    background: #6b3441;
    box-shadow: 0 5px 16px #7e343333;
    text-decoration: none;
  }

  &:focus-visible {
    outline: 3px solid #4a2632;
    outline-offset: 5px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const StudioLabel = styled.div`
  border: 1px solid #703c3552;
  border-radius: 50%;
  color: #7c3c37;
  font-size: 0.75rem;
  font-weight: ${fonts.weight.bold};
  line-height: 1.5;
  padding: 25px 15px;
  position: absolute;
  right: 32px;
  text-align: center;
  top: 28px;
  transform: rotate(10deg);

  @media (max-width: 1100px) {
    right: 28px;
    top: 34px;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

export const Tagline = styled.p`
  font-size: 1.5rem;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.045em;
  line-height: 1.2;
  margin: 18px 0 0;
`;

export const Title = styled.h1`
  font-size: clamp(4.5rem, 7.2vw, 5.5rem);
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.075em;
  line-height: 1;
  margin: 0;

  span {
    color: #c75638;
  }

  @media (max-width: 1100px) {
    font-size: clamp(4.5rem, 10vw, 6.5rem);
  }

  @media (max-width: 600px) {
    font-size: clamp(3.25rem, 16vw, 5rem);
  }
`;
