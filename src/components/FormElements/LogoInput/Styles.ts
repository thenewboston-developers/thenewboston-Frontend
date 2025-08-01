import {Field as UField} from 'formik';
import styled from 'styled-components';

import UCurrencyLogo from 'components/CurrencyLogo';
import {colors, inputStyle} from 'styles';

export const CurrencyLogo = styled(UCurrencyLogo)`
  margin-left: 12px;
  position: absolute;
  right: 10px;
`;

export const ErrorMessage = styled.div`
  color: ${colors.palette.red['400']};
  font-size: 12px;
  margin-top: 6px;
`;

export const Field = styled(UField)`
  ${inputStyle};
  border: 1px solid ${({$error}) => ($error ? colors.palette.red['400'] : colors.border)};
  display: block;
  width: 260px;
  border-radius: 14px;
  padding: 21px 50px 21px 15px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const FieldWrapper = styled.div`
  align-items: center;
  display: flex;
  position: relative;
`;

export const Label = styled.div`
  font-size: 12px;
  margin-bottom: 8px;
`;

export const SecondaryContainer = styled.div``;
