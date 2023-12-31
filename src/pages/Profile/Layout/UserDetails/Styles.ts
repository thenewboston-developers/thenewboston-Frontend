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

export const Username = styled.h1`
  margin-top: 16px;
`;
