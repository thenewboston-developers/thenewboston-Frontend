import styled from 'styled-components';
import {colors} from 'styles';

const USER_IMAGE_SIZE = 80;
export const Img = styled.img<{$size: string}>`
  height: ${({$size}) => $size};
  width: ${({$size}) => $size};
`;

export const ImgWrapper = styled.div`
  align-items: center;
  background-color: ${colors.white};
  border-radius: 16px;
  display: flex;
  height: ${USER_IMAGE_SIZE}px;
  justify-content: center;
  padding: 8px;
  width: ${USER_IMAGE_SIZE}px;
`;

export const Text = styled.div`
  font-weight: 400;
  margin-top: 10px;
  opacity: 40%;
  text-align: center;
`;
