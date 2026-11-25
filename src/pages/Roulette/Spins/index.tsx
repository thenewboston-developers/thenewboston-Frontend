import {Fragment, useEffect, useState} from 'react';

import {CasinoBet} from 'types/casino';
import {getObservedCasinoCommitment} from 'utils/casino';
import {verifyCasinoReceipt} from 'utils/casinoFairness';

import * as P from '../Styles';
import {describeBet, getPocketColor, isRouletteResult} from '../utils';

import * as S from './Styles';

interface SpinsProps {
  bets: CasinoBet[];
  // Opens the receipt of this bet, for one that was just confirmed
  focusId: string | null;
  isAuthenticated: boolean;
  userId?: number | null;
}

const VISIBLE_COUNT = 10;

const Receipt = ({bet, userId}: {bet: CasinoBet; userId: number}) => {
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState('');

  const handleVerify = async () => {
    setError('');
    setIsVerifying(true);
    setVerified('');
    try {
      const observedHash = getObservedCasinoCommitment(userId, bet.request_id);
      setVerified(await verifyCasinoReceipt(bet, observedHash));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to verify this receipt.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <S.Receipt>
      <S.ReceiptTitle>Bet receipt &amp; fairness</S.ReceiptTitle>
      <S.ReceiptNote>
        The casino committed to a hidden seed before this bet and revealed it once the bet settled. Your browser can
        recompute the winning number and the payout from that seed.
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
      </S.Seeds>
      <S.VerifyButton disabled={isVerifying} onClick={handleVerify} type="button">
        {isVerifying ? 'Verifying…' : 'Verify receipt'}
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

// The member's settled roulette bets, each with a receipt that can be checked against the casino's commitment
const Spins = ({bets, focusId, isAuthenticated, userId}: SpinsProps) => {
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (focusId) setOpenId(focusId);
  }, [focusId]);

  const renderEmpty = () => (
    <S.Empty>{isAuthenticated ? 'Your settled bets will appear here.' : 'Sign in to view your bet history.'}</S.Empty>
  );

  const renderRows = () => (
    <S.Table>
      <thead>
        <tr>
          <th scope="col">Result</th>
          <th scope="col">Bet</th>
          <th scope="col">Stake</th>
          <th scope="col">Returned</th>
          <th scope="col">
            <S.Hidden>Receipt</S.Hidden>
          </th>
        </tr>
      </thead>
      <tbody>
        {bets.slice(0, VISIBLE_COUNT).map((bet) => {
          const isOpen = bet.request_id === openId;
          return (
            <Fragment key={bet.request_id}>
              <S.Row $open={isOpen}>
                <td>
                  {isRouletteResult(bet) ? (
                    <S.Pocket $color={getPocketColor(bet.result.number)}>{bet.result.number}</S.Pocket>
                  ) : (
                    <S.Game>{bet.game}</S.Game>
                  )}
                </td>
                <td>{bet.game === 'roulette' ? describeBet(bet) : 'Another casino game'}</td>
                <td>{bet.total_stake.toLocaleString()}</td>
                <S.Returned $won={bet.payout > 0}>{bet.payout > 0 ? bet.payout.toLocaleString() : '—'}</S.Returned>
                <td>
                  <S.ReceiptButton
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : bet.request_id)}
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
  );

  return (
    <P.Panel aria-labelledby="roulette-spins-heading">
      <P.PanelEyebrow>Your table history</P.PanelEyebrow>
      <P.PanelHeading id="roulette-spins-heading">Recent bets</P.PanelHeading>
      {bets.length ? renderRows() : renderEmpty()}
    </P.Panel>
  );
};

export default Spins;
