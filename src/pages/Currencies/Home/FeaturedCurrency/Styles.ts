import styled from 'styled-components';

import {breakpoints, colors, fonts, radii} from 'styles';

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;

  a {
    align-items: center;
    border: 1px solid ${colors.palette.green[800]};
    border-radius: ${radii.medium};
    color: ${colors.palette.green[900]};
    display: inline-flex;
    font-size: 14px;
    font-weight: ${fonts.weight.semiBold};
    justify-content: center;
    min-height: 44px;
    padding: 10px 18px;
    text-decoration: none;

    &:focus-visible {
      outline: 2px solid ${colors.palette.green[800]};
      outline-offset: 4px;
    }

    &:hover {
      background: ${colors.palette.green[100]};
      text-decoration: none;
    }
  }

  @media (max-width: ${breakpoints.mini}) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const Container = styled.section`
  background: linear-gradient(115deg, ${colors.white}, ${colors.palette.green[50]});
  border: 1px solid ${colors.palette.green[100]};
  border-radius: ${radii.large};
  margin-bottom: 32px;
  padding: 32px;

  @media (max-width: ${breakpoints.mini}) {
    padding: 24px;
  }
`;

export const CurrencyName = styled.p`
  color: ${colors.palette.green[900]};
  font-size: 22px;
  font-weight: ${fonts.weight.bold};
  line-height: 1.4;
  margin: 4px 0 0;

  span {
    color: ${colors.secondary};
    display: inline-block;
    font-size: 14px;
    font-weight: ${fonts.weight.regular};
  }
`;

export const Description = styled.p`
  color: ${colors.secondary};
  font-size: 16px;
  line-height: 1.65;
  margin: 12px 0 0;
  max-width: 680px;
`;

export const Eyebrow = styled.p`
  color: ${colors.palette.green[800]};
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: 0.1em;
  margin: 0;
  text-transform: uppercase;
`;

export const Identity = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
`;

export const Logo = styled.img`
  border-radius: 50%;
  flex-shrink: 0;
`;

export const PurchaseNote = styled.p`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.5;
  margin: 16px 0 0;
`;

export const ShopLink = styled.a`
  && {
    background: ${colors.palette.green[900]};
    color: ${colors.white};

    &:hover {
      background: ${colors.palette.green[800]};
    }
  }
`;

export const Title = styled.h2`
  color: ${colors.primary};
  font-size: clamp(24px, 2.5vw, 30px);
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.03em;
  line-height: 1.25;
`;
