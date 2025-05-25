import styled from 'styled-components';
import {colors, fonts} from 'styles';

export const Balance = styled.div`
  font-size: 14px;
  padding: 7px 4px;
`;

export const Container = styled.div<{$isActive: boolean}>`
  background: ${({$isActive}) => ($isActive ? `${colors.palette.blue[600]}` : 'transparent')};
  border-bottom: 1px solid ${colors.border};
  padding: 8px 12px;
  transition: background 0.3s ease;
  &:hover {
    background: ${colors.palette.blue[600]};
    cursor: pointer;
    text-decoration: none;
  }
`;

export const Domain = styled.div`
  color: ${colors.palette.darkGray['300']};
  font-size: 12px;
`;

export const Text = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0px 4px;
`;

export const Ticker = styled.div<{$isActive: boolean}>`
  color: ${({$isActive}) => ($isActive ? colors.palette.blue[700] : `${colors.black}`)};
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};
`;

export const Span = styled.span`
  font-weight: ${fonts.weight.semiBold};
  margin-left: 5px;
`;

export const Div = styled.div``;
