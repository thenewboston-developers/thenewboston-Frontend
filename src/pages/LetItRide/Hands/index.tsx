import {Fragment, useState} from 'react';

import {LetItRideBet} from 'types/casino';
import {getObservedCasinoCommitment} from 'utils/casino';
import {verifyLetItRideReceipt} from 'utils/letItRideFairness';

import * as P from '../Styles';
import {formatCard, getCards, getHandLabel, isRedCard} from '../utils';

import * as S from './Styles';

interface HandsProps {
  bets: LetItRideBet[];
  isAuthenticated: boolean;
  userId?: number | null;
}

const VISIBLE_COUNT = 10;

const Receipt = ({bet, userId}: {bet: LetItRideBet; userId: number}) => {
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState('');

  const handleVerify = async () => {
    setError('');
    setIsVerifying(true);
    setVerified('');
    try {
      setVerified(await verifyLetItRideReceipt(bet, getObservedCasinoCommitment(userId, bet.request_id)));
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
        The casino committed to a hidden seed before this hand, and all five cards were fixed by that seed and yours the
        moment you bet. Your browser can deal the same five cards from the revealed seed and recompute the payout.
        {bet.settlement_reason === 'timeout' && ' This hand ran out of time and was finished for you.'}
      </S.ReceiptNote>
      <S.Seeds>
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
        <div>
          <dt>Your decisions</dt>
          <dd>
            {bet.result.decisions
              .map((decision, index) => `Bet ${index + 1}: ${decision === 'ride' ? 'let it ride' : 'pulled back'}`)
              .join(' · ')}
          </dd>
        </div>
      </S.Seeds>
      <S.VerifyButton disabled={isVerifying} onClick={handleVerify} type="button">
        {isVerifying ? 'Verifying…' : 'Verify this hand'}
      </S.VerifyButton>
      {verified && <S.Verified role="status">{verified}</S.Verified>}
      {error && <S.Failed role="alert">{error}</S.Failed>}
      <S.Raw>
        <summary>Full receipt</summary>
        <pre>{JSON.stringify(bet, null, 2)}</pre>
      </S.Raw>
    </S.Receipt>
  );
};

// The member's finished hands, each with a receipt that can be checked against the casino's commitment
const Hands = ({bets, isAuthenticated, userId}: HandsProps) => {
  const [openId, setOpenId] = useState<number | null>(null);

  const renderEmpty = () => (
    <S.Empty>{isAuthenticated ? 'Your finished hands will appear here.' : 'Sign in to view your hands.'}</S.Empty>
  );

  const renderRows = () => (
    <S.Scroll>
      <S.Table>
        <thead>
          <tr>
            <th scope="col">Cards</th>
            <th scope="col">Hand</th>
            <th scope="col">Staked</th>
            <th scope="col">Returned</th>
            <th scope="col">
              <S.Hidden>Receipt</S.Hidden>
            </th>
          </tr>
        </thead>
        <tbody>
          {bets.slice(0, VISIBLE_COUNT).map((bet) => {
            const isOpen = bet.id === openId;
            return (
              <Fragment key={bet.id}>
                <S.Row $open={isOpen}>
                  <td>
                    <S.MiniCards>
                      {getCards(bet).map(
                        (card) =>
                          card && (
                            <S.MiniCard $red={isRedCard(card)} key={card}>
                              {formatCard(card)}
                            </S.MiniCard>
                          ),
                      )}
                    </S.MiniCards>
                  </td>
                  <td>
                    {getHandLabel(bet.result.hand)}
                    <S.Riding>
                      {bet.result.riding} of 3 riding{bet.settlement_reason === 'timeout' ? ' · timed out' : ''}
                    </S.Riding>
                  </td>
                  <td>{bet.total_stake.toLocaleString()}</td>
                  <S.Returned $won={bet.profit > 0}>{bet.payout > 0 ? bet.payout.toLocaleString() : '—'}</S.Returned>
                  <td>
                    <S.ReceiptButton
                      aria-expanded={isOpen}
                      onClick={() => setOpenId(isOpen ? null : bet.id)}
                      type="button"
                    >
                      {isOpen ? 'Hide' : 'Receipt'}
                    </S.ReceiptButton>
                  </td>
                </S.Row>
                {isOpen && userId && (
                  <tr>
                    <S.ReceiptCell colSpan={5}>
                      <Receipt bet={bet} userId={userId} />
                    </S.ReceiptCell>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </S.Table>
    </S.Scroll>
  );

  return (
    <P.Panel aria-labelledby="let-it-ride-hands-heading">
      <P.PanelEyebrow>Your table history</P.PanelEyebrow>
      <P.PanelHeading id="let-it-ride-hands-heading">Recent hands</P.PanelHeading>
      {bets.length ? renderRows() : renderEmpty()}
    </P.Panel>
  );
};

export default Hands;
