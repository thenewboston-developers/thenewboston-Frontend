import styled from 'styled-components';

import UButton from 'components/Button';
import UModal from 'components/Modal';
import {breakpoints, cardStyle, colors, fonts, pagePadding, radii, TOOLBAR_HEIGHT} from 'styles';

import {WIDE_LAYOUT_MIN_WIDTH} from './constants';

// Height of the page heading above the two columns, with the margin below it
const INTRODUCTION_HEIGHT = 88;
const PAGE_TOP_PADDING = 24;
// Leaves room for the heading, so the whole list is on screen before the page is scrolled at all
const SIDEBAR_HEIGHT_OFFSET = TOOLBAR_HEIGHT + INTRODUCTION_HEIGHT + PAGE_TOP_PADDING * 2;
const SIDEBAR_WIDTH = 348;

export const Container = styled.div`
  ${pagePadding};
`;

// Named so the pieces of the page can lay themselves out by the room the page has, whatever the navigation takes
export const Content = styled.div`
  container: wallets-page / inline-size;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;

// Where the page scrolls back to when another wallet is opened: the wallet card, with the page padding above it
export const HeroAnchor = styled.div`
  scroll-margin-top: ${`${PAGE_TOP_PADDING}px`};
`;

export const Introduction = styled.header`
  align-items: center;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 24px;

  @media (max-width: ${breakpoints.mini}) {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
  }
`;

export const IntroductionActions = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 8px 20px;

  a {
    align-items: center;
    border-radius: ${radii.small};
    color: ${colors.secondary};
    display: inline-flex;
    font-size: 14px;
    font-weight: ${fonts.weight.semiBold};
    gap: 8px;
    min-height: 44px;

    &:focus-visible {
      outline: 2px solid ${colors.palette.blue[500]};
      outline-offset: 4px;
    }

    &:hover {
      color: ${colors.primary};
    }
  }
`;

export const IntroductionDescription = styled.p`
  color: ${colors.secondary};
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  line-height: 1.6;
  margin: 6px 0 0;
`;

export const Layout = styled.div`
  align-items: flex-start;
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1fr);

  @container wallets-page (min-width: ${WIDE_LAYOUT_MIN_WIDTH}) {
    grid-template-columns: ${`${SIDEBAR_WIDTH}px`} minmax(0, 1fr);
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`;

export const NewWalletButton = styled(UButton)`
  border-radius: ${radii.medium};
  flex-shrink: 0;
`;

export const PageTitle = styled.h1`
  color: ${colors.primary};
  font-size: 28px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.04em;
  line-height: 1.25;
`;

// Stays in view while the open wallet scrolls. On narrow pages the list moves behind the button on the wallet card
export const Sidebar = styled.aside`
  ${cardStyle};
  display: none;
  flex-direction: column;
  max-height: calc(100vh - ${`${SIDEBAR_HEIGHT_OFFSET}px`});
  padding: 16px 8px 8px;
  position: sticky;
  top: ${`${PAGE_TOP_PADDING}px`};

  @supports (height: 1dvh) {
    max-height: calc(100dvh - ${`${SIDEBAR_HEIGHT_OFFSET}px`});
  }

  @container wallets-page (min-width: ${WIDE_LAYOUT_MIN_WIDTH}) {
    display: flex;
  }
`;

export const SidebarHeading = styled.h2`
  color: ${colors.primary};
  font-size: 16px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.01em;
  padding: 0 12px 12px;
`;

export const WalletSwitchModal = styled(UModal)`
  max-height: calc(100vh - 24px);
  width: min(420px, calc(100vw - 24px));

  @supports (height: 1dvh) {
    max-height: calc(100dvh - 24px);
  }

  > div:last-child {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
  }
`;

export const WalletSwitchModalBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  padding: 16px 8px 8px;
`;
