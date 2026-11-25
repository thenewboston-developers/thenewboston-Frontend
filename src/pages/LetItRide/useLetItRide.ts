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
import {CasinoBet, CasinoSummary, LetItRideAction, LetItRideBet} from 'types/casino';
import {
  casinoErrorMessage,
  clearPendingCasinoBet,
  isDefiniteCasinoRejection,
  PendingCasinoBet,
  readPendingCasinoBet,
  savePendingCasinoBet,
} from 'utils/casino';
import {BETS, PAYTABLE} from 'utils/letItRide';

import {
  clearPendingLetItRideAction,
  PendingLetItRideAction,
  readPendingLetItRideAction,
  savePendingLetItRideAction,
} from './storage';

const POLL_INTERVAL = 5000;

export const isLetItRideBet = (bet: CasinoBet | null | undefined): bet is LetItRideBet =>
  bet?.game === 'let_it_ride' &&
  Array.isArray(bet.result.cards) &&
  Array.isArray(bet.result.community) &&
  Array.isArray(bet.result.decisions) &&
  Number.isInteger(bet.result.revision);

const byNewest = (bets: LetItRideBet[]) => [...bets].sort((a, b) => b.id - a.id).slice(0, 20);

/**
 * Everything a seat at the Let It Ride table needs: the casino's limits, the hand in play, and the safe way to deal
 * and decide. A deal and each decision are saved before they are sent, so an uncertain response is repeated with the
 * same ID instead of charging or deciding twice, and an unfinished hand is picked up again from any device.
 */
const useLetItRide = () => {
  const [error, setError] = useState('');
  const [history, setHistory] = useState<LetItRideBet[]>([]);
  const [isBusy, setIsBusy] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingLetItRideAction | null>(null);
  const [pendingBet, setPendingBet] = useState<PendingCasinoBet | null>(null);
  const [receipt, setReceipt] = useState<CasinoBet | null>(null);
  const [storageError, setStorageError] = useState(false);
  const [summary, setSummary] = useState<CasinoSummary | null>(null);
  const [unit, setUnitValue] = useState(1);
  const current = useRef<CasinoBet | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const epoch = useRef(0);
  const isAuthenticated = useIsAuthenticated();
  const lock = useRef(false);
  const self = useSelector(getSelf);
  const unitChosen = useRef(false);
  const wallets = useSelector(getWallets);
  const game = summary?.games.find((item) => item.id === 'let_it_ride');
  const hand = isLetItRideBet(receipt) ? receipt : null;
  // The other casino game this member has open, or whose recovered wager was just confirmed here
  const otherBet = receipt && !hand ? receipt : null;
  // The wager is three equal bets: the limits are per bet
  const maxUnit = Math.floor((game?.max_bet ?? 0) / BETS);
  const minUnit = Math.max(1, Math.ceil((game?.min_bet ?? BETS) / BETS));
  const stake = unit * BETS;
  const wallet = Object.values(wallets).find((item) => item.currency.ticker === 'TNB' && item.owner === self.id);
  const walletRef = useRef(wallet);
  walletRef.current = wallet;
  // The page pays what it prints: a table with other rules or odds waits for a newer page
  const isSupported =
    !game ||
    (game.rules_version === 1 &&
      (game.bets ?? BETS) === BETS &&
      JSON.stringify(game.paytable?.map((line) => [line.hand, line.odds])) ===
        JSON.stringify(PAYTABLE.map((line) => [line.hand, line.odds])));
  const available = !!summary?.fund.enabled && !!game?.enabled && isSupported && maxUnit >= minUnit && !loadError;
  const validUnit = Number.isSafeInteger(unit) && unit >= minUnit && unit <= maxUnit;
  const canDeal =
    isAuthenticated &&
    isReady &&
    available &&
    validUnit &&
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
      // A confirmation settles the matching saved request even when a newer hand is already on the table
      try {
        clearPendingCasinoBet(self.id, bet.request_id);
        setPendingBet((saved) => (saved?.payload.request_id === bet.request_id ? null : saved));
        if (bet.status === 'settled') {
          clearPendingLetItRideAction(self.id, bet.request_id);
          setPendingAction((saved) => (saved?.requestId === bet.request_id ? null : saved));
          if (isLetItRideBet(bet)) setHistory((bets) => byNewest([bet, ...bets.filter((item) => item.id !== bet.id)]));
        }
      } catch {
        setStorageError(true);
        setError('The hand is saved on the server, but browser recovery storage is unavailable.');
      }
      // A poll that started before a decision must never bring back an older hand or turn a card face down again
      if (
        previous &&
        (bet.id < previous.id ||
          (bet.id === previous.id &&
            ((previous.status === 'settled' && bet.status === 'open') ||
              (isLetItRideBet(previous) && isLetItRideBet(bet) && bet.result.revision < previous.result.revision))))
      )
        return;
      current.current = bet;
      setReceipt(bet);
      const currentWallet = walletRef.current;
      if (currentWallet?.owner === self.id && bet.wallet_modified_date) {
        // The receipt carries the balance with its revision, so the wallet need not wait for a fetch; the store
        // ignores a snapshot older than the one it holds
        dispatch(setWallet({...currentWallet, balance: bet.wallet_balance, modified_date: bet.wallet_modified_date}));
      }
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
    refresh();
    const load = async () => {
      if (!isAuthenticated || !self.id) return;
      let savedAction: PendingLetItRideAction | null;
      let savedBet: PendingCasinoBet | null;
      try {
        savedBet = readPendingCasinoBet(self.id);
        savedAction = readPendingLetItRideAction(self.id);
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
          setError('Unable to check for an unfinished hand. Reconnect before starting a new one.');
      }
      getCasinoBets()
        .then((bets) => {
          if (epoch.current !== version) return;
          setHistory((previous) =>
            byNewest([
              ...previous,
              ...bets.filter(
                (bet): bet is LetItRideBet =>
                  isLetItRideBet(bet) && bet.status === 'settled' && !previous.some((item) => item.id === bet.id),
              ),
            ]),
          );
        })
        .catch(() => undefined);
      dispatch(getAllUserWallets()).catch(() => undefined);
    };
    load();
    const timer = setInterval(() => {
      refresh();
      // An open hand can be finished elsewhere: by its timeout, or by this member on another device
      if (current.current?.status === 'open' && !lock.current) {
        getCasinoBet(current.current.request_id)
          .then((bet) => {
            if (epoch.current === version) accept(bet);
          })
          .catch(() => undefined);
      }
    }, POLL_INTERVAL);
    return () => {
      epoch.current += 1;
      clearInterval(timer);
    };
  }, [accept, dispatch, isAuthenticated, refresh, self.id]);

  // The bet follows the table's limits, and starts at what the member played last
  useEffect(() => {
    if (!game || maxUnit < minUnit) return;
    setUnitValue((value) => {
      const last = history[0] ? history[0].amount / BETS : value;
      return Math.min(maxUnit, Math.max(minUnit, unitChosen.current ? value : last));
    });
  }, [game, history, maxUnit, minUnit]);

  // Decides the next bet, or repeats the decision still awaiting confirmation. Resolves with the hand it produced
  const act = async (action?: LetItRideAction): Promise<CasinoBet | null> => {
    if (!self.id || !isAuthenticated || lock.current || storageError) return null;
    const userId = self.id;
    const version = epoch.current;
    lock.current = true;
    setIsBusy(true);
    setError('');
    let saved: PendingLetItRideAction | null = null;
    try {
      saved = readPendingLetItRideAction(userId) ?? pendingAction;
      if (!saved) {
        if (!hand || hand.status !== 'open' || !action || !hand.result.available_actions.includes(action)) return null;
        saved = {
          payload: {action, action_id: crypto.randomUUID(), expected_revision: hand.result.revision},
          requestId: hand.request_id,
        };
        savePendingLetItRideAction(userId, saved);
      }
      setPendingAction(saved);
      const bet = await actOnCasinoBet(saved.requestId, saved.payload);
      if (epoch.current !== version) return null;
      accept(bet);
      clearPendingLetItRideAction(userId, saved.requestId);
      setPendingAction(null);
      refresh();
      return bet;
    } catch (caught) {
      if (epoch.current !== version) return null;
      const {response} = caught as {response?: {status?: number}};
      let message = casinoErrorMessage(
        caught,
        'We could not confirm this decision. Retry the same decision; it will only be applied once.',
      );
      // A refused decision can never apply on a later retry: show the hand as the casino has it instead
      if (saved && [400, 404, 409].includes(response?.status ?? 0)) {
        try {
          const recovered = await getCasinoBet(saved.requestId);
          if (epoch.current !== version) return null;
          accept(recovered);
          clearPendingLetItRideAction(userId, saved.requestId);
          setPendingAction(null);
          message = 'This hand had moved on, so the table now shows it as the casino has it.';
        } catch {
          // Keep the saved decision until the hand can be confirmed
        }
      }
      setError(message);
      return null;
    } finally {
      if (epoch.current === version) {
        lock.current = false;
        setIsBusy(false);
      }
    }
  };

  // Places the three bets and deals, or repeats the deal still awaiting confirmation
  const deal = async (): Promise<CasinoBet | null> => {
    if (!self.id || !isAuthenticated || lock.current || storageError || (!pendingBet && !canDeal)) return null;
    const userId = self.id;
    const version = epoch.current;
    lock.current = true;
    setIsBusy(true);
    setError('');
    let saved: PendingCasinoBet | null = null;
    try {
      saved = readPendingCasinoBet(userId) ?? pendingBet;
      if (!saved) {
        const commitment = await createCasinoCommitment();
        if (epoch.current !== version) return null;
        saved = {
          payload: {
            amount: stake,
            client_seed: crypto.randomUUID(),
            commitment_id: commitment.id,
            game: 'let_it_ride',
            request_id: crypto.randomUUID(),
            rules_version: game!.rules_version,
          },
          serverSeedHash: commitment.server_seed_hash,
        };
        savePendingCasinoBet(userId, saved);
      }
      setPendingBet(saved);
      const bet = await placeCasinoBet(saved.payload);
      if (epoch.current !== version) return null;
      accept(bet);
      refresh();
      return bet;
    } catch (caught) {
      if (epoch.current !== version) return null;
      if (saved && isDefiniteCasinoRejection(caught)) {
        clearPendingCasinoBet(userId, saved.payload.request_id);
        setPendingBet(null);
        refresh();
        // Another game's unfinished hand is why: put it on the table so the page can point to it
        if ((caught as {response?: {data?: {code?: string}}}).response?.data?.code === 'game_in_progress') {
          getActiveCasinoBet()
            .then((active) => {
              if (epoch.current === version && active) accept(active);
            })
            .catch(() => undefined);
        }
      }
      setError(
        casinoErrorMessage(
          caught,
          saved
            ? 'We could not confirm the deal. Retry the same bet without paying twice.'
            : 'Unable to prepare this hand. No coins were charged.',
        ),
      );
      return null;
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
    lock.current = true;
    setIsBusy(true);
    try {
      const active = await getActiveCasinoBet();
      if (epoch.current !== version) return;
      if (active) accept(active);
      setIsReady(true);
      setError('');
      refresh();
    } catch {
      if (epoch.current === version) setError('Unable to reconnect. An accepted hand stays saved.');
    } finally {
      if (epoch.current === version) {
        lock.current = false;
        setIsBusy(false);
      }
    }
  };

  const setUnit = (value: number) => {
    unitChosen.current = true;
    setUnitValue(value);
  };

  return {
    act,
    available,
    canDeal,
    deal,
    error,
    game,
    hand,
    handleFundSuccess,
    history,
    isAuthenticated,
    isBusy,
    isReady,
    isSupported,
    loadError,
    maxUnit,
    minUnit,
    otherBet,
    pendingAction,
    pendingBet,
    reconnect,
    refresh,
    self,
    setUnit,
    stake,
    storageError,
    summary,
    unit,
    validUnit,
    wallet,
  };
};

export type LetItRideTable = ReturnType<typeof useLetItRide>;

export default useLetItRide;
