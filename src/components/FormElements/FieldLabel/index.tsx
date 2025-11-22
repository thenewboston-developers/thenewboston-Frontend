import {SFC} from 'types';

import * as S from './Styles';

export interface FieldLabelProps {
  htmlFor?: string;
  isRequired?: boolean;
  text: string;
}

const FieldLabel: SFC<FieldLabelProps> = ({className, htmlFor, isRequired = false, text}) => {
  return (
    <S.Label className={className} htmlFor={htmlFor}>
      {text}
      {isRequired && <S.RequiredIndicator>*</S.RequiredIndicator>}
    </S.Label>
  );
};

export default FieldLabel;
