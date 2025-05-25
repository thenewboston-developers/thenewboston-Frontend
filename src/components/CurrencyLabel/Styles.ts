import styled from 'styled-components';

import {fonts} from 'styles';

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
`;
