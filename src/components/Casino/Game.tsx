import {FormEvent, ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {createCasinoCommitment, getCasino, getCasinoBet, getCasinoBets, placeCasinoBet} from 'api/casino';
import AuthButtons from 'components/AuthButtons';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {getSelf, getWallets} from 'selectors/state';
import {AppDispatch} from 'types';
import {
  CasinoBet,
  CasinoFundMovement,
  CasinoGame as CasinoGameConfig,
  CasinoGameId,
  CasinoSummary,
  RouletteSelection,
} from 'types/casino';
import {
  casinoErrorMessage,
  clearPendingCasinoBet,
  isDefiniteCasinoRejection,
  PendingCasinoBet,
  readPendingCasinoBet,
  savePendingCasinoBet,
} from 'utils/casino';

import FundControls from './FundControls';
import Receipt from './Receipt';
import * as S from './Styles';

interface CasinoGameProps {
  gameId: CasinoGameId;
  heading: string;
  renderControls?: (props: {disabled: boolean; game?: CasinoGameConfig}) => ReactNode;
  renderRules: (game?: CasinoGameConfig) => ReactNode;
  renderStage: (props: {isSubmitting: boolean; receipt: CasinoBet | null}) => ReactNode;
  selection?: RouletteSelection;
  title: string;
  validSelection?: boolean;
  verb: string;
}

const CasinoGame = ({
  gameId,
  heading,
  renderControls,
  renderRules,
  renderStage,
  selection,
  title,
  validSelection = true,
  verb,
}: CasinoGameProps) => {
  const [amount, setAmount] = useState('1');
  const [error, setError] = useState('');
  const [history, setHistory] = useState<CasinoBet[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [pending, setPending] = useState<PendingCasinoBet | null>(null);
  const [receipt, setReceipt] = useState<CasinoBet | null>(null);
  const [storageError, setStorageError] = useState(false);
  const [summary, setSummary] = useState<CasinoSummary | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useIsAuthenticated();
  const live = useRef(true);
  const requestLock = useRef(false);
  const self = useSelector(getSelf);
  const wallets = useSelector(getWallets);
  const game = summary?.games.find((item) => item.id === gameId);
  const betType = game?.bet_types?.find((item) => item.id === selection?.type);
  const maxBet = selection ? (betType?.max_bet ?? 0) : (game?.max_bet ?? 0);
  const minBet = game?.min_bet ?? 1;
  const stake = Number(amount);
  const wallet = Object.values(wallets).find((item) => item.currency.ticker === 'TNB' && item.owner === self.id);
  const validAmount = Number.isSafeInteger(stake) && stake >= minBet && stake <= maxBet;
  const available = !!summary?.fund.enabled && !!game?.enabled && maxBet >= minBet && !loadError;

  const refresh = useCallback(async () => {
    try {
      const data = await getCasino();
      if (live.current) {
        setSummary(data);
        setLoadError(false);
      }
    } catch {
      if (live.current) setLoadError(true);
    }
  }, []);

  const acceptReceipt = useCallback(
    (bet: CasinoBet, userId: number) => {
      if (bet.status !== 'settled') return;
      clearPendingCasinoBet(userId, bet.request_id);
      if (!live.current) return;
      setPending(null);
      setReceipt(bet);
      setHistory((previous) => [bet, ...previous.filter((item) => item.request_id !== bet.request_id)].slice(0, 20));
      setError('');
      dispatch(getAllUserWallets()).catch(() => undefined);
      refresh();
    },
    [dispatch, refresh],
  );

  useEffect(() => {
    live.current = true;
    refresh();
    const timer = setInterval(refresh, 15000);
    if (isAuthenticated && self.id) {
      const userId = self.id;
      dispatch(getAllUserWallets()).catch(() => undefined);
      getCasinoBets()
        .then((bets) => {
          if (live.current)
            setHistory((previous) =>
              [
                ...previous,
                ...bets.filter(
                  (bet) => bet.status === 'settled' && !previous.some((item) => item.request_id === bet.request_id),
                ),
              ].slice(0, 20),
            );
        })
        .catch(() => undefined);
      try {
        const saved = readPendingCasinoBet(userId);
        if (saved) {
          setPending(saved);
          setError('Checking your previous bet. New bets are paused until its result is confirmed.');
          getCasinoBet(saved.payload.request_id)
            .then((bet) => acceptReceipt(bet, userId))
            .catch(() => {
              if (live.current)
                setError(
                  'Your previous bet is not confirmed yet. Retry the same bet to safely complete or recover it.',
                );
            });
        }
      } catch {
        setStorageError(true);
        setError('Saved bet recovery is unavailable. Check your bet history before placing another wager.');
      }
    }
    return () => {
      live.current = false;
      clearInterval(timer);
    };
  }, [acceptReceipt, dispatch, isAuthenticated, refresh, self.id]);

  const handleFundSuccess = (result: CasinoFundMovement) => {
    setSummary((previous) => (previous ? {...previous, fund: result.fund} : previous));
    dispatch(getAllUserWallets()).catch(() => undefined);
    refresh();
  };

  const handlePlace = async (event?: FormEvent) => {
    event?.preventDefault();
    if (!self.id || !isAuthenticated || requestLock.current || storageError) return;
    if (!pending && (!available || !validAmount || !validSelection || !game)) return;
    const userId = self.id;
    requestLock.current = true;
    setIsSubmitting(true);
    setError('');
    let request = pending;
    try {
      request = readPendingCasinoBet(userId) || request;
      if (!request) {
        const commitment = await createCasinoCommitment();
        if (!live.current) return;
        request = {
          payload: {
            amount: stake,
            client_seed: crypto.randomUUID(),
            commitment_id: commitment.id,
            game: gameId,
            request_id: crypto.randomUUID(),
            rules_version: game!.rules_version,
            ...(selection ? {selection} : {}),
          },
          serverSeedHash: commitment.server_seed_hash,
        };
        savePendingCasinoBet(userId, request);
      }
      setPending(request);
      const bet = await placeCasinoBet(request.payload);
      acceptReceipt(bet, userId);
    } catch (caught) {
      if (!live.current) return;
      if (request && isDefiniteCasinoRejection(caught)) {
        clearPendingCasinoBet(userId, request.payload.request_id);
        setPending(null);
        refresh();
      }
      setError(
        casinoErrorMessage(
          caught,
          request
            ? 'We could not confirm your bet. Retry the same bet without paying twice.'
            : 'Unable to prepare this bet. No coins were charged. Please try again.',
        ),
      );
    } finally {
      requestLock.current = false;
      if (live.current) setIsSubmitting(false);
    }
  };

  const displayedReceipt = receipt?.game === gameId ? receipt : null;
  let availability = 'Checking availability…';
  if (loadError) availability = 'Casino status unavailable';
  else if (summary && !summary.fund.enabled) availability = 'Casino closed';
  else if (game && (!game.enabled || maxBet < minBet)) availability = 'Wagering temporarily unavailable';
  else if (game) availability = 'Wagering available';
  let unavailableMessage =
    'The casino fund cannot cover the minimum wager for this selection. Please check back later.';
  if (!game?.enabled) unavailableMessage = 'This game is currently closed.';
  if (!summary?.fund.enabled) unavailableMessage = 'The casino is closed to new wagers.';
  if (loadError) unavailableMessage = 'Refresh the casino status before placing a bet.';

  return (
    <S.Container>
      <S.BackLink to="/games">← All games</S.BackLink>
      <S.Header>
        <div>
          <S.Eyebrow>THE THENEWBOSTON CASINO</S.Eyebrow>
          <S.Title>{title}</S.Title>
          <S.Note>Play with TNB. Every accepted wager has its payout covered.</S.Note>
        </div>
        <S.Status role="status">{availability}</S.Status>
      </S.Header>
      <S.Tabs aria-label="Casino games">
        <S.Tab to="/slots/home">Slots</S.Tab>
        <S.Tab to="/roulette/home">Roulette</S.Tab>
      </S.Tabs>
      <S.Grid>
        <S.Stack>
          <S.Card>
            {renderStage({isSubmitting, receipt: displayedReceipt})}
            {displayedReceipt && (
              <S.Result role="status">
                <strong>
                  {displayedReceipt.payout
                    ? `${displayedReceipt.payout.toLocaleString()} TNB returned`
                    : 'No payout this round'}
                </strong>
                <br />
                Stake: {displayedReceipt.amount.toLocaleString()} TNB · Net {displayedReceipt.profit >= 0 ? '+' : ''}
                {displayedReceipt.profit.toLocaleString()} TNB
              </S.Result>
            )}
            <S.Details>
              <summary>Rules & payouts</summary>
              <S.Note>All multipliers include your original stake. Your wager settles immediately.</S.Note>
              {renderRules(game)}
            </S.Details>
            {receipt && self.id && <Receipt bet={receipt} key={receipt.request_id} userId={self.id} />}
          </S.Card>
          <S.Card>
            <S.Heading>Recent bets</S.Heading>
            {history.length ? (
              <S.Table>
                <thead>
                  <tr>
                    <th>Game</th>
                    <th>Stake</th>
                    <th>Returned</th>
                    <th>Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {history.slice(0, 10).map((bet) => (
                    <tr key={bet.request_id}>
                      <td>{bet.game === 'slots' ? 'Slots' : 'Roulette'}</td>
                      <td>{bet.amount.toLocaleString()}</td>
                      <td>{bet.payout.toLocaleString()}</td>
                      <td>
                        <button onClick={() => setReceipt(bet)} type="button">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </S.Table>
            ) : (
              <S.Note>
                {isAuthenticated ? 'Your settled bets will appear here.' : 'Sign in to view your bet history.'}
              </S.Note>
            )}
          </S.Card>
        </S.Stack>
        <S.Stack>
          <S.Card>
            <S.Heading>{heading}</S.Heading>
            {!isAuthenticated ? (
              <>
                <S.Note>Sign in to wager coins from your TNB wallet.</S.Note>
                <AuthButtons />
              </>
            ) : (
              <>
                <S.Note>
                  Your wallet:{' '}
                  <strong>{wallet ? `${wallet.balance.toLocaleString()} TNB` : 'No TNB balance available'}</strong>
                </S.Note>
                {pending ? (
                  <>
                    <S.Note>
                      A {pending.payload.amount.toLocaleString()} TNB {pending.payload.game} bet is awaiting
                      confirmation. Retrying uses the same wager, even after refreshing this page.
                    </S.Note>
                    <S.Button disabled={isSubmitting} onClick={() => handlePlace()} type="button">
                      {isSubmitting ? 'Checking your bet…' : 'Retry same bet'}
                    </S.Button>
                  </>
                ) : (
                  <form onSubmit={handlePlace}>
                    {renderControls?.({disabled: isSubmitting, game})}
                    <S.Field htmlFor="casino-bet-amount">
                      Wager (TNB)
                      <S.Input
                        aria-describedby="casino-bet-limit"
                        disabled={isSubmitting}
                        id="casino-bet-amount"
                        inputMode="numeric"
                        min={minBet}
                        onChange={(event) => setAmount(event.target.value)}
                        required
                        step={1}
                        type="number"
                        value={amount}
                      />
                    </S.Field>
                    <S.Note id="casino-bet-limit">
                      {game
                        ? `Minimum ${minBet.toLocaleString()} · Maximum ${maxBet.toLocaleString()} TNB`
                        : 'Loading bet limits…'}
                    </S.Note>
                    {stake > maxBet && available && (
                      <S.Error role="alert">
                        This bet is above the current limit. You can wager up to {maxBet.toLocaleString()} TNB.
                      </S.Error>
                    )}
                    {!available && game && <S.Note>{unavailableMessage}</S.Note>}
                    {wallet && stake > wallet.balance && (
                      <S.Note>Your TNB wallet does not have enough coins for this wager.</S.Note>
                    )}
                    <S.Button
                      disabled={
                        !available ||
                        !validAmount ||
                        !validSelection ||
                        isSubmitting ||
                        storageError ||
                        !wallet ||
                        stake > wallet.balance
                      }
                      type="submit"
                    >
                      {isSubmitting
                        ? 'Checking your bet…'
                        : `${verb} ${Number.isSafeInteger(stake) && stake > 0 ? stake.toLocaleString() : '—'} TNB`}
                    </S.Button>
                  </form>
                )}
              </>
            )}
            {error && <S.Error role="alert">{error}</S.Error>}
            {loadError && (
              <S.SecondaryButton onClick={refresh} type="button">
                Refresh casino status
              </S.SecondaryButton>
            )}
          </S.Card>
          <S.Card>
            <S.Eyebrow>THE CASINO FUND</S.Eyebrow>
            <S.Heading>Every wager is covered.</S.Heading>
            <S.Note>Separate from the board-game reward pool. Bet limits adjust to the funds available.</S.Note>
            <S.FundGrid>
              <div>
                <dt>Total</dt>
                <dd>
                  {summary?.fund.balance.toLocaleString() ?? '—'} <small>TNB</small>
                </dd>
              </div>
              <div>
                <dt>Reserved</dt>
                <dd>
                  {summary?.fund.reserved.toLocaleString() ?? '—'} <small>TNB</small>
                </dd>
              </div>
              <div>
                <dt>Available</dt>
                <dd>
                  {summary?.fund.available.toLocaleString() ?? '—'} <small>TNB</small>
                </dd>
              </div>
            </S.FundGrid>
          </S.Card>
          {summary?.can_manage && self.id && <FundControls onSuccess={handleFundSuccess} userId={self.id} />}
        </S.Stack>
      </S.Grid>
    </S.Container>
  );
};

export default CasinoGame;
