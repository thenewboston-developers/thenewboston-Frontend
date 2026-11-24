import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {colors, pagePadding} from 'styles';

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Badge = styled.span`
  background: #e5f0f4;
  border-radius: 999px;
  color: #17556b;
  display: inline-flex;
  font-size: 12px;
  font-weight: 600;
  padding: 7px 12px;
`;

export const BoardFrame = styled.div`
  background: #102e40;
  border: 1px solid #315568;
  border-radius: 20px;
  box-shadow: 0 12px 32px #102e401a;
  color: #e2f2fa;
  padding: 16px;
  width: 100%;

  @media (max-width: 550px) {
    border-radius: 14px;
    padding: 10px;
  }
`;

export const BoardGrid = styled.div`
  display: grid;
  gap: 3px;
  grid-template-columns: 18px repeat(10, minmax(0, 1fr));
`;

export const BoardLabel = styled.span`
  align-items: center;
  color: #9dbcca;
  display: flex;
  font-size: clamp(9px, 1vw, 12px);
  font-variant-numeric: tabular-nums;
  justify-content: center;
  min-height: 18px;
`;

export const BoardTitle = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
  margin-bottom: 16px;

  h2 {
    color: #f1f8fc;
    font-size: 17px;
    margin: 0;
  }

  span {
    color: #b3ceda;
    font-size: 12px;
  }
`;

export const Button = styled.button<{$secondary?: boolean; $danger?: boolean}>`
  align-items: center;
  background: ${({$secondary, $danger}) => {
    if ($secondary) return '#edf3f6';
    return $danger ? '#9a4036' : '#155a73';
  }};
  border: 1px solid ${({$secondary}) => ($secondary ? '#cbdce4' : 'transparent')};
  border-radius: 12px;
  color: ${({$secondary}) => ($secondary ? '#16485c' : '#ffffff')};
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

export const Cell = styled.button<{$state: string; $selected?: boolean; $preview?: boolean; $invalid?: boolean}>`
  align-items: center;
  aspect-ratio: 1;
  background: ${({$invalid, $preview, $state}) => {
    if ($invalid) return '#963e48';
    if ($preview) return '#2a9c9e';
    if ($state === 'sunk') return '#9a493c';
    if ($state === 'hit') return '#c27045';
    if ($state === 'ship') return '#648b9e';
    return '#1b4054';
  }};
  border: 1px solid ${({$selected}) => ($selected ? '#f5ca72' : '#34576a')};
  border-radius: 4px;
  box-shadow: ${({$selected}) => ($selected ? 'inset 0 0 0 2px #f5ca72' : 'none')};
  color: #ffffff;
  cursor: pointer;
  display: flex;
  font-size: clamp(12px, 2vw, 22px);
  font-weight: 600;
  justify-content: center;
  min-width: 0;
  padding: 0;

  &:disabled {
    cursor: default;
  }
  &:hover:not(:disabled) {
    border-color: #e9d494;
    background: #366d80;
  }
  &:focus-visible {
    outline: 3px solid #f5ca72;
    outline-offset: 1px;
    z-index: 1;
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
  background: #f4f8fa;
  border: 1px dashed #cadbe3;
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
  color: #397184;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  margin: 0 0 12px;
  text-transform: uppercase;
`;

export const Field = styled.label`
  color: #284e60;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  font-weight: 600;
  gap: 8px;
`;

export const Fleet = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
`;

export const FleetButton = styled(Button)<{$selected?: boolean}>`
  border-color: ${({$selected}) => ($selected ? '#155a73' : '#cbdce4')};
  box-shadow: ${({$selected}) => ($selected ? 'inset 0 0 0 1px #155a73' : 'none')};
  font-size: 12px;
  padding: 8px 12px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Input = styled.input`
  background: #ffffff;
  border: 1px solid #c5d7df;
  border-radius: 10px;
  color: ${colors.primary};
  font: inherit;
  min-height: 44px;
  padding: 10px 12px;
  width: 100%;
`;

export const Legend = styled.div`
  color: #b3ceda;
  display: flex;
  flex-wrap: wrap;
  font-size: 11px;
  gap: 16px;
  margin-top: 14px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MatchLink = styled(Link)`
  align-items: center;
  background: #ffffff;
  border: 1px solid #d9e5eb;
  border-radius: 14px;
  color: ${colors.primary};
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  padding: 18px 20px;
  text-decoration: none;

  &:hover {
    background: #f2f8fa;
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

export const Panel = styled.section`
  background: #ffffff;
  border: 1px solid #dce6eb;
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

export const Player = styled.div<{$active: boolean}>`
  align-items: center;
  background: ${({$active}) => ($active ? '#e8f3f5' : '#f8fafb')};
  border: 1px solid ${({$active}) => ($active ? '#82afb8' : '#dce6eb')};
  border-radius: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  padding: 16px;
`;

export const Result = styled.section`
  background: #e8f3f0;
  border: 1px solid #a7c7bd;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 20px 0;
  padding: 24px;
`;

export const Rules = styled.details`
  background: #ffffff;
  border: 1px solid #dce6eb;
  border-radius: 16px;
  color: ${colors.secondary};
  line-height: 1.75;
  margin-top: 24px;
  padding: 20px 24px;

  summary {
    color: #244c60;
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
  border: 1px solid #c5d7df;
  border-radius: 10px;
  color: ${colors.primary};
  font: inherit;
  min-height: 44px;
  padding: 10px 12px;
  width: 100%;
`;

export const Small = styled.p`
  color: ${colors.secondary};
  font-size: 12px;
  line-height: 1.7;
  margin: 8px 0 0;
`;

export const Stat = styled.div`
  align-items: center;
  border-bottom: 1px solid #e1eaf0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  padding: 14px 0;
`;

export const Status = styled.div`
  align-items: center;
  background: #f0f6f9;
  border: 1px solid #cfdee6;
  border-radius: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin: 20px 0;
  min-height: 80px;
  padding: 18px 22px;
`;

export const TextLink = styled(Link)`
  color: #255b70;
  font-size: 13px;
  font-weight: 600;
`;

export const Timer = styled.strong`
  color: #194b61;
  font-size: 22px;
  font-variant-numeric: tabular-nums;
`;

export const TitleSmall = styled.h2`
  color: #203f52;
  font-size: 21px;
  font-weight: 600;
  letter-spacing: -0.025em;
  margin: 0 0 16px;
`;
