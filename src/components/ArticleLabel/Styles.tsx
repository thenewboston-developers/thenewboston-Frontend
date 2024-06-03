import styled from 'styled-components';

import {fonts} from 'styles';

export const Container = styled.div`
  width: 100%;
  padding: 15px;
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
  flex-direction: column;
`;
export const Domain = styled.div`
  font-size: 14px;
  margin: 10px 0px;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1vw;
`;

export const Ticker = styled.div`
  font-weight: ${fonts.weight.semiBold};
`;

export const Divider = styled.div`
  height: 1vh;
`;

export const Img = styled.img<{width?: string}>`
  object-fit: cover;
  width: ${({width}) => width || '5vw'};
  border-radius: 50%;
`;

export const ArticleLogo = styled.div`
  display: flex;
  justify-content: center;
`;
