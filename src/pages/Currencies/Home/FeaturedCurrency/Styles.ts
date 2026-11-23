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

export const Artwork = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-width: 0;
  overflow: hidden;
  position: relative;

  &::after {
    background: linear-gradient(90deg, ${FOREST}, transparent 18%);
    content: '';
    inset: 0;
    pointer-events: none;
    position: absolute;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: -16px;

    &::after {
      background: linear-gradient(180deg, ${FOREST}, transparent 18%);
    }
  }
`;

export const BonsaiImage = styled.img`
  display: block;
  height: auto;
  mask-image: linear-gradient(180deg, transparent, #000 10%, #000 88%, transparent);
  max-width: 500px;
  object-fit: contain;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 420px;
  }
`;

export const Container = styled.section`
  background: ${FOREST};
  border: 1px solid ${FOREST};
  border-radius: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 36px;
  overflow: hidden;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }

  @media (max-width: ${breakpoints.mini}) {
    border-radius: ${radii.large};
    margin-bottom: 28px;
  }
`;

export const Copy = styled.div`
  align-self: center;
  min-width: 0;
  padding: 44px 0 44px 40px;
  position: relative;
  z-index: 1;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 32px 0 32px 28px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 32px 32px 16px;
  }

  @media (max-width: ${breakpoints.mini}) {
    padding: 28px 24px 16px;
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
