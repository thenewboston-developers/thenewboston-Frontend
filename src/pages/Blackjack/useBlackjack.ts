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
import {setWallet} from 'store/wallets';
import {AppDispatch} from 'types';
import {BlackjackAction, BlackjackBet, CasinoBet, CasinoSummary} from 'types/casino';
import {
  casinoErrorMessage,
  clearPendingCasinoBet,
  isDefiniteCasinoRejection,
  PendingCasinoBet,
  readPendingCasinoBet,
  savePendingCasinoBet,
} from 'utils/casino';

import {
  clearPendingBlackjackAction,
  PendingBlackjackAction,
  readLastWager,
  readPendingBlackjackAction,
  saveLastWager,
  savePendingBlackjackAction,
} from './storage';
import {DEFAULT_WAGER} from './utils';

export const isBlackjackBet = (bet: CasinoBet | null): bet is BlackjackBet =>
  bet?.game === 'blackjack' && Array.isArray(bet.result.player_cards) && Number.isInteger(bet.result.revision);

const useBlackjack = () => {
  const [amount, setAmount] = useState(() => String(readLastWager(DEFAULT_WAGER)));
  const [error, setError] = useState('');
  const [history, setHistory] = useState<BlackjackBet[]>([]);
  const [isBusy, setIsBusy] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingBlackjackAction | null>(null);
  const [pendingBet, setPendingBet] = useState<PendingCasinoBet | null>(null);
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
  const game = summary?.games.find((item) => item.id === 'blackjack');
  const hand = isBlackjackBet(receipt) ? receipt : null;
  const maxBet = Math.floor((game?.max_bet ?? 0) / 2) * 2;
  const minBet = Math.max(2, Math.ceil((game?.min_bet ?? 2) / 2) * 2);
  const stake = Number(amount);
  const wallet = Object.values(wallets).find((item) => item.currency.ticker === 'TNB' && item.owner === self.id);
  const walletRef = useRef(wallet);
  walletRef.current = wallet;
  const available = !!summary?.fund.enabled && !!game?.enabled && maxBet >= minBet && !loadError;
  const validAmount = Number.isSafeInteger(stake) && stake % 2 === 0 && stake >= minBet && stake <= maxBet;
  const canDeal =
    isAuthenticated &&
    isReady &&
    available &&
    validAmount &&
    !!wallet &&
    stake <= wallet.balance &&
    !isBusy &&
    !storageError &&
    !pendingBet &&
    !pendingAction &&
    receipt?.status !== 'open';

  const accept = useCallback(
    (bet: CasinoBet) => {
      if (!self.id) return;
      const previous = current.current;
      // Confirmation resolves a matching saved request even when a newer hand is already on screen.
      try {
        clearPendingCasinoBet(self.id, bet.request_id);
        setPendingBet((saved) => (saved?.payload.request_id === bet.request_id ? null : saved));
        if (bet.status === 'settled') {
          clearPendingBlackjackAction(self.id, bet.request_id);
          setPendingAction((saved) => (saved?.requestId === bet.request_id ? null : saved));
          if (isBlackjackBet(bet))
            setHistory((previousBets) =>
              [bet, ...previousBets.filter((item) => item.id !== bet.id)].sort((a, b) => b.id - a.id).slice(0, 20),
            );
        }
      } catch {
        setStorageError(true);
        setError('The hand is saved on the server, but browser recovery storage is unavailable.');
      }
      // A poll started before an action must never bring back an older hand or reveal stale controls.
      if (
        previous &&
        (bet.id < previous.id ||
          (bet.id === previous.id &&
            ((previous.status === 'settled' && bet.status === 'open') ||
              (isBlackjackBet(previous) && isBlackjackBet(bet) && bet.result.revision < previous.result.revision))))
      )
        return;
      current.current = bet;
      setReceipt(bet);
      const currentWallet = walletRef.current;
      // The receipt carries the balance and its revision, so the table need not wait for a wallet fetch
      if (currentWallet?.owner === self.id && bet.wallet_modified_date)
        dispatch(setWallet({...currentWallet, balance: bet.wallet_balance, modified_date: bet.wallet_modified_date}));
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
    setPendingAction(null);
    setPendingBet(null);
    setReceipt(null);
    setStorageError(false);
    setSummary(null);
    refresh();
    const load = async () => {
      if (!isAuthenticated || !self.id) return;
      let savedBet: PendingCasinoBet | null;
      let savedAction: PendingBlackjackAction | null;
      try {
        savedBet = readPendingCasinoBet(self.id);
        savedAction = readPendingBlackjackAction(self.id);
        setPendingBet(savedBet);
        setPendingAction(savedAction);
      } catch {
        setStorageError(true);
        setError('Saved wager recovery is unavailable. Check your hand and history before wagering again.');
        return;
      }
      try {
        const active = await getActiveCasinoBet();
        if (epoch.current !== version) return;
        if (active) accept(active);
        const requestId = savedAction?.requestId ?? savedBet?.payload.request_id;
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
                (bet): bet is BlackjackBet =>
                  isBlackjackBet(bet) && bet.status === 'settled' && !previous.some((item) => item.id === bet.id),
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

  const act = async (action?: BlackjackAction) => {
    if (!self.id || !isAuthenticated || lock.current || storageError) return;
    const version = epoch.current;
    lock.current = true;
    setIsBusy(true);
    setError('');
    let saved: PendingBlackjackAction | null = null;
    try {
      saved = readPendingBlackjackAction(self.id) ?? pendingAction;
      if (!saved) {
        if (!hand || hand.status !== 'open' || !action || !hand.result.available_actions.includes(action)) return;
        saved = {
          payload: {action, action_id: crypto.randomUUID(), expected_revision: hand.result.revision},
          requestId: hand.request_id,
        };
        savePendingBlackjackAction(self.id, saved);
      }
      setPendingAction(saved);
      const bet = await actOnCasinoBet(saved.requestId, saved.payload);
      if (epoch.current !== version) return;
      accept(bet);
      clearPendingBlackjackAction(self.id, saved.requestId);
      setPendingAction(null);
      refresh();
    } catch (caught) {
      if (epoch.current !== version) return;
      const {response} = caught as {response?: {status?: number; data?: {code?: string}}};
      // An action with a stale revision cannot execute on a later retry. Recover the authoritative hand first.
      if (saved && [400, 409].includes(response?.status ?? 0)) {
        try {
          const recovered = await getCasinoBet(saved.requestId);
          if (epoch.current !== version) return;
          accept(recovered);
          clearPendingBlackjackAction(self.id, saved.requestId);
          setPendingAction(null);
        } catch {
          /* Retain the original action until its state can be confirmed. */
        }
      }
      setError(
        casinoErrorMessage(
          caught,
          'We could not confirm this move. Retry the same move; it will only be applied once.',
        ),
      );
    } finally {
      if (epoch.current === version) {
        lock.current = false;
        setIsBusy(false);
      }
    }
  };

  const deal = async () => {
    if (!self.id || !isAuthenticated || lock.current || storageError || (!pendingBet && !canDeal)) return;
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
            amount: stake,
            client_seed: crypto.randomUUID(),
            commitment_id: commitment.id,
            game: 'blackjack',
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
      saveLastWager(saved.payload.amount);
      accept(bet);
      refresh();
    } catch (caught) {
      if (epoch.current !== version) return;
      if (saved && isDefiniteCasinoRejection(caught)) {
        clearPendingCasinoBet(self.id, saved.payload.request_id);
        setPendingBet(null);
        refresh();
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
    act,
    amount,
    available,
    canDeal,
    deal,
    error,
    game,
    handleFundSuccess,
    hand,
    history,
    isAuthenticated,
    isBusy,
    isReady,
    loadError,
    maxBet,
    minBet,
    pendingAction,
    pendingBet,
    receipt,
    reconnect,
    refresh,
    self,
    setAmount,
    stake,
    storageError,
    summary,
    validAmount,
    wallet,
  };
};

export default useBlackjack;
