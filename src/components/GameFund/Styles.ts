import styled from 'styled-components';

import {fonts} from 'styles';

export const Card = styled.section`
  background: #111d30;
  border: 1px solid #233249;
  border-radius: 28px;
  box-shadow: 0 16px 48px #101b3014;
  color: #ffffff;
  overflow: hidden;
`;
export const ContributeLink = styled.button`
  align-items: center;
  background: none;
  border: 0;
  color: #aab7ca;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  font: inherit;
  font-size: 12px;
  gap: 7px;
  min-height: 44px;
  padding: 0;
  text-align: left;
  text-underline-offset: 4px;

  &:hover {
    color: #ffe2a4;
    text-decoration: underline;
  }

  &:focus-visible {
    border-radius: 3px;
    outline: 2px solid #ffe2a4;
    outline-offset: 4px;
  }
`;
export const DetailsText = styled.p`
  color: #aab7ca;
  font-size: 13px;
  line-height: 1.8;
  margin: 10px 0 12px;
  max-width: 760px;
`;
export const Eyebrow = styled.p`
  color: #b9c8e0;
  font-size: 10px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.18em;
  line-height: 1.6;
  margin: 0 0 18px;
`;
export const Flow = styled.div`
  align-items: center;
  color: #7587a3;
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 24px;

  @media (max-width: 400px) {
    gap: 10px;
  }
`;
export const FlowStep = styled.span`
  align-items: center;
  color: #d9e2f1;
  display: flex;
  font-size: 12px;
  font-weight: ${fonts.weight.medium};
  gap: 7px;

  &:last-child {
    color: #ffdc94;
  }
`;
export const Footer = styled.div`
  align-items: baseline;
  border-top: 1px solid #ffffff0d;
  display: flex;
  gap: 8px 28px;
  justify-content: space-between;
  padding: 6px 40px;

  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 0;
    padding: 8px 24px;
  }
`;
export const Heading = styled.h2`
  color: #ffffff;
  font-size: clamp(36px, 4.2vw, 58px);
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.045em;
  line-height: 1.08;
  margin: 0 0 20px;

  span {
    color: #ffda8c;
  }
`;
export const Hero = styled.div`
  align-items: center;
  background:
    radial-gradient(ellipse at 80% 40%, #39516b45, transparent 55%), linear-gradient(125deg, #17253d, #101b2f 70%);
  display: grid;
  gap: 20px;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  padding: 40px 48px;

  @media (max-width: 900px) {
    gap: 24px;
    padding: 36px 32px;
  }

  @media (max-width: 720px) {
    grid-template-columns: minmax(0, 1fr);
    padding: 32px 24px;
  }
`;
export const HeroDescription = styled.p`
  color: #b9c7dd;
  font-size: 15px;
  line-height: 1.75;
  margin: 0;
  max-width: 390px;
`;
export const Illustration = styled.svg`
  display: block;
  height: auto;
  margin: -6px auto -20px;
  max-width: 440px;
  overflow: visible;
  width: 100%;
`;
export const Overview = styled.div`
  min-width: 0;
`;
export const PlayLink = styled.a`
  align-items: center;
  background: #ffda8c;
  border: 1px solid #ffe4b0;
  border-radius: 12px;
  box-shadow: 0 4px 18px #efba5220;
  color: #172238;
  display: inline-flex;
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
  gap: 24px;
  margin-top: 26px;
  min-height: 46px;
  padding: 12px 18px;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: #ffe6b4;
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 4px;
  }
`;
export const PlayNote = styled.p`
  color: #94a5c0;
  font-size: 11px;
  line-height: 1.6;
  margin: 12px 0 0;
`;
export const Pool = styled.div`
  background: #ffffff03;
  border-top: 1px solid #ffffff0d;
  padding: 24px 40px;

  @media (max-width: 600px) {
    padding: 22px 24px;
  }
`;
export const PoolMessage = styled.p`
  color: #b9c7dd;
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
`;
export const RefreshButton = styled.button`
  background: none;
  border: 1px solid #77869d;
  border-radius: 8px;
  color: #e0e8f4;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  margin-top: 12px;
  min-height: 40px;
  padding: 8px 12px;

  &:focus-visible {
    outline: 2px solid #ffe2a4;
    outline-offset: 3px;
  }
`;
export const RewardAmount = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: center;
  position: relative;

  strong {
    color: #ffe3a4;
    font-size: clamp(42px, 4.8vw, 64px);
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.bold};
    letter-spacing: -0.055em;
    line-height: 1;
  }
`;
export const RewardDetails = styled.details`
  min-width: 0;

  summary {
    align-content: center;
    color: #aab7ca;
    cursor: pointer;
    font-size: 12px;
    min-height: 44px;
    width: fit-content;
  }

  summary:focus-visible {
    border-radius: 3px;
    outline: 2px solid #ffe2a4;
    outline-offset: 4px;
  }
`;
export const RewardShowcase = styled.div`
  min-width: 0;
  padding-bottom: 6px;
  text-align: center;
`;
export const RewardUnit = styled.span`
  color: #ffe3a4;
  font-size: 21px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.4;
  text-align: left;

  span {
    color: #aebed6;
    display: block;
    font-size: 11px;
    font-weight: ${fonts.weight.regular};
  }
`;
export const Stat = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 6px;
  min-width: 0;

  dt {
    color: #aab7ca;
    font-size: 12px;
    line-height: 1.5;
  }

  dd {
    color: #f3f6fc;
    font-size: 24px;
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.semiBold};
    letter-spacing: -0.03em;
    margin: 0;
    overflow-wrap: anywhere;
  }

  dd span {
    color: #aab7ca;
    font-size: 12px;
    font-weight: ${fonts.weight.regular};
    letter-spacing: 0;
  }

  & + & {
    border-left: 1px solid #ffffff12;
    padding-left: 28px;
  }

  @media (max-width: 600px) {
    dd {
      font-size: 20px;
    }

    dt,
    dd span {
      font-size: 10px;
    }

    & + & {
      padding-left: 12px;
    }
  }
`;
export const Stats = styled.dl`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 0;

  @media (max-width: 600px) {
    gap: 12px;
  }
`;
export const Status = styled.span<{$available: boolean}>`
  align-items: center;
  background: ${({$available}) => ($available ? '#a2e9c50c' : '#ffffff07')};
  border: 1px solid ${({$available}) => ($available ? '#a2e9c529' : '#ffffff20')};
  border-radius: 999px;
  color: ${({$available}) => ($available ? '#ace8cb' : '#bdc9db')};
  display: inline-flex;
  font-size: 11px;
  gap: 7px;
  line-height: 1.5;
  padding: 6px 10px;
`;
export const StatusDot = styled.span<{$available: boolean}>`
  background: ${({$available}) => ($available ? '#8fdfb8' : '#8e9cb2')};
  border-radius: 50%;
  height: 5px;
  width: 5px;
`;
export const Success = styled.p`
  color: #ace8cb;
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
  padding: 12px 24px;
`;
