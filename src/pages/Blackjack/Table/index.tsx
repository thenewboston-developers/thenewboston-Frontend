import {useCallback, useEffect, useRef, useState} from 'react';
import {mdiFlash, mdiFlashOff, mdiVolumeHigh, mdiVolumeOff} from '@mdi/js';
import Icon from '@mdi/react';

import FundControls from 'components/Casino/FundControls';
import {BlackjackAction} from 'types/casino';

import {Burst} from '../Celebration';
import Controls from '../Controls';
import Felt from '../Felt';
import History from '../History';
import {useNow} from '../hooks';
import {Bank, Payouts, Session} from '../Info';
import {readFastDeal, saveFastDeal} from '../storage';
import useBlackjack from '../useBlackjack';
import useDealer, {DealerCue} from '../useDealer';
import useSounds from '../useSounds';
import {formatTnb, getOutcomeCopy, SessionTotals, toEven} from '../utils';

import * as S from './Styles';

const ACTION_KEYS: Record<string, BlackjackAction> = {d: 'double', h: 'hit', s: 'stand'};
const FAST_PACE = 0.5;
const UNDO_DEPTH = 40;

const isTyping = (target: EventTarget | null): boolean =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName));

/**
 * The blackjack table. The casino answers every deal and every move with the whole hand; the table plays that hand
 * out card by card, holds the balance and the history as they were, and only shows the result once the dealer's last
 * card is down.
 */
const Table = () => {
  const [burst, setBurst] = useState<Burst | null>(null);
  const [fastDeal, setFastDeal] = useState(readFastDeal);
  const [heldBalance, setHeldBalance] = useState<number | null>(null);
  const [past, setPast] = useState<string[]>([]);
  const [session, setSession] = useState<SessionTotals>({hands: 0, returned: 0, wagered: 0});
  const counted = useRef(new Set<number>());
  const live = useRef(false);
  const game = useBlackjack();
  const {soundEnabled, sounds, toggleSound} = useSounds();
  const {hand, wallet} = game;

  const handleCue = useCallback(
    (cue: DealerCue) => {
      if (cue === 'card') sounds.card();
      else if (cue === 'flip') sounds.flip();
      else if (cue === 'clear') sounds.sweep();
      else sounds.chips();
    },
    [sounds],
  );

  const {isCurrent, view} = useDealer({hand, live, onCue: handleCue, speed: fastDeal ? FAST_PACE : 1});
  const isOpen = hand?.status === 'open';
  const now = useNow(isOpen);
  const isLocked = game.isBusy || !!game.pendingAction || !!game.pendingBet || game.storageError;
  const isPlayerTurn = isOpen && isCurrent && !isLocked;
  const isTableBusy = !!hand && !isCurrent;
  // A finished hand whose result has reached the table
  const result = hand && hand.status === 'settled' && isCurrent ? hand : null;
  const balance = heldBalance ?? wallet?.balance ?? null;
  const dealerTurn =
    isTableBusy &&
    hand.status === 'settled' &&
    view.handId === hand.id &&
    view.dealer.length >= 2 &&
    view.player.length >= hand.result.player_cards.length;
  const history = game.history.filter((bet) => bet.id !== hand?.id || !!result);
  const inPlay = hand && view.handId === hand.id && view.doubled ? hand.amount * 2 : (hand?.amount ?? 0);
  const remaining =
    isOpen && hand.result.expires_at ? Math.max(0, Math.ceil((Date.parse(hand.result.expires_at) - now) / 1000)) : null;
  const stake = game.isAuthenticated && Number.isSafeInteger(game.stake) && game.stake > 0 ? game.stake : 0;
  const tableOpen = game.available;

  const handleAct = useCallback(
    (action: BlackjackAction) => {
      if (!hand || !isPlayerTurn || !hand.result.available_actions.includes(action)) return;
      if (action === 'double' && (wallet?.balance ?? 0) < hand.amount) return;
      live.current = true;
      // Doubling puts the second stake on the table at once; the result waits for the dealer
      if (balance !== null) setHeldBalance(action === 'double' ? balance - hand.amount : balance);
      game.act(action);
    },
    [balance, game, hand, isPlayerTurn, wallet?.balance],
  );

  useEffect(() => {
    // The balance follows the wallet again once the table has caught up with the casino
    if (heldBalance !== null && !game.isBusy && (!hand || isCurrent)) setHeldBalance(null);
  }, [game.isBusy, hand, heldBalance, isCurrent]);

  useEffect(() => {
    if (!result || counted.current.has(result.id)) return;
    counted.current.add(result.id);
    // A hand that was already over when the page loaded is shown, not replayed
    if (!live.current) return;
    const {tone} = getOutcomeCopy(result);
    setSession((totals) => ({
      hands: totals.hands + 1,
      returned: totals.returned + result.payout,
      wagered: totals.wagered + result.total_stake,
    }));
    if (tone === 'blackjack') sounds.blackjack();
    else if (tone === 'win') sounds.win();
    else if (tone === 'push') sounds.push();
    else if (result.result.player_total > 21) sounds.bust();
    else sounds.lose();
    if (tone === 'blackjack' || tone === 'win') setBurst({grand: tone === 'blackjack', id: result.id});
  }, [result, sounds]);

  useEffect(() => {
    // H, S and D play the hand, for players at a keyboard
    const handleKeyDown = (event: KeyboardEvent) => {
      const action = ACTION_KEYS[event.key.toLowerCase()];
      if (!action || event.altKey || event.ctrlKey || event.metaKey || event.repeat || isTyping(event.target)) return;
      handleAct(action);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleAct]);

  const getHeading = (): string => {
    if (!game.isAuthenticated) return 'Take a seat';
    if (dealerTurn) return 'Dealer’s turn';
    if (isTableBusy) return 'Dealing…';
    if (isOpen) return 'Your move';
    if (result) return getOutcomeCopy(result).title;
    return 'Place your bet';
  };

  const handleDeal = () => {
    if (!game.canDeal || isTableBusy) return;
    live.current = true;
    if (balance !== null) setHeldBalance(balance - game.stake);
    setPast([]);
    game.deal();
  };

  const handleFastDealToggle = () => {
    setFastDeal((current) => {
      saveFastDeal(!current);
      return !current;
    });
  };

  // Chips, the tools beside them and the amount field all set the wager; each change can be taken back
  const handleStake = (amount: number) => {
    const limit = Math.min(game.maxBet, toEven(balance ?? 0));
    const next = Math.max(0, Math.min(toEven(amount), limit));
    if (next === stake) return;
    setPast((previous) => [...previous.slice(-UNDO_DEPTH + 1), game.amount]);
    game.setAmount(next ? String(next) : '');
    if (next > stake) sounds.chip();
  };

  const handleUndo = () => {
    if (!past.length) return;
    game.setAmount(past[past.length - 1]);
    setPast(past.slice(0, -1));
  };

  return (
    <>
      <S.Table aria-labelledby="blackjack-table-heading" id="blackjack-table">
        <S.Header>
          <S.Eyebrow>Six-deck table · Blackjack pays 3 to 2</S.Eyebrow>
          <S.Title id="blackjack-table-heading">{getHeading()}</S.Title>
          <S.HeaderTools>
            {game.maxBet >= game.minBet && (
              <S.Limits>
                Limits <strong>{game.minBet.toLocaleString()}</strong> – <strong>{formatTnb(game.maxBet)}</strong>
              </S.Limits>
            )}
            <S.Status $open={tableOpen}>{tableOpen ? 'Table open' : 'Table closed'}</S.Status>
            <S.Toggle
              $active={fastDeal}
              aria-label={fastDeal ? 'Fast dealing on' : 'Fast dealing off'}
              aria-pressed={fastDeal}
              onClick={handleFastDealToggle}
              title={fastDeal ? 'Fast dealing on' : 'Fast dealing off'}
              type="button"
            >
              <Icon aria-hidden path={fastDeal ? mdiFlash : mdiFlashOff} size={0.72} />
            </S.Toggle>
            <S.Toggle
              $active={soundEnabled}
              aria-label={soundEnabled ? 'Sound on' : 'Sound off'}
              aria-pressed={soundEnabled}
              onClick={toggleSound}
              title={soundEnabled ? 'Sound on' : 'Sound off'}
              type="button"
            >
              <Icon aria-hidden path={soundEnabled ? mdiVolumeHigh : mdiVolumeOff} size={0.72} />
            </S.Toggle>
          </S.HeaderTools>
        </S.Header>
        <Felt
          burst={burst}
          hand={hand}
          isPlayerTurn={isPlayerTurn}
          speed={fastDeal ? FAST_PACE : 1}
          stake={stake}
          view={view}
        />
        <Controls
          balance={balance}
          canUndo={past.length > 0}
          game={game}
          inPlay={inPlay}
          isPlayerTurn={isPlayerTurn}
          isTableBusy={isTableBusy}
          onAct={handleAct}
          onDeal={handleDeal}
          onStake={handleStake}
          onUndo={handleUndo}
          remaining={remaining}
          result={result}
        />
      </S.Table>
      <S.Panels>
        <S.Column>
          <History bets={history} isAuthenticated={game.isAuthenticated} userId={game.self.id} />
          <Bank summary={game.summary} />
        </S.Column>
        <S.Column>
          <Payouts />
          {game.isAuthenticated && <Session totals={session} />}
        </S.Column>
      </S.Panels>
      {game.summary?.can_manage && game.self.id && (
        <S.Admin>
          <FundControls onSuccess={game.handleFundSuccess} userId={game.self.id} />
        </S.Admin>
      )}
    </>
  );
};

export default Table;
