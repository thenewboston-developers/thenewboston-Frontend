import styled from 'styled-components';

import {fonts} from 'styles';

export const ActionBar = styled.div`
  align-items: center;
  background: #07102040;
  border-top: 1px solid #ffffff12;
  display: flex;
  flex-wrap: wrap;
  gap: 16px 28px;
  grid-column: 1 / -1;
  justify-content: space-between;
  padding: 24px 40px;
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
  margin-left: -3%;
  max-width: 900px;
  min-width: 0;
  padding: 26px 12px 18px 0;
  pointer-events: none;
  position: relative;
  width: 103%;

  @media (max-width: 1100px) {
    margin: 12px auto 0;
    max-width: 760px;
    padding: 0 6px 16px;
    width: 100%;
  }
`;

export const ChallengeLink = styled.a`
  border-bottom: 1px solid #9fb4e6;
  color: #eef2ff;
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
  padding: 44px 0 44px 40px;
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
  color: #c3cdea;
  font-size: 1rem;
  line-height: 1.6;
  margin: 18px 0 0;
  max-width: 330px;

  @media (max-width: 1100px) {
    max-width: 490px;
  }
`;

export const Eyebrow = styled.p`
  color: #ff9485;
  font-size: 0.75rem;
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: 0.09em;
  line-height: 1.6;
  margin: 0 0 14px;
  text-transform: uppercase;
`;

export const Features = styled.ul`
  color: #c3cdea;
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
    border-bottom: 2px solid #8fa6e04d;
    padding-bottom: 6px;
  }
`;

export const Hero = styled.section`
  background:
    radial-gradient(ellipse at 64% 18%, #a6403433, transparent 40%),
    radial-gradient(ellipse at 88% 56%, #2456b470, transparent 54%),
    linear-gradient(115deg, #0b142c, #101c38 60%, #132443);
  border: 1px solid #ffffff14;
  border-radius: 24px;
  color: #ffffff;
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.35fr);
  isolation: isolate;
  margin-bottom: 28px;
  overflow: hidden;
  position: relative;

  @media (max-width: 1100px) {
    background:
      radial-gradient(ellipse at 25% 60%, #a640342b, transparent 40%),
      radial-gradient(ellipse at 88% 67%, #2456b470, transparent 54%),
      linear-gradient(130deg, #0b142c, #101c38 60%, #132443);
    grid-template-columns: minmax(0, 1fr);
  }

  @media (max-width: 600px) {
    border-radius: 20px;
  }
`;

export const Image = styled.img`
  display: block;
  filter: drop-shadow(0 24px 18px #02081770);
  height: auto;
  width: 100%;
`;

export const Note = styled.p`
  color: #b9c4e4;
  font-size: 0.8125rem;
  line-height: 1.6;
  margin: 0;
  max-width: 220px;
`;

export const PlayButton = styled.button`
  align-items: center;
  background: #e0483c;
  border-radius: 9px;
  box-shadow: 0 4px 0 #9a261d;
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: ${fonts.weight.bold};
  gap: 7px;
  justify-content: center;
  min-height: 48px;
  padding: 0 24px;
  text-decoration: none;

  &:hover {
    background: #c93b30;
    text-decoration: none;
  }

  &:focus-visible {
    outline: 3px solid #ffffff;
    outline-offset: 6px;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.7;
  }
`;

export const Tagline = styled.p`
  font-size: clamp(1.375rem, 2vw, 1.75rem);
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.04em;
  line-height: 1.2;
  margin: 20px 0 0;

  span {
    color: #7fb0ff;
  }
`;

export const Title = styled.h1`
  font-size: clamp(3.25rem, 5.9vw, 5.25rem);
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.065em;
  line-height: 1;
  margin: 0;
  text-transform: uppercase;

  @media (max-width: 1100px) {
    font-size: clamp(3.25rem, 8.6vw, 5.25rem);
  }

  @media (max-width: 600px) {
    font-size: clamp(2.375rem, 10.8vw, 4rem);
  }
`;
