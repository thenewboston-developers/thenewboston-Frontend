import styled from 'styled-components';

import {cardStyle, colors, controlStyle, fonts} from 'styles';

export const Amount = styled.strong`
  color: #302b61;
  font-size: clamp(28px, 4vw, 40px);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.035em;
`;

export const Balance = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Card = styled.section`
  ${cardStyle};
  background: linear-gradient(135deg, #f6f4fd, #ffffff);
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 28px;
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
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
  gap: 8px;
`;

export const Form = styled.form`
  align-items: end;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

export const Heading = styled.h2`
  color: ${colors.primary};
  font-size: 24px;
  letter-spacing: -0.025em;
  margin: 0 0 10px;
`;

export const Input = styled.input`
  ${controlStyle};
  background: #ffffff;
  font: inherit;
  max-width: 100%;
  padding: 11px 14px;
  width: 220px;
`;

export const Statistics = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 24px 40px;
`;

export const Status = styled.span<{$available: boolean}>`
  background: ${({$available}) => ($available ? '#e3f1e8' : '#e9e8f2')};
  border-radius: 999px;
  color: ${({$available}) => ($available ? '#285d3d' : '#565270')};
  font-size: 13px;
  font-weight: 600;
  padding: 8px 12px;
`;
