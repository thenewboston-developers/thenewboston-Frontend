import {Field as UField} from 'formik';
import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div`
  align-items: center;
  display: flex;
`;

export const ErrorMessage = styled.div`
  color: ${colors.palette.red['400']};
  font-size: 10px;
  margin-top: 6px;
`;

export const Field = styled(UField)`
  cursor: pointer;
`;

export const Label = styled.div`
  font-size: 13px;
  margin-left: 6px;
`;

export const SecondaryContainer = styled.div`
  margin-bottom: 24px;
`;
