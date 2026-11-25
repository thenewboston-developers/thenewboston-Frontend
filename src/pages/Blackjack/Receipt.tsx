import {useState} from 'react';

import {BlackjackBet} from 'types/casino';
import {verifyBlackjackReceipt} from 'utils/blackjackFairness';
import {getObservedCasinoCommitment} from 'utils/casino';

import * as S from './Styles';

const Receipt = ({bet, userId}: {bet: BlackjackBet; userId: number}) => {
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState('');

  const handleVerify = async () => {
    setIsVerifying(true);
    setError('');
    try {
      setVerified(await verifyBlackjackReceipt(bet, getObservedCasinoCommitment(userId, bet.request_id)));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to verify this receipt.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div>
      <S.Facts>
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
          <dd>
            {bet.profit > 0 ? '+' : ''}
            {bet.profit.toLocaleString()}
          </dd>
        </div>
      </S.Facts>
      <S.Actions>
        <S.Button disabled={isVerifying} onClick={handleVerify} type="button">
          {isVerifying ? 'Verifying…' : 'Verify this hand'}
        </S.Button>
      </S.Actions>
      {verified && <S.Status role="status">{verified}</S.Status>}
      {error && <S.Error role="alert">{error}</S.Error>}
      <S.Note>
        The receipt reveals the seed and your decisions so your browser can independently replay the deal.
      </S.Note>
      <details>
        <summary>Seeds and full receipt</summary>
        <S.Raw>{JSON.stringify(bet, null, 2)}</S.Raw>
      </details>
    </div>
  );
};

export default Receipt;
