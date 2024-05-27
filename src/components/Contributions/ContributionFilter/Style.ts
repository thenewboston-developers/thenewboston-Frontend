import styled from 'styled-components';

import {colors} from 'styles';
export const Menu = styled.div`
  background: ${colors.white};
  border-radius: 12px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  padding: 0 0;
  position: fixed;
`;

export const Option = styled.div<{disabled?: boolean}>`
  align-items: center;
  display: flex;
  padding: 5px 0px 5px 0px;
  transition: background 0.1s;
  white-space: nowrap;
  border-bottom: 1px solid #f1f1f1;
  margin: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({disabled}) => (disabled ? '#7d858f' : 'inherit')};
  &:hover {
    background: ${({disabled}) => (disabled ? '#f5f5f5' : '')};
  }

  &:first-child {
    border-bottom: none;
    font-weight: bold;
  }

  &:last-child {
    border-bottom: none;
  }
`;
export const RadioOption = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  input[type='radio'] {
    margin-right: 8px;
    cursor: pointer;
    &:checked {
      accent-color: red;
    }
  }
`;
export const Button = styled.button<{isActive: boolean}>`
  align-items: center;
  border: none;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  background-color: #fff;
  height: 32px;
  padding: 0px 18px 0px 15px;
  color: #b1b1b1;
  cursor: pointer;
  ${({isActive}) =>
    isActive &&
    `
      color: #84a0c1;
      border: 1px solid #84a0c1;
  `}
  &:hover {
    cursor: pointer;
    color: #84a0c1;
  }
  &:active {
    cursor: pointer;
    color: #84a0c1;
    border: 1px solid #84a0c1;
  }
`;
export const Span = styled.span`
  margin-top: -11px;
`;
