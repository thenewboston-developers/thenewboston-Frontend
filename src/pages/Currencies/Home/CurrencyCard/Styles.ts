import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Box = styled.div`
  align-items: center;
  display: flex;
  margin: 10px 0 15px;
  width: 100%;
`;

export const BoxLeft = styled.div`
  align-items: center;
  display: flex;
`;

export const Container = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 8px 5px 8px 14px;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const Domain = styled.div`
  font-size: 12px;
`;

export const DomainRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

export const InternalBadge = styled.span`
  background: ${colors.palette.blue[100]};
  border-radius: 4px;
  color: ${colors.palette.blue[700]};
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
  padding: 2px 8px;
`;

export const LabelContainer = styled.div`
  width: 100%;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

export const Ticker = styled.div`
  font-weight: ${fonts.weight.semiBold};
`;
