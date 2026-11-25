import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {colors, fonts, pagePadding} from 'styles';

const INK = '#4a2f1b';
const WOOD = '#7a4a25';

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Badge = styled.span`
  background: #f3e6d2;
  border-radius: 999px;
  color: #75441c;
  display: inline-flex;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
`;

export const BoardCaption = styled.p`
  color: ${colors.secondary};
  font-size: 12px;
  line-height: 1.6;
  margin: 12px 4px 0;
`;

export const Button = styled.button<{$secondary?: boolean; $danger?: boolean}>`
  align-items: center;
  background: ${({$secondary, $danger}) => {
    if ($secondary) return '#f8f1e6';
    return $danger ? '#9e3434' : WOOD;
  }};
  border: 1px solid ${({$secondary}) => ($secondary ? '#e3d3bb' : 'transparent')};
  border-radius: 12px;
  color: ${({$secondary}) => ($secondary ? '#6b3f1c' : '#ffffff')};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  gap: 8px;
  justify-content: center;
  min-height: 44px;
  padding: 11px 18px;
  transition:
    background 150ms,
    opacity 150ms;

  &:hover:not(:disabled) {
    filter: brightness(0.93);
  }

  &:disabled {
    cursor: default;
    opacity: 0.45;
  }

  &:focus-visible {
    outline: 3px solid #c98a2b;
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
  line-height: 1.6;
  margin: 0;
`;

export const Error = styled.div`
  background: #fff0ec;
  border: 1px solid #eac8bb;
  border-radius: 12px;
  color: #813e2c;
  line-height: 1.6;
  margin: 16px 0;
  padding: 14px 18px;
`;

export const Eyebrow = styled.p`
  color: #94683c;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  margin: 0 0 12px;
  text-transform: uppercase;
`;

export const Log = styled.ol`
  color: ${colors.secondary};
  display: grid;
  font-size: 13px;
  gap: 8px;
  line-height: 1.5;
  list-style: none;
  margin: 0;
  padding: 0;

  li:first-child {
    color: ${INK};
    font-weight: 600;
  }
`;

export const MatchGrid = styled.div`
  align-items: start;
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1fr) 300px;
  margin-top: 24px;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;

export const MatchTitle = styled.h1`
  color: ${INK};
  font-size: clamp(24px, 3vw, 34px);
  letter-spacing: -0.035em;
  margin-bottom: 10px;
`;

export const Navigation = styled.nav`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const Panel = styled.section`
  background: #ffffff;
  border: 1px solid #ecdfcb;
  border-radius: 20px;
  min-width: 0;
  padding: 24px;
  scroll-margin-top: 24px;
`;

export const Result = styled.div`
  background: #fbf0dc;
  border: 1px solid #e2c592;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 20px;
  padding: 22px;
`;

export const Rules = styled.details`
  background: #ffffff;
  border: 1px solid #ecdfcb;
  border-radius: 16px;
  color: ${colors.secondary};
  line-height: 1.75;
  margin-top: 24px;
  padding: 20px 24px;

  summary {
    color: #6b3f1c;
    cursor: pointer;
    font-weight: 600;
  }

  li {
    margin-top: 8px;
  }
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1180px) and (min-width: 650px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Small = styled.p`
  color: ${colors.secondary};
  font-size: 12px;
  line-height: 1.6;
  margin: 8px 0 0;
`;

export const Stat = styled.div`
  align-items: center;
  border-bottom: 1px solid #f0e6d6;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  line-height: 1.5;
  padding: 12px 0;

  &:last-child {
    border: 0;
  }
`;

export const Status = styled.div`
  align-items: center;
  background: #ffffff;
  border: 1px solid #ecdfcb;
  border-radius: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin: 16px 0;
  min-height: 80px;
  padding: 18px 20px;
`;

export const TextLink = styled(Link)`
  color: #7a4a25;
  font-size: 13px;
  font-weight: 600;
`;

export const TitleSmall = styled.h2`
  color: ${INK};
  font-size: 20px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.025em;
  margin: 0 0 16px;
`;

export const TurnBanner = styled.div<{$yours: boolean}>`
  align-items: center;
  background: ${({$yours}) => ($yours ? '#eaf3ed' : '#ffffff')};
  border: 1px solid ${({$yours}) => ($yours ? '#bed8c8' : '#e4e8e3')};
  border-radius: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0 0 16px;
  min-height: 76px;
  padding: 16px 20px;

  > div {
    flex: 1;
    min-width: 0;
  }
`;

export const TurnIndicator = styled.span`
  background: #6d9f83;
  border: 4px solid #d9e9df;
  border-radius: 50%;
  flex: 0 0 16px;
  height: 16px;
`;
