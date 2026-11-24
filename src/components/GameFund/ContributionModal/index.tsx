import {FormEvent, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useDispatch, useSelector} from 'react-redux';
import {mdiClose, mdiHeartOutline} from '@mdi/js';
import Icon from '@mdi/react';

import {depositGameFund} from 'api/gameFund';
import AuthButtons from 'components/AuthButtons';
import Button, {ButtonColor, ButtonType} from 'components/Button';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';
import {AppDispatch} from 'types';
import {GameFund as GameFundData} from 'types/gameFund';
import {captureAnalyticsEvent} from 'utils/analytics';

import * as S from './Styles';

interface ContributionModalProps {
  close(): void;
  onSuccess(fund: GameFundData, message: string): void;
  rewardAmount: number;
}

// Keep ambiguous requests retryable even when the modal is closed and reopened.
const pendingRequests = new Map<string, string>();

const ContributionModal = ({close, onSuccess, rewardAmount}: ContributionModalProps) => {
  const [amount, setAmount] = useState('');
  const [confirmAmount, setConfirmAmount] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const closeCallback = useRef(close);
  const currentViewer = useRef<number | null | undefined>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const heading = useRef<HTMLHeadingElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const isAuthenticated = useIsAuthenticated();
  const live = useRef(true);
  const self = useSelector(getSelf);
  const submissionLock = useRef(false);
  const viewerGeneration = useRef(0);
  const viewerIdentity = `${isAuthenticated}:${self.id}`;
  const previousViewer = useRef(viewerIdentity);

  closeCallback.current = close;
  currentViewer.current = isAuthenticated ? self.id : null;
  if (previousViewer.current !== viewerIdentity) {
    viewerGeneration.current += 1;
    previousViewer.current = viewerIdentity;
  }

  useEffect(() => {
    live.current = true;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (!submissionLock.current) closeCallback.current();
      }
      if (event.key !== 'Tab' || !dialog.current) return;
      const focusable = Array.from(
        dialog.current.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), a[href]'),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first) {
        event.preventDefault();
        heading.current?.focus();
      } else if (
        event.shiftKey &&
        (document.activeElement === first || !focusable.includes(document.activeElement as HTMLElement))
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last || !focusable.includes(document.activeElement as HTMLElement))
      ) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      live.current = false;
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, []);

  useEffect(() => {
    setAmount('');
    setConfirmAmount(null);
    setError('');
    setIsSubmitting(false);
    submissionLock.current = false;
  }, [isAuthenticated, self.id]);

  useEffect(() => {
    if (confirmAmount === null && isAuthenticated) input.current?.focus();
    else heading.current?.focus();
  }, [confirmAmount, isAuthenticated, self.id]);

  const handleClose = () => {
    if (!submissionLock.current) close();
  };

  const handleConfirm = async () => {
    if (confirmAmount === null || !isAuthenticated || !self.id || submissionLock.current) return;
    const viewerId = self.id;
    const generation = viewerGeneration.current;
    const isCurrent = () =>
      live.current && currentViewer.current === viewerId && generation === viewerGeneration.current;
    const requestKey = `${viewerId}:${confirmAmount}`;
    const requestId = pendingRequests.get(requestKey) ?? crypto.randomUUID();
    pendingRequests.set(requestKey, requestId);
    submissionLock.current = true;
    setIsSubmitting(true);
    setError('');
    captureAnalyticsEvent('game_fund_contribution_started', {amount: confirmAmount, currency: 'TNB'});
    try {
      const deposit = await depositGameFund({amount: confirmAmount, request_id: requestId});
      if (!isCurrent()) return;
      if (pendingRequests.get(requestKey) === requestId) pendingRequests.delete(requestKey);
      dispatch(getAllUserWallets()).catch(() => undefined);
      onSuccess(deposit.fund, `Contributed ${deposit.amount.toLocaleString()} TNB to the game fund. Thank you!`);
      close();
    } catch (depositError) {
      if (!isCurrent()) return;
      captureAnalyticsEvent('game_fund_contribution_request_failed', {amount: confirmAmount, currency: 'TNB'});
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
    const value = Number(amount);
    if (!Number.isSafeInteger(value) || value < 1 || value > 1000000000) {
      setError('Enter a whole-number contribution from 1 to 1,000,000,000 TNB.');
      return;
    }
    setConfirmAmount(value);
  };

  return createPortal(
    <>
      <S.Overlay onClick={handleClose} />
      <S.Dialog aria-labelledby="game-contribution-heading" aria-modal="true" ref={dialog} role="dialog">
        <S.CloseButton aria-label="Close contribution" disabled={isSubmitting} onClick={handleClose} type="button">
          <Icon aria-hidden="true" path={mdiClose} size="22px" />
        </S.CloseButton>
        <S.Emblem aria-hidden="true">
          <Icon path={mdiHeartOutline} size="26px" />
        </S.Emblem>
        <S.Eyebrow>THE COMMUNITY GAME FUND</S.Eyebrow>
        <S.Heading id="game-contribution-heading" ref={heading} tabIndex={-1}>
          {confirmAmount === null
            ? 'Give someone their next win.'
            : `Contribute ${confirmAmount.toLocaleString()} TNB?`}
        </S.Heading>
        {!isAuthenticated && (
          <S.GuestActions>
            <S.Description>Sign in to contribute coins from your TNB wallet.</S.Description>
            <AuthButtons analyticsSource="game_fund" onNavigate={close} />
          </S.GuestActions>
        )}
        {isAuthenticated && confirmAmount === null && (
          <S.Form onSubmit={handleReview}>
            <S.Description>
              Every {rewardAmount.toLocaleString()} TNB can fund another winning moment. Choose how much you would like
              to add.
            </S.Description>
            <S.Field htmlFor="game-fund-amount">Contribution amount</S.Field>
            <S.InputWrapper>
              <S.Input
                aria-describedby="game-contribution-note"
                id="game-fund-amount"
                inputMode="numeric"
                max={1000000000}
                min={1}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0"
                ref={input}
                required
                step={1}
                type="number"
                value={amount}
              />
              <S.InputUnit>TNB</S.InputUnit>
            </S.InputWrapper>
            <S.Note id="game-contribution-note">From your TNB wallet. You will review before contributing.</S.Note>
            {error && <S.Error role="alert">{error}</S.Error>}
            <S.Actions>
              <Button color={ButtonColor.secondary} onClick={handleClose} text="Cancel" />
              <S.PrimaryButton
                isValid={Number.isSafeInteger(Number(amount)) && Number(amount) >= 1 && Number(amount) <= 1000000000}
                text="Review contribution"
                type={ButtonType.submit}
              />
            </S.Actions>
          </S.Form>
        )}
        {isAuthenticated && confirmAmount !== null && (
          <>
            <S.Description>
              This transfers {confirmAmount.toLocaleString()} TNB from your wallet into the community game fund.
              Contributions are final and cannot be withdrawn. The coins fund eligible computer-game rewards for all
              players.
            </S.Description>
            {error && <S.Error role="alert">{error}</S.Error>}
            {isSubmitting && <S.Note role="status">Contributing {confirmAmount.toLocaleString()} TNB…</S.Note>}
            <S.Actions>
              <Button
                color={ButtonColor.secondary}
                disabled={isSubmitting}
                onClick={() => {
                  setConfirmAmount(null);
                  setError('');
                }}
                text="Back"
              />
              <S.PrimaryButton
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
                onClick={handleConfirm}
                text={`Contribute ${confirmAmount.toLocaleString()} TNB`}
              />
            </S.Actions>
          </>
        )}
      </S.Dialog>
    </>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default ContributionModal;
