import {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';

import {getTribesSeasons} from 'api/tribes';
import tribesArtwork from 'assets/tribes-thumbnail.svg';
import {PATH_AUTHENTICATION} from 'constants/paths';
import {getSelf} from 'selectors/state';
import {TribesPanelProps, TribesSeason} from 'types/tribes';
import {analyticsArea, analyticsTarget} from 'utils/analyticsAttributes';
import {getAuthenticationPath} from 'utils/authentication';

import {count, date, duration} from './common';
import Community from './Community';
import Dashboard from './Dashboard';
import Guide from './Guide';
import History from './History';
import Inventory from './Inventory';
import Market from './Market';
import Messages from './Messages';
import Military from './Military';
import Recruitment from './Recruitment';
import * as S from './Styles';
import {useTribes} from './useTribes';
import Workers from './Workers';
import World from './World';

const TABS = [
  ['home', 'Overview'],
  ['recruitment', 'Recruitment'],
  ['world', 'World'],
  ['production', 'Production'],
  ['inventory', 'Inventory'],
  ['tribe', 'Tribe'],
  ['market', 'Marketplace'],
  ['military', 'Military'],
  ['messages', 'Messages'],
  ['history', 'History'],
  ['guide', 'How to play'],
] as const;
type Tab = (typeof TABS)[number][0];

const Tribes = () => {
  const [historyError, setHistoryError] = useState('');
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [moreHistory, setMoreHistory] = useState(true);
  const [olderSeasons, setOlderSeasons] = useState<TribesSeason[]>([]);
  const [seasonId, setSeasonId] = useState<number | undefined>();
  const [tab, setTab] = useState<Tab>('home');
  const self = useSelector(getSelf);
  const game = useTribes(self.id, seasonId);
  const historyRequest = useRef<AbortController | null>(null);
  const {act, busy, error, loading, now, pending, refresh, retry, retrying, seasons, state} = game;
  const allSeasons = Array.from(
    new Map([...seasons, ...olderSeasons].map((season) => [season.id, season])).values(),
  ).sort((a, b) => b.id - a.id);
  const tribe = state?.tribes.find((entry) => entry.id === state.viewer?.tribe_id);
  const active = state?.season.status === 'active' && now < new Date(state.season.ends_at).getTime();
  const props: TribesPanelProps | null = state ? {act, busy, canPlay: !!(active && tribe), now, state, tribe} : null;
  let selected: Tab = tab;
  if (tab === 'home' && state?.season.status === 'recruiting') selected = 'recruitment';
  if (tab === 'home' && state?.season.status === 'finished') selected = 'history';
  let seasonTitle = tribe ? `${tribe.emblem} ${tribe.name}` : 'The world is in motion';
  let timerLabel = 'Final battle in';
  if (state?.season.status === 'recruiting') {
    seasonTitle = 'The gathering begins';
    timerLabel = 'Season starts in';
  }
  if (state?.season.status === 'finished') {
    seasonTitle = 'The battle is complete';
    timerLabel = 'Final battle';
  }

  useEffect(() => {
    historyRequest.current?.abort();
    historyRequest.current = null;
    setOlderSeasons([]);
    setMoreHistory(true);
    setLoadingHistory(false);
    setHistoryError('');
    return () => {
      historyRequest.current?.abort();
      historyRequest.current = null;
    };
  }, [self.id]);

  const handleOlderSeasons = async () => {
    if (historyRequest.current || !allSeasons.length) return;
    const request = new AbortController();
    historyRequest.current = request;
    setLoadingHistory(true);
    setHistoryError('');
    try {
      const earlier = await getTribesSeasons(request.signal, allSeasons[allSeasons.length - 1].id);
      if (!request.signal.aborted) {
        setOlderSeasons((current) => [...current, ...earlier]);
        setMoreHistory(earlier.length === 100);
      }
    } catch {
      if (!request.signal.aborted) setHistoryError('Older seasons could not be loaded. Please try again.');
    } finally {
      if (historyRequest.current === request) {
        historyRequest.current = null;
        setLoadingHistory(false);
      }
    }
  };

  const renderPanel = () => {
    if (tab === 'guide') return <Guide />;
    if (!props) return null;
    switch (selected) {
      case 'recruitment':
        return <Recruitment {...props} />;
      case 'world':
        return <World {...props} />;
      case 'production':
        return <Workers {...props} />;
      case 'inventory':
        return <Inventory {...props} />;
      case 'tribe':
        return <Community {...props} />;
      case 'market':
        return <Market {...props} />;
      case 'military':
        return <Military {...props} />;
      case 'messages':
        return <Messages {...props} />;
      case 'history':
        return <History {...props} />;
      default:
        return <Dashboard {...props} />;
    }
  };

  return (
    <S.Container {...analyticsArea('tribes')}>
      <S.Content>
        <S.Topline>
          <S.LinkButton to="/games">← All games</S.LinkButton>
          <S.Actions>
            <S.Badge>WEEKLY MULTIPLAYER STRATEGY</S.Badge>
            <S.LinkButton to="/wallets/home">TNB economy ↗</S.LinkButton>
          </S.Actions>
        </S.Topline>
        <S.Hero>
          <S.HeroCopy>
            <S.Eyebrow style={{color: '#c3cc9d'}}>A WORLD BUILT TOGETHER</S.Eyebrow>
            <h1>Tribes.</h1>
            <p>
              Gather your people. Build your world.
              <br />A week of strategy. A battle for the history books.
            </p>
          </S.HeroCopy>
          <S.HeroArt
            alt="An isometric world of forests, mountains, and neighboring tribes flying their banners"
            src={tribesArtwork}
          />
        </S.Hero>
        {!self.id && (
          <S.Banner>
            Explore the world, then sign in to form a tribe and join the next season.{' '}
            <S.LinkButton to={getAuthenticationPath(PATH_AUTHENTICATION.SIGN_IN, '/tribes/home')}>
              Sign in →
            </S.LinkButton>
          </S.Banner>
        )}
        {state && (
          <>
            <S.Topline>
              <S.Actions>
                <S.Badge>SEASON {state.season.id}</S.Badge>
                <strong>{seasonTitle}</strong>
              </S.Actions>
              <S.Field>
                <span className="sr-only">Choose a season</span>
                <select
                  aria-label="Choose a season"
                  onChange={(event) => setSeasonId(event.target.value ? Number(event.target.value) : undefined)}
                  value={seasonId ?? ''}
                >
                  <option value="">Current season</option>
                  {allSeasons.map((season) => (
                    <option key={season.id} value={season.id}>
                      Season {season.id} · {season.status}
                    </option>
                  ))}
                </select>
              </S.Field>
            </S.Topline>
            {seasons.length >= 100 && moreHistory && (
              <S.Actions>
                <S.Button $secondary disabled={loadingHistory} onClick={handleOlderSeasons}>
                  {loadingHistory ? 'Loading seasons…' : 'Load older seasons'}
                </S.Button>
              </S.Actions>
            )}
            {historyError && <S.Error role="alert">{historyError}</S.Error>}
            <S.Stats>
              <S.Stat>
                <span>{timerLabel}</span>
                <strong>
                  {state.season.status === 'finished'
                    ? 'Complete'
                    : duration(
                        (new Date(
                          state.season.status === 'recruiting' ? state.season.starts_at : state.season.ends_at,
                        ).getTime() -
                          now) /
                          1000,
                      )}
                </strong>
              </S.Stat>
              <S.Stat>
                <span>Tribes in the world</span>
                <strong>{state.tribes.length}</strong>
                <small>{state.tribes.reduce((sum, team) => sum + team.members.length, 0)} players</small>
              </S.Stat>
              <S.Stat>
                <span>Your wallet</span>
                <strong>{self.id ? count(state.viewer?.wallet_balance) : '—'}</strong>
                <small>TNB</small>
              </S.Stat>
              <S.Stat>
                <span>Tribal treasury</span>
                <strong>{tribe ? count(tribe.treasury) : '—'}</strong>
                <small>TNB</small>
              </S.Stat>
            </S.Stats>
            {state.season.status === 'finished' && (
              <S.Banner>
                You are viewing an archived season. Goods and territory are historical; your TNB wallet balance
                persists.
              </S.Banner>
            )}
            {state.season.status === 'active' && !tribe && (
              <S.Banner>
                Rosters are locked for this season. You can inspect the world and battle results, then join a tribe in
                the next recruitment period.
              </S.Banner>
            )}
            {state.season.status === 'active' && !active && (
              <S.Banner>
                The final battle cutoff has passed. Results will appear once the season has been resolved.
              </S.Banner>
            )}
          </>
        )}
        <S.Tabs aria-label="Tribes sections">
          {TABS.map(([id, text]) => (
            <S.Tab
              {...analyticsTarget(id)}
              $active={tab === id}
              aria-current={tab === id ? 'page' : undefined}
              key={id}
              onClick={() => setTab(id)}
            >
              {text}
            </S.Tab>
          ))}
        </S.Tabs>
        {pending && (
          <S.Banner role="alert">
            Your last action has not been confirmed. Retry it safely before making another move; the same transaction
            receipt prevents duplicate charges.
            <S.Actions style={{marginTop: 12}}>
              <S.Button disabled={retrying} onClick={() => retry()}>
                {retrying ? 'Confirming…' : 'Retry last action'}
              </S.Button>
            </S.Actions>
          </S.Banner>
        )}
        {error && (
          <S.Error role="alert">
            {error}
            {!pending && (
              <S.Button $secondary onClick={() => refresh()} style={{marginLeft: 12}}>
                Refresh
              </S.Button>
            )}
          </S.Error>
        )}
        {loading && !state && tab !== 'guide' && <S.Empty role="status">Opening the world…</S.Empty>}
        {renderPanel()}
        {state && (
          <S.Topline>
            <S.Muted>
              Season {state.season.id} · {date(state.season.starts_at)} — {date(state.season.ends_at)}
            </S.Muted>
            <S.Muted>One world. Real people. Lasting stories.</S.Muted>
          </S.Topline>
        )}
      </S.Content>
    </S.Container>
  );
};
export default Tribes;
