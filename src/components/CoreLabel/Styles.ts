import styled from 'styled-components';

import {fonts} from 'styles';

export const Container = styled.div`
  display: flex;
`;

export const Domain = styled.div`
  font-size: 12px;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

export const Ticker = styled.div`
  font-weight: ${fonts.weight.semiBold};
`;
