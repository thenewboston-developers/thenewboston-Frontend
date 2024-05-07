import styled, {css} from 'styled-components';

import {colors, radioCardStyle} from 'styles';

export const IMG_HEIGHT = 24;

export const Container = styled.div<{$isActive: boolean}>`
  ${radioCardStyle};
  justify-content: flex-start;
  gap: 4px;
  border-radius: 16px;
  background-color: ${(props) => (props.$isActive ? `${colors.white}` : `${colors.palette.gray[200]}`)};
`;

export const Img = styled.img`
  border-radius: 50%;
  height: ${`${IMG_HEIGHT}px`};
  margin-right: 12px;
  width: ${`${IMG_HEIGHT}px`};

  &:hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.16);
    cursor: pointer;
  }
`;

export const ImageContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 400;
`;

export const Radio = styled.div`
  display: block;
  margin: 0 0 0 auto;
  border-radius: 50%;
`;

export const RadioInput = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #6287b1;
`;
