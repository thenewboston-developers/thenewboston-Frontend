import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {breakpoints, cardStyle, colors, fonts, pagePadding, radii, shadows} from 'styles';

import {contentWidthStyle} from '../mixins';

export const Bold = styled.strong`
  font-weight: ${fonts.weight.semiBold};
`;

export const Callout = styled.div`
  align-items: flex-start;
  background: ${colors.palette.blue[50]};
  border-radius: ${radii.medium};
  color: ${colors.palette.blue[800]};
  display: flex;
  gap: 12px;
  margin-top: 20px;
  padding: 16px;

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

export const CalloutText = styled.p`
  font-size: 15px;
  line-height: 1.7;
  margin: 0;
`;

export const Container = styled.div`
  ${pagePadding};
`;

export const Content = styled.div`
  ${contentWidthStyle};
  min-width: 0;
`;

export const ContentsLink = styled.a`
  border-radius: ${radii.small};
  color: ${colors.secondary};
  display: block;
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
  line-height: 1.5;
  padding: 10px 12px;
  text-decoration: none;
  transition:
    background 0.15s ease,
    color 0.15s ease;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: none;
  }

  &:hover {
    background: ${colors.palette.blue[50]};
    color: ${colors.palette.blue[800]};
  }

  @media (max-width: ${breakpoints.tablet}) {
    white-space: nowrap;
  }
`;

export const ContentsLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: row;
    overflow-x: auto;
    padding: 3px;
  }
`;

export const ContentsNavigation = styled.nav`
  ${cardStyle};
  align-self: start;
  padding: 20px 12px;
  position: sticky;
  top: 24px;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 16px 12px;
    position: static;
  }
`;

export const ContentsNote = styled.p`
  border-top: 1px solid ${colors.borderSubtle};
  color: ${colors.secondary};
  font-size: 13px;
  line-height: 1.7;
  margin: 16px 12px 0;
  padding-top: 16px;

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

export const ContentsTitle = styled.h2`
  align-items: center;
  color: ${colors.palette.blue[900]};
  display: flex;
  font-size: 15px;
  font-weight: ${fonts.weight.semiBold};
  gap: 10px;
  margin: 0 12px 16px;

  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: 8px;
  }
`;

export const ExampleAmount = styled.p`
  color: ${colors.palette.blue[900]};
  font-size: 28px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.04em;
  line-height: 1.3;
  margin: 0 0 4px;
`;

export const ExampleCard = styled.div`
  background: ${colors.palette.gray[50]};
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.medium};
  padding: 20px;

  p:last-child {
    margin-bottom: 0;
  }
`;

export const ExampleGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ExampleLabel = styled.span<{$side: 'buy' | 'sell'}>`
  background: ${({$side}) => ($side === 'buy' ? colors.palette.green[50] : colors.palette.red[50])};
  border-radius: ${radii.pill};
  color: ${({$side}) => ($side === 'buy' ? colors.palette.green[800] : colors.palette.red[800])};
  display: inline-block;
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.5;
  margin-bottom: 16px;
  padding: 4px 12px;
`;

export const ExamplePrice = styled.p`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 16px;
`;

export const Footer = styled.div`
  align-items: center;
  border-top: 1px solid ${colors.borderSubtle};
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 24px;
`;

export const FooterText = styled.p`
  color: ${colors.palette.blue[900]};
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
  margin: 0;
`;

export const GuideLayout = styled.div`
  align-items: start;
  display: grid;
  gap: 24px;
  grid-template-columns: 220px minmax(0, 1fr);

  @media (max-width: ${breakpoints.tablet}) {
    gap: 20px;
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Highlight = styled.div`
  align-items: center;
  display: flex;
  gap: 14px;
  min-width: 0;
  padding: 22px 20px;

  &:not(:last-child) {
    border-right: 1px solid ${colors.borderSubtle};
  }

  @media (max-width: ${breakpoints.tablet}) {
    align-items: flex-start;
    flex-direction: column;
  }

  @media (max-width: ${breakpoints.mobile}) {
    align-items: center;
    flex-direction: row;
    padding: 18px 20px;

    &:not(:last-child) {
      border-bottom: 1px solid ${colors.borderSubtle};
      border-right: none;
    }
  }
`;

export const HighlightDescription = styled.p`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.6;
  margin: 4px 0 0;
`;

export const HighlightIcon = styled.span`
  align-items: center;
  background: ${colors.palette.blue[50]};
  border-radius: ${radii.medium};
  color: ${colors.palette.blue[600]};
  display: flex;
  flex-shrink: 0;
  height: 44px;
  justify-content: center;
  width: 44px;
`;

export const Highlights = styled.div`
  ${cardStyle};
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-bottom: 24px;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
    margin-bottom: 20px;
  }
`;

export const HighlightTitle = styled.h2`
  color: ${colors.palette.blue[900]};
  font-size: 15px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.5;
  margin: 0;
`;

export const List = styled.ul`
  margin: 0 0 20px;
  padding-left: 22px;
`;

export const ListItem = styled.li`
  color: ${colors.primary};
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 8px;
  padding-left: 4px;

  &::marker {
    color: ${colors.palette.blue[500]};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const MarketLink = styled(ULink)`
  background: ${colors.palette.blue[900]};
  border-radius: ${radii.medium};
  color: ${colors.white};
  display: inline-flex;
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  justify-content: center;
  padding: 12px 18px;
  text-decoration: none;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: none;
  }

  &:hover {
    background: ${colors.palette.blue[800]};
  }
`;

export const MatchCaption = styled.p`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.6;
  margin: 4px 0 0;
`;

export const MatchDetail = styled.div`
  flex: 1;
  min-width: 0;
`;

export const MatchExample = styled.div`
  align-items: center;
  background: ${colors.palette.blue[50]};
  border: 1px solid ${colors.palette.blue[100]};
  border-radius: ${radii.medium};
  display: flex;
  gap: 20px;
  margin: 24px 0;
  padding: 24px;
  text-align: center;

  @media (max-width: ${breakpoints.mini}) {
    gap: 12px;
    padding: 20px 12px;
  }
`;

export const MatchIcon = styled.span`
  color: ${colors.palette.blue[500]};
  display: flex;
  flex-shrink: 0;
`;

export const MatchLabel = styled.p`
  color: ${colors.palette.blue[800]};
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 8px;
`;

export const MatchValue = styled.p`
  color: ${colors.palette.blue[900]};
  font-size: clamp(20px, 2.5vw, 28px);
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.04em;
  line-height: 1.3;
  margin: 0;
`;

export const Paragraph = styled.p`
  color: ${colors.primary};
  font-size: 16px;
  line-height: 1.8;
  margin: 0 0 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Section = styled.section`
  ${cardStyle};
  padding: 32px;
  scroll-margin-top: 24px;

  &:target {
    border-color: ${colors.palette.blue[300]};
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 24px 20px;
  }
`;

export const SectionLabel = styled.p`
  color: ${colors.palette.blue[600]};
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: 0.06em;
  margin: 0 0 10px;
  text-transform: uppercase;
`;

export const Sections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 20px;
  }
`;

export const SectionTitle = styled.h2`
  color: ${colors.palette.blue[900]};
  font-size: 26px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.03em;
  line-height: 1.3;
  margin: 0 0 16px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 22px;
  }
`;

export const SubSection = styled.div`
  border-top: 1px solid ${colors.borderSubtle};
  margin-top: 24px;
  padding-top: 24px;
`;

export const SubSectionTitle = styled.h3`
  color: ${colors.palette.blue[900]};
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.01em;
  line-height: 1.5;
  margin: 0 0 12px;
`;
