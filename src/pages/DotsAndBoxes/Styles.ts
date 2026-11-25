import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {colors, pagePadding} from 'styles';
import {DotsAndBoxesSide} from 'types/dotsAndBoxes';

import {sideColors} from './BoardStyles';

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Badge = styled.span`
  background: #e6ecfb;
  border-radius: 999px;
  color: #2f4585;
  display: inline-flex;
  font-size: 12px;
  font-weight: 600;
  padding: 7px 12px;
`;

export const Button = styled.button<{$secondary?: boolean; $danger?: boolean}>`
  align-items: center;
  background: ${({$secondary, $danger}) => {
    if ($secondary) return '#eef2fb';
    return $danger ? '#9a4036' : '#2c4aa8';
  }};
  border: 1px solid ${({$secondary}) => ($secondary ? '#cfd8ee' : 'transparent')};
  border-radius: 12px;
  color: ${({$secondary}) => ($secondary ? '#2c3f7a' : '#ffffff')};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  gap: 8px;
  justify-content: center;
  min-height: 44px;
  padding: 11px 18px;

  &:hover:not(:disabled) {
    filter: brightness(0.92);
  }
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
  &:focus-visible {
    outline: 3px solid #c58e37;
    outline-offset: 3px;
  }
`;

export const Container = styled.div`
  ${pagePadding};
  margin: 0 auto;
  max-width: 1500px;
  padding-bottom: 48px;
  padding-top: 28px;
`;

export const Detail = styled.p`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
`;

export const Empty = styled.div`
  background: #f6f8fd;
  border: 1px dashed #d4dcef;
  border-radius: 16px;
  color: ${colors.secondary};
  line-height: 1.7;
  padding: 24px;
`;

export const Error = styled.div`
  background: #fff1ec;
  border: 1px solid #eac8bb;
  border-radius: 12px;
  color: #813e2c;
  line-height: 1.6;
  margin: 16px 0;
  padding: 14px 18px;
`;

export const MatchContainer = styled(Container)`
  padding-top: 16px;
`;

export const Navigation = styled.nav`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const MatchNavigation = styled(Navigation)`
  margin-bottom: 12px;
`;

export const Panel = styled.section`
  background: #ffffff;
  border: 1px solid #d9e0f1;
  border-radius: 20px;
  min-width: 0;
  padding: 24px;
  scroll-margin-top: 24px;
`;

export const Player = styled.div<{$active: boolean}>`
  align-items: center;
  background: ${({$active}) => ($active ? '#e9effd' : '#f8f9fd')};
  border: 1px solid ${({$active}) => ($active ? '#8aa2e0' : '#d9e0f1')};
  border-radius: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  padding: 16px;
`;

export const MatchPlayer = styled(Player)`
  align-content: start;
  gap: 4px;
  padding: 12px;

  @media (max-width: 550px) {
    align-items: start;
    flex-direction: column;

    p {
      margin-top: 2px;
    }
  }
`;

export const PlayerColor = styled.span<{$side: DotsAndBoxesSide}>`
  background: ${({$side}) => sideColors[$side].ink};
  border-radius: 4px;
  display: inline-block;
  height: 12px;
  margin-right: 8px;
  width: 12px;
`;

export const PlayerGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;

export const Rules = styled.details`
  background: #ffffff;
  border: 1px solid #d9e0f1;
  border-radius: 16px;
  color: ${colors.secondary};
  line-height: 1.75;
  margin-top: 24px;
  padding: 20px 24px;

  summary {
    color: #2c3f7a;
    cursor: pointer;
    font-weight: 600;
  }
  li {
    margin-top: 8px;
  }
`;

export const Score = styled.strong<{$side: DotsAndBoxesSide}>`
  color: ${({$side}) => sideColors[$side].ink};
  font-size: 30px;
  font-variant-numeric: tabular-nums;
  line-height: 1;
`;

export const Scoreboard = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
`;

export const Section = styled.section`
  margin-top: 28px;
`;

export const Small = styled.p`
  color: ${colors.secondary};
  font-size: 12px;
  line-height: 1.7;
  margin: 8px 0 0;
`;

export const Stat = styled.div`
  align-items: center;
  border-bottom: 1px solid #dee4f2;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  padding: 14px 0;
`;

export const Status = styled.div`
  align-items: center;
  background: #f1f4fb;
  border: 1px solid #d5ddf0;
  border-radius: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin: 20px 0;
  min-height: 80px;
  padding: 18px 22px;
`;

export const MoveToolbar = styled(Status)`
  box-shadow: 0 5px 15px #1f2a4412;
  gap: 10px;
  margin: 10px 0;
  min-height: 0;
  padding: 12px 16px;
  position: sticky;
  top: 0;
  z-index: 2;

  p {
    margin-top: 4px;
  }

  @media (max-width: 550px) {
    padding: 10px 12px;
  }
`;

export const TextLink = styled(Link)`
  color: #3550a8;
  font-size: 13px;
  font-weight: 600;
`;

export const Timer = styled.strong`
  color: #2c3f7a;
  font-size: 22px;
  font-variant-numeric: tabular-nums;
`;

export const TitleSmall = styled.h2`
  color: #1f2a44;
  font-size: 21px;
  font-weight: 600;
  letter-spacing: -0.025em;
  margin: 0 0 16px;
`;
