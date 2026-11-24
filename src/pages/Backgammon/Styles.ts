import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {colors, fonts, pagePadding} from 'styles';

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Badge = styled.span`
  background: #e7eee8;
  border-radius: 999px;
  color: #305e48;
  display: inline-flex;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
`;

export const BoardFrame = styled.div`
  border-radius: 24px;
  box-shadow: 0 12px 30px #133d2e1a;
  overflow: hidden;
`;

export const Button = styled.button<{$secondary?: boolean; $danger?: boolean}>`
  align-items: center;
  background: ${({$secondary, $danger}) => {
    if ($secondary) return '#f1f4ef';
    return $danger ? '#9e3434' : '#224e3c';
  }};
  border: 1px solid ${({$secondary}) => ($secondary ? '#d4ded4' : 'transparent')};
  border-radius: 12px;
  color: ${({$secondary}) => ($secondary ? '#224e3c' : '#ffffff')};
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
    outline: 3px solid #b58a39;
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

export const Empty = styled.div`
  background: #f7f8f5;
  border: 1px dashed #d1d9cd;
  border-radius: 16px;
  color: ${colors.secondary};
  line-height: 1.7;
  padding: 24px;
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
  color: #667d68;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  margin: 0 0 12px;
  text-transform: uppercase;
`;

export const Field = styled.label`
  color: #3d5143;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  font-weight: 600;
  gap: 8px;
`;

export const FieldGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
  }
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
  border: 1px solid #cdd6c9;
  border-radius: 10px;
  color: ${colors.primary};
  font-family: inherit;
  font-size: 15px;
  min-height: 44px;
  min-width: 0;
  padding: 10px 12px;
  width: 100%;

  &:focus-visible {
    outline: 2px solid #64836a;
    outline-offset: 2px;
  }
`;

export const List = styled.div`
  display: grid;
  gap: 10px;
`;

export const MatchGrid = styled.div`
  align-items: start;
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1fr) 280px;
  margin-top: 24px;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;

export const MatchLink = styled(Link)`
  align-items: center;
  background: #ffffff;
  border: 1px solid #e1e6dc;
  border-radius: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  padding: 18px 20px;

  &:hover {
    border-color: #8fa389;
    text-decoration: none;
  }

  &:focus-visible {
    outline: 3px solid #b58a39;
    outline-offset: 2px;
  }
`;

export const MatchTitle = styled.h1`
  color: #243e2d;
  font-size: clamp(24px, 3vw, 34px);
  letter-spacing: -0.035em;
  margin-bottom: 10px;
`;

export const MoveButton = styled(Button)`
  font-size: 12px;
  min-height: 36px;
  padding: 8px 10px;
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
  border: 1px solid #e1e6dc;
  border-radius: 20px;
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

export const Player = styled.div<{$active: boolean}>`
  align-items: center;
  background: ${({$active}) => ($active ? '#edf2e8' : '#fafbf8')};
  border: 1px solid ${({$active}) => ($active ? '#93ab85' : '#e5e8e0')};
  border-radius: 14px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  padding: 14px;
`;

export const PlayerIdentity = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  min-width: 0;
`;

export const PlayerName = styled.strong`
  display: block;
  font-size: 14px;
  overflow-wrap: anywhere;
`;

export const PlayerPiece = styled.span<{$side: 'white' | 'black'}>`
  background: ${({$side}) =>
    $side === 'white' ? 'linear-gradient(135deg, #fffbeb, #d8ceb1)' : 'linear-gradient(135deg, #4b6b5c, #142f28)'};
  border: 1px solid #7a8a6c;
  border-radius: 50%;
  flex-shrink: 0;
  height: 28px;
  width: 28px;
`;

export const Result = styled.div`
  background: #edf3e4;
  border: 1px solid #b8cba6;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 20px;
  padding: 22px;
`;

export const Rules = styled.details`
  background: #ffffff;
  border: 1px solid #e1e6dc;
  border-radius: 16px;
  color: ${colors.secondary};
  line-height: 1.75;
  margin-top: 24px;
  padding: 20px 24px;

  summary {
    color: #264d37;
    cursor: pointer;
    font-weight: 600;
  }

  li {
    margin-top: 8px;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

export const Score = styled.div`
  color: #28513b;
  font-size: 30px;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  white-space: nowrap;
`;

export const Section = styled.section`
  margin-top: 32px;
`;

export const Select = styled.select`
  background: #ffffff;
  border: 1px solid #cdd6c9;
  border-radius: 10px;
  color: ${colors.primary};
  font-family: inherit;
  font-size: 14px;
  min-height: 44px;
  min-width: 0;
  padding: 10px 12px;
  width: 100%;

  &:focus-visible {
    outline: 2px solid #64836a;
    outline-offset: 2px;
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
  border-bottom: 1px solid #e7ebe2;
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
  border: 1px solid #e1e6dc;
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
  color: #305a40;
  font-size: 13px;
  font-weight: 600;
`;

export const Timer = styled.span`
  color: #475d48;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

export const TitleSmall = styled.h2`
  color: #263e2c;
  font-size: 20px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.025em;
  margin: 0 0 16px;
`;
