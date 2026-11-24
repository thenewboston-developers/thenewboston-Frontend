import styled from 'styled-components';

import {fonts} from 'styles';

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 14px 22px;
  margin-top: 26px;
`;

export const Artwork = styled.div`
  align-self: center;
  margin-left: -16%;
  mask-image: linear-gradient(90deg, transparent, #000 15%, #000 93%, transparent);
  max-width: 840px;
  min-width: 0;
  pointer-events: none;
  width: 116%;

  @media (max-width: 1100px) {
    margin: -12px auto -8px;
    mask-image: linear-gradient(180deg, transparent, #000 14%, #000 87%, transparent);
    max-width: 660px;
    width: 100%;
  }

  @media (max-width: 600px) {
    margin-top: 6px;
  }
`;

export const ChallengeLink = styled.a`
  border-bottom: 1px solid #a89c73;
  color: #f7e9d1;
  font-size: 0.875rem;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.5;
  padding: 11px 0;
  text-decoration: none;

  &:hover {
    border-color: #f2d295;
    color: #f2d295;
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid #f2d295;
    outline-offset: 6px;
  }
`;

export const Content = styled.div`
  padding: 40px 0 38px 40px;
  position: relative;
  z-index: 1;

  @media (max-width: 1100px) {
    padding: 34px 32px 0;
  }

  @media (max-width: 600px) {
    padding: 28px 22px 0;
  }
`;

export const Description = styled.p`
  color: #c1d3c9;
  font-size: 1rem;
  line-height: 1.65;
  margin: 18px 0 0;
  max-width: 330px;

  @media (max-width: 1100px) {
    max-width: 520px;
  }
`;

export const Eyebrow = styled.p`
  align-items: center;
  color: #dfc48f;
  display: flex;
  font-size: 0.75rem;
  font-weight: ${fonts.weight.semiBold};
  gap: 12px;
  letter-spacing: 0.17em;
  line-height: 1.6;
  margin: 0 0 22px;
  text-transform: uppercase;

  &::before {
    background: #bd9b57;
    content: '';
    height: 1px;
    width: 32px;
  }
`;

export const Features = styled.ul`
  border-top: 1px solid #c8af7533;
  color: #d4d4bb;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8125rem;
  gap: 12px 28px;
  grid-column: 1 / -1;
  list-style: none;
  margin: 0;
  padding: 19px 40px;

  li + li {
    border-left: 1px solid #c8af7552;
    padding-left: 28px;
  }

  @media (max-width: 600px) {
    gap: 10px 20px;
    padding: 18px 22px;

    li + li {
      border: 0;
      padding: 0;
    }
  }
`;

export const Hero = styled.section`
  background: radial-gradient(ellipse at 85% 46%, #0b5047, transparent 65%), #042e2b;
  border: 1px solid #a8945c59;
  border-radius: 20px;
  color: #fff2d9;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.2fr);
  isolation: isolate;
  margin-bottom: 28px;
  overflow: hidden;
  position: relative;

  @media (max-width: 1100px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Image = styled.img`
  display: block;
  height: auto;
  mask-image: linear-gradient(180deg, transparent, #000 10%, #000 88%, transparent);
  width: 100%;
`;

export const Note = styled.p`
  color: #bbcdc1;
  font-size: 0.8125rem;
  line-height: 1.5;
  margin: 14px 0 0;
`;

export const PlayLink = styled.a`
  align-items: center;
  background: #f2d9a7;
  border: 1px solid #fff0c9;
  border-radius: 5px;
  color: #173b31;
  display: inline-flex;
  font-size: 0.9375rem;
  font-weight: ${fonts.weight.bold};
  gap: 7px;
  justify-content: center;
  min-height: 48px;
  padding: 0 23px;
  text-decoration: none;

  &:hover {
    background: #fff0d3;
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid #f2d295;
    outline-offset: 6px;
  }
`;

export const Tagline = styled.p`
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(1.625rem, 2.15vw, 2rem);
  line-height: 1.25;
  margin: 22px 0 0;

  em {
    color: #e1c48e;
  }
`;

export const Title = styled.h1`
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(3rem, 4.6vw, 4.25rem);
  font-weight: ${fonts.weight.regular};
  letter-spacing: -0.065em;
  line-height: 1.08;
  margin: 0;

  @media (max-width: 1100px) {
    font-size: clamp(3rem, 7.6vw, 4.5rem);
  }

  @media (max-width: 600px) {
    font-size: clamp(2rem, 8.9vw, 3.25rem);
  }
`;
