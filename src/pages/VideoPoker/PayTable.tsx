import {CasinoGame, VideoPokerCategory} from 'types/casino';
import {VIDEO_POKER_PAY_TABLE} from 'utils/videoPokerFairness';

import * as S from './Styles';

interface PayTableProps {
  // How many coin columns the table shows, and which one the current wager lights up.
  coins: number;
  coinValue: number;
  columns: number;
  game?: CasinoGame;
  // The hand on screen, lit softly while it can still change and flashing once it has been paid.
  lit?: VideoPokerCategory;
  won?: boolean;
}

// The screen abbreviates the way the cabinets do; receipts and history spell the hands out.
const SCREEN_NAMES: Partial<Record<VideoPokerCategory, string>> = {
  four_of_a_kind: '4 of a Kind',
  three_of_a_kind: '3 of a Kind',
};

const PayTable = ({coins, coinValue, columns, game, lit, won = false}: PayTableProps) => {
  const rows = game?.pay_table?.length ? game.pay_table : VIDEO_POKER_PAY_TABLE;
  const counts = Array.from({length: columns}, (_, index) => index + 1);
  return (
    <S.PayTable>
      <caption>
        Pay table. Each column shows the total TNB returned, wager included, for that many coins of {coinValue} TNB.
      </caption>
      <thead>
        <tr>
          <th scope="col">Coins</th>
          {counts.map((count) => (
            <S.PayColumn $active={count === coins} key={count} scope="col">
              {count}
            </S.PayColumn>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr data-hand={row.hand} data-lit={row.hand === lit || undefined} key={row.hand}>
            <S.PayName $lit={row.hand === lit} $win={won && row.hand === lit} aria-label={row.name} scope="row">
              {SCREEN_NAMES[row.hand] ?? row.name}
            </S.PayName>
            {counts.map((count) => (
              <S.PayCell
                $active={count === coins}
                $win={won && row.hand === lit && count === coins}
                data-active={count === coins || undefined}
                key={count}
              >
                {(row.multiplier * count * coinValue).toLocaleString()}
              </S.PayCell>
            ))}
          </tr>
        ))}
      </tbody>
    </S.PayTable>
  );
};

export default PayTable;
