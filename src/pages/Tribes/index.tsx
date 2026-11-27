import {memo, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CircleCheck,
  Hammer,
  Info,
  LayoutDashboard,
  LoaderCircle,
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
  X,
} from 'lucide-react';

import {PATH_AUTHENTICATION} from 'constants/paths';
import {getSelf} from 'selectors/state';
import {TribesAction, TribesEmblemUpload, TribesPanelProps} from 'types/tribes';
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
import {NoticeContext} from './notices';
import Rosters from './Rosters';
import * as S from './Styles';
import Tournaments from './Tournaments';
import {useTribes} from './useTribes';
import Workers from './Workers';
import World from './World';

const SECTIONS: {icon: LucideIcon; id: string; text: string}[] = [
  {icon: LayoutDashboard, id: 'home', text: 'Overview'},
  {icon: Users, id: 'rosters', text: 'Rosters'},
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
  cancel_job: 'Assignment cancelled. Unused materials came back.',
  cancel_listing: 'Listing cancelled and escrow returned.',
  cancel_work_order: 'Project cancelled and supplies released.',
  contribute_work_order: 'Supplies contributed to the project.',
  create_listing: 'Your listing is on the market.',
  create_work_order: 'Project created for the tribe.',
  deploy: 'Deployment saved.',
  fill_listing: 'Trade complete.',
  purchase_land: 'The land is yours.',
  queue: 'Your worker has new orders.',
  transfer_items: 'Goods moved.',
  transfer_tnb: 'TNB sent.',
  transfer_unit: 'Units handed over.',
  treasury_deposit: 'Deposited into the treasury.',
  treasury_withdraw: 'Withdrawn to your wallet.',
};

const ALERT_TIME = 8000;
const DAY = 86400000;
// A move that takes longer than this to be answered says so, so a slow connection never looks like a dead button
const SLOW = 900;
// The landscape only changes with the tournament's phase, not with the clock
const Scene = memo(HeroScene);

const TournamentGame = ({tournamentId, section}: {tournamentId: number; section?: string}) => {
  const [alerts, setAlerts] = useState<{id: number; text: string}[]>([]);
  const [dismissed, setDismissed] = useState('');
  const [edges, setEdges] = useState({left: false, right: false});
  const [indicator, setIndicator] = useState<{left: number; width: number} | null>(null);
  const [slow, setSlow] = useState(false);
  const [toast, setToast] = useState<{id: number; text: string} | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const self = useSelector(getSelf);
  const game = useTribes(self.id, tournamentId);
  const alertTimers = useRef<number[]>([]);
  const navigation = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const sequence = useRef(0);
  const {act, busy, error, loading, now, pending, refresh, retry, retrying, state, unconfirmed, uploadEmblem} = game;
  const working = busy && !unconfirmed;

  const tab = SECTIONS.some((entry) => entry.id === section) ? section! : 'home';
  const tribe = state?.tribes.find((entry) => entry.id === state.viewer?.tribe_id);
  const status = state?.tournament.status;
  const startsAt = state ? new Date(state.tournament.starts_at).getTime() : 0;
  const endsAt = state ? new Date(state.tournament.ends_at).getTime() : 0;
  const active = status === 'active' && now < endsAt;
  // The lobby is the overview while tribes form, and the battle report is the overview once a tournament is over
  let selected = tab;
  if (tab === 'home' && status === 'upcoming') selected = 'rosters';
  if (tab === 'home' && status === 'finished') selected = 'history';
  let current = tab;
  if (status === 'upcoming' && tab === 'rosters') current = 'home';
  if (status === 'finished' && tab === 'history') current = 'home';
  const sections = SECTIONS.filter(
    (entry) => !(status === 'upcoming' && entry.id === 'rosters') && !(status === 'finished' && entry.id === 'history'),
  );

  let phase: HeroPhase = 'upcoming';
  if (status === 'active') phase = endsAt - now < DAY ? 'final' : 'active';
  if (status === 'finished') phase = 'finished';
  let headline = 'The world is in motion.';
  let statusLine = 'Tournament in progress';
  let timerLabel = 'Final battle in';
  if (tribe) headline = tribe.motto || 'Build, trade and prepare. The final battle decides everything.';
  if (status === 'active') {
    statusLine = `Day ${Math.min(Math.ceil((endsAt - startsAt) / DAY), Math.max(1, Math.floor((now - startsAt) / DAY) + 1))} of ${Math.ceil((endsAt - startsAt) / DAY)}`;
    if (!active) statusLine = 'The great war is being fought';
    else if (phase === 'final') statusLine = 'The great war is hours away';
  }
  if (status === 'upcoming') {
    headline = 'Build your world together. Plan your strategy, then face one decisive battle.';
    statusLine = 'Upcoming tournament';
    timerLabel = 'Tournament starts in';
  }
  if (status === 'finished') {
    headline = 'The battle is complete. Every decision and every strike is now part of the record.';
    statusLine = 'Tournament complete';
  }
  if (!state) {
    headline = 'Build your world together. Plan your strategy, then face one decisive battle.';
    statusLine = 'Multiplayer strategy tournaments';
  }

  // A short-lived message about something that went wrong, raised from anywhere in the game
  const handleAlert = useCallback((text: string) => {
    sequence.current += 1;
    const id = sequence.current;
    setAlerts((value) => [...value.filter((entry) => entry.text !== text), {id, text}].slice(-3));
    const timer = window.setTimeout(() => {
      setAlerts((value) => value.filter((entry) => entry.id !== id));
      alertTimers.current = alertTimers.current.filter((entry) => entry !== timer);
    }, ALERT_TIME);
    alertTimers.current.push(timer);
  }, []);

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

  const handleGo = useCallback(
    (next: string) => navigate(`/tribes/tournaments/${tournamentId}/${next}`),
    [navigate, tournamentId],
  );

  const handleRetry = async () => {
    if (await retry()) setToast({id: Date.now(), text: 'Your last action went through.'});
  };

  const handleUploadEmblem = useCallback<TribesEmblemUpload>(
    async (image) => {
      const success = await uploadEmblem(image);
      if (success) setToast({id: Date.now(), text: 'Your emblem is flying.'});
      return success;
    },
    [uploadEmblem],
  );

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 3400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  // A dismissed error may come back the next time the same thing goes wrong
  useEffect(() => {
    if (!error) setDismissed('');
  }, [error]);

  useEffect(() => {
    if (!working) {
      setSlow(false);
      return undefined;
    }
    const timer = window.setTimeout(() => setSlow(true), SLOW);
    return () => window.clearTimeout(timer);
  }, [working]);

  useEffect(
    () => () => {
      alertTimers.current.forEach((timer) => window.clearTimeout(timer));
    },
    [],
  );

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
    const waiting = state.tournament.status === 'upcoming';
    switch (selected) {
      case 'rosters':
        return <Rosters {...props} />;
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
              <S.HeroLink to="/tribes">
                <ArrowLeft size={16} /> All tournaments
              </S.HeroLink>
              <S.Actions>
                <S.HeroBadge>Multiplayer strategy tournaments</S.HeroBadge>
                <S.HeroLink to="/wallets/home">
                  <ItemIcon item="tnb" size={18} /> TNB economy
                </S.HeroLink>
              </S.Actions>
            </S.HeroTop>
            <S.HeroCopy>
              <S.HeroStatus>
                {state && status !== 'finished' && <S.Live />}
                {state ? state.tournament.title : 'Tribes tournament'}
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
                    to={getAuthenticationPath(PATH_AUTHENTICATION.SIGN_IN, location.pathname)}
                  >
                    <LogIn size={18} /> Sign in to play
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
                    <S.HeroDate>{date(state.tournament.ends_at)}</S.HeroDate>
                  ) : (
                    <Countdown now={now} target={status === 'upcoming' ? startsAt : endsAt} />
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
                        : 'Rosters being prepared'}
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
          <S.TournamentBar>
            <S.Phases aria-label="Tournament timeline">
              {[
                ['Team setup', `Until ${day(state.tournament.starts_at)}`],
                ['Build and trade', `${day(state.tournament.starts_at)} — ${day(state.tournament.ends_at)}`],
                ['The Great War', day(state.tournament.ends_at)],
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
          </S.TournamentBar>
        )}
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
        {state?.tournament.status === 'finished' && (
          <S.Banner $tone="sky">
            <Info size={18} />
            <div>
              You are viewing an archived tournament. Goods and territory are historical; your TNB wallet balance
              persists.
            </div>
          </S.Banner>
        )}
        {state?.tournament.status === 'active' && !tribe && (
          <S.Banner>
            <Info size={18} />
            <div>You are viewing this tournament as a spectator. The organizer enrolls players and assigns tribes.</div>
          </S.Banner>
        )}
        {state?.tournament.status === 'active' && !active && (
          <S.Banner $tone="ember">
            <Swords size={18} />
            <div>The final battle cutoff has passed. Results will appear once the tournament has been resolved.</div>
          </S.Banner>
        )}
        {loading && !state && tab !== 'guide' && (
          <S.Loading role="status">
            <S.Compass aria-hidden>
              <ItemIcon item="forest" size={44} />
            </S.Compass>
            Opening the world…
          </S.Loading>
        )}
        <NoticeContext.Provider value={handleAlert}>
          <S.Panel key={`${self.id}:${selected}:${state?.tournament.id ?? 0}`} ref={panel}>
            {renderPanel()}
          </S.Panel>
        </NoticeContext.Provider>
        {state && (
          <S.Meta>
            <span>
              {state.tournament.title} · {date(state.tournament.starts_at)} — {date(state.tournament.ends_at)}
            </span>
            <span>One world. Real people. Lasting stories.</span>
          </S.Meta>
        )}
      </S.Content>
      <S.Notices aria-label="Notifications" role="region">
        {unconfirmed && (
          <S.Notice role="alert">
            <TriangleAlert size={18} />
            <div>
              {error && <strong>{error} </strong>}
              Your last action has not been confirmed. Retry it safely before making another move; the same transaction
              receipt prevents duplicate charges.
            </div>
            <S.Button $size="small" disabled={retrying} onClick={handleRetry}>
              {retrying ? 'Confirming…' : 'Retry last action'}
            </S.Button>
          </S.Notice>
        )}
        {error && !unconfirmed && error !== dismissed && (
          <S.Notice role="alert">
            <TriangleAlert size={18} />
            <div>{error}</div>
            {!pending && (
              <S.Button $secondary $size="small" onClick={() => refresh()}>
                <RefreshCw size={14} /> Refresh
              </S.Button>
            )}
            <S.NoticeClose aria-label="Dismiss" onClick={() => setDismissed(error)} type="button">
              <X size={15} />
            </S.NoticeClose>
          </S.Notice>
        )}
        {alerts.map((entry) => (
          <S.Notice key={entry.id} role="alert">
            <TriangleAlert size={18} />
            <div>{entry.text}</div>
            <S.NoticeClose
              aria-label="Dismiss"
              onClick={() => setAlerts((value) => value.filter((other) => other.id !== entry.id))}
              type="button"
            >
              <X size={15} />
            </S.NoticeClose>
          </S.Notice>
        ))}
        {slow && working && (
          <S.Notice $quiet aria-live="polite">
            <S.Spinner aria-hidden>
              <LoaderCircle size={17} />
            </S.Spinner>
            <div>Sending your move…</div>
          </S.Notice>
        )}
        {toast && (
          <S.Toast key={toast.id} role="status">
            <CircleCheck size={18} />
            {toast.text}
          </S.Toast>
        )}
      </S.Notices>
    </S.Container>
  );
};

const Tribes = () => {
  const location = useLocation();
  const match = /^\/tribes\/tournaments\/([1-9]\d*)(?:\/([^/]+))?\/?$/.exec(location.pathname);
  const tournamentId = match ? Number(match[1]) : null;
  return tournamentId && Number.isSafeInteger(tournamentId) ? (
    <TournamentGame key={tournamentId} section={match?.[2]} tournamentId={tournamentId} />
  ) : (
    <Tournaments />
  );
};

export default Tribes;
