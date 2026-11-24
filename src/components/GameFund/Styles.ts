import styled from 'styled-components';

import {colors, controlStyle, fonts} from 'styles';

export const Amount = styled.strong`
  color: #ffe1a0;
  display: block;
  font-size: clamp(38px, 4.4vw, 60px);
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.05em;
  line-height: 1.15;
  margin: 8px 0;
  overflow-wrap: anywhere;

  span {
    color: #c3cce1;
    font-size: 20px;
    font-weight: ${fonts.weight.medium};
    letter-spacing: 0;
  }
`;
export const BalanceLabel = styled.p`
  color: #c3cce1;
  font-size: 13px;
  margin: 22px 0 0;
`;
export const Card = styled.section`
  background: #ffffff;
  border: 1px solid #e1e4ec;
  border-radius: 24px;
  box-shadow: 0 8px 28px #17223c08;
  overflow: hidden;
`;
export const Coin = styled.span`
  align-items: center;
  background: linear-gradient(135deg, #fff1c8, #efb749 70%, #bd7b21);
  border: 3px solid #f9d47f;
  border-radius: 50%;
  box-shadow:
    4px 5px 0 #ad752d,
    0 6px 28px #ffc86035;
  color: #95601a;
  display: flex;
  flex-shrink: 0;
  font-size: 27px;
  font-weight: 700;
  height: 48px;
  justify-content: center;
  transform: rotate(-14deg);
  width: 48px;
`;
export const Contribution = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  padding: 24px 32px;

  @media (max-width: 600px) {
    padding: 24px;
  }
`;
export const ContributionTitle = styled.h3`
  color: ${colors.primary};
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
  margin: 0 0 6px;
`;
export const Description = styled.p`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
`;
export const Error = styled.p`
  color: #a03030;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  padding: 12px 24px;
`;
export const Eyebrow = styled.p`
  color: #adbee1;
  font-size: 10px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.14em;
  margin: 0 0 14px;
`;
export const Field = styled.label`
  color: ${colors.secondary};
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: ${fonts.weight.medium};
  gap: 7px;
`;
export const Flow = styled.div`
  align-items: center;
  display: flex;
  margin-top: 24px;
  max-width: 400px;
`;
export const FlowConnector = styled.div`
  background: linear-gradient(90deg, #52678e, #8195b5);
  flex: 1;
  height: 1px;
  margin: 0 12px;
  min-width: 8px;
`;
export const FlowStep = styled.div`
  align-items: center;
  color: #c3cce1;
  display: flex;
  flex-direction: column;
  font-size: 11px;
  gap: 9px;
  line-height: 1.5;
  text-align: center;

  strong {
    color: #ffffff;
    font-size: 12px;
    font-weight: ${fonts.weight.semiBold};
  }
`;
export const Form = styled.form`
  align-items: end;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;
export const FundedWins = styled.p`
  color: #ffffff;
  font-size: 15px;
  font-weight: ${fonts.weight.medium};
  margin: 0;
`;
export const GuestActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const Heading = styled.h2`
  color: ${colors.primary};
  font-size: 28px;
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0 0 12px;
`;
export const Hero = styled.div`
  background:
    radial-gradient(ellipse at 100% 0%, #304f67 0%, transparent 55%),
    linear-gradient(120deg, #182337, #172238 65%, #1f3447);
  display: grid;
  gap: 32px;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  padding: 32px;

  ${Heading} {
    color: #ffffff;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 600px) {
    gap: 24px;
    padding: 24px;
  }
`;
export const HeroDescription = styled.p`
  color: #c0cce0;
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
  max-width: 460px;
`;
export const Input = styled.input`
  ${controlStyle};
  background: #ffffff;
  font: inherit;
  font-size: 15px;
  max-width: 100%;
  padding: 10px 58px 10px 14px;
  width: 180px;
`;
export const InputUnit = styled.span`
  color: #657085;
  font-size: 12px;
  pointer-events: none;
  position: absolute;
  right: 28px;
  top: 13px;
`;
export const InputWrapper = styled.span`
  position: relative;
`;
export const Overview = styled.div`
  align-self: center;
`;
export const PaidTotal = styled.span`
  color: #b9c6de;
  font-size: 12px;
  line-height: 1.5;
`;
export const Pool = styled.div`
  align-self: center;
  background: #ffffff08;
  border: 1px solid #ffffff26;
  border-radius: 18px;
  box-shadow: inset 0 1px 0 #ffffff0a;
  min-width: 0;
  padding: 24px;
`;
export const PoolFooter = styled.div`
  align-items: center;
  border-top: 1px solid #ffffff20;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  margin-top: 22px;
  padding-top: 16px;
`;
export const PoolHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;
export const PoolLabel = styled.h3`
  color: #ffffff;
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
  margin: 0;
`;
export const RefreshButton = styled.button`
  background: transparent;
  border: 1px solid #ffffff60;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  margin-top: 14px;
  padding: 9px 12px;

  &:focus-visible {
    outline: 2px solid #ffe1a0;
    outline-offset: 3px;
  }
`;
export const RewardDetails = styled.details`
  border-top: 1px solid #eef0f4;
  padding: 14px 32px;

  summary {
    color: #687184;
    cursor: pointer;
    font-size: 13px;
    width: fit-content;
  }

  summary:focus-visible {
    outline: 2px solid #475f90;
    outline-offset: 4px;
  }

  &[open] summary {
    margin-bottom: 10px;
  }

  @media (max-width: 600px) {
    padding: 14px 24px;
  }
`;
export const Status = styled.span<{$available: boolean}>`
  background: ${({$available}) => ($available ? '#79d6af1a' : '#ffffff14')};
  border: 1px solid ${({$available}) => ($available ? '#79d6af30' : '#ffffff20')};
  border-radius: 999px;
  color: ${({$available}) => ($available ? '#a8edcc' : '#d0d9eb')};
  font-size: 11px;
  font-weight: 600;
  padding: 6px 9px;
`;

export const StepIcon = styled.span`
  align-items: center;
  background: #ffffff0c;
  border: 1px solid #ffffff24;
  border-radius: 12px;
  color: #e8cf97;
  display: flex;
  height: 44px;
  justify-content: center;
  width: 44px;
`;
