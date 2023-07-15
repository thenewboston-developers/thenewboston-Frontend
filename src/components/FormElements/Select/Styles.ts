import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div``;

export const ErrorMessage = styled.div`
  color: ${colors.palette.red['400']};
  font-size: 10px;
  margin-top: 6px;
`;

export const Label = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 6px;
`;

export const Option = styled.option``;

export const OptionEmptyState = styled.div`
  padding: 16px;
`;

export const SecondaryContainer = styled.div`
  margin-bottom: 24px;
`;

export const Select = styled.select<{$error: boolean | string}>`
  appearance: none;
  border-radius: 4px;
  border: 1px solid ${({$error}) => ($error ? colors.palette.red['400'] : '#ebebeb')};
  display: block;
  height: 40px;
  outline: 0;
  padding: 0 12px;
  width: 100%;

  &:focus {
    border: 1px solid ${({$error}) => ($error ? colors.palette.red['400'] : colors.palette.blue['200'])};
  }

  &:hover {
    cursor: pointer;
  }

  &:hover:not(:focus) {
    border: 1px solid ${({$error}) => ($error ? colors.palette.red['400'] : '#cbd0d9')};
  }
`;
