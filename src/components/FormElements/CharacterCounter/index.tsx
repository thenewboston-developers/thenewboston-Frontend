import {SFC} from 'types';

import * as S from './Styles';

export interface CharacterCounterProps {
  currentLength: number;
  maxLength: number;
}

const CharacterCounter: SFC<CharacterCounterProps> = ({className, currentLength, maxLength}) => {
  const isOverLimit = currentLength > maxLength;

  return (
    <S.Counter $isOverLimit={isOverLimit} className={className}>
      {currentLength}/{maxLength}
    </S.Counter>
  );
};

export default CharacterCounter;
