import {FormEvent, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiAccountGroupOutline, mdiTrophyOutline, mdiWalletOutline} from '@mdi/js';
import Icon from '@mdi/react';

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
      <S.Hero>
        <S.Overview>
          <S.Eyebrow>POWERED BY THE COMMUNITY</S.Eyebrow>
          <S.Heading id="game-fund-title">
            Small contributions.
            <br />
            More rewarding wins.
          </S.Heading>
          <S.HeroDescription>
            The community game fund turns donated coins into rewards for players. Beat the computer with an account to
            earn {fund?.reward_amount ?? 10} TNB when the fund can cover your win.
          </S.HeroDescription>
          <S.Flow aria-label="How the community game fund works">
            <S.FlowStep>
              <S.StepIcon>
                <Icon aria-hidden="true" path={mdiAccountGroupOutline} size="22px" />
              </S.StepIcon>
              <span>
                Members
                <br />
                <strong>contribute</strong>
              </span>
            </S.FlowStep>
            <S.FlowConnector aria-hidden="true" />
            <S.FlowStep>
              <S.StepIcon>
                <Icon aria-hidden="true" path={mdiWalletOutline} size="22px" />
              </S.StepIcon>
              <span>
                Shared fund
                <br />
                <strong>fills up</strong>
              </span>
            </S.FlowStep>
            <S.FlowConnector aria-hidden="true" />
            <S.FlowStep>
              <S.StepIcon>
                <Icon aria-hidden="true" path={mdiTrophyOutline} size="22px" />
              </S.StepIcon>
              <span>
                You win
                <br />
                <strong>earn coins</strong>
              </span>
            </S.FlowStep>
          </S.Flow>
        </S.Overview>
        <S.Pool aria-label="Community game fund balance">
          <S.PoolHeader>
            <S.PoolLabel>Community game fund</S.PoolLabel>
            <S.Coin aria-hidden="true">₮</S.Coin>
          </S.PoolHeader>
          {fund ? (
            <>
              <S.BalanceLabel>{loadError ? 'Last known balance' : 'Available to win'}</S.BalanceLabel>
              <S.Amount>
                {fund.balance.toLocaleString()} <span>TNB</span>
              </S.Amount>
              <S.FundedWins>{fund.wins_remaining.toLocaleString()} rewards funded</S.FundedWins>
              <S.PoolFooter>
                <S.Status $available={fund.available && !loadError}>
                  {loadError ? 'Update unavailable' : availability}
                </S.Status>
                <S.PaidTotal>{fund.total_paid.toLocaleString()} TNB paid to players</S.PaidTotal>
              </S.PoolFooter>
            </>
          ) : (
            <S.HeroDescription role="status">
              {loadError ? 'The fund balance is temporarily unavailable.' : 'Loading the game fund…'}
            </S.HeroDescription>
          )}
          {loadError && (
            <S.RefreshButton onClick={() => setRetryKey((value) => value + 1)} type="button">
              Refresh fund balance
            </S.RefreshButton>
          )}
        </S.Pool>
      </S.Hero>
      <S.Contribution>
        <div>
          <S.ContributionTitle>Keep the good games going.</S.ContributionTitle>
          <S.Description>Every {fund?.reward_amount ?? 10} TNB can fund another winning moment.</S.Description>
        </div>
        {isAuthenticated ? (
          <S.Form onSubmit={handleReview}>
            <S.Field htmlFor="game-fund-amount">
              Contribute from your TNB wallet
              <S.InputWrapper>
                <S.Input
                  id="game-fund-amount"
                  inputMode="numeric"
                  max={1000000000}
                  min={1}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="Amount"
                  required
                  step={1}
                  type="number"
                  value={amount}
                />
                <S.InputUnit aria-hidden="true">TNB</S.InputUnit>
              </S.InputWrapper>
            </S.Field>
            <Button
              disabled={isSubmitting}
              isValid={Number.isSafeInteger(Number(amount)) && Number(amount) >= 1 && Number(amount) <= 1000000000}
              text="Review contribution"
              type={ButtonType.submit}
            />
          </S.Form>
        ) : (
          <S.GuestActions>
            <S.Description>Sign in to contribute or earn rewards.</S.Description>
            <AuthButtons />
          </S.GuestActions>
        )}
      </S.Contribution>
      <S.RewardDetails>
        <summary>How rewards work</summary>
        <S.Description>
          Sign in before starting a computer match to qualify. Rewards are paid when a qualifying match ends; coins are
          not reserved when you start. If fewer than {fund?.reward_amount ?? 10} TNB are available or rewards are
          paused, free play continues without a reward. Guest wins do not earn coins, and later contributions or account
          creation do not pay for earlier wins.
        </S.Description>
      </S.RewardDetails>
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
