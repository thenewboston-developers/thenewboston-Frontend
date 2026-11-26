import {memo, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CircleCheck,
  Flag,
  Hammer,
  Info,
  LayoutDashboard,
  LogIn,
  LucideIcon,
  Map as MapIcon,
  MessagesSquare,
  Package,
  RefreshCw,
  ScrollText,
  Shield,
  Store,
  Swords,
  TriangleAlert,
  Users,
} from 'lucide-react';

import {getTribesSeasons} from 'api/tribes';
import {PATH_AUTHENTICATION} from 'constants/paths';
import {getSelf} from 'selectors/state';
import {TribesAction, TribesEmblemUpload, TribesPanelProps, TribesSeason} from 'types/tribes';
import {analyticsArea, analyticsTarget} from 'utils/analyticsAttributes';
import {getAuthenticationPath} from 'utils/authentication';

import HeroScene, {HeroPhase} from './art/HeroScene';
import ItemIcon from './art/ItemIcon';
import AnimatedNumber from './components/AnimatedNumber';
import Countdown from './components/Countdown';
import Emblem from './components/Emblem';
import {date, day, plural} from './common';
import Community from './Community';
import Dashboard from './Dashboard';
import Guide from './Guide';
import History from './History';
import Inventory from './Inventory';
import Locked from './Locked';
import Market from './Market';
import Messages from './Messages';
import Military from './Military';
import Recruitment from './Recruitment';
import * as S from './Styles';
import {useTribes} from './useTribes';
import Workers from './Workers';
import World from './World';

const SECTIONS: {icon: LucideIcon; id: string; text: string}[] = [
  {icon: LayoutDashboard, id: 'home', text: 'Overview'},
  {icon: Users, id: 'recruitment', text: 'Rosters'},
  {icon: MapIcon, id: 'world', text: 'World'},
  {icon: Hammer, id: 'production', text: 'Production'},
  {icon: Package, id: 'inventory', text: 'Inventory'},
  {icon: Shield, id: 'tribe', text: 'Tribe'},
  {icon: Store, id: 'market', text: 'Marketplace'},
  {icon: Swords, id: 'military', text: 'Military'},
  {icon: MessagesSquare, id: 'messages', text: 'Messages'},
  {icon: ScrollText, id: 'history', text: 'History'},
  {icon: BookOpen, id: 'guide', text: 'How to play'},
];

// Shown for a moment after the server confirms an action, so every move gets an answer
const CONFIRMATIONS: Record<string, string> = {
  accept_application: 'Application accepted. Welcome them aboard.',
  accept_invite: 'You joined the tribe.',
  apply: 'Application sent.',
  cancel_job: 'Assignment cancelled. Unused materials came back.',
  cancel_listing: 'Listing cancelled and escrow returned.',
  cancel_work_order: 'Project cancelled and supplies released.',
  contribute_work_order: 'Supplies contributed to the project.',
  create_listing: 'Your listing is on the market.',
  create_tribe: 'Your banner is raised.',
  create_work_order: 'Project created for the tribe.',
  deploy: 'Deployment saved.',
  fill_listing: 'Trade complete.',
  invite: 'Invitation sent.',
  leave: 'You left the tribe.',
  purchase_land: 'The land is yours.',
  queue: 'Your worker has new orders.',
  remove_member: 'Member removed from the roster.',
  transfer_items: 'Goods moved.',
  transfer_tnb: 'TNB sent.',
  transfer_unit: 'Units handed over.',
  treasury_deposit: 'Deposited into the treasury.',
  treasury_withdraw: 'Withdrawn to your wallet.',
  update_tribe: 'Tribe identity saved.',
};

const DAY = 86400000;
// The landscape only changes with the season's phase, not with the clock
const Scene = memo(HeroScene);

const Tribes = () => {
  const [edges, setEdges] = useState({left: false, right: false});
  const [historyError, setHistoryError] = useState('');
  const [indicator, setIndicator] = useState<{left: number; width: number} | null>(null);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [moreHistory, setMoreHistory] = useState(true);
  const [olderSeasons, setOlderSeasons] = useState<TribesSeason[]>([]);
  const [seasonId, setSeasonId] = useState<number | undefined>();
  const [toast, setToast] = useState<{id: number; text: string} | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const self = useSelector(getSelf);
  const game = useTribes(self.id, seasonId);
  const historyRequest = useRef<AbortController | null>(null);
  const navigation = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const {act, busy, error, loading, now, pending, refresh, retry, retrying, seasons, state, uploadEmblem} = game;

  const segment = location.pathname.split('/')[2];
  const tab = SECTIONS.some((section) => section.id === segment) ? segment : 'home';
  const allSeasons = Array.from(
    new Map([...seasons, ...olderSeasons].map((season) => [season.id, season])).values(),
  ).sort((a, b) => b.id - a.id);
  const tribe = state?.tribes.find((entry) => entry.id === state.viewer?.tribe_id);
  const status = state?.season.status;
  const startsAt = state ? new Date(state.season.starts_at).getTime() : 0;
  const endsAt = state ? new Date(state.season.ends_at).getTime() : 0;
  const active = status === 'active' && now < endsAt;
  // The lobby is the overview while tribes form, and the battle report is the overview once a season is over
  let selected = tab;
  if (tab === 'home' && status === 'recruiting') selected = 'recruitment';
  if (tab === 'home' && status === 'finished') selected = 'history';
  let current = tab;
  if (status === 'recruiting' && tab === 'recruitment') current = 'home';
  if (status === 'finished' && tab === 'history') current = 'home';
  const sections = SECTIONS.filter(
    (section) =>
      !(status === 'recruiting' && section.id === 'recruitment') &&
      !(status === 'finished' && section.id === 'history'),
  );

  let phase: HeroPhase = 'recruiting';
  if (status === 'active') phase = endsAt - now < DAY ? 'final' : 'active';
  if (status === 'finished') phase = 'finished';
  let headline = 'The world is in motion.';
  let statusLine = 'Season in progress';
  let timerLabel = 'Final battle in';
  if (tribe) headline = tribe.motto || 'Build, trade and prepare. The final battle decides everything.';
  if (status === 'active') {
    statusLine = `Day ${Math.min(7, Math.max(1, Math.ceil((now - startsAt) / DAY)))} of 7`;
    if (!active) statusLine = 'The great war is being fought';
    else if (phase === 'final') statusLine = 'The great war is hours away';
  }
  if (status === 'recruiting') {
    headline = 'Gather your people. Build your world. One week of strategy, one battle for the history books.';
    statusLine = 'Recruitment is open';
    timerLabel = 'Season starts in';
  }
  if (status === 'finished') {
    headline = 'The battle is complete. Every decision and every strike is now part of the record.';
    statusLine = 'Season complete';
  }
  if (!state) {
    headline = 'Gather your people. Build your world. One week of strategy, one battle for the history books.';
    statusLine = 'Weekly multiplayer strategy';
  }

  const handleAct = useCallback<TribesAction>(
    async (action, data) => {
      const success = await act(action, data);
      if (success && CONFIRMATIONS[action]) setToast({id: Date.now(), text: CONFIRMATIONS[action]});
      return success;
    },
    [act],
  );

  // Places the sliding highlight under the current section and notes which edges of the navigation are cut off
  const handleMeasure = useCallback(() => {
    const scroller = navigation.current;
    if (!scroller) return;
    const item = scroller.querySelector<HTMLElement>('[aria-current="page"]');
    if (item)
      setIndicator((value) =>
        value?.left === item.offsetLeft && value.width === item.offsetWidth
          ? value
          : {left: item.offsetLeft, width: item.offsetWidth},
      );
    const left = scroller.scrollLeft > 4;
    const right = scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 4;
    setEdges((value) => (value.left === left && value.right === right ? value : {left, right}));
  }, []);

  const handleGo = useCallback((section: string) => navigate(`/tribes/${section}`), [navigate]);

  const handleUploadEmblem = useCallback<TribesEmblemUpload>(
    async (image) => {
      const success = await uploadEmblem(image);
      if (success) setToast({id: Date.now(), text: 'Your emblem is flying.'});
      return success;
    },
    [uploadEmblem],
  );

  const handleOlderSeasons = async () => {
    if (historyRequest.current || !allSeasons.length) return;
    const request = new AbortController();
    historyRequest.current = request;
    setLoadingHistory(true);
    setHistoryError('');
    try {
      const earlier = await getTribesSeasons(request.signal, allSeasons[allSeasons.length - 1].id);
      if (!request.signal.aborted) {
        setOlderSeasons((value) => [...value, ...earlier]);
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

  // The banner form lives in the lobby, which may not be on screen yet when the hero button is pressed
  const handleRaise = () => {
    handleGo('home');
    window.setTimeout(() => {
      const form = document.getElementById('tribes-raise-banner');
      form?.scrollIntoView?.({behavior: 'smooth', block: 'start'});
      form?.querySelector<HTMLInputElement>('input[name="name"]')?.focus({preventScroll: true});
    }, 80);
  };

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

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 3400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  // Slide the highlight under the current section and keep that section in view on narrow screens
  useLayoutEffect(() => {
    handleMeasure();
    const scroller = navigation.current;
    const item = scroller?.querySelector<HTMLElement>('[aria-current="page"]');
    if (scroller && item && scroller.scrollWidth > scroller.clientWidth) {
      scroller.scrollTo?.({behavior: 'smooth', left: item.offsetLeft - (scroller.clientWidth - item.offsetWidth) / 2});
    }
  }, [current, handleMeasure, sections.length]);

  // Labels change width when the window resizes or the interface font finishes loading
  useEffect(() => {
    window.addEventListener('resize', handleMeasure);
    document.fonts?.ready.then(handleMeasure).catch(() => undefined);
    return () => window.removeEventListener('resize', handleMeasure);
  }, [handleMeasure]);

  // A section opened from further down the page starts at its top, just below the pinned navigation
  useEffect(() => {
    const element = panel.current;
    if (element && element.getBoundingClientRect().top < 0) element.scrollIntoView?.({block: 'start'});
  }, [tab]);

  const renderPanel = () => {
    if (tab === 'guide') return <Guide catalog={state?.catalog} />;
    if (!state) return null;
    const props: TribesPanelProps = {
      act: handleAct,
      busy,
      canPlay: !!(active && tribe),
      go: handleGo,
      now,
      state,
      tribe,
      uploadEmblem: handleUploadEmblem,
    };
    const waiting = state.season.status === 'recruiting';
    switch (selected) {
      case 'recruitment':
        return <Recruitment {...props} />;
      case 'world':
        return waiting ? <Locked {...props} section="world" /> : <World {...props} />;
      case 'production':
        return waiting ? <Locked {...props} section="production" /> : <Workers {...props} />;
      case 'inventory':
        return waiting ? <Locked {...props} section="inventory" /> : <Inventory {...props} />;
      case 'tribe':
        return tribe || !waiting ? <Community {...props} /> : <Locked {...props} section="tribe" />;
      case 'market':
        return waiting ? <Locked {...props} section="market" /> : <Market {...props} />;
      case 'military':
        return waiting ? <Locked {...props} section="military" /> : <Military {...props} />;
      case 'messages':
        return <Messages {...props} />;
      case 'history':
        return <History {...props} />;
      default:
        return <Dashboard {...props} />;
    }
  };

  const phaseState = (index: number): 'done' | 'next' | 'now' => {
    let position = 0;
    if (status === 'active') position = active ? 1 : 2;
    if (status === 'finished') position = 3;
    if (index < position) return 'done';
    return index === position ? 'now' : 'next';
  };

  return (
    <S.Container {...analyticsArea('tribes')}>
      <S.Content>
        <S.Hero>
          <Scene phase={phase} />
          <S.HeroScrim />
          <S.HeroBody>
            <S.HeroTop>
              <S.HeroLink to="/games">
                <ArrowLeft size={16} /> All games
              </S.HeroLink>
              <S.Actions>
                <S.HeroBadge>Weekly multiplayer strategy</S.HeroBadge>
                <S.HeroLink to="/wallets/home">
                  <ItemIcon item="tnb" size={18} /> TNB economy
                </S.HeroLink>
              </S.Actions>
            </S.HeroTop>
            <S.HeroCopy>
              <S.HeroStatus>
                {state && status !== 'finished' && <S.Live />}
                {state ? `Season ${state.season.id}` : 'A world built together'}
                <span aria-hidden>·</span>
                {statusLine}
              </S.HeroStatus>
              <S.HeroTitle>Tribes</S.HeroTitle>
              <S.HeroTagline>{headline}</S.HeroTagline>
              <S.Actions style={{marginTop: 20}}>
                {!self.id && (
                  <S.Button
                    $size="large"
                    $variant="accent"
                    as={Link}
                    to={getAuthenticationPath(PATH_AUTHENTICATION.SIGN_IN, '/tribes/home')}
                  >
                    <LogIn size={18} /> Sign in to play
                  </S.Button>
                )}
                {!!self.id && state && !tribe && status === 'recruiting' && (
                  <S.Button $size="large" $variant="accent" onClick={handleRaise}>
                    <Flag size={18} /> Raise your banner
                  </S.Button>
                )}
                {tribe && (
                  <S.HeroTribe>
                    <Emblem color={tribe.color} emblem={tribe.emblem} image={tribe.emblem_image} size={34} />
                    <span>
                      <small>Your tribe</small>
                      {tribe.name}
                    </span>
                  </S.HeroTribe>
                )}
                {tab !== 'guide' && (
                  <S.HeroGhost onClick={() => handleGo('guide')} type="button">
                    How it works <ArrowRight size={15} />
                  </S.HeroGhost>
                )}
              </S.Actions>
            </S.HeroCopy>
            {state && (
              <S.HeroFooter>
                <S.HeroTimer>
                  <span>{status === 'finished' ? 'Final battle fought' : timerLabel}</span>
                  {status === 'finished' ? (
                    <S.HeroDate>{date(state.season.ends_at)}</S.HeroDate>
                  ) : (
                    <Countdown now={now} target={status === 'recruiting' ? startsAt : endsAt} />
                  )}
                </S.HeroTimer>
                <S.HeroStats>
                  <S.HeroStat>
                    <span>Tribes</span>
                    <strong>
                      <AnimatedNumber value={state.tribes.length} />
                    </strong>
                    <small>
                      {state.tribes.length
                        ? plural(
                            state.tribes.reduce((total, team) => total + team.members.length, 0),
                            'player',
                          )
                        : 'be the first'}
                    </small>
                  </S.HeroStat>
                  {!!self.id && (
                    <S.HeroStat>
                      <span>Wallet</span>
                      <strong>
                        <AnimatedNumber value={state.viewer?.wallet_balance ?? 0} />
                      </strong>
                      <small>TNB</small>
                    </S.HeroStat>
                  )}
                  {tribe && (
                    <S.HeroStat>
                      <span>Treasury</span>
                      <strong>
                        <AnimatedNumber value={tribe.treasury ?? 0} />
                      </strong>
                      <small>TNB</small>
                    </S.HeroStat>
                  )}
                </S.HeroStats>
              </S.HeroFooter>
            )}
          </S.HeroBody>
        </S.Hero>
        {state && (
          <S.SeasonBar>
            <S.Phases aria-label="Season timeline">
              {[
                ['Recruitment', `Until ${day(state.season.starts_at)}`],
                ['Build and trade', 'Seven days'],
                ['The Great War', day(state.season.ends_at)],
                ['History', 'Results revealed'],
              ].map(([title, note], index) => (
                <S.Phase $state={phaseState(index)} key={title}>
                  <span>{phaseState(index) === 'done' ? <Check size={14} strokeWidth={3} /> : index + 1}</span>
                  <div>
                    {title}
                    <small>{note}</small>
                  </div>
                </S.Phase>
              ))}
            </S.Phases>
            <S.SeasonPicker>
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
            </S.SeasonPicker>
            {seasons.length >= 100 && moreHistory && (
              <S.Button $secondary $size="small" disabled={loadingHistory} onClick={handleOlderSeasons}>
                {loadingHistory ? 'Loading seasons…' : 'Load older seasons'}
              </S.Button>
            )}
          </S.SeasonBar>
        )}
        {historyError && <S.Error role="alert">{historyError}</S.Error>}
        <S.Nav aria-label="Tribes sections">
          <S.NavScroller $fadeLeft={edges.left} $fadeRight={edges.right} onScroll={handleMeasure} ref={navigation}>
            {indicator && (
              <S.NavIndicator style={{transform: `translateX(${indicator.left}px)`, width: indicator.width}} />
            )}
            {sections.map(({icon: Icon, id, text}) => (
              <S.NavItem
                {...analyticsTarget(id)}
                $active={current === id}
                $plain={!indicator}
                aria-current={current === id ? 'page' : undefined}
                key={id}
                onClick={() => handleGo(id)}
              >
                <Icon size={16} strokeWidth={2.2} />
                {text}
              </S.NavItem>
            ))}
          </S.NavScroller>
        </S.Nav>
        {state?.season.status === 'finished' && (
          <S.Banner $tone="sky">
            <Info size={18} />
            <div>
              You are viewing an archived season. Goods and territory are historical; your TNB wallet balance persists.
            </div>
          </S.Banner>
        )}
        {state?.season.status === 'active' && !tribe && (
          <S.Banner>
            <Info size={18} />
            <div>
              Rosters are locked for this season. You can inspect the world and battle results, then join a tribe in the
              next recruitment period.
            </div>
          </S.Banner>
        )}
        {state?.season.status === 'active' && !active && (
          <S.Banner $tone="ember">
            <Swords size={18} />
            <div>The final battle cutoff has passed. Results will appear once the season has been resolved.</div>
          </S.Banner>
        )}
        {pending && (
          <S.Banner $tone="ember" role="alert">
            <TriangleAlert size={18} />
            <div>
              Your last action has not been confirmed. Retry it safely before making another move; the same transaction
              receipt prevents duplicate charges.
              <S.Actions style={{marginTop: 12}}>
                <S.Button disabled={retrying} onClick={() => retry()}>
                  {retrying ? 'Confirming…' : 'Retry last action'}
                </S.Button>
              </S.Actions>
            </div>
          </S.Banner>
        )}
        {error && (
          <S.Error role="alert">
            <TriangleAlert size={18} />
            <span>{error}</span>
            {!pending && (
              <S.Button $secondary $size="small" onClick={() => refresh()}>
                <RefreshCw size={14} /> Refresh
              </S.Button>
            )}
          </S.Error>
        )}
        {loading && !state && tab !== 'guide' && (
          <S.Loading role="status">
            <S.Compass aria-hidden>
              <ItemIcon item="forest" size={44} />
            </S.Compass>
            Opening the world…
          </S.Loading>
        )}
        <S.Panel key={`${selected}:${state?.season.id ?? 0}`} ref={panel}>
          {renderPanel()}
        </S.Panel>
        {state && (
          <S.Meta>
            <span>
              Season {state.season.id} · {date(state.season.starts_at)} — {date(state.season.ends_at)}
            </span>
            <span>One world. Real people. Lasting stories.</span>
          </S.Meta>
        )}
      </S.Content>
      {toast && (
        <S.Toast key={toast.id} role="status">
          <CircleCheck size={18} />
          {toast.text}
        </S.Toast>
      )}
    </S.Container>
  );
};

export default Tribes;
