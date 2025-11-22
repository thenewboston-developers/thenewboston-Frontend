import {ChangeEvent} from 'react';

import {SFC} from 'types';

import * as S from './Styles';

export interface InputProps {
  errors: {[field: string]: string};
  isRequired?: boolean;
  label: string;
  maxLength?: number;
  name: string;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  showCharacterCount?: boolean;
  touched: {[field: string]: boolean};
  type?: 'text' | 'number' | 'password';
}

const Input: SFC<InputProps> = ({
  className,
  errors,
  isRequired = false,
  label,
  maxLength,
  name,
  onChange,
  showCharacterCount = false,
  touched,
  type = 'text',
}) => {
  return (
    <>
      <S.LabelRow>
        <S.Label>
          {label}
          {isRequired && <S.RequiredIndicator>*</S.RequiredIndicator>}
        </S.Label>
        {showCharacterCount && maxLength && (
          <S.CharacterCounter>{/* Character count handled by field value */}</S.CharacterCounter>
        )}
      </S.LabelRow>
      <S.Field
        $error={errors[name] && touched[name]}
        className={className}
        maxLength={maxLength}
        name={name}
        onChange={onChange}
        type={type}
      />
      <S.SecondaryContainer>
        {errors[name] && touched[name] ? <S.ErrorMessage>{errors[name]}</S.ErrorMessage> : null}
      </S.SecondaryContainer>
    </>
  );
};

export default Input;
