import {CasinoGame, CasinoSummary} from 'types/casino';
import {BETS, MAX_ODDS} from 'utils/letItRide';

import * as P from '../Styles';

import * as S from './Styles';

interface BankProps {
  game?: CasinoGame;
  summary: CasinoSummary | null;
}

const formatFigure = (value?: number) => value?.toLocaleString() ?? '—';

// The fund every hand is paid from, and the bets it can currently cover
const Bank = ({game, summary}: BankProps) => {
  const maxBet = game ? Math.floor(game.max_bet / BETS) : undefined;
  const minBet = game ? Math.max(1, Math.ceil(game.min_bet / BETS)) : undefined;
  return (
    <P.Panel aria-labelledby="let-it-ride-bank-heading">
      <P.PanelEyebrow>The casino fund</P.PanelEyebrow>
      <P.PanelHeading id="let-it-ride-bank-heading">Every hand is covered.</P.PanelHeading>
      <P.PanelLead>
        Separate from the board-game reward pool. When your cards are dealt, all three bets and the biggest possible win
        are set aside, so even a royal flush with every bet riding is paid in full.
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
      <S.LimitsTitle>Table limits right now</S.LimitsTitle>
      <S.Limits>
        <li>
          <span>Each of your three bets</span>
          <strong>{game && maxBet! >= minBet! ? `${formatFigure(minBet)} to ${formatFigure(maxBet)} TNB` : '—'}</strong>
        </li>
        <li>
          <span>Top prize, on each riding bet</span>
          <strong>{MAX_ODDS} to 1</strong>
        </li>
      </S.Limits>
      <S.LimitsNote>Limits rise and fall with the funds available.</S.LimitsNote>
    </P.Panel>
  );
};

export default Bank;
