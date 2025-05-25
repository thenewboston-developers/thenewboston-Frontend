import {SFC} from 'types';

import * as S from './Styles';

export interface InlineInputProps {
  errors: {[field: string]: string};
  name: string;
  placeholder?: string;
  touched: {[field: string]: boolean};
  type?: 'text' | 'number' | 'password';
  width?: number;
}

const InlineInput: SFC<InlineInputProps> = ({
  className,
  errors,
  name,
  placeholder = '',
  touched,
  type = 'text',
  width,
}) => {
  return (
    <S.Field
      $error={errors[name] && touched[name]}
      className={className}
      name={name}
      placeholder={placeholder}
      type={type}
      width={width}
    />
  );
};

export default InlineInput;
