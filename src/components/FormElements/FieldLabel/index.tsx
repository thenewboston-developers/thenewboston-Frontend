import {SFC} from 'types';

import * as S from './Styles';

export interface FieldLabelProps {
  isRequired?: boolean;
  text: string;
}

const FieldLabel: SFC<FieldLabelProps> = ({className, isRequired = false, text}) => {
  return (
    <S.Container className={className}>
      {text}
      {isRequired && <S.RequiredIndicator>*</S.RequiredIndicator>}
    </S.Container>
  );
};

export default FieldLabel;
