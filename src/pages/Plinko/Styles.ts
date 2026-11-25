import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';

import UAuthButtons from 'components/AuthButtons';
import {colors, pagePadding} from 'styles';

const focus = css`
  &:focus-visible {
    outline: 3px solid #6ce0c4;
    outline-offset: 3px;
  }
`;

export const Admin = styled.div`
  color: ${colors.primary};
  margin-top: 24px;
  max-width: 560px;
`;

export const Alert = styled.p`
  background: rgba(255, 120, 109, 0.1);
  border: 1px solid rgba(255, 120, 109, 0.4);
  border-radius: 10px;
  color: #ffc3ba;
  font-size: 13px;
  line-height: 1.6;
  margin: 12px 0 0;
  padding: 12px;
`;

export const AuthButtons = styled(UAuthButtons)`
  gap: 8px;
  margin-top: 16px;

  button {
    color: #f0f8f7;
    ${focus}
  }

  button:first-child {
    border-color: #5b7c85;

    &:hover {
      background: #244752;
    }
  }
`;

export const BackLink = styled(Link)`
  color: ${colors.secondary};
  font-size: 13px;
  text-decoration: none;
  ${focus}
`;

export const Board = styled.div`
  margin: 0 auto;
  max-width: 840px;
  width: 100%;

  svg {
    display: block;
    height: auto;
    overflow: visible;
    width: 100%;
  }
`;

export const BoardColumn = styled.div`
  align-content: center;
  background:
    radial-gradient(ellipse at 50% 42%, rgba(55, 139, 131, 0.14), transparent 65%),
    linear-gradient(155deg, #142f3b, #0d202b 65%);
  display: grid;
  min-width: 0;
  padding: 24px 12px 18px;
  position: relative;
`;

export const BoardHeader = styled.div`
  align-items: center;
  color: #89adb5;
  display: flex;
  font-size: 11px;
  font-weight: 600;
  gap: 16px;
  justify-content: space-between;
  letter-spacing: 0.12em;
  padding: 0 18px;
  text-transform: uppercase;

  span {
    align-items: center;
    display: inline-flex;
    gap: 6px;
  }
`;

export const BoardToolbar = styled.div`
  align-items: center;
  color: #a2bcc3;
  display: flex;
  font-size: 12px;
  gap: 12px;
  justify-content: space-between;
  padding: 14px 18px 0;
`;

export const Button = styled.button`
  background: #18343f;
  border: 1px solid #36545c;
  border-radius: 9px;
  color: #d7e8eb;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  padding: 10px 14px;
  transition: background 0.15s ease;

  &:hover:not(:disabled) {
    background: #244752;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
  ${focus}
`;

export const Card = styled.section`
  background: #102731;
  border: 1px solid #28434c;
  border-radius: 18px;
  color: #e2eff0;
  min-width: 0;
  padding: 24px;

  @container plinko (max-width: 400px) {
    padding: 16px;
  }

  h2 {
    font-size: 18px;
    letter-spacing: -0.025em;
    margin: 0 0 16px;
  }
`;

export const Controls = styled.form`
  background: #142b35;
  border-right: 1px solid #2a444d;
  display: flex;
  flex-direction: column;
  gap: 22px;
  min-width: 0;
  padding: 28px;

  @container plinko (max-width: 780px) {
    border-right: 0;
    border-top: 1px solid #2a444d;
    padding: 22px;
  }
`;

export const Details = styled.details`
  border-top: 1px solid #2a444d;
  color: #a8c3ca;
  font-size: 12px;
  margin-top: 16px;
  padding-top: 16px;

  summary {
    cursor: pointer;
    width: fit-content;
    ${focus}
  }

  pre {
    background: #0a1d26;
    border-radius: 8px;
    font-size: 11px;
    max-height: 250px;
    overflow: auto;
    padding: 12px;
    white-space: pre-wrap;
    word-break: break-all;
  }
`;

export const DropButton = styled.button`
  align-items: center;
  background: linear-gradient(135deg, #8aeac8, #5bd1b7);
  border: 0;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(67, 202, 171, 0.12);
  color: #113e39;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-weight: 800;
  gap: 10px;
  justify-content: center;
  min-height: 56px;
  padding: 16px;
  transition: filter 0.15s ease;
  width: 100%;

  span {
    font-size: 12px;
    font-weight: 600;
  }

  &:hover:not(:disabled) {
    filter: brightness(1.08);
  }

  &:disabled {
    background: #32544e;
    box-shadow: none;
    color: #9ebcb3;
    cursor: not-allowed;
  }
  ${focus}
`;

export const Eyebrow = styled.p`
  color: #77a7b1;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  margin: 0 0 8px;
  text-transform: uppercase;
`;

export const Field = styled.div`
  display: grid;
  gap: 10px;

  label {
    color: #d2e2e6;
    font-size: 13px;
    font-weight: 600;
  }
`;

export const Floor = styled.div`
  background: #0a1d26;
  border: 1px solid #29424b;
  border-radius: 24px;
  box-shadow: 0 18px 48px rgba(12, 30, 40, 0.14);
  color: #ecf5f5;
  container: plinko / inline-size;
  overflow: hidden;
`;

export const Header = styled.header`
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin: 24px 0;

  h1 {
    color: ${colors.primary};
    font-size: clamp(34px, 5vw, 48px);
    letter-spacing: -0.05em;
    line-height: 1.1;
    margin: 0 0 8px;
  }

  p {
    color: ${colors.secondary};
    font-size: 14px;
    margin: 0;
  }
`;

export const Input = styled.input`
  background: #0b202a;
  border: 1px solid #3a5963;
  border-radius: 10px;
  color: #eef7f6;
  font-size: 21px;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  min-width: 0;
  padding: 14px;
  width: 100%;
  ${focus}
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(270px, 0.8fr) minmax(0, 2fr);

  @container plinko (max-width: 780px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const Lower = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  padding: 20px;

  @container plinko (max-width: 780px) {
    grid-template-columns: minmax(0, 1fr);
    padding: 14px;
  }
`;

export const Note = styled.p`
  color: #a2bcc3;
  font-size: 12px;
  line-height: 1.7;
  margin: 8px 0 0;
`;

export const Page = styled.div`
  ${pagePadding};
  margin: 0 auto;
  max-width: 1320px;
  padding-bottom: 48px;
  padding-top: 24px;
`;

export const QuickBets = styled.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  button {
    padding: 9px 2px;
  }
`;

export const Result = styled.div`
  align-items: center;
  background: rgba(4, 18, 26, 0.4);
  border: 1px solid #2a454e;
  border-radius: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 14px;
  justify-content: center;
  margin: 0 20px;
  min-height: 58px;
  padding: 12px;
  text-align: center;

  strong {
    color: #edf7f5;
    font-size: 16px;
  }

  span {
    color: #91b0b8;
    font-size: 12px;
  }

  &[data-won='true'] {
    border-color: #668f66;

    strong {
      color: #ffe0a1;
    }
  }
`;

export const SoundButton = styled.button`
  align-items: center;
  background: #18343f;
  border: 1px solid #36545c;
  border-radius: 999px;
  color: #d7e8eb;
  cursor: pointer;
  display: inline-flex;
  font-size: 12px;
  gap: 6px;
  padding: 8px 12px;

  &[aria-pressed='true'] {
    border-color: #6ce0c4;
    color: #8aeac8;
  }

  &:hover {
    background: #244752;
  }
  ${focus}
`;

export const Stat = styled.div`
  align-items: baseline;
  display: flex;
  gap: 8px;
  justify-content: space-between;

  span {
    color: #9ebcc3;
    font-size: 12px;
  }

  strong {
    color: #e2efee;
    font-size: 14px;
    font-variant-numeric: tabular-nums;
  }
`;

export const Stats = styled.div`
  border-top: 1px solid #2e4851;
  display: grid;
  gap: 14px;
  padding-top: 20px;
`;

export const Status = styled.span`
  align-items: center;
  background: #edf5f2;
  border: 1px solid #dae8e2;
  border-radius: 999px;
  color: #4c655a;
  display: inline-flex;
  font-size: 12px;
  gap: 8px;
  padding: 8px 12px;

  &::before {
    background: #a0b4ab;
    border-radius: 50%;
    content: '';
    height: 6px;
    width: 6px;
  }

  &[data-available='true']::before {
    background: #258e63;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  text-align: left;
  width: 100%;

  th {
    color: #85a5ae;
    font-size: 10px;
    font-weight: 600;
    padding: 0 6px 12px;
    text-transform: uppercase;
  }

  td {
    border-top: 1px solid #28434c;
    padding: 12px 6px;
  }

  th:last-child,
  td:last-child {
    text-align: right;
  }

  button {
    font-size: 11px;
    padding: 7px 9px;
  }
`;

export const TableScroll = styled.div`
  max-width: 100%;
  overflow-x: auto;
  ${focus}
`;
