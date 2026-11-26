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
  background: #edf3e9;
  border-radius: 6px;
  color: #376441;
  display: inline-flex;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 6px 9px;
`;
export const Banner = styled.div`
  background: #f6f2e8;
  border: 1px solid #e7dec8;
  border-radius: 10px;
  color: #695735;
  font-size: 13px;
  line-height: 1.6;
  padding: 14px 18px;
`;
export const Button = styled.button<{$secondary?: boolean}>`
  align-items: center;
  background: ${({$secondary}) => ($secondary ? '#fff' : '#264e3b')};
  border: 1px solid ${({$secondary}) => ($secondary ? '#d9e1d7' : '#264e3b')};
  border-radius: 8px;
  color: ${({$secondary}) => ($secondary ? '#355240' : '#fff')};
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-size: 13px;
  font-weight: 650;
  gap: 7px;
  justify-content: center;
  min-height: 38px;
  padding: 9px 14px;
  transition: background 0.15s ease;

  &:hover:enabled {
    background: ${({$secondary}) => ($secondary ? '#edf3e9' : '#35684d')};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  &:focus-visible {
    outline: 3px solid #9bab68;
    outline-offset: 3px;
  }
`;
export const Card = styled.section`
  background: #fff;
  border: 1px solid #e1e6dc;
  border-radius: 14px;
  min-width: 0;
  padding: 23px;

  h2 {
    color: #213b2d;
    font-size: 18px;
    letter-spacing: -0.02em;
    margin: 0 0 8px;
  }

  h3 {
    color: #304a38;
    font-size: 14px;
    margin: 20px 0 10px;
  }

  @media (max-width: 600px) {
    padding: 18px;
  }
`;
export const Cards = styled.div`
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(min(290px, 100%), 1fr));
`;
export const Container = styled.div`
  ${pagePadding};
  background: #f5f6f1;
  min-height: 100%;
  padding-bottom: 48px;
  padding-top: 30px;
`;
export const Content = styled.div`
  color: #293a2e;
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin: 0 auto;
  max-width: 1440px;
`;
export const Empty = styled.p`
  background: #f7f9f4;
  border: 1px dashed #d5dfce;
  border-radius: 10px;
  color: #6b7668;
  font-size: 14px;
  line-height: 1.7;
  margin: 10px 0;
  padding: 24px;
  text-align: center;
`;
export const Error = styled.div`
  background: #fff2ee;
  border: 1px solid #edc8ba;
  border-radius: 10px;
  color: #913e2b;
  font-size: 14px;
  line-height: 1.6;
  padding: 14px 18px;
`;
export const Eyebrow = styled.p`
  color: #879276;
  font-size: 11px;
  font-weight: 750;
  letter-spacing: 0.14em;
  margin: 0 0 12px;
  text-transform: uppercase;
`;
export const Field = styled.label`
  color: #596851;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 600;
  gap: 7px;
  min-width: 0;

  input,
  select,
  textarea {
    background: #fafbf8;
    border: 1px solid #dce3d5;
    border-radius: 7px;
    color: #273e2f;
    font: inherit;
    font-size: 14px;
    min-height: 40px;
    min-width: 0;
    padding: 9px 10px;
    width: 100%;
  }

  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline: 2px solid #71955c;
    outline-offset: 2px;
  }

  textarea {
    min-height: 90px;
    resize: vertical;
  }
`;
export const Form = styled.form`
  display: grid;
  gap: 14px;
  margin-top: 18px;
`;
export const Grid = styled.div`
  align-items: start;
  display: grid;
  gap: 20px;
  grid-template-columns: minmax(0, 1.6fr) minmax(280px, 1fr);

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;
export const Hero = styled.header`
  background: #14372c;
  border-radius: 18px;
  color: #fff;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  min-height: 280px;
  overflow: hidden;
  position: relative;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;
export const HeroArt = styled.img`
  height: 100%;
  min-height: 280px;
  object-fit: cover;
  width: 100%;

  @media (max-width: 700px) {
    height: 190px;
    min-height: 0;
    object-position: center 42%;
  }
`;
export const HeroCopy = styled.div`
  align-self: center;
  padding: 36px 40px;
  z-index: 1;

  h1 {
    color: #f0ead8;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(48px, 5vw, 72px);
    font-weight: 500;
    letter-spacing: -0.055em;
    line-height: 1;
    margin: 0 0 16px;
  }

  p:last-child {
    color: #bfd0bf;
    font-size: 15px;
    line-height: 1.65;
    margin: 0;
    max-width: 420px;
  }

  @media (max-width: 600px) {
    padding: 28px;
  }
`;
export const InlineFields = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
`;
export const LinkButton = styled(Link)`
  color: #396543;
  font-size: 13px;
  font-weight: 650;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
export const Map = styled.div<{$columns: number}>`
  display: grid;
  gap: 4px;
  grid-template-columns: repeat(${({$columns}) => $columns}, 48px);
  padding: 6px;
  width: max-content;
`;
export const MapScroll = styled.div`
  background: #eef2e8;
  border: 1px solid #dce4d2;
  border-radius: 12px;
  max-height: 580px;
  overflow: auto;
  padding: 12px;
`;
export const Message = styled.article`
  border-bottom: 1px solid #edf0e7;
  font-size: 14px;
  line-height: 1.6;
  padding: 14px 0;

  p {
    margin: 6px 0 0;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
  }

  small {
    color: #7b8775;
    display: block;
    font-size: 11px;
  }
`;
export const Muted = styled.p`
  color: #76806f;
  font-size: 13px;
  line-height: 1.7;
  margin: 0 0 15px;
`;
export const PanelTitle = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  margin-bottom: 16px;

  h2 {
    margin: 0;
  }
`;
export const Progress = styled.progress`
  accent-color: #638646;
  border: none;
  border-radius: 4px;
  height: 7px;
  margin: 12px 0;
  width: 100%;
`;
export const Row = styled.div`
  align-items: center;
  border-bottom: 1px solid #edf0e7;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  gap: 12px;
  justify-content: space-between;
  padding: 13px 0;

  &:last-child {
    border-bottom: 0;
  }

  small {
    color: #798573;
    display: block;
    font-size: 12px;
    margin-top: 5px;
  }
`;
export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const Stat = styled.div`
  background: #fff;
  border: 1px solid #e1e6dc;
  border-radius: 12px;
  padding: 19px 22px;

  span {
    color: #7c866f;
    display: block;
    font-size: 11px;
    font-weight: 650;
    letter-spacing: 0.06em;
    margin-bottom: 9px;
    text-transform: uppercase;
  }

  strong {
    color: #2d4835;
    font-size: 24px;
    font-weight: 650;
    letter-spacing: -0.035em;
  }

  small {
    color: #7c866f;
    font-size: 12px;
    margin-left: 6px;
  }
`;
export const Stats = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
export const Table = styled.table`
  border-collapse: collapse;
  font-size: 13px;
  text-align: left;
  width: 100%;

  th {
    color: #78836e;
    font-size: 10px;
    font-weight: 650;
    letter-spacing: 0.05em;
    padding: 13px 12px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  td {
    border-top: 1px solid #edf0e7;
    padding: 14px 12px;
  }
`;
export const TableScroll = styled.div`
  overflow-x: auto;
`;
export const Tab = styled.button<{$active: boolean}>`
  background: ${({$active}) => ($active ? '#e8eee0' : 'transparent')};
  border: 1px solid ${({$active}) => ($active ? '#d7e1c8' : 'transparent')};
  border-radius: 7px;
  color: ${({$active}) => ($active ? '#36512e' : '#7d8775')};
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  padding: 11px 15px;
  white-space: nowrap;

  &:focus-visible {
    outline: 2px solid #638646;
    outline-offset: 2px;
  }
`;
export const Tabs = styled.nav`
  border-bottom: 1px solid #dce3d2;
  display: flex;
  gap: 4px;
  overflow-x: auto;
  padding-bottom: 14px;
`;
export const Tile = styled.button<{$color?: string; $selected?: boolean}>`
  background: ${({$color}) => $color || '#dce6ca'};
  border: 2px solid ${({$selected}) => ($selected ? '#fff' : '#0000000d')};
  border-radius: 7px;
  box-shadow: ${({$selected}) => ($selected ? '0 0 0 2px #35593a' : '0 2px 0 #0000000c')};
  color: #2a4433;
  cursor: pointer;
  font-size: 21px;
  height: 46px;
  position: relative;
  width: 48px;

  &:focus-visible {
    outline: 3px solid ${colors.primary};
    outline-offset: 2px;
  }

  small {
    bottom: 1px;
    color: #fff;
    font-size: 9px;
    font-weight: 800;
    position: absolute;
    right: 3px;
    text-shadow: 0 1px 3px #000;
  }
`;
export const Topline = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
`;
