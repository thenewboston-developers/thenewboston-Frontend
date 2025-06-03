import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div`
  margin: 20px 0;
  position: relative;
`;

export const ImageContainer = styled.div`
  margin-top: 7px;
  position: absolute;
`;

export const Select = styled.select`
  border: none;
  border-bottom: 1px solid ${colors.black};
  height: 26pt;
  padding: 10px 10px 10px 50px;
  text-indent: 45px;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export const Image = styled.img`
  border-radius: 50%;
  height: 20px;
  width: 20px;
`;
