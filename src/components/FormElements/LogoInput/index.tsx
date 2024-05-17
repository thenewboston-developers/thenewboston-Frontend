import {ChangeEvent} from 'react';

import {SFC} from 'types';
import * as S from './Styles';

export interface LogoInputProps {
  errors: {[field: string]: string};
  label: string;
  logo: string | null;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  name: string;
  touched: {[field: string]: boolean};
}

const LogoInput: SFC<LogoInputProps> = ({className, errors, label, logo, name, onChange, touched}) => {
  return (
    <>
      <S.Label>{label}</S.Label>
      <S.FieldWrapper>
        <S.Field
          $error={errors[name] && touched[name]}
          className={className}
          name={name}
          onChange={onChange}
          type="number"
        />
        <S.CoreLogo logo={logo} width="28px" />
      </S.FieldWrapper>
      <S.SecondaryContainer>
        {errors[name] && touched[name] ? <S.ErrorMessage>{errors[name]}</S.ErrorMessage> : null}
      </S.SecondaryContainer>
    </>
  );
};

export default LogoInput;
