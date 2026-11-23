import styled from 'styled-components';

import {breakpoints, colors, fonts, radii} from 'styles';

export const Actions = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 12px;
  position: relative;

  a {
    align-items: center;
    background: ${colors.white};
    border: 1px solid ${colors.white};
    border-radius: ${radii.medium};
    color: ${colors.palette.blue[900]};
    display: inline-flex;
    font-size: 14px;
    font-weight: ${fonts.weight.semiBold};
    gap: 8px;
    justify-content: center;
    min-height: 44px;
    padding: 10px 18px;
    text-decoration: none;

    &:focus-visible {
      outline: 2px solid ${colors.white};
      outline-offset: 4px;
    }

    &:hover {
      background: ${colors.palette.blue[100]};
      border-color: ${colors.palette.blue[100]};
      text-decoration: none;
    }
  }
`;

export const Container = styled.header`
  align-items: center;
  background:
    radial-gradient(ellipse at top right, ${colors.palette.blue[500]}, transparent 65%), ${colors.palette.blue[900]};
  border: 1px solid ${colors.palette.blue[800]};
  border-radius: ${radii.large};
  color: ${colors.white};
  display: flex;
  flex-shrink: 0;
  gap: 28px;
  justify-content: space-between;
  margin-bottom: 24px;
  overflow: hidden;
  padding: 32px;
  position: relative;

  &::before {
    border: 1px solid rgb(255 255 255 / 8%);
    border-radius: 50%;
    content: '';
    height: 340px;
    pointer-events: none;
    position: absolute;
    right: -100px;
    top: -200px;
    width: 340px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
  }

  @media (max-width: ${breakpoints.mini}) {
    padding: 24px;
  }
`;

export const Copy = styled.div`
  min-width: 0;
  position: relative;
`;

export const Description = styled.p`
  color: ${colors.palette.blue[100]};
  font-size: 16px;
  line-height: 1.65;
  margin: 12px 0 0;
  max-width: 640px;
`;

export const Eyebrow = styled.div`
  color: ${colors.palette.blue[100]};
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: 0.12em;
  margin-bottom: 12px;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  color: ${colors.white};
  font-size: clamp(26px, 2.5vw, 36px);
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.04em;
  line-height: 1.2;
  overflow-wrap: anywhere;
`;
