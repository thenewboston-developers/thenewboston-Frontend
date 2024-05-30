import styled, {css} from 'styled-components';

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

export const Title = styled.span`
  font-weight: 600;
  margin-right: 10px;
`;
export const Dot = styled.span<{$marginLeft?: string}>`
  font-weight: 600;
  margin-left: ${({$marginLeft}) => $marginLeft || '10px'};
  margin-right: 5px;
`;
