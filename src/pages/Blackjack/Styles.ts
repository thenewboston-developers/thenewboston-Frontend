import {Link} from 'react-router-dom';
import styled, {keyframes} from 'styled-components';

import {pagePadding} from 'styles';

const deal = keyframes`
  from { opacity: 0; transform: translateY(-14px) rotate(-6deg); }
  to { opacity: 1; transform: translateY(0) rotate(0); }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
export const Badge = styled.span`
  background: #f1ede3;
  border: 1px solid #e4dac4;
  border-radius: 30px;
  color: #75613f;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 8px 12px;
`;
export const Button = styled.button<{$primary?: boolean}>`
  background: ${({$primary}) => ($primary ? '#e3c17c' : '#f8f6ef')};
  border: 1px solid ${({$primary}) => ($primary ? '#d5af63' : '#dddcd4')};
  border-radius: 10px;
  color: #18392f;
  cursor: pointer;
  flex: 1;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  min-height: 46px;
  padding: 12px 14px;
  transition: background 0.15s ease;

  &:hover:not(:disabled) {
    background: #efdab0;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
  &:focus-visible {
    outline: 3px solid #a57731;
    outline-offset: 3px;
  }
`;
export const Card = styled.div<{$hidden?: boolean; $red?: boolean}>`
  align-items: center;
  animation: ${deal} 300ms ease-out both;
  background: ${({$hidden}) =>
    $hidden
      ? 'repeating-linear-gradient(45deg, #1b394a 0 4px, #274859 4px 6px)'
      : 'linear-gradient(135deg,#fffef9,#eee9de)'};
  border: 3px solid #fff9e7;
  border-radius: 9px;
  box-shadow:
    0 4px 0 #cbc5b7,
    0 10px 16px #001c1c66;
  color: ${({$red}) => ($red ? '#b33c42' : '#243238')};
  display: flex;
  flex-shrink: 0;
  font-family: Georgia, serif;
  font-size: clamp(30px, 4vw, 44px);
  height: 116px;
  justify-content: center;
  position: relative;
  width: 80px;

  small {
    font-size: 16px;
    font-weight: 700;
    left: 5px;
    line-height: 1;
    position: absolute;
    top: 6px;
  }
  small:last-child {
    bottom: 6px;
    left: auto;
    right: 5px;
    top: auto;
    transform: rotate(180deg);
  }

  @media (max-width: 600px) {
    height: 78px;
    width: 55px;
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
export const Cards = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  min-height: 122px;

  @media (max-width: 600px) {
    gap: 7px;
    min-height: 82px;
  }
`;
export const Chip = styled.button`
  background: #fcfaf4;
  border: 3px dashed #a3834f;
  border-radius: 50%;
  box-shadow:
    0 2px 0 #c6b794,
    inset 0 0 0 3px #f1e8d6;
  color: #624a2b;
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
  height: 44px;
  width: 44px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
  &:focus-visible {
    outline: 3px solid #a57731;
    outline-offset: 3px;
  }
`;
export const Container = styled.div`
  ${pagePadding};
  background: #f7f7f3;
  color: #223a34;
  min-height: 100%;
  padding-bottom: 48px;
  padding-top: 24px;
`;
export const Content = styled.div`
  margin: auto;
  max-width: 1320px;
`;
export const Error = styled.p`
  background: #fcf0eb;
  border: 1px solid #f0d0c5;
  border-radius: 9px;
  color: #9a382c;
  font-size: 13px;
  line-height: 1.6;
  margin: 16px 0;
  padding: 12px;
`;
export const Eyebrow = styled.p`
  color: #8a6c3d;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.16em;
  margin: 0 0 10px;
  text-transform: uppercase;
`;
export const Facts = styled.dl`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 22px 0;

  dt {
    color: #77827b;
    font-size: 11px;
    margin-bottom: 6px;
  }
  dd {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    overflow-wrap: anywhere;
  }
`;
export const Felt = styled.section`
  background: radial-gradient(ellipse at 50% 45%, #21624e 0, #154c3e 46%, #0d332e 100%);
  border: 9px solid #23352e;
  border-radius: 28px;
  box-shadow:
    inset 0 0 0 2px #b8a16a80,
    inset 0 0 60px #001b2166,
    0 5px 20px #20352a18;
  color: #fff8e7;
  display: flex;
  flex-direction: column;
  gap: 26px;
  justify-content: space-between;
  min-height: 535px;
  overflow: hidden;
  padding: 26px 20px;
  position: relative;

  @media (max-width: 600px) {
    border-width: 6px;
    gap: 12px;
    min-height: 330px;
    padding: 16px 12px;
  }
`;
export const HandLabel = styled.div`
  align-items: center;
  color: #dddfce;
  display: flex;
  font-size: 11px;
  font-weight: 700;
  gap: 10px;
  justify-content: center;
  letter-spacing: 0.14em;
  margin-bottom: 14px;
  text-transform: uppercase;

  strong {
    background: #062a2599;
    border: 1px solid #c8bb8250;
    border-radius: 7px;
    color: #fff4d6;
    font-size: 15px;
    letter-spacing: 0;
    padding: 5px 9px;
  }

  @media (max-width: 600px) {
    margin-bottom: 8px;
  }
`;
export const Header = styled.header`
  align-items: center;
  display: flex;
  gap: 28px;
  justify-content: space-between;
  padding: 30px 0;

  h1 {
    font-family: Georgia, serif;
    font-size: clamp(40px, 4.5vw, 58px);
    font-weight: 500;
    letter-spacing: -0.045em;
    line-height: 1.1;
    margin: 0;
  }
  p:last-child {
    color: #738078;
    font-size: 14px;
    line-height: 1.7;
    margin-bottom: 0;
  }
`;
export const Heading = styled.h2`
  font-family: Georgia, serif;
  font-size: 25px;
  font-weight: 500;
  letter-spacing: -0.025em;
  margin: 0 0 18px;
`;
export const History = styled.div`
  display: grid;
  gap: 6px;
`;
export const HistoryButton = styled.button<{$selected: boolean}>`
  align-items: center;
  background: ${({$selected}) => ($selected ? '#f0eadc' : '#f7f7f2')};
  border: 1px solid ${({$selected}) => ($selected ? '#d7c59d' : 'transparent')};
  border-radius: 8px;
  color: #30463c;
  cursor: pointer;
  display: flex;
  font: inherit;
  font-size: 12px;
  gap: 10px;
  justify-content: space-between;
  padding: 12px;
  text-align: left;

  span {
    color: #738078;
  }
  &:focus-visible {
    outline: 3px solid #a57731;
  }
`;
export const Input = styled.input`
  background: #fcfcf9;
  border: 1px solid #d5d9ce;
  border-radius: 9px;
  color: #213f32;
  font-size: 24px;
  font-weight: 700;
  min-width: 0;
  padding: 12px 14px;
  width: 100%;

  &:focus-visible {
    outline: 2px solid #a57731;
  }
`;
export const Label = styled.label`
  color: #65756b;
  display: grid;
  font-size: 12px;
  gap: 8px;
  margin: 20px 0 12px;
`;
export const Layout = styled.div`
  align-items: start;
  display: grid;
  gap: 22px;
  grid-template-columns: minmax(0, 1.85fr) minmax(280px, 1fr);

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;
export const Logo = styled.div`
  color: #d6c496;
  text-align: center;

  div {
    font-family: Georgia, serif;
    font-size: clamp(24px, 3vw, 34px);
    letter-spacing: 0.05em;
  }
  p {
    color: #a9c2ad;
    font-size: 10px;
    letter-spacing: 0.14em;
    margin: 10px 0 0;
    text-transform: uppercase;
  }

  @media (max-width: 600px) {
    div {
      font-size: 22px;
    }
    p {
      font-size: 9px;
      margin-top: 6px;
    }
    p:last-child {
      display: none;
    }
  }
`;
export const Navigation = styled.nav`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
`;
export const Note = styled.p`
  color: #6e7d72;
  font-size: 12px;
  line-height: 1.7;
  margin: 12px 0;
`;
export const Panel = styled.section`
  background: #ffffff;
  border: 1px solid #e0e4db;
  border-radius: 18px;
  margin-bottom: 22px;
  min-width: 0;
  padding: 24px;

  @media (max-width: 540px) {
    padding: 20px;
  }
`;
export const Raw = styled.pre`
  background: #f7f7f2;
  border-radius: 8px;
  font-size: 11px;
  max-height: 280px;
  overflow: auto;
  padding: 12px;
`;
export const Result = styled.div<{$win: boolean}>`
  background: ${({$win}) => ($win ? '#f4eddb' : '#eef1e9')};
  border: 1px solid ${({$win}) => ($win ? '#dfc996' : '#dce2d5')};
  border-radius: 12px;
  margin: 18px 0;
  padding: 16px;

  strong {
    display: block;
    font-family: Georgia, serif;
    font-size: 25px;
    font-weight: 500;
  }
  p {
    font-size: 12px;
    line-height: 1.6;
    margin: 8px 0 0;
  }
`;
export const Rules = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  h3 {
    font-size: 14px;
    margin: 0;
  }
  p {
    color: #6e7d72;
    font-size: 12px;
    line-height: 1.8;
    margin-bottom: 0;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;
export const Status = styled.p`
  color: #9b7740;
  font-size: 12px;
  line-height: 1.6;
  margin: 16px 0;
`;
export const TextLink = styled(Link)`
  color: #5a7163;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: #1c4532;
    text-decoration: underline;
  }
`;

export const TableCaption = styled.p`
  color: #6e7d72;
  font-size: 12px;
  margin: 12px 0;
  text-align: center;

  @media (max-width: 600px) {
    display: none;
  }
`;
