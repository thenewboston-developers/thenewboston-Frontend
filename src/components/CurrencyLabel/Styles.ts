import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Container = styled.div`
  width: 100%;
`;

export const Box = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 10px 0px 15px 0px;
  width: 100%;
`;
export const BoxLeft = styled.div`
  align-items: center;
  display: flex;
`;
export const Domain = styled.div`
  font-size: 12px;
  margin: 10px 0px;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

export const Ticker = styled.div`
  font-weight: ${fonts.weight.semiBold};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const DomainRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
`;

export const InternalBadge = styled.span`
  background: ${colors.palette.blue[100]};
  color: ${colors.palette.blue[700]};
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
`;
