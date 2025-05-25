import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Container = styled.div`
  margin: 20px 0px;
  position: relative;
`;
export const ImageStyle = styled.div`
  margin-top: 7px;
  position: absolute;
`;

export const SelectorButton = styled.button`
  background: transparent;
  border: 1px solid rgb(207, 217, 222);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  padding: 8px 16px;
  transition: all 0.1s;

  &:hover {
    background: ${colors.whiteHover};
  }
`;

export const Select = styled.select`
  border: none;
  width: 100%;
  border-bottom: 1px solid ${colors.black};
  padding: 10px;
  padding-left: 50px;
  text-indent: 45px;
  height: 26pt;
  &:focus {
    outline: none;
  }
`;

export const Img = styled.img`
  border-radius: 50%;
  height: 20px;
  weight: 20px;
`;
