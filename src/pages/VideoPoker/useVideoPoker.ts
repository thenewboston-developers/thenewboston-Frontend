import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  actOnCasinoBet,
  createCasinoCommitment,
  getActiveCasinoBet,
  getCasino,
  getCasinoBet,
  getCasinoBets,
  placeCasinoBet,
} from 'api/casino';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {getSelf, getWallets} from 'selectors/state';
import {AppDispatch} from 'types';
import {CasinoBet, CasinoSummary, VideoPokerBet} from 'types/casino';
import {
  casinoErrorMessage,
  clearPendingCasinoBet,
  isDefiniteCasinoRejection,
  PendingCasinoBet,
  readPendingCasinoBet,
  savePendingCasinoBet,
} from 'utils/casino';

import {
  clearPendingVideoPokerDraw,
  PendingVideoPokerDraw,
  readPendingVideoPokerDraw,
  savePendingVideoPokerDraw,
} from './storage';
import {coinRange, holdsToAction, isVideoPokerBet, playableCoinValues} from './utils';

const COINS_KEY = 'thenewboston.videoPoker.coins';
const COIN_VALUE_KEY = 'thenewboston.videoPoker.coinValue';

const readNumber = (key: string, fallback: number) => {
  try {
    const value = Number(localStorage.getItem(key));
    return Number.isSafeInteger(value) && value > 0 ? value : fallback;
  } catch {
    return fallback;
  }
};

const remember = (key: string, value: number) => {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    /* The bet size is a convenience; play continues without it. */
  }
};

/**
 * Server state of the machine: the wager, the open or last hand, and safe recovery. A wager and a draw are each
 * saved before they are sent, so a reload or an uncertain response repeats the same request and never a new one.
 */
const useVideoPoker = () => {
  const [chosenCoins, setChosenCoins] = useState(() => readNumber(COINS_KEY, 1));
  const [chosenValue, setChosenValue] = useState(() => readNumber(COIN_VALUE_KEY, 1));
  const [error, setError] = useState('');
  const [history, setHistory] = useState<VideoPokerBet[]>([]);
  const [isBusy, setIsBusy] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [pendingBet, setPendingBet] = useState<PendingCasinoBet | null>(null);
  const [pendingDraw, setPendingDraw] = useState<PendingVideoPokerDraw | null>(null);
  const [receipt, setReceipt] = useState<CasinoBet | null>(null);
  const [storageError, setStorageError] = useState(false);
  const [summary, setSummary] = useState<CasinoSummary | null>(null);
  const current = useRef<CasinoBet | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const epoch = useRef(0);
  const isAuthenticated = useIsAuthenticated();
  const lock = useRef(false);
  const self = useSelector(getSelf);
  const wallets = useSelector(getWallets);
  const game = summary?.games.find((item) => item.id === 'video_poker');
  const hand = isVideoPokerBet(receipt) ? receipt : null;
  const maxBet = game?.max_bet ?? 0;
  const minBet = game?.min_bet ?? 1;
  const wallet = Object.values(wallets).find((item) => item.currency.ticker === 'TNB' && item.owner === self.id);
  const coinValues = playableCoinValues(minBet, maxBet);
  const coinValue = coinValues.includes(chosenValue) ? chosenValue : (coinValues[0] ?? 1);
  const range = coinRange(coinValue, minBet, maxBet);
  const coins = range ? Math.min(range.max, Math.max(range.min, chosenCoins)) : 1;
  const stake = coins * coinValue;
  const available = !!summary?.fund.enabled && !!game?.enabled && !!range && !loadError;
  // Bet Max plays as many coins as the table and the wallet allow.
  const maxCoins = range ? Math.min(range.max, Math.floor((wallet?.balance ?? 0) / coinValue)) : 0;
  const canWager =
    isAuthenticated &&
    isReady &&
    available &&
    !!wallet &&
    !isBusy &&
    !storageError &&
    !pendingBet &&
    !pendingDraw &&
    receipt?.status !== 'open';
  const canDeal = canWager && stake <= (wallet?.balance ?? 0);

  const accept = useCallback(
    (bet: CasinoBet) => {
      if (!self.id) return;
      const previous = current.current;
      // Confirmation resolves a matching saved request even when a newer hand is already on screen.
      try {
        clearPendingCasinoBet(self.id, bet.request_id);
        setPendingBet((saved) => (saved?.payload.request_id === bet.request_id ? null : saved));
        if (bet.status === 'settled') {
          clearPendingVideoPokerDraw(self.id, bet.request_id);
          setPendingDraw((saved) => (saved?.requestId === bet.request_id ? null : saved));
          if (isVideoPokerBet(bet))
            setHistory((previousBets) =>
              [bet, ...previousBets.filter((item) => item.id !== bet.id)].sort((a, b) => b.id - a.id).slice(0, 20),
            );
        }
      } catch {
        setStorageError(true);
        setError('The hand is saved on the server, but browser recovery storage is unavailable.');
      }
      // A poll started before a draw must never bring back an older hand or the controls of a settled one.
      if (
        previous &&
        (bet.id < previous.id || (bet.id === previous.id && previous.status === 'settled' && bet.status === 'open'))
      )
        return;
      current.current = bet;
      setReceipt(bet);
      dispatch(getAllUserWallets()).catch(() => undefined);
    },
    [dispatch, self.id],
  );

  const refresh = useCallback(async () => {
    const version = epoch.current;
    try {
      const data = await getCasino();
      if (epoch.current !== version) return;
      setSummary(data);
      setLoadError(false);
    } catch {
      if (epoch.current === version) setLoadError(true);
    }
  }, []);

  useEffect(() => {
    epoch.current += 1;
    const version = epoch.current;
    current.current = null;
    lock.current = false;
    setError('');
    setHistory([]);
    setIsBusy(false);
    setIsReady(false);
    setPendingBet(null);
    setPendingDraw(null);
    setReceipt(null);
    setStorageError(false);
    setSummary(null);
    refresh();
    const load = async () => {
      if (!isAuthenticated || !self.id) return;
      let savedBet: PendingCasinoBet | null;
      let savedDraw: PendingVideoPokerDraw | null;
      try {
        savedBet = readPendingCasinoBet(self.id);
        savedDraw = readPendingVideoPokerDraw(self.id);
        setPendingBet(savedBet);
        setPendingDraw(savedDraw);
      } catch {
        setStorageError(true);
        setError('Saved wager recovery is unavailable. Check your hand and history before wagering again.');
        return;
      }
      try {
        const active = await getActiveCasinoBet();
        if (epoch.current !== version) return;
        if (active) accept(active);
        const requestId = savedDraw?.requestId ?? savedBet?.payload.request_id;
        if (requestId && active?.request_id !== requestId) {
          try {
            const recovered = await getCasinoBet(requestId);
            if (epoch.current !== version) return;
            accept(recovered);
          } catch {
            if (epoch.current === version)
              setError('Your previous request is not confirmed. Retry that same request to recover it safely.');
          }
        }
        if (epoch.current === version) setIsReady(true);
      } catch {
        if (epoch.current === version)
          setError('Unable to check for an unfinished hand. Reconnect before starting a new wager.');
      }
      getCasinoBets()
        .then((bets) => {
          if (epoch.current !== version) return;
          setHistory((previous) =>
            [
              ...previous,
              ...bets.filter(
                (bet): bet is VideoPokerBet =>
                  isVideoPokerBet(bet) && bet.status === 'settled' && !previous.some((item) => item.id === bet.id),
              ),
            ]
              .sort((a, b) => b.id - a.id)
              .slice(0, 20),
          );
        })
        .catch(() => undefined);
      dispatch(getAllUserWallets()).catch(() => undefined);
    };
    load();
    const timer = setInterval(() => {
      refresh();
      // The server draws an abandoned hand by itself when its time runs out; this picks that result up.
      if (current.current?.status === 'open' && !lock.current) {
        getCasinoBet(current.current.request_id)
          .then((bet) => {
            if (epoch.current === version) accept(bet);
          })
          .catch(() => undefined);
      }
    }, 5000);
    return () => {
      epoch.current += 1;
      clearInterval(timer);
    };
  }, [accept, dispatch, isAuthenticated, refresh, self.id]);

  // With no argument this repeats the saved draw; otherwise it draws to the given held cards.
  const draw = async (held?: boolean[]) => {
    if (!self.id || !isAuthenticated || lock.current || storageError) return;
    const version = epoch.current;
    lock.current = true;
    setIsBusy(true);
    setError('');
    let saved: PendingVideoPokerDraw | null = null;
    try {
      saved = readPendingVideoPokerDraw(self.id) ?? pendingDraw;
      if (!saved) {
        if (!hand || hand.status !== 'open' || !held || !hand.result.available_actions.includes('draw')) return;
        saved = {
          payload: {
            action: holdsToAction(held),
            action_id: crypto.randomUUID(),
            expected_revision: hand.result.revision,
          },
          requestId: hand.request_id,
        };
        savePendingVideoPokerDraw(self.id, saved);
      }
      setPendingDraw(saved);
      const bet = await actOnCasinoBet(saved.requestId, saved.payload);
      if (epoch.current !== version) return;
      accept(bet);
      clearPendingVideoPokerDraw(self.id, saved.requestId);
      setPendingDraw(null);
      refresh();
    } catch (caught) {
      if (epoch.current !== version) return;
      const {response} = caught as {response?: {status?: number; data?: {code?: string}}};
      // A draw the server rejected cannot succeed on a later retry. Recover the authoritative hand first.
      if (saved && [400, 404, 409].includes(response?.status ?? 0)) {
        try {
          const recovered = await getCasinoBet(saved.requestId);
          if (epoch.current !== version) return;
          accept(recovered);
          clearPendingVideoPokerDraw(self.id, saved.requestId);
          setPendingDraw(null);
        } catch {
          /* Retain the original draw until its state can be confirmed. */
        }
      }
      setError(
        casinoErrorMessage(caught, 'We could not confirm this draw. Retry the same draw; it will only happen once.'),
      );
    } finally {
      if (epoch.current === version) {
        lock.current = false;
        setIsBusy(false);
      }
    }
  };

  // Deals the chosen wager, or `amount` when Bet Max picks it. A saved wager is always repeated unchanged.
  const deal = async (amount = stake) => {
    if (!self.id || !isAuthenticated || lock.current || storageError) return;
    if (!pendingBet && (!canWager || amount > (wallet?.balance ?? 0) || amount < minBet || amount > maxBet)) return;
    const version = epoch.current;
    lock.current = true;
    setIsBusy(true);
    setError('');
    let saved: PendingCasinoBet | null = null;
    try {
      saved = readPendingCasinoBet(self.id) ?? pendingBet;
      if (!saved) {
        const commitment = await createCasinoCommitment();
        if (epoch.current !== version) return;
        saved = {
          payload: {
            amount,
            client_seed: crypto.randomUUID(),
            commitment_id: commitment.id,
            game: 'video_poker',
            request_id: crypto.randomUUID(),
            rules_version: game!.rules_version,
          },
          serverSeedHash: commitment.server_seed_hash,
        };
        savePendingCasinoBet(self.id, saved);
      }
      setPendingBet(saved);
      const bet = await placeCasinoBet(saved.payload);
      if (epoch.current !== version) return;
      accept(bet);
      refresh();
    } catch (caught) {
      if (epoch.current !== version) return;
      if (saved && isDefiniteCasinoRejection(caught)) {
        clearPendingCasinoBet(self.id, saved.payload.request_id);
        setPendingBet(null);
        refresh();
        // Another game's hand may be the reason; show it so the member can go and finish it.
        getActiveCasinoBet()
          .then((active) => {
            if (epoch.current === version && active) accept(active);
          })
          .catch(() => undefined);
      }
      setError(
        casinoErrorMessage(
          caught,
          saved
            ? 'We could not confirm the deal. Retry the same bet without paying twice.'
            : 'Unable to prepare this hand. No coins were charged.',
        ),
      );
    } finally {
      if (epoch.current === version) {
        lock.current = false;
        setIsBusy(false);
      }
    }
  };

  const setCoins = (value: number) => {
    setChosenCoins(value);
    remember(COINS_KEY, value);
  };

  const betOne = () => {
    if (range) setCoins(coins >= range.max ? range.min : coins + 1);
  };

  const betMax = () => {
    if (!range || maxCoins < range.min) return;
    setCoins(maxCoins);
    deal(maxCoins * coinValue);
  };

  const nextCoinValue = () => {
    if (coinValues.length < 2) return;
    const value = coinValues[(coinValues.indexOf(coinValue) + 1) % coinValues.length];
    setChosenValue(value);
    remember(COIN_VALUE_KEY, value);
  };

  const handleFundSuccess = () => {
    dispatch(getAllUserWallets()).catch(() => undefined);
    refresh();
  };

  const reconnect = async () => {
    if (lock.current) return;
    const version = epoch.current;
    setIsBusy(true);
    lock.current = true;
    try {
      const active = await getActiveCasinoBet();
      if (epoch.current !== version) return;
      if (active) accept(active);
      setIsReady(true);
      setError('');
      refresh();
    } catch {
      if (epoch.current === version) setError('Unable to reconnect. Your accepted hand remains saved.');
    } finally {
      if (epoch.current === version) {
        lock.current = false;
        setIsBusy(false);
      }
    }
  };

  return {
    available,
    betMax,
    betOne,
    canDeal,
    canWager,
    coinValue,
    coinValues,
    coins,
    deal,
    draw,
    error,
    game,
    hand,
    handleFundSuccess,
    history,
    isAuthenticated,
    isBusy,
    isReady,
    loadError,
    maxBet,
    maxCoins,
    minBet,
    nextCoinValue,
    pendingBet,
    pendingDraw,
    range,
    receipt,
    reconnect,
    refresh,
    self,
    stake,
    storageError,
    summary,
    wallet,
  };
};

export type VideoPokerMachine = ReturnType<typeof useVideoPoker>;

export default useVideoPoker;
