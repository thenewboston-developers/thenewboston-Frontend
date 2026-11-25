import {FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import {ArrowDown, ShieldCheck} from 'lucide-react';

import FundControls from 'components/Casino/FundControls';
import CasinoSession from 'components/Casino/Session';
import useCasinoWager from 'components/Casino/useCasinoWager';
import useMotion from 'pages/Slots/useMotion';
import {CasinoBet} from 'types/casino';

import Board from './Board';
import History from './History';
import * as S from './Styles';
import {isPlinkoResult, MULTIPLIERS, POCKET_WEIGHTS} from './utils';

const PlinkoGame = () => {
  const [activeBet, setActiveBet] = useState<CasinoBet | null>(null);
  const [busy, setBusy] = useState(false);
  const [dropping, setDropping] = useState(false);
  const [heldBalance, setHeldBalance] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<CasinoBet | null>(null);
  const [visibleIds, setVisibleIds] = useState<string[] | null>(null);
  const {
    amount,
    availability,
    available,
    canPlace,
    error,
    game,
    handleFundSuccess,
    history,
    isAuthenticated,
    loadError,
    maxBet,
    minBet,
    pending,
    place,
    receipt,
    refresh,
    self,
    setAmount,
    stake,
    summary,
    unavailableMessage,
    unfinishedGame,
    validAmount,
    wallet,
  } = useCasinoWager({gameId: 'plinko'});
  const animate = useMotion();
  const inFlight = useRef(false);
  const live = useRef(true);
  const supportedRules =
    game?.rules_version === 1 &&
    game.rows === 12 &&
    game.payout_table?.length === 13 &&
    game.payout_table.every(
      (item, slot) =>
        item.slot === slot && item.multiplier === MULTIPLIERS[slot] && item.probability === POCKET_WEIGHTS[slot] / 4096,
    );
  const displayedBalance = heldBalance ?? wallet?.balance;
  const lastResult = isPlinkoResult(revealed) ? revealed : null;
  const recentBets = history.filter(
    (bet) => bet.game === 'plinko' && (!visibleIds || visibleIds.includes(bet.request_id)),
  );
  const validStake = Number.isSafeInteger(stake) && stake > 0;

  const handleComplete = useCallback(() => {
    inFlight.current = false;
    setDropping(false);
    setBusy(false);
    setHeldBalance(null);
    setVisibleIds(null);
    setRevealed(activeBet);
  }, [activeBet]);

  useEffect(() => {
    live.current = true;
    return () => {
      live.current = false;
    };
  }, []);

  useEffect(() => {
    if (!receipt || inFlight.current) return;
    setRevealed(receipt);
    setActiveBet(isPlinkoResult(receipt) ? receipt : null);
  }, [receipt]);

  const handleDrop = async (event?: FormEvent) => {
    event?.preventDefault();
    if (inFlight.current || (!pending && (!canPlace || !supportedRules))) return;
    inFlight.current = true;
    setBusy(true);
    setRevealed(null);
    setActiveBet(null);
    setVisibleIds(history.map((bet) => bet.request_id));
    if (wallet) setHeldBalance(pending ? wallet.balance : wallet.balance - stake);
    const bet = await place();
    if (!live.current) return;
    if (isPlinkoResult(bet)) {
      setActiveBet(bet);
      setDropping(true);
      return;
    }
    inFlight.current = false;
    setBusy(false);
    setHeldBalance(null);
    setVisibleIds(null);
    setRevealed(bet);
  };

  const handleQuickBet = (value: number) => {
    setAmount(String(Math.max(minBet, Math.min(maxBet, value))));
  };

  let resultTitle = 'One ball. Twelve bounces.';
  let resultDetail = 'Choose your wager and let it drop.';
  if (busy) {
    resultTitle = dropping ? 'Finding its way…' : 'Confirming your wager…';
    resultDetail = dropping ? 'Follow the ball to its pocket.' : 'Your result will appear here.';
  } else if (revealed) {
    resultTitle = `${revealed.payout.toLocaleString()} TNB returned`;
    resultDetail = lastResult
      ? `Pocket ${lastResult.result.slot + 1} · ${lastResult.result.multiplier}× · Net ${lastResult.profit > 0 ? '+' : ''}${lastResult.profit.toLocaleString()} TNB`
      : `Your ${revealed.game} bet was confirmed.`;
  }

  return (
    <S.Page>
      <S.BackLink to="/games">← All games</S.BackLink>
      <S.Header>
        <div>
          <h1>Plinko</h1>
          <p>A little bounce. A little suspense. A pocket of possibility.</p>
        </div>
        <S.Status data-available={available} role="status">
          {availability}
        </S.Status>
      </S.Header>
      <S.Floor>
        <S.Layout>
          <S.Controls onSubmit={handleDrop}>
            <div>
              <S.Eyebrow>The thenewboston casino</S.Eyebrow>
              <S.Stat>
                <span>Your balance</span>
                <strong>
                  {isAuthenticated && displayedBalance !== undefined ? `${displayedBalance.toLocaleString()} TNB` : '—'}
                </strong>
              </S.Stat>
            </div>
            {!isAuthenticated && (
              <div>
                <S.Note>Sign in to drop a ball with coins from your TNB wallet.</S.Note>
                <S.AuthButtons />
              </div>
            )}
            {isAuthenticated && pending && (
              <div>
                <S.Note>
                  A {pending.payload.amount.toLocaleString()} TNB {pending.payload.game} bet is awaiting confirmation.
                  Retry the same wager to safely recover its result.
                </S.Note>
                <S.DropButton disabled={busy} onClick={() => handleDrop()} type="button">
                  {busy ? 'Checking your bet…' : 'Retry same bet'}
                </S.DropButton>
              </div>
            )}
            {isAuthenticated && !pending && (
              <>
                <S.Field>
                  <label htmlFor="plinko-bet-amount">Bet amount · TNB</label>
                  <S.Input
                    aria-describedby="plinko-bet-limit"
                    disabled={busy}
                    id="plinko-bet-amount"
                    inputMode="numeric"
                    max={maxBet}
                    min={minBet}
                    onChange={(event) => setAmount(event.target.value)}
                    required
                    step={1}
                    type="number"
                    value={amount}
                  />
                  <S.QuickBets aria-label="Quick bets" role="group">
                    <S.Button disabled={busy || maxBet < minBet} onClick={() => handleQuickBet(minBet)} type="button">
                      Min
                    </S.Button>
                    <S.Button
                      aria-label="Halve bet"
                      disabled={busy || maxBet < minBet}
                      onClick={() => handleQuickBet(Math.floor((validStake ? stake : minBet) / 2))}
                      type="button"
                    >
                      ½
                    </S.Button>
                    <S.Button
                      aria-label="Double bet"
                      disabled={busy || maxBet < minBet}
                      onClick={() => handleQuickBet((validStake ? stake : minBet) * 2)}
                      type="button"
                    >
                      2×
                    </S.Button>
                    <S.Button
                      disabled={busy || maxBet < minBet}
                      onClick={() => handleQuickBet(Math.min(maxBet, wallet?.balance ?? 0))}
                      type="button"
                    >
                      Max
                    </S.Button>
                  </S.QuickBets>
                  <S.Note id="plinko-bet-limit">
                    {game
                      ? `Minimum ${minBet.toLocaleString()} · Maximum ${maxBet.toLocaleString()} TNB`
                      : 'Loading bet limits…'}
                  </S.Note>
                </S.Field>
                <S.DropButton disabled={busy || !canPlace || !supportedRules} type="submit">
                  <ArrowDown aria-hidden size={18} />
                  {busy ? 'Dropping…' : 'Drop ball'}
                </S.DropButton>
              </>
            )}
            <S.Stats>
              <S.Stat>
                <span>Rows</span>
                <strong>12</strong>
              </S.Stat>
              <S.Stat>
                <span>Top total return</span>
                <strong>50×</strong>
              </S.Stat>
              <S.Stat>
                <span>Return to player</span>
                <strong>95.166%</strong>
              </S.Stat>
              <S.Note>Whole TNB wagers. Payouts include your stake. Each drop is independent.</S.Note>
            </S.Stats>
            <div>
              {isAuthenticated && !pending && !busy && available && !validAmount && (
                <S.Alert role="alert">Enter a whole TNB amount within the current limits.</S.Alert>
              )}
              {isAuthenticated && !pending && !busy && wallet && stake > wallet.balance && (
                <S.Alert role="alert">Your TNB wallet does not have enough coins for this wager.</S.Alert>
              )}
              {isAuthenticated && !wallet && <S.Note>No TNB balance available.</S.Note>}
              {!available && summary && <S.Note>{unavailableMessage}</S.Note>}
              {game && !supportedRules && (
                <S.Alert role="alert">
                  This game has updated rules. Refresh the page before placing a new wager.
                </S.Alert>
              )}
              {error && <S.Alert role="alert">{error}</S.Alert>}
              {(unfinishedGame || pending?.payload.game === 'blackjack') && (
                <S.Note>
                  <S.BackLink to="/blackjack/home">Resume your Blackjack hand</S.BackLink> before placing another wager.
                </S.Note>
              )}
              {loadError && (
                <S.Button onClick={refresh} type="button">
                  Refresh casino status
                </S.Button>
              )}
            </div>
          </S.Controls>
          <S.BoardColumn>
            <S.BoardHeader>
              <span>12 rows · 13 pockets</span>
              <span>
                <ShieldCheck aria-hidden size={14} /> Provably fair
              </span>
            </S.BoardHeader>
            <Board animate={animate} bet={activeBet} dropping={dropping} onComplete={handleComplete} />
            <S.Result aria-label="Plinko result" data-won={!!lastResult && lastResult.profit > 0} role="status">
              <strong>{resultTitle}</strong>
              <span>{resultDetail}</span>
            </S.Result>
          </S.BoardColumn>
        </S.Layout>
        <S.Lower>
          <History bets={recentBets} isAuthenticated={isAuthenticated} userId={self.id} />
          <S.Card>
            <S.Eyebrow>Know your game</S.Eyebrow>
            <h2>Every bounce has a 50/50 chance.</h2>
            <S.Note>
              The ball moves left or right at each peg. Its final pocket sets your total return: wager × multiplier. A
              0× pocket returns nothing; 1× returns your stake.
            </S.Note>
            <S.Details>
              <summary>All pockets, payouts &amp; probabilities</summary>
              <S.Note>Pockets run left to right. The displayed multipliers apply to rules version 1.</S.Note>
              <S.Table>
                <thead>
                  <tr>
                    <th scope="col">Pocket</th>
                    <th scope="col">Return</th>
                    <th scope="col">Chance</th>
                  </tr>
                </thead>
                <tbody>
                  {MULTIPLIERS.map((multiplier, slot) => (
                    <tr key={slot}>
                      <td>{slot + 1}</td>
                      <td>{multiplier}×</td>
                      <td>{((POCKET_WEIGHTS[slot] / 4096) * 100).toFixed(3)}%</td>
                    </tr>
                  ))}
                </tbody>
              </S.Table>
              <S.Note>
                The theoretical return is 3,898 / 4,096 (95.166015625%). The house edge is 4.833984375%. These are
                long-run averages, not a promise for a session.
              </S.Note>
            </S.Details>
            <S.Details>
              <summary>How to verify your drop</summary>
              <S.Note>
                The casino commits to a secret seed before you bet. Your browser adds a fresh seed, then the casino
                reveals its seed with the settled receipt. Open any receipt to independently check the commitment, all
                twelve steps, and payout.
              </S.Note>
              <S.Note>
                The outcome is settled before the animation begins. The animation follows the recorded path and never
                changes your result.
              </S.Note>
            </S.Details>
            <S.Details>
              <summary>The casino fund</summary>
              <S.Note>
                Every accepted wager has its payout covered. Limits adjust to the available casino balance, separate
                from the board-game reward pool.
              </S.Note>
              <S.Note>Available: {summary ? summary.fund.available.toLocaleString() : '—'} TNB</S.Note>
            </S.Details>
            <S.Note>Play for fun. Decide your limit before you start.</S.Note>
          </S.Card>
        </S.Lower>
      </S.Floor>
      {summary?.can_manage && self.id && (
        <S.Admin>
          <FundControls onSuccess={handleFundSuccess} userId={self.id} />
        </S.Admin>
      )}
    </S.Page>
  );
};

const Home = () => (
  <CasinoSession>
    <PlinkoGame />
  </CasinoSession>
);

export default Home;
