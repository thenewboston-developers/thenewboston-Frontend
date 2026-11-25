import {CasinoGame} from 'types/casino';

import * as P from '../Panel';
import {SlotSymbol} from '../Symbols';
import {formatOdds, SYMBOL_DETAILS, symbolForMultiplier} from '../utils';

import * as S from './Styles';

interface PaytableProps {
  game?: CasinoGame;
  // Multiplier of the line that just paid, lit until the next spin.
  lit: number | null;
  stake: number | null;
}

const Paytable = ({game, lit, stake}: PaytableProps) => {
  const rows = [...(game?.payout_table ?? [])]
    .filter((row) => row.multiplier > 0)
    .sort((first, second) => second.multiplier - first.multiplier);
  const lose = game?.payout_table?.find((row) => row.multiplier === 0);
  const rtp = game?.house_edge != null ? Math.round((1 - game.house_edge) * 10000) / 100 : null;

  return (
    <P.Card aria-labelledby="slots-paytable-heading">
      <P.CardHeader>
        <P.CardTitle id="slots-paytable-heading">Paytable</P.CardTitle>
        {rtp !== null && <P.Badge>{rtp}% RTP</P.Badge>}
      </P.CardHeader>
      {rows.length ? (
        <S.Rows>
          {rows.map((row) => {
            const symbol = symbolForMultiplier(row.multiplier);
            if (!symbol) return null;
            return (
              <S.Row data-lit={lit === row.multiplier || undefined} key={row.multiplier}>
                <S.Line aria-label={`Three ${SYMBOL_DETAILS[symbol].plural}`} role="img">
                  <SlotSymbol symbol={symbol} />
                  <SlotSymbol symbol={symbol} />
                  <SlotSymbol symbol={symbol} />
                </S.Line>
                <S.Pays>
                  <strong>{row.multiplier}×</strong>
                  <span>
                    {row.multiplier === 1 && 'Stake back'}
                    {row.multiplier > 1 && stake ? `${(row.multiplier * stake).toLocaleString()} TNB` : ''}
                  </span>
                </S.Pays>
                <S.Odds title={`${(row.probability * 100).toLocaleString(undefined, {maximumFractionDigits: 4})}%`}>
                  {formatOdds(row.probability)}
                </S.Odds>
              </S.Row>
            );
          })}
        </S.Rows>
      ) : (
        <P.Note>Loading payouts…</P.Note>
      )}
      <P.Note>
        Three of a kind on the center line pays; every other line pays nothing
        {lose ? ` (${(lose.probability * 100).toLocaleString(undefined, {maximumFractionDigits: 2})}% of spins)` : ''}.
        Payouts include your stake. Maximum payout: {game?.max_multiplier ?? 100}× your stake. Return to player:{' '}
        {rtp ?? 96}% over the long run; individual results vary.
      </P.Note>
    </P.Card>
  );
};

export default Paytable;
