import {ChangeEvent} from 'react';

import {SFC} from 'types';
import * as S from './Styles';

export interface TextareaProps {
  errors: {[field: string]: string};
  label: string;
  name: string;
  placeholder?: string;
  onChange?(e: ChangeEvent<HTMLTextAreaElement>): void;
  touched: {[field: string]: boolean};
}

const Textarea: SFC<TextareaProps> = ({className, errors, label, name, onChange, touched, placeholder = ''}) => {
  const isError = errors[name] && touched[name];

  return (
    <>
      <S.Label>{label}</S.Label>
      <S.Field
        $error={isError}
        className={className}
        component="textarea"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
      <S.SecondaryContainer>{isError && <S.ErrorMessage>{errors[name]}</S.ErrorMessage>}</S.SecondaryContainer>
    </>
  );
};

export default Textarea;
