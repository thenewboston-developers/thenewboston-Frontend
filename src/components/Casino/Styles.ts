import styled from 'styled-components';

import {colors} from 'styles';

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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
