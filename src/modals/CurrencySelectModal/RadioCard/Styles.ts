import styled from 'styled-components';

import {colors, radioCardStyle} from 'styles';

export const IMG_HEIGHT = 24;

export const Container = styled.div<{$isActive: boolean}>`
  ${radioCardStyle};
  background-color: ${(props) => (props.$isActive ? `${colors.white}` : `#f4f4f4`)};
  border-radius: 16px;
  gap: 4px;
  justify-content: flex-start;
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
  border-radius: 50%;
  display: block;
  margin: 0 0 0 auto;
`;

export const RadioInput = styled.input`
  accent-color: #6287b1;
  height: 16px;
  width: 16px;
`;
