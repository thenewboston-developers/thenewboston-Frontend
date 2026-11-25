import {FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate, Route, Routes} from 'react-router-dom';

import {createCasinoCommitment, getCasino, getCasinoBet, getCasinoBets, placeCasinoBet} from 'api/casino';
import AuthButtons from 'components/AuthButtons';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {getSelf, getWallets} from 'selectors/state';
import {AppDispatch} from 'types';
import {CasinoBet, CasinoFundMovement, CasinoGameId, CasinoSummary} from 'types/casino';
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

const SYMBOLS: Record<string, string> = {bar: 'BAR', bell: '🔔', cherry: '🍒', diamond: '◆', lemon: '🍋', seven: '7'};

const CasinoGame = ({gameId}: {gameId: CasinoGameId}) => {
  const [amount, setAmount] = useState('1');
  const [error, setError] = useState('');
  const [history, setHistory] = useState<CasinoBet[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [pending, setPending] = useState<PendingCasinoBet | null>(null);
  const [receipt, setReceipt] = useState<CasinoBet | null>(null);
  const [selectionType, setSelectionType] = useState('red');
  const [selectionValue, setSelectionValue] = useState('1');
  const [storageError, setStorageError] = useState(false);
  const [summary, setSummary] = useState<CasinoSummary | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useIsAuthenticated();
  const live = useRef(true);
  const requestLock = useRef(false);
  const self = useSelector(getSelf);
  const wallets = useSelector(getWallets);
  const game = summary?.games.find((item) => item.id === gameId);
  const selection = game?.bet_types?.find((item) => item.id === selectionType);
  const maxBet = gameId === 'roulette' ? (selection?.max_bet ?? 0) : (game?.max_bet ?? 0);
  const minBet = game?.min_bet ?? 1;
  const stake = Number(amount);
  const wallet = Object.values(wallets).find((item) => item.currency.ticker === 'TNB' && item.owner === self.id);
  const validAmount = Number.isSafeInteger(stake) && stake >= minBet && stake <= maxBet;
  const needsValue = ['number', 'column', 'dozen'].includes(selectionType);
  const validSelection =
    !needsValue ||
    (Number.isInteger(Number(selectionValue)) &&
      Number(selectionValue) >= (selectionType === 'number' ? 0 : 1) &&
      Number(selectionValue) <= (selectionType === 'number' ? 36 : 3));
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
            ...(gameId === 'roulette'
              ? {selection: {type: selectionType, ...(needsValue ? {value: Number(selectionValue)} : {})}}
              : {}),
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
  const outcome = displayedReceipt?.result;
  let availability = 'Checking availability…';
  if (loadError) availability = 'Casino status unavailable';
  else if (summary && !summary.fund.enabled) availability = 'Casino closed';
  else if (game && (!game.enabled || maxBet < minBet)) availability = 'Wagering temporarily unavailable';
  else if (game) availability = 'Wagering available';
  let stageCaption = gameId === 'slots' ? 'One spin. One result.' : '37 numbers. Choose your wager below.';
  if (isSubmitting) stageCaption = 'Confirming your wager…';
  const valueLabels: Record<string, string> = {
    number: 'Number (0–36)',
    dozen: 'Dozen (1: 1–12, 2: 13–24, 3: 25–36)',
    column: 'Column (1, 2, or 3)',
  };
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
          <S.Title>Casino</S.Title>
          <S.Note>Play with TNB. Every accepted wager has its payout covered.</S.Note>
        </div>
        <S.Status role="status">{availability}</S.Status>
      </S.Header>
      <S.Tabs aria-label="Casino games">
        <S.Tab to="/casino/slots">Slots</S.Tab>
        <S.Tab to="/casino/roulette">Roulette</S.Tab>
      </S.Tabs>
      <S.Grid>
        <S.Stack>
          <S.Card>
            <S.Stage aria-busy={isSubmitting} aria-label={gameId === 'slots' ? 'Slot reels' : 'Roulette result'}>
              <S.Eyebrow style={{color: '#dac48e'}}>
                {gameId === 'slots' ? 'CLASSIC SLOTS · UP TO 100×' : 'SINGLE-ZERO ROULETTE'}
              </S.Eyebrow>
              {gameId === 'slots' ? (
                <S.Reels>
                  {(outcome?.symbols ?? ['★', '7', '◆']).map((symbol, index) => (
                    <S.Reel aria-label={symbol} key={index}>
                      {SYMBOLS[symbol] || symbol}
                    </S.Reel>
                  ))}
                </S.Reels>
              ) : (
                <S.RouletteBall $color={outcome?.color ?? 'green'}>{outcome?.number ?? '?'}</S.RouletteBall>
              )}
              <p>{stageCaption}</p>
            </S.Stage>
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
              {gameId === 'slots' ? (
                <>
                  <S.Note>
                    Maximum payout: 100× your stake. Return to player: 96% over the long run; individual results vary.
                  </S.Note>
                  <S.Table>
                    <thead>
                      <tr>
                        <th>Total return</th>
                        <th>Chance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {game?.payout_table?.map((row) => (
                        <tr key={row.multiplier}>
                          <td>{row.multiplier}×</td>
                          <td>{(row.probability * 100).toLocaleString(undefined, {maximumFractionDigits: 4})}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </S.Table>
                </>
              ) : (
                <>
                  <S.Note>
                    The wheel has 0–36. Zero loses all outside bets. House edge: 2.7027%. One selection per spin.
                  </S.Note>
                  <S.Table>
                    <thead>
                      <tr>
                        <th>Bet</th>
                        <th>Total return</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Red/black, odd/even, low/high</td>
                        <td>2×</td>
                      </tr>
                      <tr>
                        <td>Dozen or column</td>
                        <td>3×</td>
                      </tr>
                      <tr>
                        <td>Single number</td>
                        <td>36×</td>
                      </tr>
                    </tbody>
                  </S.Table>
                </>
              )}
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
            <S.Heading>{gameId === 'slots' ? 'Spin the slots' : 'Place your roulette bet'}</S.Heading>
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
                    {gameId === 'roulette' && (
                      <>
                        <S.Field htmlFor="roulette-selection">
                          Bet on
                          <S.Select
                            disabled={isSubmitting}
                            id="roulette-selection"
                            onChange={(event) => {
                              setSelectionType(event.target.value);
                              setSelectionValue(event.target.value === 'number' ? '0' : '1');
                            }}
                            value={selectionType}
                          >
                            {game?.bet_types?.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.label}
                              </option>
                            ))}
                          </S.Select>
                        </S.Field>
                        {needsValue && (
                          <S.Field htmlFor="roulette-value">
                            {valueLabels[selectionType]}
                            <S.Input
                              disabled={isSubmitting}
                              id="roulette-value"
                              max={selectionType === 'number' ? 36 : 3}
                              min={selectionType === 'number' ? 0 : 1}
                              onChange={(event) => setSelectionValue(event.target.value)}
                              required
                              step={1}
                              type="number"
                              value={selectionValue}
                            />
                          </S.Field>
                        )}
                      </>
                    )}
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
                        : `${gameId === 'slots' ? 'Spin' : 'Bet'} ${Number.isSafeInteger(stake) && stake > 0 ? stake.toLocaleString() : '—'} TNB`}
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

const Casino = () => {
  const isAuthenticated = useIsAuthenticated();
  const self = useSelector(getSelf);
  const viewerKey = isAuthenticated ? String(self.id) : 'guest';
  return (
    <Routes>
      <Route element={<CasinoGame gameId="slots" key={`${viewerKey}:slots`} />} path="slots" />
      <Route element={<CasinoGame gameId="roulette" key={`${viewerKey}:roulette`} />} path="roulette" />
      <Route element={<Navigate replace to="/casino/slots" />} path="*" />
    </Routes>
  );
};

export default Casino;
