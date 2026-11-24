import {Link} from 'react-router-dom';
import UIcon from '@mdi/react';
import styled from 'styled-components';

import {breakpoints, colors, fonts, pagePadding, shadows} from 'styles';

// The violet of the glowing line on the cover
const ACCENT_COLOR = '#6156b9';

export const About = styled.section`
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 8px 0;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 24px;
    grid-template-columns: 1fr;
  }
`;

export const AboutItem = styled.div`
  border-top: 1px solid ${colors.borderDarker};
  padding-top: 20px;
`;

export const AboutText = styled.p`
  color: ${colors.secondary};
  font-size: 16px;
  line-height: 1.6;
  margin: 8px 0 0;
`;

export const AboutTitle = styled.h2`
  color: ${colors.primary};
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};
  margin: 0;
`;

export const Artwork = styled.div`
  background: #111529;
  min-height: 360px;
  overflow: hidden;
  position: relative;

  @media (max-width: 1080px) {
    aspect-ratio: 3 / 2;
    min-height: 0;
  }
`;

export const BrowserNote = styled.p`
  color: ${colors.secondary};
  font-size: 13px;
  line-height: 1.5;
  margin: 12px 0 0;
`;

export const BackgammonArtwork = styled.div`
  align-items: center;
  background: linear-gradient(135deg, #e5ecdc, #c8d5be);
  display: flex;
  padding: 44px 24px;
  position: relative;

  svg {
    box-shadow: 0 15px 25px #183c3229;
    border-radius: 20px;
    transform: rotate(-5deg);
  }
`;

export const BattleshipArtwork = styled.div`
  align-items: center;
  background: linear-gradient(135deg, #173c51, #41788b);
  display: flex;
  padding: 60px 28px 32px;
  position: relative;

  svg {
    border-radius: 22px;
    box-shadow: 0 16px 32px #071e3c55;
    transform: rotate(-4deg);
  }
`;

export const CardSpacer = styled.div`
  height: 24px;
`;

export const Category = styled.p`
  color: #555087;
  font-size: 12px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.12em;
  line-height: 1.5;
  margin: 0 0 14px;
`;

export const CheckersArtwork = styled.div`
  align-items: center;
  background: linear-gradient(135deg, #e9e7d8, #c9d5ba);
  display: flex;
  justify-content: center;
  padding: 64px 48px 40px;
  position: relative;

  svg {
    border-radius: 24px;
    box-shadow: 0 20px 32px #203c2933;
    max-width: 380px !important;
    transform: rotate(-5deg);
  }
`;

export const Container = styled.div`
  ${pagePadding};
  padding-top: 48px;

  @media (max-width: ${breakpoints.mobile}) {
    padding-top: 32px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 0 auto;
  max-width: 1240px;
  width: 100%;
`;

export const Cover = styled.img`
  height: 100%;
  object-fit: cover;
  position: absolute;
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
  width: 100%;
`;

export const Description = styled.p`
  color: ${colors.secondary};
  font-size: 16px;
  line-height: 1.7;
  margin: 16px 0 24px;
`;

export const Eyebrow = styled.p`
  color: ${colors.secondary};
  font-size: 12px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.16em;
  line-height: 1.5;
  margin: 0 0 12px;
`;

export const Fact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FactLabel = styled.span`
  color: ${colors.secondary};
  font-size: 13px;
  line-height: 1.4;
`;

export const Facts = styled.div`
  border-top: 1px solid ${colors.borderSubtle};
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: 28px;
  padding-top: 22px;
`;

export const FactValue = styled.span`
  color: ${colors.primary};
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
`;

export const FeaturedBadge = styled.span`
  background: #ffffff;
  border-radius: 999px;
  color: #25233e;
  font-size: 11px;
  font-weight: ${fonts.weight.bold};
  left: 24px;
  letter-spacing: 0.08em;
  padding: 9px 14px;
  position: absolute;
  top: 24px;
`;

// The whole card is one link. Rather than underlining every line of text inside it, hovering lifts the card, eases the
// cover closer and wakes up the "Open lobby" pill (see PlayIcon and PlayLabel)
export const GameCard = styled(Link)`
  background: ${colors.white};
  border: 1px solid ${colors.borderSubtle};
  border-radius: 24px;
  box-shadow: ${shadows.card};
  color: inherit;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  overflow: hidden;
  text-decoration: none;
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;

  @media (max-width: 1080px) {
    grid-template-columns: minmax(0, 1fr);
  }

  &:focus-visible {
    outline: 3px solid ${ACCENT_COLOR};
    outline-offset: 5px;
  }

  &:hover {
    text-decoration: none;
  }

  @media (hover: hover) {
    &:hover {
      border-color: #a29bc6;
      box-shadow:
        0 4px 8px rgb(36 32 57 / 6%),
        0 24px 48px -12px rgb(36 32 57 / 28%);
    }
  }

  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-4px);

      ${Cover} {
        transform: scale(1.04);
      }
    }
  }
`;

export const GameCount = styled.span`
  color: ${colors.secondary};
  font-size: 14px;
`;

export const GameDetails = styled.div`
  align-self: center;
  padding: 40px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 28px 24px;
  }
`;

export const GameTitle = styled.h3`
  color: ${colors.primary};
  font-size: clamp(28px, 3vw, 40px);
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin: 0 0 18px;
`;

export const Header = styled.header``;

export const Intro = styled.p`
  color: ${colors.secondary};
  font-size: 18px;
  line-height: 1.6;
  margin: 14px 0 0;
`;

export const PlayIcon = styled(UIcon)`
  flex-shrink: 0;
  transition: transform 0.25s ease;

  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    ${GameCard}:hover & {
      transform: translateX(4px);
    }
  }
`;

export const PlayLabel = styled.span`
  align-items: center;
  background: #242039;
  border-radius: 999px;
  color: ${colors.white};
  display: inline-flex;
  font-size: 15px;
  font-weight: ${fonts.weight.semiBold};
  gap: 8px;
  justify-content: center;
  min-width: 150px;
  padding: 14px 24px;
  transition:
    background 0.25s ease,
    box-shadow 0.25s ease;

  ${GameCard}:focus-visible & {
    background: ${ACCENT_COLOR};
  }

  @media (hover: hover) {
    ${GameCard}:hover & {
      background: ${ACCENT_COLOR};
      box-shadow: 0 8px 20px -6px rgb(97 86 185 / 60%);
    }
  }
`;

export const SectionHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  color: ${colors.primary};
  font-size: 22px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.02em;
  margin: 0;
`;

export const Tagline = styled.p`
  color: #3d3856;
  font-size: 22px;
  font-weight: ${fonts.weight.medium};
  letter-spacing: -0.02em;
  line-height: 1.35;
  margin: 0;
`;

export const Title = styled.h1`
  color: ${colors.primary};
  font-size: clamp(40px, 5vw, 56px);
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.055em;
  line-height: 1.05;
  margin: 0;
`;
