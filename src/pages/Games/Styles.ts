import {Link} from 'react-router-dom';
import UIcon from '@mdi/react';
import styled from 'styled-components';

import {breakpoints, colors, fonts, pagePadding} from 'styles';

export const About = styled.section`
  border-top: 1px solid ${colors.borderDarker};
  display: grid;
  gap: 28px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 28px 0 8px;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;
export const AboutIcon = styled(UIcon)`
  color: #737785;
  flex-shrink: 0;
  margin-top: 2px;
`;
export const AboutItem = styled.div`
  display: flex;
  gap: 14px;
`;
export const AboutText = styled.p`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.6;
  margin: 6px 0 0;
`;
export const AboutTitle = styled.h2`
  color: ${colors.primary};
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
  margin: 0;
`;
export const Artwork = styled.div`
  aspect-ratio: 3 / 2;
  background: #152635;
  overflow: hidden;
  position: relative;
`;
export const BrowserBadge = styled.span`
  align-items: center;
  color: ${colors.secondary};
  display: inline-flex;
  flex-shrink: 0;
  font-size: 14px;
  gap: 8px;
  padding-bottom: 4px;
`;
export const CardFooter = styled.div`
  align-items: center;
  border-top: 1px solid ${colors.borderSubtle};
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-top: 22px;
  padding-top: 20px;
`;
export const Category = styled.p`
  color: ${colors.secondary};
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
  line-height: 1.5;
  margin: 0 0 6px;
`;
export const Container = styled.div`
  ${pagePadding};
  padding-bottom: 48px;
  padding-top: 40px;

  @media (max-width: ${breakpoints.mobile}) {
    padding-top: 28px;
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  margin: 0 auto;
  max-width: 1440px;
  width: 100%;
`;
export const Cover = styled.img`
  display: block;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  width: 100%;
`;
export const Description = styled.p`
  color: ${colors.secondary};
  flex: 1;
  font-size: 15px;
  line-height: 1.6;
  margin: 12px 0 18px;
`;
export const Eyebrow = styled.p`
  color: #68707d;
  font-size: 12px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.13em;
  line-height: 1.5;
  margin: 0 0 10px;
`;
export const FeaturedBadge = styled.span`
  backdrop-filter: blur(12px);
  background: #0b1627b8;
  border: 1px solid #ffffff30;
  border-radius: 7px;
  color: #ffffff;
  font-size: 10px;
  font-weight: ${fonts.weight.bold};
  left: 16px;
  letter-spacing: 0.09em;
  padding: 7px 10px;
  position: absolute;
  top: 16px;
`;
export const FreeLabel = styled.span`
  color: ${colors.primary};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
`;
export const FreeNote = styled.span`
  color: ${colors.secondary};
  display: block;
  font-size: 12px;
  font-weight: ${fonts.weight.regular};
  margin-top: 4px;
`;
export const GameCard = styled(Link)<{$accent: string}>`
  background: ${colors.white};
  border: 1px solid #e3e5eb;
  border-radius: 20px;
  box-shadow: 0 4px 16px #18213a06;
  color: inherit;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  text-decoration: none;
  transition:
    box-shadow 0.25s ease,
    transform 0.25s ease;

  &:focus-visible {
    outline: 3px solid ${({$accent}) => $accent};
    outline-offset: 4px;
  }

  &:hover {
    box-shadow: 0 16px 32px #18213a16;
    text-decoration: none;
  }

  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-4px);

      ${Cover} {
        transform: scale(1.035);
      }
    }
  }
`;
export const GameCount = styled.span`
  color: ${colors.secondary};
  font-size: 13px;
`;
export const GameDetails = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 18px;
`;
export const GameGrid = styled.div`
  display: grid;
  gap: 22px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 1100px) {
    gap: 18px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;
export const GameTitle = styled.h3`
  color: ${colors.primary};
  font-size: clamp(24px, 2.2vw, 30px);
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.035em;
  line-height: 1.2;
  margin: 0;
`;
export const Header = styled.header`
  align-items: end;
  display: flex;
  flex-wrap: wrap;
  gap: 20px 32px;
  justify-content: space-between;
`;
export const Intro = styled.p`
  color: ${colors.secondary};
  font-size: 16px;
  line-height: 1.6;
  margin: 12px 0 0;
  max-width: 580px;
`;
export const PlayLabel = styled.span`
  background: #eef0f6;
  border-radius: 999px;
  color: #344366;
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
  padding: 11px 16px;
  white-space: nowrap;

  ${GameCard}:hover &, ${GameCard}:focus-visible & {
    background: #202c48;
    color: #ffffff;
  }
`;
export const SectionDescription = styled.p`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.5;
  margin: 7px 0 0;
`;
export const SectionHeader = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 22px;
`;
export const SectionTitle = styled.h2`
  color: ${colors.primary};
  font-size: 24px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.035em;
  margin: 0;
`;
export const Tags = styled.div`
  color: #596172;
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  gap: 6px;

  span {
    background: #f4f5f8;
    border-radius: 5px;
    padding: 5px 8px;
  }
`;
export const Title = styled.h1`
  color: ${colors.primary};
  font-size: clamp(30px, 3.5vw, 44px);
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.045em;
  line-height: 1.12;
  margin: 0;
`;
