import styled from 'styled-components';

import {colors} from 'styles';

export const CheckboxContainer = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 8px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ErrorMessage = styled.div`
  color: ${colors.palette.red[500]};
  font-size: 12px;
  margin-top: 4px;
`;

export const Label = styled.label`
  color: ${colors.palette.gray[800]};
  cursor: pointer;
  font-size: 14px;
  line-height: 1.4;
  user-select: none;
`;

export const StyledCheckbox = styled.input`
  cursor: pointer;
  flex-shrink: 0;
  height: 16px;
  margin-top: 2px;
  width: 16px;
`;
