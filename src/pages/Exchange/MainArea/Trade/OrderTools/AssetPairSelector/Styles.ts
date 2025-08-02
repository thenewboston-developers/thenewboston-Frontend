import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Container = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  cursor: pointer;
  padding: 12px 16px;
  position: relative;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.palette.gray[50]};
  }
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  height: 40px;
  position: relative;
`;

export const Image = styled.img`
  border-radius: 50%;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
  height: 32px;
  width: 32px;
`;

export const ImageContainer = styled.div`
  align-items: center;
  display: flex;
  pointer-events: none;
`;

export const Select = styled.select`
  appearance: none;
  background: transparent;
  border: none;
  cursor: pointer;
  height: 100%;
  left: 0;
  opacity: 0;
  padding: 0 16px 0 56px;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;

  &:focus {
    outline: none;
  }
`;

export const Ticker = styled.div`
  font-size: 20px;
  font-weight: ${fonts.weight.semiBold};
  margin-left: 16px;
  pointer-events: none;
`;
