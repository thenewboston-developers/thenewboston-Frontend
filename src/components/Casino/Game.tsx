import {FormEvent, ReactNode} from 'react';

import AuthButtons from 'components/AuthButtons';
import {CasinoBet, CasinoGame as CasinoGameConfig, CasinoGameId, RouletteSelection} from 'types/casino';

import FundControls from './FundControls';
import Receipt from './Receipt';
import * as S from './Styles';
import useCasinoWager from './useCasinoWager';

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
    summary,
    unavailableMessage,
    wallet,
  } = useCasinoWager({gameId, selection, validSelection});

  const handlePlace = async (event?: FormEvent) => {
    event?.preventDefault();
    await place();
  };

  const displayedReceipt = receipt?.game === gameId ? receipt : null;

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
                    <S.Button disabled={!canPlace} type="submit">
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
