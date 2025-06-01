import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Box = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 10px 0 15px 0;
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
  display: flex;
  justify-content: space-between;
  padding: 8px 5px 8px 14px;
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
  cursor: pointer;
  font-weight: ${fonts.weight.semiBold};

  &:hover {
    text-decoration: underline;
  }
`;
