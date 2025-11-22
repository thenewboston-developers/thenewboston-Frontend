import {Field as UField} from 'formik';
import styled from 'styled-components';

import {colors, fonts, formLabel, inputStyle} from 'styles';

export const CharacterCounter = styled.span<{$isOverLimit?: boolean}>`
  color: ${({$isOverLimit}) => ($isOverLimit ? colors.palette.red[600] : colors.secondary)};
  font-size: 12px;
  font-weight: ${fonts.weight.medium};
`;

export const ErrorMessage = styled.div`
  color: ${colors.palette.red[400]};
  font-size: 12px;
  margin-top: 6px;
`;

export const Field = styled(UField)`
  ${inputStyle};
  border: 1px solid ${({$error}) => ($error ? colors.palette.red[400] : colors.border)};
  border-radius: 12px;
  display: block;
  width: 100%;
`;

export const Label = styled.div`
  ${formLabel};
`;

export const LabelRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const RequiredIndicator = styled.span`
  color: ${colors.palette.red[600]};
  margin-left: 2px;
`;

export const SecondaryContainer = styled.div``;
