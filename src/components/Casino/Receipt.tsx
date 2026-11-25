import {useState} from 'react';

import {CasinoBet} from 'types/casino';
import {getObservedCasinoCommitment} from 'utils/casino';
import {verifyCasinoReceipt} from 'utils/casinoFairness';

import * as S from './Styles';

const Receipt = ({bet, userId}: {bet: CasinoBet; userId: number}) => {
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState('');

  const handleVerify = async () => {
    setIsVerifying(true);
    setError('');
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
    <S.Details>
      <summary>Bet receipt & fairness</summary>
      <S.Note>
        The server committed to a seed before your bet and revealed it after settlement. Verify the outcome and payout
        independently in your browser.
      </S.Note>
      <S.SecondaryButton disabled={isVerifying} onClick={handleVerify} type="button">
        {isVerifying ? 'Verifying…' : 'Verify receipt'}
      </S.SecondaryButton>
      {verified && <S.Note role="status">{verified}</S.Note>}
      {error && <S.Error role="alert">{error}</S.Error>}
      <S.Receipt>{JSON.stringify(bet, null, 2)}</S.Receipt>
    </S.Details>
  );
};

export default Receipt;
