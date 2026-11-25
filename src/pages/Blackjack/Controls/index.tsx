import {ChangeEvent, useRef} from 'react';
import {mdiClose, mdiHandBackRight, mdiPlusThick, mdiTimerOutline, mdiUndoVariant} from '@mdi/js';
import Icon from '@mdi/react';

import {BlackjackAction, BlackjackBet} from 'types/casino';
import {getCasinoGameLink} from 'utils/casino';

import {Chip} from '../Chip';
import {useCountUp} from '../hooks';
import useBlackjack from '../useBlackjack';
import {formatClock, formatSigned, formatTnb, getOutcomeCopy, getRack, toEven} from '../utils';

import * as S from './Styles';

interface ControlsProps {
  // What the player can see they have: held still while a hand is being played out
  balance: number | null;
  canUndo: boolean;
  game: ReturnType<typeof useBlackjack>;
  // The chips at risk in the hand on the table
  inPlay: number;
  // The player may hit, stand or double right now
  isPlayerTurn: boolean;
  // Cards are on their way: the deal, or the dealer finishing the hand
  isTableBusy: boolean;
  onAct(action: BlackjackAction): void;
  onDeal(): void;
  onStake(amount: number): void;
  onUndo(): void;
  // Seconds until the hand stands by itself
  remaining: number | null;
  // The finished hand whose result is showing on the table
  result: BlackjackBet | null;
}

type Stage = 'actions' | 'betting' | 'foreign' | 'guest' | 'loading' | 'pendingAction' | 'pendingBet';

const URGENT_SECONDS = 60;

/**
 * Everything under the table: the player's balance, the chips and the Deal button between hands, the Hit, Stand and
 * Double buttons during one, and the notices that keep an unconfirmed wager or move safe.
 */
const Controls = ({
  balance,
  canUndo,
  game,
  inPlay,
  isPlayerTurn,
  isTableBusy,
  onAct,
  onDeal,
  onStake,
  onUndo,
  remaining,
  result,
}: ControlsProps) => {
  const {hand, maxBet, minBet} = game;
  const shownBalance = useCountUp(balance ?? 0, 700, balance !== null);
  const funds = toEven(balance ?? 0);
  const isLocked = game.isBusy || !!game.pendingAction || !!game.pendingBet || game.storageError;
  const limit = Math.min(maxBet, funds);
  const kept = useRef<Stage>('betting');
  const showActions = !!hand && (hand.status === 'open' || isTableBusy);
  const stake = Number.isSafeInteger(game.stake) && game.stake > 0 ? game.stake : 0;
  const walletBalance = game.wallet?.balance ?? 0;

  const getStage = (): Stage => {
    if (!game.isAuthenticated) return 'guest';
    if (!game.isReady && !game.pendingBet && !game.pendingAction) return 'loading';
    if (game.pendingAction) return 'pendingAction';
    if (game.pendingBet) return 'pendingBet';
    if (showActions) return 'actions';
    return game.receipt?.status === 'open' ? 'foreign' : 'betting';
  };

  // A wager or a move is saved before it is sent. While the request is on its way the controls stay as they were;
  // the recovery notice only appears if the answer never arrived.
  if (!game.isBusy) kept.current = getStage();
  const stage = kept.current;

  const getUnavailableMessage = () => {
    if (game.loadError) return 'Casino status is unavailable. Reconnect to check table limits.';
    if (!game.summary) return 'Checking table availability…';
    if (!game.summary.fund.enabled) return 'The casino is closed to new wagers.';
    if (!game.game?.enabled) return 'This table is currently closed.';
    return 'The casino fund cannot cover the minimum wager. Please check back later.';
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => game.setAmount(event.target.value);

  const renderActions = () => {
    const actions = hand?.result.available_actions ?? [];
    const canDouble = actions.includes('double') && walletBalance >= (hand?.amount ?? 0);
    return (
      <>
        <S.Actions aria-label="Play your hand" role="group">
          <S.ActionButton
            $action="double"
            aria-keyshortcuts="D"
            aria-label={`Double down, add ${formatTnb(hand?.amount ?? 0)}`}
            disabled={!isPlayerTurn || !canDouble}
            onClick={() => onAct('double')}
            type="button"
          >
            <S.ActionIcon aria-hidden="true">2×</S.ActionIcon>
            <S.ActionLabel>
              Double
              <small>+{formatTnb(hand?.amount ?? 0)}</small>
            </S.ActionLabel>
            <S.Key aria-hidden="true">D</S.Key>
          </S.ActionButton>
          <S.ActionButton
            $action="hit"
            aria-keyshortcuts="H"
            disabled={!isPlayerTurn || !actions.includes('hit')}
            onClick={() => onAct('hit')}
            type="button"
          >
            <S.ActionIcon aria-hidden="true">
              <Icon path={mdiPlusThick} size={0.85} />
            </S.ActionIcon>
            <S.ActionLabel>
              Hit
              <small>Take a card</small>
            </S.ActionLabel>
            <S.Key aria-hidden="true">H</S.Key>
          </S.ActionButton>
          <S.ActionButton
            $action="stand"
            aria-keyshortcuts="S"
            disabled={!isPlayerTurn || !actions.includes('stand')}
            onClick={() => onAct('stand')}
            type="button"
          >
            <S.ActionIcon aria-hidden="true">
              <Icon path={mdiHandBackRight} size={0.85} />
            </S.ActionIcon>
            <S.ActionLabel>
              Stand
              <small>Hold your total</small>
            </S.ActionLabel>
            <S.Key aria-hidden="true">S</S.Key>
          </S.ActionButton>
        </S.Actions>
        {hand?.status === 'open' && remaining !== null && (
          <S.Timer $urgent={remaining <= URGENT_SECONDS} role="timer">
            <Icon aria-hidden path={mdiTimerOutline} size={0.62} />
            {remaining > 0
              ? `Auto-stand in ${formatClock(remaining)}. Your hand is saved if you leave.`
              : 'Time is up. Waiting for the dealer to finish your hand…'}
          </S.Timer>
        )}
      </>
    );
  };

  const renderBetting = () => {
    const invalid = game.available && !game.validAmount;
    const uncovered = game.validAmount && (!game.wallet || game.stake > walletBalance);
    return (
      <>
        <S.Betting>
          <S.Rack aria-label="Add chips to your bet" role="group">
            {getRack(maxBet).map((value) => (
              <S.RackChip
                aria-label={`Add ${formatTnb(value)} to your bet`}
                disabled={isLocked || !game.available || stake + value > limit}
                key={value}
                onClick={() => onStake(stake + value)}
                type="button"
              >
                <Chip value={value} />
              </S.RackChip>
            ))}
          </S.Rack>
          <S.Tools>
            <S.Amount>
              <S.AmountInput
                aria-label="Your wager in TNB"
                disabled={isLocked}
                id="blackjack-wager"
                inputMode="numeric"
                max={maxBet}
                min={minBet}
                onChange={handleAmountChange}
                placeholder="0"
                step={2}
                type="number"
                value={game.amount}
              />
              <span aria-hidden="true">TNB</span>
            </S.Amount>
            <S.Tool
              aria-label="Undo the last change to your bet"
              disabled={isLocked || !canUndo}
              onClick={onUndo}
              type="button"
            >
              <Icon aria-hidden path={mdiUndoVariant} size={0.62} />
              <S.ToolLabel>Undo</S.ToolLabel>
            </S.Tool>
            <S.Tool
              aria-label="Clear your bet"
              disabled={isLocked || stake === 0}
              onClick={() => onStake(0)}
              type="button"
            >
              <Icon aria-hidden path={mdiClose} size={0.62} />
              <S.ToolLabel>Clear</S.ToolLabel>
            </S.Tool>
            <S.Tool
              aria-label="Halve your bet"
              disabled={isLocked || toEven(stake / 2) < minBet}
              onClick={() => onStake(toEven(stake / 2))}
              type="button"
            >
              ½
            </S.Tool>
            <S.Tool
              aria-label="Double your bet"
              disabled={isLocked || stake === 0 || stake * 2 > limit}
              onClick={() => onStake(stake * 2)}
              type="button"
            >
              2×
            </S.Tool>
            <S.Tool
              aria-label="Bet the table maximum"
              disabled={isLocked || limit < minBet || stake === limit}
              onClick={() => onStake(limit)}
              type="button"
            >
              Max
            </S.Tool>
          </S.Tools>
        </S.Betting>
        <S.DealButton disabled={!game.canDeal} onClick={onDeal} type="button">
          {game.isBusy ? (
            'Dealing…'
          ) : (
            <>
              Deal <small>{Number.isFinite(game.stake) ? formatTnb(game.stake) : '—'}</small>
            </>
          )}
        </S.DealButton>
        {maxBet >= minBet && (
          <S.LimitHint>
            Table limits {minBet.toLocaleString()} – {formatTnb(maxBet)}
          </S.LimitHint>
        )}
        <S.Hints>
          {!game.available && <S.Warning>{getUnavailableMessage()}</S.Warning>}
          {invalid && (
            <S.Warning>
              Choose an even whole-number wager between {minBet.toLocaleString()} and {formatTnb(maxBet)}.
            </S.Warning>
          )}
          {uncovered && <S.Warning>Your TNB wallet needs enough funds for this wager.</S.Warning>}
        </S.Hints>
      </>
    );
  };

  const renderMessages = () => {
    const foreign = game.receipt && !hand && game.receipt.status === 'settled' ? game.receipt : null;
    if (!result && !foreign && !game.error) return null;
    return (
      <S.Messages>
        {result && (
          <S.Result $tone={getOutcomeCopy(result).tone} aria-hidden="true">
            <strong>{getOutcomeCopy(result).title}</strong>
            <span>
              {formatTnb(result.payout)} returned · {formatSigned(result.profit)} TNB net
            </span>
          </S.Result>
        )}
        {foreign && (
          <S.Note>
            Your previous {getCasinoGameLink(foreign.game).name} wager was confirmed: {formatTnb(foreign.payout)}{' '}
            returned. Its receipt is available on the{' '}
            <S.NoteLink to={getCasinoGameLink(foreign.game).path}>
              {getCasinoGameLink(foreign.game).name} table
            </S.NoteLink>
            .
          </S.Note>
        )}
        {game.error && <S.Error role="alert">{game.error}</S.Error>}
      </S.Messages>
    );
  };

  const renderStage = () => {
    if (stage === 'guest')
      return (
        <S.Notice>
          <p>Sign in to take a seat and play with TNB.</p>
          <S.AuthButtons />
        </S.Notice>
      );
    if (stage === 'loading')
      return (
        <S.Notice>
          <p>Checking for your unfinished hand…</p>
          <S.NoticeButton disabled={game.isBusy || game.storageError} onClick={game.reconnect} type="button">
            Reconnect
          </S.NoticeButton>
        </S.Notice>
      );
    if (stage === 'pendingAction')
      return (
        <S.Notice>
          <p>Your {game.pendingAction?.payload.action} is awaiting confirmation. New moves are paused.</p>
          <S.NoticeButton disabled={game.isBusy || game.storageError} onClick={() => game.act()} type="button">
            {game.isBusy ? 'Confirming…' : 'Retry same move'}
          </S.NoticeButton>
        </S.Notice>
      );
    if (stage === 'pendingBet')
      return (
        <S.Notice>
          <p>
            Your {formatTnb(game.pendingBet?.payload.amount ?? 0)}{' '}
            {getCasinoGameLink(game.pendingBet?.payload.game ?? 'blackjack').name} wager is awaiting confirmation.
          </p>
          <S.NoticeButton disabled={game.isBusy || game.storageError} onClick={game.deal} type="button">
            {game.isBusy ? 'Confirming…' : 'Retry same bet'}
          </S.NoticeButton>
        </S.Notice>
      );
    if (stage === 'actions') return renderActions();
    if (stage === 'foreign' && game.receipt) {
      const other = getCasinoGameLink(game.receipt.game);
      return (
        <S.Notice>
          <p>Finish your {other.name} game before placing another wager.</p>
          <S.NoticeLink to={other.path}>Go to {other.name}</S.NoticeLink>
        </S.Notice>
      );
    }
    return renderBetting();
  };

  return (
    <S.Controls>
      <S.Layout>
        {game.isAuthenticated && (
          <S.Purse>
            <div>
              <dt>Balance</dt>
              <dd>
                {balance === null ? '—' : shownBalance.toLocaleString()} <small>TNB</small>
              </dd>
            </div>
            <div>
              <dt>{stage === 'actions' ? 'In play' : 'Your bet'}</dt>
              <dd>
                {(stage === 'actions' ? inPlay : stake).toLocaleString()} <small>TNB</small>
              </dd>
            </div>
          </S.Purse>
        )}
        <S.Stage>{renderStage()}</S.Stage>
        {renderMessages()}
      </S.Layout>
      <S.Live aria-atomic="true" aria-live="polite">
        {result &&
          `${getOutcomeCopy(result).title}. ${getOutcomeCopy(result).detail}. ${formatTnb(result.payout)} paid back.`}
      </S.Live>
    </S.Controls>
  );
};

export default Controls;
