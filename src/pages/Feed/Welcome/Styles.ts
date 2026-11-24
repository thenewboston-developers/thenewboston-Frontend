import styled from 'styled-components';

import {breakpoints, cardStyle, colors, fonts} from 'styles';

export const Artwork = styled.div`
  flex: 0 0 188px;
  height: 220px;
  pointer-events: none;
  position: relative;

  @media (max-width: ${breakpoints.mini}) {
    height: 100px;
    position: absolute;
    right: 4px;
    top: 2px;
    transform: scale(0.5);
    transform-origin: top right;
    width: 188px;
  }
`;

export const ChatSatellite = styled.div`
  align-items: center;
  background: ${colors.white};
  border: 1px solid #eeded5;
  border-radius: 14px;
  box-shadow: 0 5px 12px rgba(100, 35, 25, 0.06);
  color: ${colors.accent};
  display: flex;
  height: 44px;
  justify-content: center;
  left: 8px;
  position: absolute;
  top: 24px;
  transform: rotate(-12deg);
  width: 44px;
`;

export const CoinSatellite = styled.div`
  align-items: center;
  background: #ffda86;
  border: 4px solid #ffedbd;
  border-radius: 50%;
  box-shadow: 0 5px 12px rgba(100, 35, 25, 0.08);
  color: #86521a;
  display: flex;
  height: 46px;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 152px;
  transform: rotate(14deg);
  width: 46px;
`;

/* Keep the same edge-to-edge treatment as feed posts on phones. */
export const Container = styled.div`
  ${cardStyle};
  align-items: center;
  background: radial-gradient(ellipse at 100% 50%, #ffe0c8 0%, transparent 65%), #fff9f2;
  border-color: #eeded5;
  display: flex;
  gap: 12px;
  isolation: isolate;
  overflow: hidden;
  padding: 28px;
  position: relative;

  @media (max-width: ${breakpoints.mini}) {
    border: none;
    border-bottom: 1px solid #eeded5;
    border-radius: 0;
    box-shadow: none;
    padding: 24px 20px;
  }
`;

export const Content = styled.div`
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 1;
`;

export const Eyebrow = styled.p`
  color: ${colors.accentHover};
  font-size: 10px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.14em;
  line-height: 1.6;
  text-transform: uppercase;

  @media (max-width: ${breakpoints.mini}) {
    max-width: calc(100% - 76px);
  }
`;

export const Greeting = styled.span`
  display: block;
  font-size: 18px;
  font-weight: ${fonts.weight.medium};
  letter-spacing: -0.02em;
  line-height: 1.5;
`;

export const Heading = styled.h2`
  color: ${colors.primary};
  font-size: 32px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.045em;
  line-height: 1.2;
  margin-top: 16px;

  @media (max-width: ${breakpoints.mini}) {
    font-size: 30px;
    margin-top: 24px;
  }
`;

export const Logo = styled.img`
  display: block;
  height: 112px;
  width: 112px;
`;

export const LogoTile = styled.div`
  border: 6px solid ${colors.white};
  border-radius: 28px;
  box-shadow: 0 18px 28px rgba(150, 27, 27, 0.2);
  left: 38px;
  overflow: hidden;
  position: absolute;
  top: 64px;
  transform: rotate(-12deg);
`;

export const Orbit = styled.div`
  border: 1px solid rgba(190, 84, 55, 0.2);
  border-radius: 50%;
  height: 184px;
  left: 4px;
  position: absolute;
  top: 22px;
  transform: rotate(-25deg);
  width: 184px;

  &::before {
    border: 1px dashed rgba(190, 84, 55, 0.18);
    border-radius: 50%;
    content: '';
    inset: -22px;
    position: absolute;
  }

  &::after {
    background: ${colors.accent};
    border: 4px solid #fff0e5;
    border-radius: 50%;
    bottom: 12px;
    content: '';
    height: 13px;
    left: 20px;
    position: absolute;
    width: 13px;
  }
`;

export const Spark = styled.div`
  color: ${colors.accent};
  position: absolute;
  right: 8px;
  top: 36px;
`;

export const Text = styled.p`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.6;
  margin: 12px 0 20px;
  max-width: 360px;
`;
