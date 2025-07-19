import {ReactNode} from 'react';
import {Field} from 'formik';

import {SFC} from 'types';

import * as S from './Styles';

interface CheckboxProps {
  errors?: {[field: string]: string};
  label: ReactNode;
  name: string;
  touched?: {[field: string]: boolean};
}

const Checkbox: SFC<CheckboxProps> = ({className, errors = {}, label, name, touched = {}}) => {
  return (
    <S.Container className={className}>
      <S.CheckboxContainer>
        <Field as={S.StyledCheckbox} id={name} name={name} type="checkbox" />
        <S.Label htmlFor={name}>{label}</S.Label>
      </S.CheckboxContainer>
      {errors[name] && touched[name] ? <S.ErrorMessage>{errors[name]}</S.ErrorMessage> : null}
    </S.Container>
  );
};

export default Checkbox;
