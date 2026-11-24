import styled from 'styled-components';

import {fonts} from 'styles';

export const ActionBar = styled.div`
  align-items: center;
  background: #16285c;
  display: flex;
  flex-wrap: wrap;
  gap: 16px 28px;
  grid-column: 1 / -1;
  justify-content: space-between;
  padding: 22px 36px;
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    gap: 14px;
    padding: 20px 22px;
  }
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 14px 24px;

  @media (max-width: 600px) {
    gap: 14px 18px;
  }
`;

export const Artwork = styled.div`
  align-self: center;
  margin-left: -16%;
  mask-image: linear-gradient(90deg, transparent, #000 15%, #000 93%, transparent);
  max-width: 820px;
  min-width: 0;
  padding: 38px 0 8px;
  pointer-events: none;
  width: 116%;

  @media (max-width: 1100px) {
    margin: -26px auto -22px;
    mask-image: linear-gradient(180deg, transparent, #000 14%, #000 87%, transparent);
    max-width: 660px;
    padding: 0;
    width: 100%;
  }

  @media (max-width: 600px) {
    margin: 0 auto -10px;
  }
`;

export const ChallengeLink = styled.a`
  border-bottom: 1px solid #a6b8e1;
  color: #f0f4ff;
  font-size: 0.875rem;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.5;
  padding: 11px 0;
  text-decoration: none;

  &:hover {
    border-color: #ffffff;
    color: #ffffff;
    text-decoration: none;
  }

  &:focus-visible {
    outline: 3px solid #ffffff;
    outline-offset: 6px;
  }
`;

export const Content = styled.div`
  padding: 36px 0 36px 36px;
  position: relative;
  z-index: 1;

  @media (max-width: 1100px) {
    padding: 32px 32px 0;
  }

  @media (max-width: 600px) {
    padding: 28px 22px 0;
  }
`;

export const Description = styled.p`
  color: #43527c;
  font-size: 1rem;
  line-height: 1.6;
  margin: 18px 0 0;
  max-width: 300px;

  @media (max-width: 1100px) {
    max-width: 490px;
  }
`;

export const Eyebrow = styled.p`
  color: #b72d41;
  font-size: 0.75rem;
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: 0.09em;
  line-height: 1.6;
  margin: 0 0 14px;
  text-transform: uppercase;
`;

export const Features = styled.ul`
  color: #425077;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8125rem;
  font-weight: ${fonts.weight.semiBold};
  gap: 8px 14px;
  list-style: none;
  margin: 24px 0 0;
  max-width: 335px;
  padding: 0;

  li {
    border-bottom: 2px solid #667ca94d;
    padding-bottom: 6px;
  }
`;

export const Hero = styled.section`
  background: linear-gradient(120deg, #eef4ff 6%, #d0e4fc 60%, #c5dcf8);
  border: 1px solid #bbceea;
  border-radius: 24px;
  color: #172e70;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.3fr);
  isolation: isolate;
  margin-bottom: 28px;
  overflow: hidden;
  position: relative;

  @media (max-width: 1100px) {
    grid-template-columns: minmax(0, 1fr);
  }

  @media (max-width: 600px) {
    border-radius: 20px;
  }
`;

export const Image = styled.img`
  display: block;
  height: auto;
  mask-image: linear-gradient(180deg, transparent, #000 10%, #000 89%, transparent);
  width: 100%;
`;

export const Note = styled.p`
  color: #c6d3ee;
  font-size: 0.8125rem;
  line-height: 1.6;
  margin: 0;
  max-width: 220px;
`;

export const PlayLink = styled.a`
  align-items: center;
  background: #d92e47;
  border-radius: 9px;
  box-shadow: 0 4px 0 #961b39;
  color: #ffffff;
  display: inline-flex;
  font-size: 0.9375rem;
  font-weight: ${fonts.weight.bold};
  gap: 7px;
  justify-content: center;
  min-height: 48px;
  padding: 0 24px;
  text-decoration: none;

  &:hover {
    background: #bd243c;
    text-decoration: none;
  }

  &:focus-visible {
    outline: 3px solid #ffffff;
    outline-offset: 6px;
  }
`;

export const Tagline = styled.p`
  font-size: clamp(1.375rem, 2vw, 1.75rem);
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.04em;
  line-height: 1.2;
  margin: 20px 0 0;

  span {
    color: #c72e45;
  }
`;

export const Title = styled.h1`
  font-size: clamp(3.25rem, 5.9vw, 5.25rem);
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.065em;
  line-height: 1;
  margin: 0;
  text-transform: uppercase;

  @media (min-width: 1101px) and (max-width: 1279px) {
    font-size: 3rem;
  }

  @media (max-width: 1100px) {
    font-size: clamp(3.25rem, 8.6vw, 5.25rem);
  }

  @media (max-width: 600px) {
    font-size: clamp(2.375rem, 10.8vw, 4rem);
  }
`;
