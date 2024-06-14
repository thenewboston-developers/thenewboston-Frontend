import styled, {css} from 'styled-components';
import {colors, fonts} from 'styles';

const selectedMixin = css`
  background: rgba(52, 195, 143, 0.1);
  border: 1px solid rgba(52, 195, 143, 0.5);

  &:hover {
    background: rgba(52, 195, 143, 0.1);
  }
`;

export const Container = styled.div<{$isSelected: boolean}>`
  border-radius: 4px;
  border: 1px solid #e3e8ee;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 8px 2px 8px 10px;
  transition: all 0.15s;
  &:hover {
    background: #f8f8f8;
    cursor: pointer;
  }

  ${({$isSelected}) => $isSelected && selectedMixin}
`;

export const Text = styled.div`
  color: ${colors.black};
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};
  margin-right: 10px;
`;

export const Div = styled.div``;
