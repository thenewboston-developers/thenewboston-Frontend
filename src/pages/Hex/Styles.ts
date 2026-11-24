import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {colors, pagePadding} from 'styles';
import {HexSide} from 'types/hex';

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Badge = styled.span`
  background: #e9ecf6;
  border-radius: 999px;
  color: #3a4775;
  display: inline-flex;
  font-size: 12px;
  font-weight: 600;
  padding: 7px 12px;
`;

export const Button = styled.button<{$secondary?: boolean; $danger?: boolean}>`
  align-items: center;
  background: ${({$secondary, $danger}) => {
    if ($secondary) return '#eef0f8';
    return $danger ? '#9a4036' : '#2f3c6b';
  }};
  border: 1px solid ${({$secondary}) => ($secondary ? '#d4d9ea' : 'transparent')};
  border-radius: 12px;
  color: ${({$secondary}) => ($secondary ? '#33406b' : '#ffffff')};
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
    outline: 3px solid #e0a53a;
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
  background: #f6f7fb;
  border: 1px dashed #d4d9ea;
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

export const Eyebrow = styled.p`
  color: #5a6796;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  margin: 0 0 12px;
  text-transform: uppercase;
`;

export const Field = styled.label`
  color: #36426b;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  font-weight: 600;
  gap: 8px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const GuestActions = styled.div`
  margin: 24px 0 8px;
`;

export const Input = styled.input`
  background: #ffffff;
  border: 1px solid #cdd3e4;
  border-radius: 10px;
  color: ${colors.primary};
  font: inherit;
  min-height: 44px;
  padding: 10px 12px;
  width: 100%;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MatchContainer = styled(Container)`
  padding-top: 16px;
`;

export const MatchLink = styled(Link)`
  align-items: center;
  background: #ffffff;
  border: 1px solid #dde1ee;
  border-radius: 14px;
  color: ${colors.primary};
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  padding: 18px 20px;
  text-decoration: none;

  &:hover {
    background: #f3f5fb;
    text-decoration: none;
  }
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
  border: 1px solid #dde1ee;
  border-radius: 20px;
  min-width: 0;
  padding: 24px;
  scroll-margin-top: 24px;
`;

export const PanelGrid = styled.div`
  align-items: start;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

export const Player = styled.div<{$active: boolean; $side: HexSide}>`
  align-items: center;
  background: ${({$active, $side}) => {
    if (!$active) return '#f8f9fc';
    return $side === 'red' ? '#fdeeec' : '#eaf1fd';
  }};
  border: 1px solid
    ${({$active, $side}) => {
      if (!$active) return '#dde1ee';
      return $side === 'red' ? '#e59a92' : '#8fb1ea';
    }};
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

export const PlayerGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;

export const Result = styled.section`
  background: #eef1fb;
  border: 1px solid #b9c3e6;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 20px 0;
  padding: 24px;
`;

export const Rules = styled.details`
  background: #ffffff;
  border: 1px solid #dde1ee;
  border-radius: 16px;
  color: ${colors.secondary};
  line-height: 1.75;
  margin-top: 24px;
  padding: 20px 24px;

  summary {
    color: #33406b;
    cursor: pointer;
    font-weight: 600;
  }
  li {
    margin-top: 8px;
  }
`;

export const Section = styled.section`
  margin-top: 28px;
`;

export const Select = styled.select`
  background: #ffffff;
  border: 1px solid #cdd3e4;
  border-radius: 10px;
  color: ${colors.primary};
  font: inherit;
  min-height: 44px;
  padding: 10px 12px;
  width: 100%;
`;

export const SideDot = styled.span<{$side: HexSide}>`
  background: ${({$side}) => ($side === 'red' ? '#d9463c' : '#2c6fd6')};
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
  height: 12px;
  margin-right: 8px;
  width: 12px;
`;

export const Small = styled.p`
  color: ${colors.secondary};
  font-size: 12px;
  line-height: 1.7;
  margin: 8px 0 0;
`;

export const Stat = styled.div`
  align-items: center;
  border-bottom: 1px solid #e0e6d9;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  padding: 14px 0;
`;

export const Status = styled.div`
  align-items: center;
  background: #f2f4fa;
  border: 1px solid #d4d9ea;
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
  box-shadow: 0 5px 15px #1d264012;
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
  color: #3f4f8a;
  font-size: 13px;
  font-weight: 600;
`;

export const Timer = styled.strong`
  color: #2c3860;
  font-size: 22px;
  font-variant-numeric: tabular-nums;
`;

export const TitleSmall = styled.h2`
  color: #232d4f;
  font-size: 21px;
  font-weight: 600;
  letter-spacing: -0.025em;
  margin: 0 0 16px;
`;
