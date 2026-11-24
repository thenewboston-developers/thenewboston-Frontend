import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {fonts} from 'styles';

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
  margin-top: 26px;

  @media (max-width: 600px) {
    gap: 12px 16px;
    margin-top: 22px;
  }
`;

export const Artwork = styled.div`
  height: 100%;
  mask-image: linear-gradient(90deg, transparent, #000000 35%);
  pointer-events: none;
  position: absolute;
  right: -1%;
  top: 0;
  width: 78%;

  &::after {
    background: linear-gradient(0deg, #100b26, transparent 22%), linear-gradient(180deg, #100b2666, transparent 18%);
    content: '';
    inset: 0;
    position: absolute;
  }

  @media (max-width: 1100px) {
    align-self: center;
    height: auto;
    mask-image: linear-gradient(180deg, transparent, #000000 15%);
    max-width: 720px;
    order: 2;
    position: relative;
    right: auto;
    width: 100%;
  }
`;

export const Content = styled.div`
  max-width: 490px;
  padding: 38px 0 38px 40px;
  position: relative;
  width: 47%;
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
  color: #dfd5f3;
  font-size: 1.125rem;
  font-weight: ${fonts.weight.medium};
  letter-spacing: -0.02em;
  line-height: 1.5;
  margin: 22px 0 0;

  @media (max-width: 600px) {
    margin-top: 16px;
  }
`;

export const Eyebrow = styled.p`
  align-items: center;
  color: #ceb5ff;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.6875rem;
  font-weight: ${fonts.weight.bold};
  gap: 10px 12px;
  letter-spacing: 0.12em;
  line-height: 1.5;
  margin: 0 0 24px;
  text-transform: uppercase;

  @media (max-width: 600px) {
    margin-bottom: 18px;
  }
`;

export const Facts = styled.ul`
  color: #bbacd3;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.75rem;
  gap: 8px 16px;
  line-height: 1.5;
  list-style: none;
  margin: 24px 0 0;
  padding: 0;

  li + li {
    border-left: 1px solid #685482;
    padding-left: 16px;
  }

  @media (max-width: 600px) {
    margin-top: 18px;
  }
`;

export const Hero = styled.section`
  align-items: center;
  background: radial-gradient(ellipse at 14% 15%, #30154a80, transparent 50%), #100b26;
  border: 1px solid #41305b;
  border-radius: 28px;
  box-shadow: 0 18px 48px #28104120;
  color: #fbf8ff;
  display: flex;
  isolation: isolate;
  min-height: 510px;
  overflow: hidden;
  position: relative;

  @media (max-width: 1100px) {
    align-items: stretch;
    flex-direction: column;
    min-height: 0;
  }

  @media (max-width: 600px) {
    border-radius: 22px;
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
  }
`;

export const LeaderboardLink = styled(ULink)`
  align-items: center;
  border: 1px solid #8f79ab;
  border-radius: 999px;
  color: #f4eaff;
  display: inline-flex;
  font-size: 0.875rem;
  font-weight: ${fonts.weight.semiBold};
  gap: 8px;
  justify-content: center;
  min-height: 48px;
  padding: 0 18px;
  text-decoration: none;

  &:hover {
    background: #49306080;
    border-color: #e3ccff;
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid #e8ceff;
    outline-offset: 5px;
  }
`;

export const PrimaryButton = styled.button`
  align-items: center;
  background: #e5d0ff;
  border: 1px solid #f2e6ff;
  border-radius: 999px;
  box-shadow: 0 4px 28px #b883ff26;
  color: #24113e;
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
    background: #f5edff;
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid #e8ceff;
    outline-offset: 5px;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.7;
  }
`;

export const Title = styled.h1`
  font-size: clamp(3.5rem, 4.9vw, 4.75rem);
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.065em;
  line-height: 0.95;
  margin: 0;
  text-transform: uppercase;

  span {
    color: #ffd990;
    display: block;
    font-size: 1.25em;
    margin-top: 3px;
  }

  @media (max-width: 600px) {
    font-size: clamp(2.7rem, 10.8vw, 4rem);

    span {
      font-size: 1.15em;
    }
  }
`;

export const WinningLine = styled.span`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  gap: 4px;
  position: relative;

  &::before {
    background: #ffd990;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
  }

  span {
    background: #ffd990;
    border-radius: 50%;
    box-shadow: 0 0 6px #ffce6c50;
    height: 6px;
    position: relative;
    width: 6px;
  }
`;
