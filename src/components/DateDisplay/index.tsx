import {SFC} from 'types';
import {shortDate} from 'utils/dates';

import * as S from './Styles';

interface DateDisplayProps {
  createdDate: Date | number | string;
  modifiedDate: Date | number | string;
}

const DateDisplay: SFC<DateDisplayProps> = ({className, createdDate, modifiedDate}) => {
  return (
    <S.Container className={className}>
      <S.DateRow>
        <S.DateLabel>Created:</S.DateLabel>
        <S.DateValue>{shortDate(createdDate, false)}</S.DateValue>
      </S.DateRow>
      <S.DateRow>
        <S.DateLabel>Modified:</S.DateLabel>
        <S.DateValue>{shortDate(modifiedDate, false)}</S.DateValue>
      </S.DateRow>
    </S.Container>
  );
};

export default DateDisplay;
