import {FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {createBattleshipMatch, getBattleshipMatches} from 'api/battleship';
import AuthButtons from 'components/AuthButtons';
import Loader from 'components/Loader';
import UserSearchInput from 'components/UserSearchInput';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';
import {upsertBattleshipMatch} from 'store/battleship';
import {AppDispatch, UserReadSerializer} from 'types';
import {BattleshipDifficulty, BattleshipMatch, BattleshipMode} from 'types/battleship';
import {isCancellationError} from 'utils/errors';

import Artwork from './Artwork';
import Rules from './Rules';
import * as S from './Styles';
import {getErrorMessage, getPlayerName} from './utils';

const MatchOptions = ({prefix}: {prefix: string}) => (
  <div>
    <S.Field htmlFor={`${prefix}-time`}>
      Time per player, whole match
      <S.Select defaultValue="900" id={`${prefix}-time`} name="time_limit_seconds">
        <option value="300">5 minutes</option>
        <option value="600">10 minutes</option>
        <option value="900">15 minutes</option>
        <option value="1800">30 minutes</option>
      </S.Select>
    </S.Field>
  </div>
);

const MatchRow = ({match, selfId}: {match: BattleshipMatch; selfId?: number | null}) => {
  const isIncoming = match.status === 'pending' && match.guest?.id === selfId;
  const isOutgoing = match.status === 'pending' && match.host.id === selfId;
  let label = match.status === 'finished' ? 'View result' : 'Open board';
  if (isIncoming) label = 'Review challenge';
  if (isOutgoing) label = 'Awaiting reply';
  return (
    <S.MatchLink to={`/battleship/matches/${match.id}`}>
      <div>
        <strong>
          {getPlayerName(match, 'host')} <span aria-label="versus">vs.</span> {getPlayerName(match, 'guest')}
        </strong>
        <S.Small>
          {match.phase === 'placing' && match.status === 'active' ? 'Placing fleets' : match.status} ·{' '}
          {match.stake_amount ? `${match.stake_amount.toLocaleString()} TNB each` : 'Free play'}
          {match.winner ? ` · ${getPlayerName(match, match.winner)} won` : ''}
        </S.Small>
      </div>
      <S.Badge>{label} →</S.Badge>
    </S.MatchLink>
  );
};

const Home = () => {
  const [createError, setCreateError] = useState('');
  const [creatingMode, setCreatingMode] = useState<BattleshipMode | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<BattleshipMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mine, setMine] = useState<BattleshipMatch[]>([]);
  const [opponent, setOpponent] = useState<UserReadSerializer | null>(null);
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
    creationLock.current = false;
    creationRequest.current = null;
    setCreatingMode(null);
    setCreateError('');
    setMine([]);
    setHistory([]);
    setOpponent(null);
  }, [isAuthenticated, self.id]);

  useEffect(() => {
    if (!isAuthenticated) {
      setMine([]);
      setHistory([]);
      setIsLoading(false);
      return undefined;
    }
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    let mounted = true;
    const loadUnfinishedMatches = async () => {
      const matches = new Map<number, BattleshipMatch>();
      let page = 1;
      while (mounted) {
        // Invitations received from other members can exceed a single page. Keep requests sequential and
        // constrained to this endpoint rather than following an arbitrary URL with authentication headers.
        // eslint-disable-next-line no-await-in-loop
        const response = await getBattleshipMatches({page, page_size: 50, status: 'pending,active'}, controller.signal);
        response.results.forEach((match) => matches.set(match.id, match));
        if (!response.next) break;
        page += 1;
      }
      return Array.from(matches.values());
    };
    const load = async () => {
      try {
        const [unfinishedMatches, historyPage] = await Promise.all([
          isAuthenticated ? loadUnfinishedMatches() : [],
          isAuthenticated
            ? getBattleshipMatches({page_size: 10, status: 'finished,cancelled,declined,expired'}, controller.signal)
            : null,
        ]);
        if (!mounted) return;
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
    async (event: FormEvent<HTMLFormElement>, mode: BattleshipMode) => {
      event.preventDefault();
      if (!isAuthenticated || creationLock.current) return;
      const isCurrent = () =>
        live.current && activeViewer.current.authenticated && activeViewer.current.userId === self.id;
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
          difficulty: (form.get('difficulty') ?? 'normal') as BattleshipDifficulty,
          mode,
          opponent_id: mode === 'human' ? opponent!.id : undefined,
          stake_amount: amount,
          time_limit_seconds: Number(form.get('time_limit_seconds')),
        };
        const signature = JSON.stringify(data);
        if (creationRequest.current?.signature !== signature)
          creationRequest.current = {id: crypto.randomUUID(), signature};
        const match = await createBattleshipMatch({...data, request_id: creationRequest.current.id});
        if (!isCurrent()) return;
        creationRequest.current = null;
        dispatch(upsertBattleshipMatch(match));
        if (amount) dispatch(getAllUserWallets()).catch(() => undefined);
        navigate(`/battleship/matches/${match.id}`);
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
        <S.Badge>Naval strategy · Every shot counts</S.Badge>
      </S.Navigation>
      <S.Hero>
        <div>
          <S.Eyebrow>Battleship</S.Eyebrow>
          <S.Title>
            Hide your fleet.
            <br />
            Hunt theirs.
          </S.Title>
          <S.HeroDescription>
            Plot your fleet, read the water, and make every shot count. Practice against the computer or challenge a
            member for TNB.
          </S.HeroDescription>
          <S.Actions>
            <S.Badge>Computer & multiplayer</S.Badge>
            <S.Badge>Optional TNB stakes</S.Badge>
          </S.Actions>
        </div>
        <Artwork />
      </S.Hero>
      {!isAuthenticated ? (
        <S.Panel>
          <S.TitleSmall>Your fleet is ready for a captain.</S.TitleSmall>
          <S.HeroDescription>
            Sign in to play the computer for free or challenge a member with optional TNB stakes. Match boards are
            private to their players.
          </S.HeroDescription>
          <AuthButtons />
        </S.Panel>
      ) : (
        <>
          {createError && <S.Error role="alert">{createError}</S.Error>}
          <S.PanelGrid>
            <S.Panel>
              <S.Eyebrow>Practice your tactics</S.Eyebrow>
              <S.TitleSmall>Play the computer</S.TitleSmall>
              <S.Form onSubmit={(event) => handleCreate(event, 'computer')}>
                <S.Detail>Always free. Learn the grid or put your tactics to the test.</S.Detail>
                <S.Field htmlFor="computer-difficulty">
                  Difficulty
                  <S.Select defaultValue="normal" id="computer-difficulty" name="difficulty">
                    <option value="easy">Easy · Find your sea legs</option>
                    <option value="normal">Normal · Hunt and target</option>
                    <option value="hard">Hard · A calculated opponent</option>
                  </S.Select>
                </S.Field>
                <MatchOptions prefix="computer" />
                <S.Actions>
                  <S.Button disabled={!!creatingMode} type="submit">
                    {creatingMode === 'computer' ? 'Preparing your fleet…' : 'Play free →'}
                  </S.Button>
                </S.Actions>
              </S.Form>
            </S.Panel>
            <S.Panel>
              <S.Eyebrow>Make it a rivalry</S.Eyebrow>
              <S.TitleSmall>Challenge a player</S.TitleSmall>
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
                <MatchOptions prefix="human" />
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
                <S.Detail>
                  {Number(stake) > 0
                    ? `${Number(stake).toLocaleString()} TNB locks when you send the challenge. Your opponent matches it when accepting. The winner receives both stakes. Unaccepted challenges are refunded.`
                    : 'Set the stake to 0 for a free match. Both players agree to the terms before the game starts.'}
                </S.Detail>
                <S.Actions>
                  <S.Button disabled={!!creatingMode} type="submit">
                    {creatingMode === 'human' ? 'Sending…' : 'Send challenge →'}
                  </S.Button>
                </S.Actions>
              </S.Form>
            </S.Panel>
          </S.PanelGrid>
        </>
      )}
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
          <S.TitleSmall>Your active matches</S.TitleSmall>
          <S.List>
            {activeMatches.map((match) => (
              <MatchRow key={match.id} match={match} selfId={self.id} />
            ))}
          </S.List>
        </S.Section>
      )}
      {isAuthenticated && !isLoading && !mine.length && !error && (
        <S.Section>
          <S.Empty>No active matches. Launch a practice game or challenge a member to get started.</S.Empty>
        </S.Section>
      )}
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
