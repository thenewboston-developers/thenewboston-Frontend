import styled from 'styled-components';
import MdiIcon from '@mdi/react';
import {TOOLBAR_HEIGHT} from 'styles/constants';
import {breakpoints, colors} from 'styles';

export const CartProductCount = styled.div<{$isActive: boolean}>`
  align-items: center;
  background: ${({$isActive}) => ($isActive ? `${colors.black}` : `${colors.palette.red[500]}`)};
  border-radius: 50%;
  color: ${colors.white};
  display: flex;
  font-size: 10px;
  font-weight: 500;
  height: 20px;
  justify-content: center;
  position: absolute;
  right: -5px;
  top: -5px;
  width: 20px;
`;

export const Center = styled.div`
  align-items: center;
  display: flex;
`;

export const Container = styled.div`
  background: ${colors.white};
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  display: flex;
  height: ${`${TOOLBAR_HEIGHT}px`};
  justify-content: space-between;
  padding: 0 16px;
  @media (max-width: ${breakpoints.mini}) {
    padding: 0 5px;
  }
`;

export const Icon = styled(MdiIcon)<{$isActive: boolean}>`
  color: ${({$isActive}) => ($isActive ? `${colors.white}` : `${colors.spanishGray}`)};
`;

export const IconContainer = styled.div<{$isActive: boolean}>`
  background: ${({$isActive}) => ($isActive ? `${colors.palette.red[500]}` : '#f4f5f6')};
  border-radius: 8px;
  display: flex;
  padding: 9px;
  position: relative;

  &:hover {
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
  }
`;

export const Left = styled.div`
  align-items: center;
  display: flex;
`;

export const Right = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
`;
export const Wrapper = styled.div`
  display: flex;
  gap: 5px;
`;
