import styled, {css} from 'styled-components';

import UTab from 'components/Tab';
import UTabs from 'components/Tabs';
import {cardStyle, colors} from 'styles';

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

// The panel has nothing to show until the asset pair is loaded
export const Panel = styled.div`
  ${cardStyle};
  color: ${colors.primary};
  padding: 20px;

  &:empty {
    display: none;
  }
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
