import {ReactNode} from 'react';

import {SFC} from 'types';

import * as S from './Styles';

export interface FormFieldProps {
  children: ReactNode;
}

const FormField: SFC<FormFieldProps> = ({children, className}) => {
  return <S.Container className={className}>{children}</S.Container>;
};

export default FormField;
