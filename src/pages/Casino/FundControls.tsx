import {FormEvent, useEffect, useRef, useState} from 'react';

import {moveCasinoFunds} from 'api/casino';
import {CasinoFundMovement} from 'types/casino';
import {casinoErrorMessage, isDefiniteCasinoRejection} from 'utils/casino';

import * as S from './Styles';

interface MovementRequest {
  amount: number;
  kind: 'deposits' | 'withdrawals';
  request_id: string;
}

const FundControls = ({onSuccess, userId}: {onSuccess(result: CasinoFundMovement): void; userId: number}) => {
  const [amount, setAmount] = useState('100000');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [kind, setKind] = useState<'deposits' | 'withdrawals'>('deposits');
  const [pending, setPending] = useState<MovementRequest | null>(null);
  const [review, setReview] = useState<MovementRequest | null>(null);
  const [success, setSuccess] = useState('');
  const [unreadable, setUnreadable] = useState(false);
  const live = useRef(true);
  const lock = useRef(false);
  const storageKey = `casino.pending.fund:${userId}`;

  useEffect(() => {
    live.current = true;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const request = JSON.parse(saved) as MovementRequest;
        if (!request.request_id || !['deposits', 'withdrawals'].includes(request.kind) || !request.amount) {
          throw new Error('Invalid saved transfer');
        }
        setPending(request);
        setReview(request);
      }
    } catch {
      setUnreadable(true);
      setError('The saved transfer could not be read. Check the casino ledger before starting another transfer.');
    }
    return () => {
      live.current = false;
    };
  }, [storageKey]);

  const handleConfirm = async () => {
    if (!review || lock.current) return;
    lock.current = true;
    setIsSubmitting(true);
    setError('');
    try {
      localStorage.setItem(storageKey, JSON.stringify(review));
      setPending(review);
      const result = await moveCasinoFunds(review.kind, {amount: review.amount, request_id: review.request_id});
      const stored = JSON.parse(localStorage.getItem(storageKey) || 'null') as MovementRequest | null;
      if (stored?.request_id === review.request_id) localStorage.removeItem(storageKey);
      if (!live.current) return;
      setPending(null);
      setReview(null);
      setSuccess(
        `${result.amount.toLocaleString()} TNB ${review.kind === 'deposits' ? 'added to' : 'withdrawn from'} the casino fund.`,
      );
      onSuccess(result);
    } catch (caught) {
      if (!live.current) return;
      if (isDefiniteCasinoRejection(caught)) {
        const stored = JSON.parse(localStorage.getItem(storageKey) || 'null') as MovementRequest | null;
        if (stored?.request_id === review.request_id) localStorage.removeItem(storageKey);
        setPending(null);
        setReview(null);
      }
      setError(
        casinoErrorMessage(
          caught,
          'We could not confirm the transfer. Retry this same transfer without moving coins twice.',
        ),
      );
    } finally {
      lock.current = false;
      if (live.current) setIsSubmitting(false);
    }
  };

  const handleReview = (event: FormEvent) => {
    event.preventDefault();
    const value = Number(amount);
    if (!Number.isSafeInteger(value) || value < 1 || value > 1000000000) {
      setError('Enter a whole number from 1 to 1,000,000,000 TNB.');
      return;
    }
    setError('');
    setSuccess('');
    setReview({amount: value, kind, request_id: crypto.randomUUID()});
  };

  let confirmLabel = pending ? 'Retry same transfer' : 'Confirm transfer';
  if (isSubmitting) confirmLabel = 'Checking transfer…';

  return (
    <S.Card>
      <S.Eyebrow>ADMIN ONLY</S.Eyebrow>
      <S.Heading>Manage casino funds</S.Heading>
      <S.Note>
        Deposits come from your TNB wallet. Withdrawals return to your wallet and cannot use reserved funds.
      </S.Note>
      {!review && (
        <form onSubmit={handleReview}>
          <S.Field htmlFor="casino-fund-action">
            Action
            <S.Select
              disabled={unreadable}
              id="casino-fund-action"
              onChange={(event) => setKind(event.target.value as 'deposits' | 'withdrawals')}
              value={kind}
            >
              <option value="deposits">Deposit into casino</option>
              <option value="withdrawals">Withdraw to my wallet</option>
            </S.Select>
          </S.Field>
          <S.Field htmlFor="casino-fund-amount">
            Amount (TNB)
            <S.Input
              disabled={unreadable}
              id="casino-fund-amount"
              inputMode="numeric"
              max={1000000000}
              min={1}
              onChange={(event) => setAmount(event.target.value)}
              required
              step={1}
              type="number"
              value={amount}
            />
          </S.Field>
          <S.SecondaryButton disabled={unreadable} type="submit">
            Review transfer
          </S.SecondaryButton>
        </form>
      )}
      {review && (
        <>
          <S.Note>
            {review.kind === 'deposits' ? 'Deposit' : 'Withdraw'} <strong>{review.amount.toLocaleString()} TNB</strong>{' '}
            {review.kind === 'deposits' ? 'from your wallet into the casino?' : 'from the casino into your wallet?'}
          </S.Note>
          <S.Actions>
            <S.Button disabled={isSubmitting} onClick={handleConfirm} type="button">
              {confirmLabel}
            </S.Button>
            {!pending && (
              <S.SecondaryButton disabled={isSubmitting} onClick={() => setReview(null)} type="button">
                Back
              </S.SecondaryButton>
            )}
          </S.Actions>
        </>
      )}
      {error && <S.Error role="alert">{error}</S.Error>}
      {success && <S.Note role="status">{success}</S.Note>}
    </S.Card>
  );
};

export default FundControls;
