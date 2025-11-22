import {ChangeEvent} from 'react';

import {SFC} from 'types';

import * as S from './Styles';

export interface TextareaProps {
  errors: {[field: string]: string};
  isRequired?: boolean;
  label: string;
  maxLength?: number;
  name: string;
  onChange?(e: ChangeEvent<HTMLTextAreaElement>): void;
  placeholder?: string;
  showCharacterCount?: boolean;
  touched: {[field: string]: boolean};
}

const Textarea: SFC<TextareaProps> = ({
  className,
  errors,
  isRequired = false,
  label,
  maxLength,
  name,
  onChange,
  placeholder = '',
  showCharacterCount = false,
  touched,
}) => {
  const isError = errors[name] && touched[name];

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
        $error={isError}
        className={className}
        component="textarea"
        maxLength={maxLength}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
      <S.SecondaryContainer>{isError && <S.ErrorMessage>{errors[name]}</S.ErrorMessage>}</S.SecondaryContainer>
    </>
  );
};

export default Textarea;
