import styled from 'styled-components';

import {fonts} from 'styles';

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
  margin-top: 24px;

  @media (max-width: 600px) {
    gap: 10px 16px;
    margin-top: 20px;
  }
`;

export const Artwork = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  mask-image: linear-gradient(90deg, transparent, #000000 32%);
  max-width: 795px;
  pointer-events: none;
  position: absolute;
  right: -3%;
  top: 0;
  width: 74%;

  @media (max-width: 1100px) {
    margin: -12px auto 0;
    mask-image: linear-gradient(180deg, transparent, #000000 16%);
    max-width: 650px;
    order: 2;
    position: relative;
    right: auto;
    width: 100%;
  }

  @media (max-width: 600px) {
    margin-top: 0;
  }
`;

export const BoxMark = styled.span`
  border: 2px solid #214ac5;
  flex: 0 0 auto;
  height: 19px;
  position: relative;
  transform: rotate(-8deg);
  width: 19px;

  &::after {
    background: #214ac5;
    border-radius: 50%;
    box-shadow:
      17px 0 #214ac5,
      0 17px #214ac5,
      17px 17px #214ac5;
    content: '';
    height: 5px;
    left: -3px;
    position: absolute;
    top: -3px;
    width: 5px;
  }
`;

export const ChallengeLink = styled.a`
  border-radius: 4px;
  color: #18366b;
  display: inline-flex;
  font-size: 0.875rem;
  font-weight: ${fonts.weight.semiBold};
  min-height: 44px;
  padding: 12px 0;
  text-decoration: underline;
  text-underline-offset: 5px;

  &:hover {
    color: #214ac5;
  }

  &:focus-visible {
    outline: 3px solid #214ac5;
    outline-offset: 5px;
  }
`;

export const Content = styled.div`
  max-width: 500px;
  padding: 36px 0 34px 40px;
  position: relative;
  width: 45%;
  z-index: 1;

  @media (max-width: 1100px) {
    max-width: none;
    order: 1;
    padding: 32px 32px 0;
    width: 100%;
  }

  @media (max-width: 600px) {
    padding: 28px 22px 0;
  }
`;

export const CornerMark = styled.div`
  border: 2px solid #244ac54d;
  height: 32px;
  pointer-events: none;
  position: absolute;
  right: 28px;
  top: 28px;
  transform: rotate(12deg);
  width: 32px;

  &::after {
    background: #f57055;
    border-radius: 50%;
    content: '';
    height: 12px;
    position: absolute;
    right: -6px;
    top: -6px;
    width: 12px;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

export const Eyebrow = styled.p`
  align-items: center;
  color: #244aa0;
  display: flex;
  font-size: 0.75rem;
  font-weight: ${fonts.weight.bold};
  gap: 12px;
  letter-spacing: 0.08em;
  line-height: 1.5;
  margin: 0 0 20px;
  text-transform: uppercase;

  @media (max-width: 600px) {
    font-size: 0.6875rem;
    gap: 10px;
    margin-bottom: 16px;
  }
`;

export const Facts = styled.ul`
  color: #355664;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8125rem;
  font-weight: ${fonts.weight.semiBold};
  gap: 8px 20px;
  line-height: 1.5;
  list-style: none;
  margin: 26px 0 0;
  padding: 0;

  li {
    border-bottom: 2px solid #6ca88d66;
    padding-bottom: 5px;
  }

  @media (max-width: 600px) {
    gap: 8px 16px;
    margin-top: 20px;
  }
`;

export const Hero = styled.section`
  align-items: center;
  background: linear-gradient(115deg, #e7f6df 8%, #d5eed6 48%, #b5ddc3);
  border: 1px solid #b8d8c3;
  border-radius: 24px;
  color: #173878;
  display: flex;
  isolation: isolate;
  margin-bottom: 28px;
  min-height: 530px;
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
  height: auto;
  mask-image: linear-gradient(180deg, transparent, #000000 10%, #000000 88%, transparent);
  object-fit: contain;
  object-position: right center;
  width: 100%;

  @media (max-width: 1100px) {
    aspect-ratio: 3 / 2;
    height: auto;
    mask-image: linear-gradient(180deg, #000000 88%, transparent);
  }
`;

export const Note = styled.p`
  color: #48635c;
  font-size: 0.8125rem;
  line-height: 1.5;
  margin: 12px 0 0;
`;

export const PlayLink = styled.a`
  align-items: center;
  background: #234bc5;
  border: 1px solid #234bc5;
  border-radius: 8px;
  box-shadow: 3px 3px 0 #173878;
  color: #ffffff;
  display: inline-flex;
  font-size: 0.9375rem;
  font-weight: ${fonts.weight.bold};
  gap: 7px;
  justify-content: center;
  min-height: 48px;
  padding: 0 22px;
  text-decoration: none;

  &:hover {
    background: #173878;
    text-decoration: none;
  }

  &:focus-visible {
    outline: 3px solid #173878;
    outline-offset: 6px;
  }
`;

export const Tagline = styled.p`
  color: #2d535a;
  font-size: clamp(1.125rem, 1.6vw, 1.375rem);
  font-weight: ${fonts.weight.medium};
  letter-spacing: -0.025em;
  line-height: 1.5;
  margin: 20px 0 0;
  max-width: 300px;

  @media (max-width: 600px) {
    margin-top: 16px;
  }
`;

export const Title = styled.h1`
  font-size: clamp(3.75rem, 6.4vw, 5rem);
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.065em;
  line-height: 0.96;
  margin: 0;

  span {
    color: #c25336;
  }

  @media (max-width: 1100px) {
    font-size: clamp(3.75rem, 7.4vw, 5rem);
  }

  @media (max-width: 600px) {
    font-size: clamp(2.75rem, 12vw, 4.25rem);
  }
`;
