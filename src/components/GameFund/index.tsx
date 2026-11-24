import {FormEvent, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {depositGameFund, getGameFund} from 'api/gameFund';
import AuthButtons from 'components/AuthButtons';
import Button, {ButtonColor, ButtonType} from 'components/Button';
import Modal, {ModalBody, ModalFooter} from 'components/Modal';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';
import {AppDispatch} from 'types';
import {GameFund as GameFundData} from 'types/gameFund';

import * as S from './Styles';

const GameFund = () => {
  const [amount, setAmount] = useState('');
  const [confirmAmount, setConfirmAmount] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [fund, setFund] = useState<GameFundData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [success, setSuccess] = useState('');
  const currentViewer = useRef<number | null | undefined>(null);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useIsAuthenticated();
  const latestRead = useRef(0);
  const live = useRef(true);
  const request = useRef<{amount: number; id: string; userId: number} | null>(null);
  const self = useSelector(getSelf);
  const submissionLock = useRef(false);
  const viewerGeneration = useRef(0);
  const viewerIdentity = `${isAuthenticated}:${self.id}`;
  const previousViewer = useRef(viewerIdentity);
  if (previousViewer.current !== viewerIdentity) {
    viewerGeneration.current += 1;
    previousViewer.current = viewerIdentity;
  }
  currentViewer.current = isAuthenticated ? self.id : null;

  useEffect(() => {
    live.current = true;
    return () => {
      live.current = false;
    };
  }, []);

  useEffect(() => {
    setConfirmAmount(null);
    setError('');
    setSuccess('');
    setIsSubmitting(false);
    submissionLock.current = false;
    request.current = null;
  }, [isAuthenticated, self.id]);

  useEffect(() => {
    const controller = new AbortController();
    let polling = true;
    let timer: ReturnType<typeof setTimeout>;
    const load = async () => {
      latestRead.current += 1;
      const sequence = latestRead.current;
      try {
        const data = await getGameFund(controller.signal);
        if (polling && sequence === latestRead.current) {
          setFund(data);
          setLoadError(false);
        }
      } catch {
        if (polling && sequence === latestRead.current) setLoadError(true);
      } finally {
        if (polling) timer = setTimeout(load, 30000);
      }
    };
    load();
    return () => {
      polling = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, [retryKey]);

  const handleConfirm = async () => {
    if (confirmAmount === null || !isAuthenticated || !self.id || submissionLock.current) return;
    const viewerId = self.id;
    const generation = viewerGeneration.current;
    const isCurrent = () =>
      live.current && currentViewer.current === viewerId && generation === viewerGeneration.current;
    submissionLock.current = true;
    setIsSubmitting(true);
    setError('');
    if (request.current?.amount !== confirmAmount || request.current.userId !== viewerId)
      request.current = {amount: confirmAmount, id: crypto.randomUUID(), userId: viewerId};
    try {
      const deposit = await depositGameFund({amount: confirmAmount, request_id: request.current.id});
      if (!isCurrent()) return;
      latestRead.current += 1;
      setFund(deposit.fund);
      setLoadError(false);
      setSuccess(`Contributed ${deposit.amount.toLocaleString()} TNB to the game fund. Thank you!`);
      request.current = null;
      setAmount('');
      setConfirmAmount(null);
      dispatch(getAllUserWallets()).catch(() => undefined);
    } catch (depositError) {
      if (!isCurrent()) return;
      const data = (depositError as {response?: {data?: Record<string, unknown>}}).response?.data;
      const details = data
        ? Object.values(data)
            .flat()
            .filter((value) => typeof value === 'string')
            .join(' ')
        : '';
      setError(
        details || 'We could not confirm your contribution. Retry to check the same contribution without paying twice.',
      );
    } finally {
      if (isCurrent()) {
        submissionLock.current = false;
        setIsSubmitting(false);
      }
    }
  };

  const handleReview = (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    const value = Number(amount);
    if (!Number.isSafeInteger(value) || value < 1 || value > 1000000000) {
      setError('Enter a whole-number contribution from 1 to 1,000,000,000 TNB.');
      return;
    }
    setConfirmAmount(value);
  };

  let availability = 'Rewards paused';
  if (fund?.enabled) availability = fund.available ? 'Rewards available' : 'Awaiting contributions';

  return (
    <S.Card aria-labelledby="game-fund-title">
      <div>
        <S.Heading id="game-fund-title">Community game fund</S.Heading>
        <S.Description>
          Help keep the games rewarding. Win a computer match in Connect Five, Backgammon, Battleship, or Checkers to
          earn 10 TNB when the fund can cover the reward.
        </S.Description>
      </div>
      {fund ? (
        <>
          <S.Statistics>
            <S.Balance>
              <S.Description>Available balance</S.Description>
              <S.Amount>{fund.balance.toLocaleString()} TNB</S.Amount>
            </S.Balance>
            <S.Balance>
              <strong>{fund.wins_remaining.toLocaleString()} rewards funded</strong>
              <S.Description>{fund.total_paid.toLocaleString()} TNB paid to players</S.Description>
            </S.Balance>
            <S.Status $available={fund.available}>{availability}</S.Status>
          </S.Statistics>
          <S.Description>
            Rewards are paid from the shared fund when a qualifying computer match ends; coins are not reserved when you
            start. If fewer than 10 TNB are available, free play continues without a reward. Later contributions do not
            pay for earlier wins.
          </S.Description>
        </>
      ) : (
        <S.Description>
          {loadError ? 'The fund balance is temporarily unavailable.' : 'Loading the game fund…'}
        </S.Description>
      )}
      {loadError && (
        <Button
          color={ButtonColor.secondary}
          onClick={() => setRetryKey((value) => value + 1)}
          text="Refresh fund balance"
        />
      )}
      {isAuthenticated ? (
        <S.Form onSubmit={handleReview}>
          <S.Field htmlFor="game-fund-amount">
            Contribute from your TNB wallet
            <S.Input
              id="game-fund-amount"
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
          <Button
            disabled={isSubmitting}
            isValid={Number.isSafeInteger(Number(amount)) && Number(amount) >= 1 && Number(amount) <= 1000000000}
            text="Review contribution"
            type={ButtonType.submit}
          />
        </S.Form>
      ) : (
        <div>
          <S.Description>Sign in to contribute coins from your wallet.</S.Description>
          <AuthButtons />
        </div>
      )}
      {error && !confirmAmount && <S.Error role="alert">{error}</S.Error>}
      {success && <S.Description role="status">{success}</S.Description>}
      {confirmAmount !== null && (
        <Modal
          close={() => {
            if (!isSubmitting) setConfirmAmount(null);
          }}
          disableOverlayClick={isSubmitting}
          header="Confirm game fund contribution"
        >
          <ModalBody>
            <S.Heading>Contribute {confirmAmount.toLocaleString()} TNB?</S.Heading>
            <S.Description>
              This transfers {confirmAmount.toLocaleString()} TNB from your wallet into the community game fund.
              Contributions are final and cannot be withdrawn. The coins fund eligible computer-game rewards for all
              players.
            </S.Description>
            {error && <S.Error role="alert">{error}</S.Error>}
          </ModalBody>
          <ModalFooter>
            <Button
              color={ButtonColor.secondary}
              disabled={isSubmitting}
              onClick={() => setConfirmAmount(null)}
              text="Cancel"
            />
            <Button
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              onClick={handleConfirm}
              text={`Contribute ${confirmAmount.toLocaleString()} TNB`}
            />
          </ModalFooter>
        </Modal>
      )}
    </S.Card>
  );
};

export default GameFund;
