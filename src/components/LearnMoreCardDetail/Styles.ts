import styled from 'styled-components';

import {fonts} from 'styles';

export const Container = styled.div`
  width: 100%;
  padding: 20px;
`;

export const ImageBox = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 15px 0px;
  width: 100%;
`;

export const LearnMoreCardContent = styled.div`
  font-size: 14px;
  margin: 10px 0px;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: bold;
`;

export const LearnMoreCardTitle = styled.div`
  font-weight: ${fonts.weight.bold};
`;

export const Divider = styled.div`
  height: 1vh;
`;

export const Img = styled.img<{width?: string}>`
  object-fit: cover;
  width: ${({width}) => width || '50px'};
`;

export const LearnMoreLogo = styled.div`
  display: flex;
  justify-content: center;
`;
