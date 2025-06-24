import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const NavigationButton = styled.button`
  align-items: center;
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  color: ${colors.black};
  cursor: pointer;
  display: flex;
  height: 36px;
  justify-content: center;
  transition: all 0.15s ease-in-out;
  width: 36px;

  &:hover:not(:disabled) {
    background: ${colors.whiteHover};
    border-color: ${colors.borderDarker};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
