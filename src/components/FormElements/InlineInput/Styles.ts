import {Field as UField} from 'formik';
import styled from 'styled-components';

import {colors, inputStyle} from 'styles';

export const Field = styled(UField)`
  ${inputStyle};
  border: 1px solid ${({$error}) => ($error ? colors.palette.red['400'] : colors.border)};
  width: ${({width}) => (width ? `${width}px` : '260px')};
`;
