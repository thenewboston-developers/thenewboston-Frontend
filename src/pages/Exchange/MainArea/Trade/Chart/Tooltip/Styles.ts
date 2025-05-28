import styled, {keyframes} from 'styled-components';

import {colors} from 'styles';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  animation: ${fadeIn} 0.2s ease-out;
  background: rgba(15, 20, 25, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
`;

export const Date = styled.div`
  color: ${colors.palette.gray['400']};
  font-size: 12px;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

export const Label = styled.span`
  color: ${colors.palette.gray['300']};
  font-size: 12px;
`;

export const PriceRow = styled.div`
  align-items: baseline;
  display: flex;
  gap: 8px;
`;

export const Value = styled.span`
  color: ${colors.white};
  font-size: 16px;
  font-weight: 600;
`;
