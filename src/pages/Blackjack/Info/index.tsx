import {CasinoSummary} from 'types/casino';

import * as P from '../Styles';
import {formatSigned, getSessionNet, SessionTotals} from '../utils';

import * as S from './Styles';

interface BankProps {
  summary: CasinoSummary | null;
}

interface SessionProps {
  totals: SessionTotals;
}

const PAYOUTS = [
  {name: 'Blackjack', note: 'An ace and a ten-value card on the deal', pays: '3 to 2'},
  {name: 'Win', note: 'Closer to 21 than the dealer, or the dealer busts', pays: '1 to 1'},
  {name: 'Push', note: 'The same total as the dealer', pays: 'Wager back'},
  {name: 'Double down', note: 'On your first two cards: one more card, twice the wager', pays: '1 to 1'},
];

const formatFigure = (value?: number) => value?.toLocaleString() ?? '—';

// The fund every wager is paid from
export const Bank = ({summary}: BankProps) => (
  <P.Panel aria-labelledby="blackjack-fund-heading">
    <P.PanelEyebrow>The casino fund</P.PanelEyebrow>
    <P.PanelHeading id="blackjack-fund-heading">Your payout is covered.</P.PanelHeading>
    <P.PanelLead>
      Each accepted wager reserves its possible payout, including room to double down. This fund is separate from
      board-game rewards, and the table limits rise and fall with the funds available.
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
  </P.Panel>
);

// What each result pays, the way it is printed on the felt
export const Payouts = () => (
  <P.Panel aria-labelledby="blackjack-payouts-heading">
    <P.PanelEyebrow>The house rules</P.PanelEyebrow>
    <P.PanelHeading id="blackjack-payouts-heading">What a hand pays</P.PanelHeading>
    <S.Payouts>
      {PAYOUTS.map(({name, note, pays}) => (
        <li key={name}>
          <div>
            <strong>{name}</strong>
            <span>{note}</span>
          </div>
          <S.Pays>{pays}</S.Pays>
        </li>
      ))}
    </S.Payouts>
    <S.Footnote>
      The dealer stands on all 17s. Six decks are shuffled for every hand. This table offers no splitting, insurance or
      surrender.
    </S.Footnote>
  </P.Panel>
);

// The hands played since the page was opened
export const Session = ({totals}: SessionProps) => {
  const net = getSessionNet(totals);
  return (
    <P.Panel aria-labelledby="blackjack-session-heading">
      <S.SessionHeader>
        <div>
          <P.PanelEyebrow>This visit</P.PanelEyebrow>
          <P.PanelHeading id="blackjack-session-heading">Your session</P.PanelHeading>
        </div>
        <S.Count>
          {totals.hands.toLocaleString()} {totals.hands === 1 ? 'hand' : 'hands'}
        </S.Count>
      </S.SessionHeader>
      <S.Figures>
        <div>
          <dt>Wagered</dt>
          <dd>{totals.wagered.toLocaleString()}</dd>
        </div>
        <div>
          <dt>Returned</dt>
          <dd>{totals.returned.toLocaleString()}</dd>
        </div>
        <div>
          <dt>Net</dt>
          <S.NetFigure $net={net}>{formatSigned(net)}</S.NetFigure>
        </div>
      </S.Figures>
      <S.Footnote>Totals for hands finished on this page, in TNB. Play for fun and set yourself a limit.</S.Footnote>
    </P.Panel>
  );
};
