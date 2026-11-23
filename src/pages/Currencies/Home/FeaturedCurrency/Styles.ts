import styled from 'styled-components';

import {breakpoints, colors, fonts, radii} from 'styles';

const FOREST = '#071d15';
const LEAF = '#d4ed92';
const MUTED = '#bfcec4';

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;

  a {
    align-items: center;
    border: 1px solid rgb(255 255 255 / 32%);
    border-radius: ${radii.medium};
    color: ${colors.white};
    display: inline-flex;
    font-size: 14px;
    font-weight: ${fonts.weight.semiBold};
    justify-content: center;
    min-height: 46px;
    padding: 12px 20px;
    text-decoration: none;
    transition: background 0.15s ease;

    &:focus-visible {
      outline: 2px solid ${LEAF};
      outline-offset: 4px;
    }

    &:hover {
      background: rgb(255 255 255 / 10%);
      text-decoration: none;
    }
  }

  @media (max-width: ${breakpoints.mini}) {
    align-items: stretch;
    flex-direction: column;
    gap: 10px;
    margin-top: 24px;
  }
`;

export const Artwork = styled.picture`
  display: block;
  inset: 0;
  pointer-events: none;
  position: absolute;

  &::after {
    background: linear-gradient(90deg, rgb(7 29 21 / 78%), rgb(7 29 21 / 24%) 48%, rgb(7 29 21 / 0%) 70%);
    content: '';
    inset: 0;
    pointer-events: none;
    position: absolute;
  }

  @media (max-width: ${breakpoints.tablet}) {
    &::after {
      background: linear-gradient(90deg, rgb(7 29 21 / 92%), rgb(7 29 21 / 65%) 50%, rgb(7 29 21 / 0%) 76%);
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    aspect-ratio: 1.1;
    position: relative;

    &::after {
      background: linear-gradient(180deg, ${FOREST}, rgb(7 29 21 / 70%) 8%, rgb(7 29 21 / 0%) 30%);
    }
  }
`;

export const BonsaiImage = styled.img`
  display: block;
  height: 100%;
  object-fit: cover;
  object-position: 80% center;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    object-position: center;
  }
`;

export const Container = styled.section`
  background: ${FOREST};
  border: 1px solid ${FOREST};
  border-radius: 24px;
  isolation: isolate;
  margin-bottom: 36px;
  overflow: hidden;
  position: relative;

  @media (max-width: ${breakpoints.mini}) {
    border-radius: ${radii.large};
    margin-bottom: 28px;
  }
`;

export const Copy = styled.div`
  min-width: 0;
  padding: 44px 24px 44px 40px;
  position: relative;
  width: 54%;
  z-index: 1;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 32px 20px 32px 28px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 32px 32px 0;
    width: 100%;
  }

  @media (max-width: ${breakpoints.mini}) {
    padding: 28px 24px 0;
  }
`;

export const Description = styled.p`
  color: ${MUTED};
  font-size: 16px;
  line-height: 1.7;
  margin: 20px 0 0;
  max-width: 390px;
`;

export const Eyebrow = styled.p`
  color: ${MUTED};
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: 0.08em;
  line-height: 1.7;
  margin: 0;
  text-transform: uppercase;

  span {
    color: ${LEAF};
    margin-left: 12px;
  }
`;

export const Identity = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

export const Logo = styled.img`
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 50%;
  flex-shrink: 0;
`;

export const PurchaseNote = styled.p`
  color: ${MUTED};
  font-size: 13px;
  line-height: 1.6;
  margin: 20px 0 0;
`;

export const ShopLink = styled.a`
  && {
    background: ${LEAF};
    border-color: ${LEAF};
    color: ${FOREST};

    &:hover {
      background: #e2f4b6;
      border-color: #e2f4b6;
    }
  }
`;

export const Title = styled.h2`
  color: ${colors.white};
  font-size: clamp(32px, 4vw, 52px);
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.05em;
  line-height: 1.12;

  span {
    color: ${LEAF};
    display: block;
  }
`;
