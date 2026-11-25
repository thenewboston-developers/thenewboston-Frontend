import {useEffect, useState} from 'react';

import AuthButtons from 'components/AuthButtons';
import FundControls from 'components/Casino/FundControls';
import {getCasinoGameLink} from 'utils/casino';

import Receipt from './Receipt';
import * as S from './Styles';
import useBlackjack from './useBlackjack';

const SUITS: Record<string, string> = {C: '♣', D: '♦', H: '♥', S: '♠'};
const SUIT_NAMES: Record<string, string> = {C: 'clubs', D: 'diamonds', H: 'hearts', S: 'spades'};
const OUTCOMES = {blackjack: 'Blackjack!', loss: 'Dealer wins', push: 'A push. Wager returned.', win: 'You win!'};

export const PlayingCard = ({card}: {card: string | null}) => {
  const suit = card?.slice(-1) ?? '';
  const rank = card?.slice(0, -1) ?? '';
  return (
    <S.Card
      $hidden={!card}
      $red={suit === 'H' || suit === 'D'}
      aria-label={card ? `${rank} of ${SUIT_NAMES[suit]}` : 'Face-down card'}
      role="img"
    >
      {card ? (
        <>
          <small>
            {rank}
            <br />
            {SUITS[suit]}
          </small>
          <span aria-hidden="true">{SUITS[suit]}</span>
          <small aria-hidden="true">
            {rank}
            <br />
            {SUITS[suit]}
          </small>
        </>
      ) : (
        <span aria-hidden="true" style={{color: '#d3bd87'}}>
          ✧
        </span>
      )}
    </S.Card>
  );
};

const Table = () => {
  const [now, setNow] = useState(Date.now());
  const [selectedReceipt, setSelectedReceipt] = useState<number | null>(null);
  const game = useBlackjack();
  const {hand} = game;
  const isOpen = hand?.status === 'open';
  const isLocked = game.isBusy || !!game.pendingAction || !!game.pendingBet || game.storageError;
  const chosenReceipt = game.history.find((bet) => bet.id === selectedReceipt) ?? game.history[0];
  const remaining = hand?.result.expires_at
    ? Math.max(0, Math.ceil((Date.parse(hand.result.expires_at) - now) / 1000))
    : 0;
  let unavailableMessage = 'The casino fund cannot cover the minimum wager. Please check back later.';
  if (!game.game?.enabled) unavailableMessage = 'This table is currently closed.';
  if (!game.summary?.fund.enabled) unavailableMessage = 'The casino is closed to new wagers.';
  if (!game.summary) unavailableMessage = 'Checking table availability…';
  if (game.loadError) unavailableMessage = 'Casino status is unavailable. Reconnect to check table limits.';

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const renderControls = () => {
    if (!game.isAuthenticated)
      return (
        <>
          <S.Note>Sign in to take a seat and play with TNB.</S.Note>
          <AuthButtons />
        </>
      );
    if (!game.isReady && !game.pendingBet && !game.pendingAction)
      return (
        <>
          <S.Note>Checking for your unfinished hand…</S.Note>
          <S.Button disabled={game.isBusy || game.storageError} onClick={game.reconnect} type="button">
            Reconnect
          </S.Button>
        </>
      );
    if (game.pendingAction)
      return (
        <>
          <S.Note>Your {game.pendingAction.payload.action} is awaiting confirmation. New moves are paused.</S.Note>
          <S.Button $primary disabled={game.isBusy || game.storageError} onClick={() => game.act()} type="button">
            {game.isBusy ? 'Confirming…' : 'Retry same move'}
          </S.Button>
        </>
      );
    if (game.pendingBet)
      return (
        <>
          <S.Note>
            Your {game.pendingBet.payload.amount.toLocaleString()} TNB {game.pendingBet.payload.game.replace(/_/g, ' ')}{' '}
            wager is awaiting confirmation.
          </S.Note>
          <S.Button $primary disabled={game.isBusy || game.storageError} onClick={game.deal} type="button">
            {game.isBusy ? 'Confirming…' : 'Retry same bet'}
          </S.Button>
        </>
      );
    if (isOpen)
      return (
        <>
          <S.Note>Take another card, hold your total, or double your wager for one final card.</S.Note>
          <S.Actions>
            <S.Button
              $primary
              disabled={isLocked || !hand.result.available_actions.includes('hit')}
              onClick={() => game.act('hit')}
              type="button"
            >
              Hit
            </S.Button>
            <S.Button
              disabled={isLocked || !hand.result.available_actions.includes('stand')}
              onClick={() => game.act('stand')}
              type="button"
            >
              Stand
            </S.Button>
          </S.Actions>
          <S.Actions style={{marginTop: 8}}>
            <S.Button
              disabled={
                isLocked ||
                !hand.result.available_actions.includes('double') ||
                (game.wallet?.balance ?? 0) < hand.amount
              }
              onClick={() => game.act('double')}
              type="button"
            >
              Double down · +{hand.amount.toLocaleString()} TNB
            </S.Button>
          </S.Actions>
          <S.Note>
            {remaining
              ? `Auto-stand in ${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, '0')}. Your hand is saved if you leave.`
              : 'Time is up. Waiting for the dealer to finish your hand…'}
          </S.Note>
        </>
      );
    if (game.receipt?.status === 'open') {
      const other = getCasinoGameLink(game.receipt.game);
      return (
        <S.Note>
          <S.TextLink to={other.path}>Finish your {other.name} hand</S.TextLink> before placing another wager.
        </S.Note>
      );
    }
    return (
      <>
        <S.Label htmlFor="blackjack-wager">
          Your wager · TNB
          <S.Input
            disabled={isLocked}
            id="blackjack-wager"
            inputMode="numeric"
            max={game.maxBet}
            min={game.minBet}
            onChange={(event) => game.setAmount(event.target.value)}
            step={2}
            type="number"
            value={game.amount}
          />
        </S.Label>
        <S.Actions aria-label="Quick wager amounts">
          {[2, 10, 20, 50, 100].map((amount) => (
            <S.Chip
              aria-label={`Wager ${amount} TNB`}
              disabled={
                isLocked || amount > game.maxBet || amount < game.minBet || amount > (game.wallet?.balance ?? 0)
              }
              key={amount}
              onClick={() => game.setAmount(String(amount))}
              type="button"
            >
              {amount}
            </S.Chip>
          ))}
        </S.Actions>
        <S.Note>
          Minimum {game.minBet.toLocaleString()} · Maximum {game.maxBet.toLocaleString()} TNB
          <br />
          Even wagers keep the 3:2 payout in whole coins.
        </S.Note>
        <S.Actions>
          <S.Button $primary disabled={!game.canDeal} onClick={game.deal} type="button">
            {game.isBusy ? 'Dealing…' : `Deal ${Number.isFinite(game.stake) ? game.stake.toLocaleString() : '—'} TNB`}
          </S.Button>
        </S.Actions>
        {!game.available && <S.Note>{unavailableMessage}</S.Note>}
        {game.available && !game.validAmount && (
          <S.Note>
            Choose an even whole-number wager between {game.minBet.toLocaleString()} and {game.maxBet.toLocaleString()}{' '}
            TNB.
          </S.Note>
        )}
        {game.validAmount && (!game.wallet || game.stake > game.wallet.balance) && (
          <S.Note>Your TNB wallet needs enough funds for this wager.</S.Note>
        )}
      </>
    );
  };

  return (
    <>
      <S.Layout>
        <div>
          <S.Felt aria-label="Blackjack table">
            <div>
              <S.HandLabel>
                Dealer{' '}
                {hand && (
                  <strong>
                    {hand.result.dealer_total}
                    {isOpen ? ' showing' : ''}
                  </strong>
                )}
              </S.HandLabel>
              <S.Cards>
                {(hand?.result.dealer_cards ?? [null, null]).map((card, index) => (
                  <PlayingCard card={card} key={`${index}:${card}`} />
                ))}
              </S.Cards>
            </div>
            <S.Logo>
              <div>BLACKJACK PAYS 3:2</div>
              <p>Dealer stands on all 17s · Six decks</p>
              <p>♠ &nbsp; ♥ &nbsp; ♣ &nbsp; ♦</p>
            </S.Logo>
            <div>
              <S.HandLabel>
                Your hand{' '}
                {hand && (
                  <strong>
                    {hand.result.player_total}
                    {hand.result.player_total > 21 ? ' · bust' : ''}
                  </strong>
                )}
              </S.HandLabel>
              <S.Cards>
                {(hand?.result.player_cards ?? [null, null]).map((card, index) => (
                  <PlayingCard card={card} key={`${index}:${card}`} />
                ))}
              </S.Cards>
            </div>
          </S.Felt>
          <S.TableCaption>Your decisions. A committed deck. Every hand can be verified.</S.TableCaption>
        </div>
        <S.Panel aria-labelledby="blackjack-wager-heading">
          <S.Eyebrow>{isOpen ? 'Your move' : 'Take your seat'}</S.Eyebrow>
          <S.Heading id="blackjack-wager-heading">
            {isOpen ? 'Play your hand.' : 'A little nerve. A little luck.'}
          </S.Heading>
          {game.isAuthenticated && (
            <S.Facts>
              <div>
                <dt>Your wallet</dt>
                <dd>{game.wallet?.balance.toLocaleString() ?? '—'}</dd>
              </div>
              <div>
                <dt>At the table</dt>
                <dd>{isOpen ? hand.total_stake.toLocaleString() : '0'}</dd>
              </div>
              <div>
                <dt>Currency</dt>
                <dd>TNB</dd>
              </div>
            </S.Facts>
          )}
          <div aria-atomic="true" aria-live="polite">
            {hand?.status === 'settled' && hand.result.outcome && (
              <S.Result $win={hand.profit > 0}>
                <strong>{OUTCOMES[hand.result.outcome]}</strong>
                <p>
                  {hand.payout.toLocaleString()} TNB returned · {hand.profit > 0 ? '+' : ''}
                  {hand.profit.toLocaleString()} TNB net
                </p>
              </S.Result>
            )}
          </div>
          {renderControls()}
          {game.receipt && !hand && game.receipt.status === 'settled' && (
            <S.Note>
              Your previous {getCasinoGameLink(game.receipt.game).name} wager was confirmed:{' '}
              {game.receipt.payout.toLocaleString()} TNB returned. Its receipt is available on the{' '}
              <S.TextLink to={getCasinoGameLink(game.receipt.game).path}>
                {getCasinoGameLink(game.receipt.game).name} table
              </S.TextLink>
              .
            </S.Note>
          )}
          {game.error && <S.Error role="alert">{game.error}</S.Error>}
        </S.Panel>
      </S.Layout>
      <S.Layout>
        <S.Panel aria-labelledby="blackjack-history-heading">
          <S.Eyebrow>Your table history</S.Eyebrow>
          <S.Heading id="blackjack-history-heading">Recent hands</S.Heading>
          {game.history.length ? (
            <S.History>
              {game.history.slice(0, 8).map((bet) => (
                <S.HistoryButton
                  $selected={bet.id === chosenReceipt?.id}
                  aria-pressed={bet.id === chosenReceipt?.id}
                  key={bet.id}
                  onClick={() => setSelectedReceipt(bet.id)}
                  type="button"
                >
                  <strong>{OUTCOMES[bet.result.outcome ?? 'loss']}</strong>
                  <span>{bet.total_stake.toLocaleString()} wagered</span>
                  <strong>
                    {bet.profit > 0 ? '+' : ''}
                    {bet.profit.toLocaleString()} TNB
                  </strong>
                </S.HistoryButton>
              ))}
            </S.History>
          ) : (
            <S.Note>Your settled Blackjack hands will appear here.</S.Note>
          )}
          {chosenReceipt && game.self.id && (
            <Receipt bet={chosenReceipt} key={chosenReceipt.id} userId={game.self.id} />
          )}
        </S.Panel>
        <S.Panel aria-labelledby="blackjack-fund-heading">
          <S.Eyebrow>The casino fund</S.Eyebrow>
          <S.Heading id="blackjack-fund-heading">Your payout is covered.</S.Heading>
          <S.Note>
            Each accepted wager reserves its possible payout, including room to double down. This fund is separate from
            board-game rewards.
          </S.Note>
          <S.Facts>
            <div>
              <dt>Total TNB</dt>
              <dd>{game.summary?.fund.balance.toLocaleString() ?? '—'}</dd>
            </div>
            <div>
              <dt>Reserved</dt>
              <dd>{game.summary?.fund.reserved.toLocaleString() ?? '—'}</dd>
            </div>
            <div>
              <dt>Available</dt>
              <dd>{game.summary?.fund.available.toLocaleString() ?? '—'}</dd>
            </div>
          </S.Facts>
          {game.summary?.can_manage && game.self.id && (
            <FundControls onSuccess={game.handleFundSuccess} userId={game.self.id} />
          )}
        </S.Panel>
      </S.Layout>
    </>
  );
};

export default Table;
