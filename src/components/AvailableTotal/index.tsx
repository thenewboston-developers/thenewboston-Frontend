import {SFC} from 'types';
import * as S from './Styles';

export interface AvailableTotalProps {
  available: number;
  availableTicker: string;
  isTotalValid: boolean;
  total: number;
  totalTicker: string;
}

const AvailableTotal: SFC<AvailableTotalProps> = ({
  available,
  availableTicker,
  className,
  isTotalValid,
  total,
  totalTicker,
}) => {
  return (
    <S.Container className={className}>
      <S.AvailableRow>
        <span>Available</span>
        <span>
          {available.toLocaleString()} {availableTicker}
        </span>
      </S.AvailableRow>
      <S.TotalRow $isTotalValid={isTotalValid}>
        <span>Total</span>
        <span>
          {total.toLocaleString()} {totalTicker}
        </span>
      </S.TotalRow>
    </S.Container>
  );
};

export default AvailableTotal;
