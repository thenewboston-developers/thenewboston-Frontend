import {FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {createMancalaMatch, getMancalaMatches} from 'api/mancala';
import mancalaCover from 'assets/mancala-cover.webp';
import AuthButtons from 'components/AuthButtons';
import GameHero from 'components/GameHero';
import Loader from 'components/Loader';
import UserSearchInput from 'components/UserSearchInput';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';
import {upsertMancalaMatch} from 'store/mancala';
import {AppDispatch, UserReadSerializer} from 'types';
import {MancalaDifficulty, MancalaMatch, MancalaMode} from 'types/mancala';
import {isCancellationError} from 'utils/errors';

import Rules from './Rules';
import * as S from './Styles';
import {getErrorMessage, getPlayerName, STORE} from './utils';

const TimeOption = ({prefix}: {prefix: string}) => (
  <S.Field htmlFor={`${prefix}-time`}>
    Time per player, whole match
    <S.Select defaultValue="600" id={`${prefix}-time`} name="time_limit_seconds">
      <option value="300">5 minutes</option>
      <option value="600">10 minutes</option>
      <option value="900">15 minutes</option>
      <option value="1800">30 minutes</option>
    </S.Select>
  </S.Field>
);

const MatchRow = ({match, selfId}: {match: MancalaMatch; selfId?: number | null}) => {
  const isIncoming = match.status === 'pending' && match.guest?.id === selfId;
  const isOutgoing = match.status === 'pending' && match.host.id === selfId;
  let label = match.status === 'finished' ? 'View result' : 'Open board';
  if (isIncoming) label = 'Review challenge';
  if (isOutgoing) label = 'Awaiting reply';
  let outcome = '';
  if (match.status === 'finished') outcome = match.winner ? ` · ${getPlayerName(match, match.winner)} won` : ' · Draw';
  return (
    <S.MatchLink to={`/mancala/matches/${match.id}`}>
      <div>
        <S.PlayerName>
          {getPlayerName(match, 'host')} <span aria-label="versus">vs.</span> {getPlayerName(match, 'guest')}
        </S.PlayerName>
        <S.Small>
          {match.status === 'pending'
            ? `${Math.round(match.time_limit_seconds / 60)} min per player`
            : `${match.board[STORE.host]}–${match.board[STORE.guest]}`}{' '}
          · {match.stake_amount ? `${match.stake_amount.toLocaleString()} TNB each` : 'Free play'}
          {outcome}
        </S.Small>
      </div>
      <S.Badge>{label} →</S.Badge>
    </S.MatchLink>
  );
};

const Home = () => {
  const [createError, setCreateError] = useState('');
  const [creatingMode, setCreatingMode] = useState<MancalaMode | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<MancalaMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mine, setMine] = useState<MancalaMatch[]>([]);
  const [opponent, setOpponent] = useState<UserReadSerializer | null>(null);
  const [publicMatches, setPublicMatches] = useState<MancalaMatch[]>([]);
  const [retryKey, setRetryKey] = useState(0);
  const [stake, setStake] = useState('0');
  const activeViewer = useRef<{authenticated: boolean; userId?: number | null}>({authenticated: false});
  const creationLock = useRef(false);
  const creationRequest = useRef<{id: string; signature: string} | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useIsAuthenticated();
  const live = useRef(true);
  const navigate = useNavigate();
  const self = useSelector(getSelf);
  activeViewer.current = {authenticated: isAuthenticated, userId: self.id};

  useEffect(() => {
    live.current = true;
    return () => {
      live.current = false;
    };
  }, []);

  useEffect(() => {
    // Signing in or out must not leave one viewer's matches or half-sent challenge with the next
    creationLock.current = false;
    creationRequest.current = null;
    setCreatingMode(null);
    setCreateError('');
    setMine([]);
    setHistory([]);
    setOpponent(null);
  }, [isAuthenticated, self.id]);

  useEffect(() => {
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    let mounted = true;
    const loadUnfinishedMatches = async () => {
      const matches = new Map<number, MancalaMatch>();
      let page = 1;
      while (mounted) {
        // Invitations received from other members can exceed a single page. Keep requests sequential and
        // constrained to this endpoint rather than following an arbitrary URL with authentication headers.
        // eslint-disable-next-line no-await-in-loop
        const response = await getMancalaMatches(
          {mine: 'true', page, page_size: 50, status: 'pending,active'},
          controller.signal,
        );
        response.results.forEach((match) => matches.set(match.id, match));
        if (!response.next) break;
        page += 1;
      }
      return Array.from(matches.values());
    };
    const load = async () => {
      try {
        const [publicPage, unfinishedMatches, historyPage] = await Promise.all([
          getMancalaMatches({mine: 'exclude', page_size: 10, status: 'active'}, controller.signal),
          isAuthenticated ? loadUnfinishedMatches() : [],
          isAuthenticated
            ? getMancalaMatches({mine: 'true', page_size: 10, status: 'finished'}, controller.signal)
            : null,
        ]);
        if (!mounted) return;
        setPublicMatches(publicPage.results);
        setMine(unfinishedMatches);
        setHistory(historyPage?.results ?? []);
        setError('');
      } catch (loadError) {
        if (mounted && !isCancellationError(loadError)) setError(getErrorMessage(loadError));
      } finally {
        if (mounted) {
          setIsLoading(false);
          timer = setTimeout(load, document.hidden ? 15000 : 5000);
        }
      }
    };
    load();
    return () => {
      mounted = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, [isAuthenticated, retryKey, self.id]);

  const handleCreate = useCallback(
    async (event: FormEvent<HTMLFormElement>, mode: MancalaMode) => {
      event.preventDefault();
      // A signed-out visitor can play the computer as a guest; challenging a member needs an account
      if ((!isAuthenticated && mode !== 'computer') || creationLock.current) return;
      const isCurrent = () =>
        live.current &&
        activeViewer.current.authenticated === isAuthenticated &&
        activeViewer.current.userId === self.id;
      setCreateError('');
      if (mode === 'human' && (!opponent || opponent.id === self.id)) {
        setCreateError(opponent ? 'Choose another member to challenge.' : 'Choose a member to challenge.');
        return;
      }
      const form = new FormData(event.currentTarget);
      const amount = mode === 'human' ? Number(stake) : 0;
      if (!Number.isSafeInteger(amount) || amount < 0 || amount > 1000000000) {
        setCreateError('Enter a whole-number stake from 0 to 1,000,000,000 TNB.');
        return;
      }
      creationLock.current = true;
      setCreatingMode(mode);
      try {
        const data = {
          difficulty: (form.get('difficulty') ?? 'normal') as MancalaDifficulty,
          mode,
          opponent_id: mode === 'human' ? opponent!.id : undefined,
          stake_amount: amount,
          time_limit_seconds: Number(form.get('time_limit_seconds')),
        };
        // A retry after a lost response must reach the server as the same request, or the stake could lock twice
        const signature = JSON.stringify(data);
        if (creationRequest.current?.signature !== signature)
          creationRequest.current = {id: crypto.randomUUID(), signature};
        const match = await createMancalaMatch({...data, request_id: creationRequest.current.id});
        if (!isCurrent()) return;
        creationRequest.current = null;
        dispatch(upsertMancalaMatch(match));
        if (amount) dispatch(getAllUserWallets()).catch(() => undefined);
        navigate(`/mancala/matches/${match.id}`);
      } catch (actionError) {
        if (isCurrent()) setCreateError(getErrorMessage(actionError));
      } finally {
        if (isCurrent()) {
          creationLock.current = false;
          setCreatingMode(null);
        }
      }
    },
    [dispatch, isAuthenticated, navigate, opponent, self.id, stake],
  );

  const activeMatches = mine.filter((match) => match.status !== 'pending');
  const challenges = mine.filter((match) => match.status === 'pending');

  return (
    <S.Container>
      <S.Navigation>
        <S.TextLink to="/games">← All games</S.TextLink>
        <S.Badge>Sow · Capture · Count</S.Badge>
      </S.Navigation>
      <GameHero
        artwork={mancalaCover}
        artworkAlt="A carved walnut mancala board with glass stones in jewel colors"
        challengeHref="#mancala-challenge"
        description="Sow your stones around the board, earn extra turns, and capture what your opponent leaves open. Play a quick game against the computer or start a rivalry."
        eyebrow="COUNT & CAPTURE STRATEGY"
        game="Mancala"
        highlights={['48 stones in play', 'Extra turns & captures', '3 difficulty levels']}
        playHref="#mancala-computer"
        tagline="Every stone counts."
        theme="amber"
      />
      {createError && <S.Error role="alert">{createError}</S.Error>}
      <S.PanelGrid>
        <S.Panel id="mancala-computer" tabIndex={-1}>
          <S.Eyebrow>Find your rhythm</S.Eyebrow>
          <S.TitleSmall>Play the computer</S.TitleSmall>
          <S.Form onSubmit={(event) => handleCreate(event, 'computer')}>
            <S.Detail>
              Always free. No account needed. Signed-in players can earn TNB for a win while the community game fund has
              coins.
            </S.Detail>
            <S.FieldGrid>
              <S.Field htmlFor="computer-difficulty">
                Difficulty
                <S.Select defaultValue="normal" id="computer-difficulty" name="difficulty">
                  <option value="easy">Easy · Get comfortable</option>
                  <option value="normal">Normal · Think ahead</option>
                  <option value="hard">Hard · Take the challenge</option>
                </S.Select>
              </S.Field>
              <TimeOption prefix="computer" />
            </S.FieldGrid>
            <S.Actions>
              <S.Button disabled={!!creatingMode} type="submit">
                {creatingMode === 'computer' ? 'Setting the board…' : 'Play free →'}
              </S.Button>
            </S.Actions>
          </S.Form>
        </S.Panel>
        <S.Panel id="mancala-challenge" tabIndex={-1}>
          <S.Eyebrow>Make it a rivalry</S.Eyebrow>
          <S.TitleSmall>Challenge a player</S.TitleSmall>
          {!isAuthenticated ? (
            <>
              <S.Detail>Create an account to challenge friends and earn TNB from computer wins.</S.Detail>
              <AuthButtons />
            </>
          ) : (
            <S.Form onSubmit={(event) => handleCreate(event, 'human')}>
              <UserSearchInput
                errors={{}}
                label="Find a member"
                name="opponent"
                onChange={setOpponent}
                placeholder="Search by username"
                touched={{}}
                value={opponent}
              />
              <S.FieldGrid>
                <TimeOption prefix="human" />
                <S.Field htmlFor="human-stake">
                  Stake per player (TNB)
                  <S.Input
                    id="human-stake"
                    inputMode="numeric"
                    max={1000000000}
                    min={0}
                    name="stake_amount"
                    onChange={(event) => setStake(event.target.value)}
                    required
                    step={1}
                    type="number"
                    value={stake}
                  />
                </S.Field>
              </S.FieldGrid>
              <S.Detail>
                {Number(stake) > 0
                  ? `${Number(stake).toLocaleString()} TNB locks when you send the challenge. The winner takes both stakes; a draw returns them.`
                  : 'Set the stake to 0 for a free match. Both players agree to the terms before the game starts.'}
              </S.Detail>
              <S.Actions>
                <S.Button disabled={!!creatingMode} type="submit">
                  {creatingMode === 'human' ? 'Sending…' : 'Send challenge →'}
                </S.Button>
              </S.Actions>
            </S.Form>
          )}
        </S.Panel>
      </S.PanelGrid>
      {error && (
        <S.Error role="alert">
          {error}{' '}
          <S.Button $secondary onClick={() => setRetryKey((key) => key + 1)} type="button">
            Retry
          </S.Button>
        </S.Error>
      )}
      {isLoading && (
        <S.Status role="status">
          <Loader />
          <S.Detail>Finding your next match…</S.Detail>
        </S.Status>
      )}
      {challenges.length > 0 && (
        <S.Section>
          <S.TitleSmall>Challenges</S.TitleSmall>
          <S.List>
            {challenges.map((match) => (
              <MatchRow key={match.id} match={match} selfId={self.id} />
            ))}
          </S.List>
        </S.Section>
      )}
      {activeMatches.length > 0 && (
        <S.Section>
          <S.TitleSmall>Your boards</S.TitleSmall>
          <S.List>
            {activeMatches.map((match) => (
              <MatchRow key={match.id} match={match} selfId={self.id} />
            ))}
          </S.List>
        </S.Section>
      )}
      <S.Section>
        <S.TitleSmall>Watch live</S.TitleSmall>
        {publicMatches.length ? (
          <S.List>
            {publicMatches.map((match) => (
              <MatchRow key={match.id} match={match} />
            ))}
          </S.List>
        ) : (
          !isLoading && <S.Empty>No other matches are underway. Start a game and make the first move.</S.Empty>
        )}
      </S.Section>
      {history.length > 0 && (
        <S.Section>
          <S.TitleSmall>Your recent matches</S.TitleSmall>
          <S.List>
            {history.map((match) => (
              <MatchRow key={match.id} match={match} selfId={self.id} />
            ))}
          </S.List>
        </S.Section>
      )}
      <Rules />
    </S.Container>
  );
};

export default Home;
