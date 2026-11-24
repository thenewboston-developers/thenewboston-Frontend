import styled from 'styled-components';

import UAuthButtons from 'components/AuthButtons';
import {breakpoints, colors, fonts} from 'styles';

export const Artwork = styled.div`
  flex: 0 0 188px;
  height: 220px;
  pointer-events: none;
  position: relative;

  &::before {
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 32px 32px;
    content: '';
    inset: -100px -80px -100px -36px;
    mask-image: linear-gradient(90deg, transparent, black);
    position: absolute;
    transform: rotate(-18deg);
  }

  @media (max-width: ${breakpoints.mini}) {
    position: absolute;
    right: 0;
    top: 0;
    transform: scale(0.48);
    transform-origin: top right;
    width: 188px;
  }
`;

/* Keep the shared authentication flow, with button colors scoped to this dark surface. */
export const AuthButtons = styled(UAuthButtons)`
  gap: 10px;

  > button {
    background: ${colors.white};
    border-color: ${colors.white};
    border-radius: 8px;
    color: ${colors.primary};
    height: 44px;

    &:hover {
      background: ${colors.whiteSmoke};
      border-color: ${colors.whiteSmoke};
    }

    &:focus-visible {
      outline: 2px solid ${colors.white};
      outline-offset: 4px;
    }
  }

  > button:first-child {
    background: transparent;
    border-color: #555861;
    color: ${colors.white};

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: #91949d;
    }
  }
`;

/* Keep the same edge-to-edge treatment as feed posts on phones. */
export const Container = styled.div`
  align-items: center;
  background: radial-gradient(ellipse at 100% 70%, rgba(220, 13, 22, 0.22), transparent 60%), #111216;
  border: 1px solid #292a31;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(15, 20, 25, 0.08);
  display: flex;
  gap: 12px;
  isolation: isolate;
  overflow: hidden;
  padding: 28px;
  position: relative;

  @media (max-width: ${breakpoints.mini}) {
    border: none;
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
  color: #ff9ca3;
  font-size: 10px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.16em;
  line-height: 1.6;
  text-transform: uppercase;

  @media (max-width: ${breakpoints.mini}) {
    max-width: calc(100% - 76px);
  }
`;

export const Greeting = styled.span`
  color: #c2c3cc;
  display: block;
  font-size: 17px;
  font-weight: ${fonts.weight.regular};
  letter-spacing: -0.02em;
  line-height: 1.6;
`;

export const Heading = styled.h2`
  color: ${colors.white};
  font-size: 34px;
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.055em;
  line-height: 1.2;
  margin-top: 18px;

  @media (max-width: ${breakpoints.mini}) {
    font-size: 30px;
    margin-top: 24px;
  }
`;

export const Logo = styled.img`
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  box-shadow:
    0 24px 48px rgba(0, 0, 0, 0.4),
    0 0 48px rgba(220, 13, 22, 0.25);
  display: block;
  height: 128px;
  position: relative;
  width: 128px;
`;

export const LogoStack = styled.div`
  left: 24px;
  position: absolute;
  top: 54px;
  transform: rotate(-18deg);

  &::before,
  &::after {
    border: 1px solid rgba(255, 104, 117, 0.4);
    border-radius: 16px;
    content: '';
    inset: 0;
    position: absolute;
  }

  &::before {
    transform: translate(16px, -16px);
  }

  &::after {
    border-color: rgba(255, 104, 117, 0.18);
    transform: translate(32px, -32px);
    z-index: -1;
  }
`;

export const Text = styled.p`
  color: #b8bac5;
  font-size: 14px;
  line-height: 1.6;
  margin: 12px 0 22px;
  max-width: 360px;
`;
