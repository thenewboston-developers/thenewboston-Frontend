import {Link as ULink} from 'react-router-dom';
import styled, {css} from 'styled-components';

import UTab from 'components/Tab';
import UTabs from 'components/Tabs';
import {breakpoints, cardStyle, colors, fonts, shadows} from 'styles';

import {NEGATIVE_TEXT_COLOR, POSITIVE_TEXT_COLOR} from '../../mixins';

// The doubled specificity keeps the accent in place while the tab is hovered (the shared Tab sets its own hover color)
const activeTabMixin = (color: string) => css`
  &&,
  &&:hover {
    color: ${color};
  }
`;

export const BuyTab = styled(UTab)`
  flex: 1;
  ${({isActive}) => isActive && activeTabMixin(POSITIVE_TEXT_COLOR)};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`;

export const GuestText = styled.p`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 16px;
`;

export const GuideLink = styled(ULink)`
  color: ${colors.palette.blue[600]};
  font-weight: ${fonts.weight.semiBold};
  text-decoration: underline;
  text-underline-offset: 3px;

  &:focus-visible {
    border-radius: 2px;
    box-shadow: ${shadows.focusRing};
    outline: none;
  }
`;

export const HelpText = styled.p`
  color: ${colors.secondary};
  font-size: 13px;
  line-height: 1.7;
  margin: 0;
  padding: 0 8px;
`;

export const Panel = styled.div`
  ${cardStyle};
  color: ${colors.primary};
  padding: 24px;

  @media (max-width: ${breakpoints.mini}) {
    padding: 20px;
  }
`;

export const PanelDescription = styled.p`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.6;
  margin: 6px 0 0;
`;

export const PanelHeader = styled.div`
  margin-bottom: 20px;
`;

export const PanelTitle = styled.h2`
  color: ${colors.primary};
  font-size: 18px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.02em;
  margin: 0;
`;

export const SellTab = styled(UTab)`
  flex: 1;
  ${({isActive}) => isActive && activeTabMixin(NEGATIVE_TEXT_COLOR)};
`;

export const TabContent = styled.div`
  margin-top: 20px;
`;

export const Tabs = styled(UTabs)`
  width: 100%;
`;
