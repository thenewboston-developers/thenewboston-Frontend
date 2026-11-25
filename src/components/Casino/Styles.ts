import {Link, NavLink} from 'react-router-dom';
import styled from 'styled-components';

import {breakpoints, colors, pagePadding} from 'styles';

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
export const BackLink = styled(Link)`
  color: ${colors.secondary};
  font-size: 14px;
  text-decoration: none;
`;
export const Button = styled.button`
  background: #d8ae57;
  border: 1px solid #d8ae57;
  border-radius: 10px;
  color: #172821;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  padding: 13px 20px;

  &:hover:not(:disabled) {
    background: #e5bf73;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &:focus-visible {
    outline: 3px solid #567e69;
    outline-offset: 3px;
  }
`;
export const Card = styled.section`
  background: ${colors.white};
  border: 1px solid ${colors.borderSubtle};
  border-radius: 18px;
  min-width: 0;
  padding: 24px;
`;
export const Container = styled.div`
  ${pagePadding};
  margin: 0 auto;
  max-width: 1320px;
  padding-bottom: 48px;
  padding-top: 32px;
`;
export const Details = styled.details`
  font-size: 14px;
  line-height: 1.7;
  margin-top: 18px;

  summary {
    cursor: pointer;
    font-weight: 600;
  }
`;
export const Error = styled.p`
  background: #fff2ef;
  border-radius: 8px;
  color: #9b3329;
  font-size: 14px;
  line-height: 1.6;
  padding: 12px 14px;
`;
export const Eyebrow = styled.p`
  color: #6a796f;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin: 0 0 10px;
`;
export const Field = styled.label`
  display: grid;
  font-size: 13px;
  font-weight: 600;
  gap: 8px;
  margin-bottom: 16px;
`;
export const FundGrid = styled.dl`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 20px 0 0;

  dt {
    color: ${colors.secondary};
    font-size: 12px;
    margin-bottom: 7px;
  }
  dd {
    font-size: 20px;
    font-variant-numeric: tabular-nums;
    font-weight: 700;
    margin: 0;
  }
  small {
    color: ${colors.secondary};
    font-size: 12px;
    font-weight: 400;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;
export const Grid = styled.div`
  align-items: start;
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1.7fr) minmax(270px, 1fr);
  margin: 24px 0;

  @media (max-width: 950px) {
    grid-template-columns: 1fr;
  }
`;
export const Header = styled.header`
  align-items: end;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  margin: 28px 0;
`;
export const Heading = styled.h2`
  font-size: 21px;
  letter-spacing: -0.025em;
  margin: 0 0 14px;
`;
export const Input = styled.input`
  background: ${colors.white};
  border: 1px solid #cdd4d0;
  border-radius: 9px;
  color: ${colors.primary};
  font-size: 16px;
  min-width: 0;
  padding: 12px;
  width: 100%;
`;
export const Note = styled.p`
  color: ${colors.secondary};
  font-size: 13px;
  line-height: 1.7;
  margin: 10px 0;
`;
export const Receipt = styled.pre`
  background: #f4f6f5;
  border-radius: 8px;
  font-size: 11px;
  max-height: 320px;
  overflow: auto;
  padding: 14px;
  white-space: pre-wrap;
  word-break: break-all;
`;
export const Result = styled.div`
  background: #f2f7f3;
  border: 1px solid #d8e6dc;
  border-radius: 12px;
  line-height: 1.7;
  margin-top: 20px;
  padding: 18px;

  strong {
    font-size: 21px;
  }
`;
export const SecondaryButton = styled(Button)`
  background: transparent;
  border-color: #cdd4d0;
  color: ${colors.primary};

  &:hover:not(:disabled) {
    background: #eff3f0;
  }
`;
export const Select = styled.select`
  background: ${colors.white};
  border: 1px solid #cdd4d0;
  border-radius: 9px;
  color: ${colors.primary};
  font-size: 16px;
  min-width: 0;
  padding: 12px;
  width: 100%;
`;
export const Stack = styled.div`
  display: grid;
  gap: 24px;
`;
export const Stage = styled.div`
  background: radial-gradient(ellipse at top, #345c48, #153629 70%);
  border: 1px solid #284d39;
  border-radius: 16px;
  color: #fff7e5;
  min-height: 290px;
  padding: 28px 24px;
  text-align: center;

  p {
    color: #d5dfd3;
    font-size: 13px;
    margin: 0;
  }
`;
export const Status = styled.span`
  background: #edf3ef;
  border-radius: 99px;
  color: #41644e;
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  padding: 7px 12px;
`;
export const Table = styled.table`
  border-collapse: collapse;
  font-size: 13px;
  width: 100%;

  th {
    color: ${colors.secondary};
    font-weight: 500;
    text-align: left;
  }
  td,
  th {
    border-bottom: 1px solid ${colors.borderSubtle};
    padding: 12px 6px;
  }
`;
export const Tab = styled(NavLink)`
  border-bottom: 3px solid transparent;
  color: ${colors.secondary};
  font-size: 16px;
  font-weight: 600;
  padding: 14px 22px;
  text-decoration: none;

  &.active {
    border-color: #476b54;
    color: #264c35;
  }
  &:hover {
    text-decoration: none;
  }
`;
export const Tabs = styled.nav`
  border-bottom: 1px solid ${colors.borderSubtle};
  display: flex;
  gap: 8px;
`;
export const Title = styled.h1`
  color: ${colors.primary};
  font-size: clamp(34px, 4vw, 48px);
  letter-spacing: -0.05em;
  line-height: 1.1;
  margin: 0;
`;
