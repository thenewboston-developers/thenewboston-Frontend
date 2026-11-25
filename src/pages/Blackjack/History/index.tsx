import {useState} from 'react';

import {BlackjackBet} from 'types/casino';
import {verifyBlackjackReceipt} from 'utils/blackjackFairness';
import {getObservedCasinoCommitment} from 'utils/casino';

import * as P from '../Styles';
import {describeCard, formatCard, formatSigned, getOutcomeCopy, getSuit, isRedSuit} from '../utils';

import * as S from './Styles';

interface HistoryProps {
  bets: BlackjackBet[];
  isAuthenticated: boolean;
  userId?: number | null;
}

const ACTION_NAMES: Record<string, string> = {double: 'Double', hit: 'Hit', stand: 'Stand'};
const VISIBLE_COUNT = 10;

const describeHand = (owner: string, cards: (string | null)[], total: number): string =>
  `${owner}: ${cards.map(describeCard).join(', ')}, ${total}`;

const renderCards = (cards: (string | null)[]) =>
  cards.map((card, index) =>
    card ? (
      // The same card can appear twice in a six-deck hand
      // eslint-disable-next-line react/no-array-index-key
      <S.MiniCard $red={isRedSuit(getSuit(card))} key={`${card}:${index}`}>
        {formatCard(card)}
      </S.MiniCard>
    ) : null,
  );

const Receipt = ({bet, userId}: {bet: BlackjackBet; userId: number}) => {
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState('');
  const actions = bet.result.actions ?? [];

  const handleVerify = async () => {
    setError('');
    setIsVerifying(true);
    setVerified('');
    try {
      setVerified(await verifyBlackjackReceipt(bet, getObservedCasinoCommitment(userId, bet.request_id)));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to verify this receipt.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <S.Receipt>
      <S.ReceiptTitle>Hand receipt &amp; fairness</S.ReceiptTitle>
      <S.ReceiptNote>
        The casino committed to a hidden seed before this hand and revealed it once the hand was over. Your browser can
        reshuffle the six decks from that seed and replay your decisions.
      </S.ReceiptNote>
      <S.Figures>
        <div>
          <dt>Total wager</dt>
          <dd>{bet.total_stake.toLocaleString()}</dd>
        </div>
        <div>
          <dt>Returned</dt>
          <dd>{bet.payout.toLocaleString()}</dd>
        </div>
        <div>
          <dt>Net TNB</dt>
          <dd>{formatSigned(bet.profit)}</dd>
        </div>
      </S.Figures>
      <S.Seeds>
        <div>
          <dt>Your decisions</dt>
          <dd>
            {actions.length
              ? actions.map((action) => ACTION_NAMES[action] ?? action).join(', ')
              : 'None: settled on the deal'}
            {bet.settlement_reason === 'timeout' && ' (stood automatically after 15 minutes)'}
          </dd>
        </div>
        <div>
          <dt>Committed hash</dt>
          <dd>{bet.fairness.server_seed_hash}</dd>
        </div>
        <div>
          <dt>Revealed seed</dt>
          <dd>{bet.fairness.server_seed}</dd>
        </div>
        <div>
          <dt>Your seed</dt>
          <dd>{bet.fairness.client_seed}</dd>
        </div>
      </S.Seeds>
      <S.VerifyButton disabled={isVerifying} onClick={handleVerify} type="button">
        {isVerifying ? 'Verifying…' : 'Verify this hand'}
      </S.VerifyButton>
      {verified && <S.Verified role="status">{verified}</S.Verified>}
      {error && <S.Failed role="alert">{error}</S.Failed>}
      <S.Raw>
        <summary>Seeds and full receipt</summary>
        <pre>{JSON.stringify(bet, null, 2)}</pre>
      </S.Raw>
    </S.Receipt>
  );
};

// The member's finished hands, each with a receipt that can be checked against the casino's commitment
const History = ({bets, isAuthenticated, userId}: HistoryProps) => {
  const [openId, setOpenId] = useState<number | null>(null);

  const renderEmpty = () => (
    <S.Empty>
      {isAuthenticated ? 'Your finished Blackjack hands will appear here.' : 'Sign in to view your hand history.'}
    </S.Empty>
  );

  const renderRows = () => (
    <S.Rows>
      {bets.slice(0, VISIBLE_COUNT).map((bet) => {
        const {dealer_cards: dealerCards, dealer_total: dealerTotal, player_cards: playerCards} = bet.result;
        const {title, tone} = getOutcomeCopy(bet);
        const isOpen = bet.id === openId;
        return (
          <S.Row $open={isOpen} key={bet.id}>
            <S.Summary>
              <S.Outcome $tone={tone}>{title}</S.Outcome>
              <S.Hands>
                <S.HandLine aria-label={describeHand('You', playerCards, bet.result.player_total)}>
                  <S.Owner aria-hidden="true">You</S.Owner>
                  <span aria-hidden="true">{renderCards(playerCards)}</span>
                  <S.HandTotal aria-hidden="true">{bet.result.player_total}</S.HandTotal>
                </S.HandLine>
                <S.HandLine aria-label={describeHand('Dealer', dealerCards, dealerTotal)}>
                  <S.Owner aria-hidden="true">Dealer</S.Owner>
                  <span aria-hidden="true">{renderCards(dealerCards)}</span>
                  <S.HandTotal aria-hidden="true">{dealerTotal}</S.HandTotal>
                </S.HandLine>
              </S.Hands>
              <S.Money>
                <S.Net $tone={tone}>{formatSigned(bet.profit)} TNB</S.Net>
                <span>{bet.total_stake.toLocaleString()} wagered</span>
              </S.Money>
              <S.ReceiptButton aria-expanded={isOpen} onClick={() => setOpenId(isOpen ? null : bet.id)} type="button">
                {isOpen ? 'Hide' : 'Receipt'}
              </S.ReceiptButton>
            </S.Summary>
            {isOpen && userId && <Receipt bet={bet} userId={userId} />}
          </S.Row>
        );
      })}
    </S.Rows>
  );

  return (
    <P.Panel aria-labelledby="blackjack-history-heading">
      <P.PanelEyebrow>Your table history</P.PanelEyebrow>
      <P.PanelHeading id="blackjack-history-heading">Recent hands</P.PanelHeading>
      {bets.length ? renderRows() : renderEmpty()}
    </P.Panel>
  );
};

export default History;
