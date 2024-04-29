import styled from 'styled-components';

import UButton from 'components/Button';
import {breakpoints} from 'styles';

export const Button = styled(UButton)`
  margin-top: 16px;
  width: 100%;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoints.tablet}) {
    display: block;
  }
`;

export const Img = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;

  @media (min-width: ${breakpoints.tablet}) {
    position: absolute;
  }
`;

export const ImgWrapper = styled.div`
  border-radius: 50%;
  height: 160px;
  overflow: hidden;
  width: 160px;

  @media (min-width: ${breakpoints.tablet}) {
    padding-bottom: 100%;
    position: relative;
    width: 260px;
  }
`;

export const TNBLogo = styled.img`
  border-radius: 50%;
  width: 15px;
  margin: 0px 3px 0px 3px;
`;

export const Stats = styled.div`
  align-items: center;
  display: flex;
  justify-content: start;
  margin-top: 10px;
  padding: 5px 0;

  & > b {
    margin: 0 5px;
  }
`;

export const Username = styled.h1`
  margin-top: 16px;
`;

export const WalletBalance = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;
