import {Link} from 'react-router-dom';
import styled from 'styled-components';

export const CreateAccount = styled(Link)`
  align-self: flex-start;
  background: #ddf39c;
  border-radius: 8px;
  color: #152e27;
  font-size: 14px;
  font-weight: 700;
  margin: 8px 0;
  padding: 10px 16px;
  text-decoration: none;

  &:focus-visible {
    outline: 3px solid #8ab8f7;
    outline-offset: 3px;
  }

  &:hover {
    background: #e8ffad;
    color: #152e27;
    text-decoration: none;
  }
`;

export const FinePrint = styled.span`
  font-size: 12px;
  opacity: 0.8;
`;

export const Notice = styled.div<{$guest?: boolean; $paid?: boolean}>`
  background: ${({$guest, $paid}) => {
    if ($guest) return 'linear-gradient(135deg, #172944, #243c4c)';
    return $paid ? '#edf6ef' : '#f3f5f8';
  }};
  border: 1px solid ${({$paid}) => ($paid ? '#bbd8c3' : '#dce2eb')};
  border-radius: 12px;
  color: ${({$guest, $paid}) => {
    if ($guest) return '#f5f9ff';
    return $paid ? '#285438' : '#465063';
  }};
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 6px;
  line-height: 1.6;
  margin: 14px 0;
  padding: 16px;
`;

export const RewardAmount = styled.span`
  color: #ddf39c;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.2;
`;
