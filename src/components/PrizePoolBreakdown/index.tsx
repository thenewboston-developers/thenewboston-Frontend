import {SFC} from 'types';

import * as S from './Styles';

export interface PrizePoolBreakdownProps {
  initial: number;
  spent: number;
  ticker: string;
  total: number;
}

const PrizePoolBreakdown: SFC<PrizePoolBreakdownProps> = ({className, initial, spent, ticker, total}) => {
  return (
    <S.Container className={className}>
      <S.Rows>
        <S.Row>
          <span>Initial prize pool</span>
          <S.Text>
            {initial.toLocaleString()} {ticker}
          </S.Text>
        </S.Row>
        <S.Row>
          <span>Total spent</span>
          <S.Text>
            {spent.toLocaleString()} {ticker}
          </S.Text>
        </S.Row>
      </S.Rows>
      <S.TotalRow>
        <span>Total prize pool</span>
        <S.Text>
          {total.toLocaleString()} {ticker}
        </S.Text>
      </S.TotalRow>
    </S.Container>
  );
};

export default PrizePoolBreakdown;
