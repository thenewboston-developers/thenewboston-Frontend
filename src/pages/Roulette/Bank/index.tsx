import {CasinoGame, CasinoSummary} from 'types/casino';

import * as P from '../Styles';

import * as S from './Styles';

interface BankProps {
  game?: CasinoGame;
  summary: CasinoSummary | null;
}

const LIMITS = [
  {label: 'Red, black, odd, even, low, high', type: 'red'},
  {label: 'Dozens and columns', type: 'dozen'},
  {label: 'A single number', type: 'number'},
];

const formatFigure = (value?: number) => value?.toLocaleString() ?? '—';

// The fund every wager is paid from, and the table limits it currently supports
const Bank = ({game, summary}: BankProps) => (
  <P.Panel aria-labelledby="roulette-bank-heading">
    <P.PanelEyebrow>The casino fund</P.PanelEyebrow>
    <P.PanelHeading id="roulette-bank-heading">Every wager is covered.</P.PanelHeading>
    <P.PanelLead>
      Separate from the board-game reward pool. The most your chips can win together is set aside before the ball is
      thrown, so the table limits rise and fall with the funds available.
    </P.PanelLead>
    <S.Figures>
      <div>
        <dt>Total</dt>
        <dd>
          {formatFigure(summary?.fund.balance)} <small>TNB</small>
        </dd>
      </div>
      <div>
        <dt>Reserved</dt>
        <dd>
          {formatFigure(summary?.fund.reserved)} <small>TNB</small>
        </dd>
      </div>
      <div>
        <dt>Available</dt>
        <dd>
          {formatFigure(summary?.fund.available)} <small>TNB</small>
        </dd>
      </div>
    </S.Figures>
    <S.LimitsTitle>Limit for a single bet right now</S.LimitsTitle>
    <S.Limits>
      {LIMITS.map(({label, type}) => {
        const betType = game?.bet_types?.find((item) => item.id === type);
        return (
          <li key={type}>
            <span>{label}</span>
            <strong>{betType ? `up to ${betType.max_bet.toLocaleString()} TNB` : '—'}</strong>
          </li>
        );
      })}
    </S.Limits>
  </P.Panel>
);

export default Bank;
