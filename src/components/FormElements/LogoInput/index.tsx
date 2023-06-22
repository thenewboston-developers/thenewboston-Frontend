import {SFC} from 'types';
import * as S from './Styles';

export interface LogoInputProps {
  errors: {[field: string]: string};
  label: string;
  logo: string;
  name: string;
  touched: {[field: string]: boolean};
}

const LogoInput: SFC<LogoInputProps> = ({className, errors, label, logo, name, touched}) => {
  return (
    <>
      <S.Label>{label}</S.Label>
      <S.FieldWrapper>
        <S.Field $error={errors[name] && touched[name]} className={className} name={name} type="number" />
        <S.CoreLogo logo={logo} />
      </S.FieldWrapper>
      <S.SecondaryContainer>
        {errors[name] && touched[name] ? <S.ErrorMessage>{errors[name]}</S.ErrorMessage> : null}
      </S.SecondaryContainer>
    </>
  );
};

export default LogoInput;
