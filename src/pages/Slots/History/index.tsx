import {CasinoBet} from 'types/casino';

import * as P from '../Panel';
import {SlotSymbol} from '../Symbols';
import {describeBet, receiptLine, signOf, winTier} from '../utils';

import * as S from './Styles';

interface HistoryProps {
  bets: CasinoBet[];
  isAuthenticated: boolean;
  onSelect(bet: CasinoBet): void;
  selectedId?: string;
}

const time = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleTimeString(undefined, {hour: 'numeric', minute: '2-digit'});
};

const History = ({bets, isAuthenticated, onSelect, selectedId}: HistoryProps) => (
  <P.Card aria-labelledby="slots-history-heading">
    <P.CardHeader>
      <P.CardTitle id="slots-history-heading">Recent spins</P.CardTitle>
      {!!bets.length && <P.Badge>Last {Math.min(bets.length, 10)}</P.Badge>}
    </P.CardHeader>
    {bets.length ? (
      <S.List>
        {bets.slice(0, 10).map((bet) => {
          const line = receiptLine(bet);
          const tier = winTier(bet.result.multiplier);
          return (
            <S.Item data-selected={bet.request_id === selectedId || undefined} data-tier={tier} key={bet.request_id}>
              <S.Line>
                {line ? line.map((symbol, index) => <SlotSymbol key={index} symbol={symbol} />) : <span>—</span>}
              </S.Line>
              <S.Summary>
                <strong>{describeBet(bet)}</strong>
                <span>
                  Stake {bet.total_stake.toLocaleString()} · {time(bet.settled_at || bet.created_at)}
                </span>
              </S.Summary>
              <S.Amount data-sign={signOf(bet.profit)}>
                {bet.payout ? `${bet.payout.toLocaleString()} TNB` : '0 TNB'}
                <small>{bet.profit > 0 ? `+${bet.profit.toLocaleString()}` : bet.profit.toLocaleString()} net</small>
              </S.Amount>
              <P.GhostButton
                aria-label={`View receipt for the ${bet.amount.toLocaleString()} TNB spin`}
                onClick={() => onSelect(bet)}
                type="button"
              >
                Receipt
              </P.GhostButton>
            </S.Item>
          );
        })}
      </S.List>
    ) : (
      <S.Empty>
        <S.EmptyLine aria-hidden="true">
          <SlotSymbol symbol="cherry" />
          <SlotSymbol symbol="seven" />
          <SlotSymbol symbol="bell" />
        </S.EmptyLine>
        <P.Note>{isAuthenticated ? 'Your settled bets will appear here.' : 'Sign in to view your bet history.'}</P.Note>
      </S.Empty>
    )}
  </P.Card>
);

export default History;
