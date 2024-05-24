import styled from 'styled-components';

import {colors} from 'styles';
export const Menu = styled.div`
  background: ${colors.white};
  border-radius: 12px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  padding: 6px 0;
  position: fixed;
`;

export const Option = styled.div<{disabled?: boolean}>`
  align-items: center;
  display: flex;
  padding: 8px 10px 10px 0px;
  transition: background 0.1s;
  white-space: nowrap;
  border-bottom: 1px solid #ccc;
  margin: 10px;
  cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({disabled}) => (disabled ? '#a3acb9' : 'inherit')};

  &:hover {
    background: ${({disabled}) => (disabled ? '#f5f5f5' : '')};
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
export const Button = styled.button`
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  background-color: #fff;
  height: 32px;
  padding: 0px 18px 0px 15px;
  color: #b1b1b1;
  cursor: pointer;
  &:hover {
    cursor: pointer;
    color: #84a0c1;
  }
  &:active {
    cursor: pointer;
    color: #84a0c1;
    border-color: #84a0c1;
  }
`;
