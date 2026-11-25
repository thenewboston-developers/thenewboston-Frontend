import {Fragment, useState} from 'react';

import {CasinoBet} from 'types/casino';
import {getObservedCasinoCommitment} from 'utils/casino';
import {verifyCasinoReceipt} from 'utils/casinoFairness';

import * as S from './Styles';

const Receipt = ({bet, userId}: {bet: CasinoBet; userId: number}) => {
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState('');

  const handleVerify = async () => {
    setError('');
    setIsVerifying(true);
    setVerified('');
    try {
      setVerified(await verifyCasinoReceipt(bet, getObservedCasinoCommitment(userId, bet.request_id)));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to verify this receipt.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div>
      <S.Eyebrow>Bet receipt &amp; fairness</S.Eyebrow>
      <S.Note>
        Stake: {bet.total_stake.toLocaleString()} TNB · Returned: {bet.payout.toLocaleString()} TNB · Net:{' '}
        {bet.profit > 0 ? '+' : ''}
        {bet.profit.toLocaleString()} TNB
      </S.Note>
      <S.Note>
        Verify the revealed seed against the pre-bet commitment, then recompute all twelve steps and your payout.
      </S.Note>
      <S.Button disabled={isVerifying} onClick={handleVerify} type="button">
        {isVerifying ? 'Verifying…' : 'Verify receipt'}
      </S.Button>
      {verified && <S.Note role="status">{verified}</S.Note>}
      {error && <S.Alert role="alert">{error}</S.Alert>}
      <S.Details>
        <summary>Seeds and full receipt</summary>
        <pre>{JSON.stringify(bet, null, 2)}</pre>
      </S.Details>
    </div>
  );
};

interface HistoryProps {
  bets: CasinoBet[];
  isAuthenticated: boolean;
  userId: number | null;
}

const History = ({bets, isAuthenticated, userId}: HistoryProps) => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <S.Card aria-labelledby="plinko-history-heading">
      <S.Eyebrow>Your drops</S.Eyebrow>
      <h2 id="plinko-history-heading">Recent bets</h2>
      {bets.length ? (
        <S.TableScroll aria-label="Recent Plinko bets" role="region" tabIndex={0}>
          <S.Table>
            <thead>
              <tr>
                <th scope="col">Pocket</th>
                <th scope="col">Stake</th>
                <th scope="col">Returned</th>
                <th scope="col">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {bets.slice(0, 10).map((bet) => (
                <Fragment key={bet.request_id}>
                  <tr>
                    <td>
                      {(bet.result.slot ?? 0) + 1} · <strong>{bet.result.multiplier}×</strong>
                    </td>
                    <td>{bet.amount.toLocaleString()}</td>
                    <td>{bet.payout.toLocaleString()} TNB</td>
                    <td>
                      <S.Button
                        aria-expanded={openId === bet.request_id}
                        aria-label={`Receipt for ${bet.amount} TNB bet, pocket ${(bet.result.slot ?? 0) + 1}`}
                        onClick={() => setOpenId(openId === bet.request_id ? null : bet.request_id)}
                        type="button"
                      >
                        {openId === bet.request_id ? 'Hide' : 'View'}
                      </S.Button>
                    </td>
                  </tr>
                  {openId === bet.request_id && userId && (
                    <tr>
                      <td colSpan={4}>
                        <Receipt bet={bet} userId={userId} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </S.Table>
        </S.TableScroll>
      ) : (
        <S.Note>
          {isAuthenticated ? 'Your settled Plinko bets will appear here.' : 'Sign in to view your bet history.'}
        </S.Note>
      )}
    </S.Card>
  );
};

export default History;
