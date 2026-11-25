import {useState} from 'react';

import {VideoPokerBet} from 'types/casino';
import {getObservedCasinoCommitment} from 'utils/casino';
import {verifyVideoPokerReceipt} from 'utils/videoPokerFairness';

import * as S from './Styles';

const Receipt = ({bet, userId}: {bet: VideoPokerBet; userId: number}) => {
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState('');

  const handleVerify = async () => {
    setIsVerifying(true);
    setError('');
    try {
      setVerified(await verifyVideoPokerReceipt(bet, getObservedCasinoCommitment(userId, bet.request_id)));
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
          <dt>Wager</dt>
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
      <S.Button disabled={isVerifying} onClick={handleVerify} type="button">
        {isVerifying ? 'Verifying…' : 'Verify this hand'}
      </S.Button>
      {verified && <S.Status role="status">{verified}</S.Status>}
      {error && <S.Error role="alert">{error}</S.Error>}
      <S.Note>
        The receipt reveals the seed and the cards you held, so your browser can shuffle the same deck and replay the
        deal and the draw by itself.
      </S.Note>
      <details>
        <summary>Seeds and full receipt</summary>
        <S.Raw>{JSON.stringify(bet, null, 2)}</S.Raw>
      </details>
    </div>
  );
};

export default Receipt;
