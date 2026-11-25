import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {createCasinoCommitment, getCasino, getCasinoBet, getCasinoBets, placeCasinoBet} from 'api/casino';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {getSelf, getWallets} from 'selectors/state';
import {setWallet} from 'store/wallets';
import {AppDispatch} from 'types';
import {CasinoBet, CasinoFundMovement, CasinoGameId, CasinoSummary, RouletteSelection} from 'types/casino';
import {
  casinoErrorMessage,
  clearPendingCasinoBet,
  isDefiniteCasinoRejection,
  PendingCasinoBet,
  readPendingCasinoBet,
  savePendingCasinoBet,
} from 'utils/casino';

interface CasinoWagerOptions {
  gameId: CasinoGameId;
  // Roulette passes its selection; its bet type sets the wager limit.
  selection?: RouletteSelection;
  validSelection?: boolean;
}

/**
 * Wager state and the safe placement flow shared by every casino game: a full request is persisted before it is
 * sent, so an uncertain response is retried with the same request ID instead of creating a second wager.
 */
const useCasinoWager = ({gameId, selection, validSelection = true}: CasinoWagerOptions) => {
  const [amount, setAmount] = useState('1');
  const [error, setError] = useState('');
  const [history, setHistory] = useState<CasinoBet[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [pending, setPending] = useState<PendingCasinoBet | null>(null);
  const [receipt, setReceipt] = useState<CasinoBet | null>(null);
  const [storageError, setStorageError] = useState(false);
  const [summary, setSummary] = useState<CasinoSummary | null>(null);
  const [unfinishedGame, setUnfinishedGame] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useIsAuthenticated();
  const live = useRef(true);
  const refreshGeneration = useRef(0);
  const requestGeneration = useRef(0);
  const requestLock = useRef(false);
  const self = useSelector(getSelf);
  const wallets = useSelector(getWallets);
  const game = summary?.games.find((item) => item.id === gameId);
  const betType = selection ? game?.bet_types?.find((item) => item.id === selection.type) : undefined;
  const maxBet = selection ? (betType?.max_bet ?? 0) : (game?.max_bet ?? 0);
  const minBet = game?.min_bet ?? 1;
  const stake = Number(amount);
  const wallet = Object.values(wallets).find((item) => item.currency.ticker === 'TNB' && item.owner === self.id);
  const walletRef = useRef(wallet);
  walletRef.current = wallet;
  const validAmount = Number.isSafeInteger(stake) && stake >= minBet && stake <= maxBet;
  const available = !!summary?.fund.enabled && !!game?.enabled && maxBet >= minBet && !loadError;
  const canPlace =
    available && validAmount && validSelection && !isSubmitting && !storageError && !!wallet && stake <= wallet.balance;

  const refresh = useCallback(async () => {
    refreshGeneration.current += 1;
    const generation = refreshGeneration.current;
    try {
      const data = await getCasino();
      if (live.current && generation === refreshGeneration.current) {
        setSummary(data);
        setLoadError(false);
      }
    } catch {
      if (live.current && generation === refreshGeneration.current) setLoadError(true);
    }
  }, []);

  const acceptReceipt = useCallback(
    (bet: CasinoBet, userId: number) => {
      if (bet.status !== 'settled') return;
      clearPendingCasinoBet(userId, bet.request_id);
      if (!live.current) return;
      const currentWallet = walletRef.current;
      if (currentWallet?.owner === userId && bet.wallet_modified_date) {
        // Apply the balance and revision together. Redux rejects delayed snapshots, including updates
        // within the same millisecond, so fast consecutive wagers need not wait for a wallet fetch.
        dispatch(setWallet({...currentWallet, balance: bet.wallet_balance, modified_date: bet.wallet_modified_date}));
      }
      setPending(null);
      setReceipt(bet);
      setHistory((previous) => [bet, ...previous.filter((item) => item.request_id !== bet.request_id)].slice(0, 20));
      setError('');
      setUnfinishedGame(false);
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
          const generation = requestGeneration.current;
          setPending(saved);
          setError('Checking your previous bet. New bets are paused until its result is confirmed.');
          getCasinoBet(saved.payload.request_id)
            .then((bet) => {
              if (generation === requestGeneration.current) acceptReceipt(bet, userId);
            })
            .catch(() => {
              if (live.current && generation === requestGeneration.current)
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
      requestGeneration.current += 1;
      clearInterval(timer);
    };
  }, [acceptReceipt, dispatch, isAuthenticated, refresh, self.id]);

  const handleFundSuccess = (result: CasinoFundMovement) => {
    setSummary((previous) => (previous ? {...previous, fund: result.fund} : previous));
    dispatch(getAllUserWallets()).catch(() => undefined);
    refresh();
  };

  // Resolves with the settled bet, or null when nothing was confirmed (the error explains what happens next).
  const place = async (): Promise<CasinoBet | null> => {
    if (!self.id || !isAuthenticated || requestLock.current || storageError) return null;
    if (!pending && (!available || !validAmount || !validSelection || !game || !wallet || stake > wallet.balance))
      return null;
    const userId = self.id;
    // A manual retry supersedes automatic recovery. Its delayed response must not clear a later pending bet.
    requestGeneration.current += 1;
    requestLock.current = true;
    setIsSubmitting(true);
    setError('');
    let request = pending;
    try {
      request = readPendingCasinoBet(userId) || request;
      if (!request) {
        const commitment = await createCasinoCommitment();
        if (!live.current) return null;
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
      return bet.status === 'settled' ? bet : null;
    } catch (caught) {
      if (!live.current) return null;
      setUnfinishedGame((caught as {response?: {data?: {code?: string}}}).response?.data?.code === 'game_in_progress');
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
      return null;
    } finally {
      requestLock.current = false;
      if (live.current) setIsSubmitting(false);
    }
  };

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

  return {
    amount,
    availability,
    available,
    canPlace,
    error,
    game,
    handleFundSuccess,
    history,
    isAuthenticated,
    isSubmitting,
    loadError,
    maxBet,
    minBet,
    pending,
    place,
    receipt,
    refresh,
    self,
    setAmount,
    setReceipt,
    stake,
    storageError,
    summary,
    unavailableMessage,
    unfinishedGame,
    validAmount,
    wallet,
  };
};

export type CasinoWager = ReturnType<typeof useCasinoWager>;

export default useCasinoWager;
