import UMdiIcon from '@mdi/react';
import styled from 'styled-components';

import {breakpoints, cardStyle, colors, fonts, pagePadding, radii, shadows} from 'styles';

const SECTION_SPACING = 72;
const SECTION_SPACING_MOBILE = 48;

export const Answer = styled.p`
  color: ${colors.secondary};
  font-size: 15px;
  line-height: 1.7;
  margin: 0;
  padding: 0 20px 20px;
`;

// Same surface as components/PageHeader, so the page opens and closes on a matching note
export const CallToAction = styled.div`
  align-items: center;
  background:
    radial-gradient(ellipse at top right, ${colors.palette.blue[500]}, transparent 65%), ${colors.palette.blue[900]};
  border: 1px solid ${colors.palette.blue[800]};
  border-radius: ${radii.large};
  color: ${colors.white};
  display: flex;
  gap: 24px;
  justify-content: space-between;
  margin-top: ${`${SECTION_SPACING}px`};
  padding: 32px;

  @media (max-width: ${breakpoints.mobile}) {
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
    margin-top: ${`${SECTION_SPACING_MOBILE}px`};
    padding: 24px;
  }
`;

export const CallToActionButton = styled.button`
  background: ${colors.white};
  border: 1px solid ${colors.white};
  border-radius: ${radii.medium};
  color: ${colors.palette.blue[900]};
  cursor: pointer;
  flex-shrink: 0;
  font-family: ${fonts.family.default};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  min-height: 44px;
  padding: 10px 20px;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:focus-visible {
    outline: 2px solid ${colors.white};
    outline-offset: 4px;
  }

  &:hover {
    background: ${colors.palette.blue[100]};
    border-color: ${colors.palette.blue[100]};
  }
`;

export const CallToActionCopy = styled.div`
  min-width: 0;
`;

export const CallToActionDescription = styled.p`
  color: ${colors.palette.blue[100]};
  font-size: 16px;
  line-height: 1.6;
  margin: 8px 0 0;
`;

export const CallToActionTitle = styled.h2`
  color: ${colors.white};
  font-size: 24px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.03em;
  line-height: 1.3;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 22px;
  }
`;

export const Container = styled.div`
  ${pagePadding};
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  min-width: 0;
  width: 100%;
`;

export const Faq = styled.section`
  align-items: start;
  display: grid;
  gap: 48px;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
  margin-top: ${`${SECTION_SPACING}px`};

  @media (max-width: ${breakpoints.tablet}) {
    gap: 24px;
    grid-template-columns: minmax(0, 1fr);
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: ${`${SECTION_SPACING_MOBILE}px`};
  }
`;

export const FaqCopy = styled.div`
  min-width: 0;
`;

export const Feature = styled.li`
  align-items: flex-start;
  display: flex;
  gap: 16px;
`;

export const FeatureDescription = styled.p`
  color: ${colors.secondary};
  font-size: 15px;
  line-height: 1.6;
  margin: 2px 0 0;
`;

export const FeatureIcon = styled.span`
  align-items: center;
  background: ${colors.palette.blue[50]};
  border-radius: ${radii.medium};
  color: ${colors.palette.blue[600]};
  display: flex;
  flex-shrink: 0;
  height: 48px;
  justify-content: center;
  width: 48px;
`;

export const Features = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
  margin: 28px 0 0;
  padding: 0;
`;

export const FeatureTitle = styled.h3`
  color: ${colors.palette.blue[900]};
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.5;
`;

// The illustrations float on the page background, without a surface or a border of their own
export const Illustration = styled.img`
  display: block;
  height: auto;
  justify-self: center;
  max-width: min(520px, 100%);
  width: 100%;
`;

export const Intro = styled.section`
  align-items: center;
  display: grid;
  gap: 48px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 48px;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 24px;
    grid-template-columns: minmax(0, 1fr);
    margin-top: 32px;
  }
`;

export const IntroCopy = styled.div`
  min-width: 0;
`;

export const List = styled.ul`
  margin: 16px 0 0;
  padding-left: 22px;
`;

export const ListItem = styled.li`
  color: ${colors.primary};
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 6px;
  padding-left: 4px;

  &::marker {
    color: ${colors.palette.blue[500]};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Paragraph = styled.p`
  color: ${colors.primary};
  font-size: 16px;
  line-height: 1.7;
  margin: 0;
`;

export const Question = styled.details`
  ${cardStyle};
`;

export const QuestionIcon = styled(UMdiIcon)`
  color: ${colors.secondary};
  flex-shrink: 0;
  transition: transform 0.2s ease;

  ${Question}[open] & {
    transform: rotate(180deg);
  }
`;

export const Questions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`;

export const QuestionSummary = styled.summary`
  align-items: center;
  border-radius: ${radii.large};
  color: ${colors.palette.blue[900]};
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
  gap: 16px;
  justify-content: space-between;
  line-height: 1.5;
  list-style: none;
  outline: none;
  padding: 18px 20px;

  &::-webkit-details-marker {
    display: none;
  }

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
  }
`;

export const Section = styled.section`
  margin-top: ${`${SECTION_SPACING}px`};

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: ${`${SECTION_SPACING_MOBILE}px`};
  }
`;

export const SectionHeading = styled.div`
  margin: 0 auto;
  max-width: 640px;
  text-align: center;
`;

export const SectionLabel = styled.p`
  color: ${colors.palette.blue[600]};
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: 0.06em;
  margin: 0 0 10px;
  text-transform: uppercase;
`;

export const SectionTitle = styled.h2`
  color: ${colors.palette.blue[900]};
  font-size: 28px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.03em;
  line-height: 1.3;
  margin: 0 0 12px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 24px;
  }
`;

// Every other step swaps its two columns, so the illustrations alternate between the sides of the page. Stacked, the
// copy always comes first
export const Step = styled.div<{$isReversed: boolean}>`
  align-items: center;
  display: grid;
  gap: 48px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  > :first-child {
    order: ${({$isReversed}) => ($isReversed ? 1 : 0)};
  }

  @media (max-width: ${breakpoints.tablet}) {
    gap: 16px;
    grid-template-columns: minmax(0, 1fr);

    > :first-child {
      order: 0;
    }
  }
`;

export const StepCopy = styled.div`
  min-width: 0;
`;

export const StepNumber = styled.span`
  background: ${colors.palette.blue[500]};
  border-radius: ${radii.pill};
  color: ${colors.white};
  display: inline-block;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: 0.06em;
  line-height: 1.5;
  padding: 4px 12px;
  text-transform: uppercase;
`;

export const Steps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 40px;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 40px;
    margin-top: 32px;
  }
`;

export const StepTitle = styled.h3`
  color: ${colors.palette.blue[900]};
  font-size: 24px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.03em;
  line-height: 1.3;
  margin: 16px 0 12px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 20px;
  }
`;
