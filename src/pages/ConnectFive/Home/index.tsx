import {ReactNode, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {mdiArrowRight, mdiSwordCross} from '@mdi/js';
import Icon from '@mdi/react';
import {Formik, FormikErrors, FormikHelpers, FormikTouched} from 'formik';
import orderBy from 'lodash/orderBy';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {
  acceptConnectFiveChallenge,
  cancelConnectFiveChallenge,
  createConnectFiveChallenge,
  getConnectFiveChallenges,
  getConnectFiveEloSnapshots,
  getConnectFiveLeaderboard,
  getConnectFiveMatches,
} from 'api/connectFive';
import Avatar from 'components/Avatar';
import {ConnectFiveChallengeStatus, ConnectFiveMatchStatus} from 'enums';
import {useIsAuthenticated} from 'hooks';
import {
  getConnectFiveActiveMatches,
  getConnectFiveCompletedMatches,
  getConnectFiveIncomingChallenges,
  getConnectFiveOutgoingChallenges,
  getSelf,
} from 'selectors/state';
import {
  removeIncomingChallenge,
  setActiveMatches,
  setCompletedMatches,
  setIncomingChallenges,
  setOutgoingChallenges,
  upsertChallenge,
  upsertMatch,
} from 'store/connectFive';
import {
  AppDispatch,
  ConnectFiveChallenge,
  ConnectFiveEloSnapshot,
  ConnectFiveLeaderboardEntry,
  ConnectFiveMatch,
  SFC,
  UserReadSerializer,
} from 'types';
import {analyticsArea} from 'utils/analyticsAttributes';
import {getConnectFiveWinnerName} from 'utils/connectFive';
import {shortDate} from 'utils/dates';
import {handleFormikAPIError} from 'utils/forms';
import {displayErrorToast} from 'utils/toasts';
import yup from 'utils/yup';

import {EmptyBoardArt, LiveEmblem, RivalryEmblem, Stone, StoneLoader, StoneTone, WonBoardArt} from '../Stones';
import {WINNING_LINE_LENGTH} from '../Stones/utils';
import {cosmos} from '../theme';

import ComputerSetup from './ComputerSetup';
import Hero from './Hero';
import * as S from './Styles';
import TimeOptions from './TimeOptions';
import TopEarners from './TopEarners';

const ELO_FILL_ID = 'connect-five-elo-fill';

const GUIDE = [
  {
    description: 'Challenge another member and choose the stakes and time limit together.',
    title: 'Find your opponent',
  },
  {description: 'Build your line, block theirs, and make every move count.', title: 'Connect your five'},
  {description: 'Finish matches, build your record, and climb the ELO leaderboard.', title: 'Make your mark'},
];

const MATCHES_PER_PAGE = 10;

const initialValues = {
  maxSpendAmount: 0,
  opponent: null as UserReadSerializer | null,
  stakeAmount: '',
  timeLimitSeconds: '600',
};

type FormValues = typeof initialValues;

type MatchOutcome = 'active' | 'cancelled' | 'finished' | 'lost' | 'won';

type PlayerSide = 'a' | 'b';

const MATCH_BADGES: Record<MatchOutcome, {label: string; tone: S.BadgeTone}> = {
  active: {label: 'In progress', tone: 'lavender'},
  cancelled: {label: 'Cancelled', tone: 'muted'},
  finished: {label: 'Finished', tone: 'muted'},
  lost: {label: 'You lost', tone: 'rose'},
  won: {label: 'You won!', tone: 'gold'},
};

// The last five games of a member, as the stones they would leave on the board
const RECENT_RESULTS: Record<MatchOutcome, {label: string; tone: StoneTone}> = {
  active: {label: 'In progress', tone: 'empty'},
  cancelled: {label: 'Cancelled', tone: 'empty'},
  finished: {label: 'No winner', tone: 'ivory'},
  lost: {label: 'Lost', tone: 'obsidian'},
  won: {label: 'Won', tone: 'gold'},
};

// Player A places the black stones and player B, the computer in a computer game, the white ones
const SIDE_STONES: Record<PlayerSide, StoneTone> = {a: 'obsidian', b: 'ivory'};

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const getChallengeStatusBadge = (status: string): {label: string; tone: S.BadgeTone} => {
  if (status === ConnectFiveChallengeStatus.PENDING) return {label: 'Pending', tone: 'lavender'};
  if (status === ConnectFiveChallengeStatus.ACCEPTED) return {label: 'Accepted', tone: 'mint'};
  if (status === ConnectFiveChallengeStatus.CANCELLED) return {label: 'Cancelled', tone: 'muted'};
  if (status === ConnectFiveChallengeStatus.EXPIRED) return {label: 'Expired', tone: 'rose'};
  return {label: capitalize(status.replace('_', ' ')), tone: 'muted'};
};

const getChallengeTerms = (values: FormValues) => {
  const stake = Number(values.stakeAmount);

  if (values.stakeAmount !== '' && stake > 0) {
    return `${stake.toLocaleString()} TNB locks when you send, and your opponent matches it to accept. The winner takes the pot, plus anything spent on extra pieces.`;
  }

  return 'Set the stake to 0 for a friendly match. Max spend caps what each player can pay for extra pieces during the match.';
};

const getFinishReasonLabel = (match: ConnectFiveMatch): string | null => {
  if (match.status === ConnectFiveMatchStatus.FINISHED_CONNECT5) {
    return 'Connect 5';
  }

  if (match.status === ConnectFiveMatchStatus.FINISHED_FULL_BOARD) {
    return 'Full board';
  }

  if (match.status === ConnectFiveMatchStatus.FINISHED_RESIGN) {
    return 'Resignation';
  }

  if (match.status === ConnectFiveMatchStatus.FINISHED_TIMEOUT) {
    return 'Timeout';
  }

  return null;
};

const getMatchOutcome = (match: ConnectFiveMatch, selfId?: number | null): MatchOutcome => {
  if (match.status === ConnectFiveMatchStatus.ACTIVE) return 'active';
  if (match.status === ConnectFiveMatchStatus.CANCELLED) return 'cancelled';
  if (match.mode === 'computer' && match.winner_side === 'b' && selfId) return 'lost';
  if (match.winner && selfId) return match.winner === selfId ? 'won' : 'lost';
  return 'finished';
};

const getOpponentSide = (match: ConnectFiveMatch, selfId?: number | null): PlayerSide => {
  if (selfId) {
    if (match.player_a.id === selfId) return 'b';
    if (match.player_b?.id === selfId) return 'a';
  }

  return match.player_b ? 'b' : 'a';
};

const isMatchParticipant = (match: ConnectFiveMatch, userId?: number | null): boolean => {
  if (!userId) return false;
  return match.player_a.id === userId || match.player_b?.id === userId;
};

const PlayerAvatar = ({side, size = 40, src}: {side: PlayerSide; size?: number; src: string | null}) => (
  <S.PlayerAvatar>
    <Avatar size={`${size}px`} src={src} />
    <S.SideStone $size={Math.round(size * 0.36)} $tone={SIDE_STONES[side]} />
  </S.PlayerAvatar>
);

const ConnectFiveHome: SFC = ({className}) => {
  const [activeMatchesPage, setActiveMatchesPage] = useState(1);
  const [completedMatchesPage, setCompletedMatchesPage] = useState(1);
  const [eloError, setEloError] = useState<string | null>(null);
  const [eloSnapshots, setEloSnapshots] = useState<ConnectFiveEloSnapshot[]>([]);
  const [isEloLoading, setIsEloLoading] = useState(true);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(true);
  const [isMatchesLoading, setIsMatchesLoading] = useState(true);
  const [matchesError, setMatchesError] = useState<string | null>(null);
  const [publicMatches, setPublicMatches] = useState<ConnectFiveMatch[]>([]);
  const [publicMatchesPage, setPublicMatchesPage] = useState(1);
  const [selfLeaderboardEntry, setSelfLeaderboardEntry] = useState<ConnectFiveLeaderboardEntry | null>(null);
  const [selfLeaderboardRank, setSelfLeaderboardRank] = useState<number | null>(null);

  const activeMatches = useSelector(getConnectFiveActiveMatches);
  const completedMatches = useSelector(getConnectFiveCompletedMatches);
  const dispatch = useDispatch<AppDispatch>();
  const incomingChallengesStore = useSelector(getConnectFiveIncomingChallenges);
  const isAuthenticated = useIsAuthenticated();
  const live = useRef(true);
  const matchesRequest = useRef(0);
  const navigate = useNavigate();
  const outgoingChallengesStore = useSelector(getConnectFiveOutgoingChallenges);
  const self = useSelector(getSelf);
  const sessionScope = useRef({key: '', generation: 0});
  const sessionKey = `${isAuthenticated}:${self.id}`;
  if (sessionScope.current.key !== sessionKey)
    sessionScope.current = {key: sessionKey, generation: sessionScope.current.generation + 1};
  const incomingChallenges = isAuthenticated
    ? incomingChallengesStore.filter((challenge) => challenge.opponent.id === self.id)
    : [];
  const outgoingChallenges = isAuthenticated
    ? outgoingChallengesStore.filter((challenge) => challenge.challenger.id === self.id)
    : [];

  const activeMatchesSorted = useMemo(() => {
    return orderBy(
      activeMatches.filter((match) => isAuthenticated && isMatchParticipant(match, self.id)),
      ['created_date'],
      ['desc'],
    );
  }, [activeMatches, isAuthenticated, self.id]);

  const activeMatchesTotalPages = useMemo(() => {
    return Math.ceil(activeMatchesSorted.length / MATCHES_PER_PAGE);
  }, [activeMatchesSorted.length]);

  const completedMatchesSorted = useMemo(() => {
    return orderBy(
      completedMatches.filter((match) => isAuthenticated && isMatchParticipant(match, self.id)),
      ['created_date'],
      ['desc'],
    );
  }, [completedMatches, isAuthenticated, self.id]);

  const completedMatchesTotalPages = useMemo(() => {
    return Math.ceil(completedMatchesSorted.length / MATCHES_PER_PAGE);
  }, [completedMatchesSorted.length]);
  const hasMoreCompletedMatches = completedMatchesPage < completedMatchesTotalPages;

  const selfMatchRecord = useMemo(() => {
    if (!self?.id) {
      return {losses: 0, wins: 0};
    }

    return completedMatchesSorted.reduce(
      (record, match) => {
        if (match.mode === 'computer' || !match.winner) return record;
        if (match.winner === self.id) {
          record.wins += 1;
          return record;
        }

        record.losses += 1;
        return record;
      },
      {losses: 0, wins: 0},
    );
  }, [completedMatchesSorted, self?.id]);

  const eloChartData = useMemo(() => {
    return orderBy(eloSnapshots, ['date'], ['asc']);
  }, [eloSnapshots]);

  const publicMatchesSorted = useMemo(() => {
    return orderBy(publicMatches, ['created_date'], ['desc']);
  }, [publicMatches]);

  const publicMatchesTotalPages = useMemo(() => {
    return Math.ceil(publicMatchesSorted.length / MATCHES_PER_PAGE);
  }, [publicMatchesSorted.length]);

  const paginatedActiveMatches = useMemo(() => {
    const startIndex = (activeMatchesPage - 1) * MATCHES_PER_PAGE;
    return activeMatchesSorted.slice(startIndex, startIndex + MATCHES_PER_PAGE);
  }, [activeMatchesPage, activeMatchesSorted]);

  const visibleCompletedMatches = useMemo(() => {
    return completedMatchesSorted.slice(0, completedMatchesPage * MATCHES_PER_PAGE);
  }, [completedMatchesPage, completedMatchesSorted]);

  const paginatedPublicMatches = useMemo(() => {
    const startIndex = (publicMatchesPage - 1) * MATCHES_PER_PAGE;
    return publicMatchesSorted.slice(startIndex, startIndex + MATCHES_PER_PAGE);
  }, [publicMatchesPage, publicMatchesSorted]);

  // Oldest first, so the line reads left to right up to the latest game, and padded with empty intersections
  const recentResults = useMemo(() => {
    const results = completedMatchesSorted
      .filter((match) => match.status !== ConnectFiveMatchStatus.CANCELLED)
      .slice(0, WINNING_LINE_LENGTH)
      .reverse()
      .map((match) => ({id: `match-${match.id}`, ...RECENT_RESULTS[getMatchOutcome(match, self.id)]}));
    const openSpots = Array.from({length: WINNING_LINE_LENGTH - results.length}, (_, index) => ({
      id: `open-${index}`,
      label: 'Not played',
      tone: 'empty' as StoneTone,
    }));
    return [...results, ...openSpots];
  }, [completedMatchesSorted, self.id]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      maxSpendAmount: yup.number().integer('Enter a whole number').min(0).required('Max spend is required'),
      opponent: yup
        .mixed()
        .required('Opponent is required')
        .test('not-self', "You can't challenge yourself", (value) => {
          if (!value || !self?.id) return true;
          return (value as UserReadSerializer).id !== self.id;
        }),
      stakeAmount: yup.number().integer('Enter a whole number').min(0).required('Stake is required'),
      timeLimitSeconds: yup.string().required('Time limit is required'),
    });
  }, [self?.id]);

  const formatEloDate = (value: string, options: Intl.DateTimeFormatOptions) => {
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString(undefined, options);
  };

  const formatEloDateLabel = (value: string) => {
    return formatEloDate(value, {day: 'numeric', month: 'short'});
  };

  const formatEloTooltipLabel = (value: string) => {
    return formatEloDate(value, {day: 'numeric', month: 'short', year: 'numeric'});
  };

  const formatEloValue = (value: number) => {
    return Math.round(value).toLocaleString();
  };

  const handleAcceptChallenge = useCallback(
    async (challengeId: number) => {
      const match = await acceptConnectFiveChallenge(challengeId);
      dispatch(removeIncomingChallenge(challengeId));
      dispatch(upsertMatch({match, selfId: self?.id}));
      navigate(`/connect-five/matches/${match.id}`);
    },
    [dispatch, navigate, self?.id],
  );

  const handleActiveMatchesPageChange = useCallback((page: number) => {
    setActiveMatchesPage(page);
  }, []);

  const handleCancelChallenge = useCallback(
    async (challengeId: number) => {
      const challenge = await cancelConnectFiveChallenge(challengeId);
      if (self?.id) {
        dispatch(upsertChallenge({challenge, selfId: self.id}));
      }
    },
    [dispatch, self?.id],
  );

  const handleChallengeSubmit = useCallback(
    async (values: FormValues, helpers: FormikHelpers<FormValues>) => {
      try {
        if (!values.opponent) {
          helpers.setFieldError('opponent', 'Opponent is required');
          return;
        }

        const payload = {
          max_spend_amount: Number(values.maxSpendAmount),
          opponent_id: values.opponent.id,
          stake_amount: Number(values.stakeAmount),
          time_limit_seconds: Number(values.timeLimitSeconds),
        };

        const challenge = await createConnectFiveChallenge(payload);
        if (self?.id) {
          dispatch(upsertChallenge({challenge, selfId: self.id}));
        }
        navigate(`/connect-five/challenges/${challenge.id}`);
        helpers.resetForm();
      } catch (error) {
        handleFormikAPIError(error, helpers, 'Error creating challenge');
      }
    },
    [dispatch, navigate, self?.id],
  );

  const handleCompletedMatchesLoadMore = useCallback(() => {
    setCompletedMatchesPage((page) => (page < completedMatchesTotalPages ? page + 1 : page));
  }, [completedMatchesTotalPages]);

  const handleMatchCardClick = useCallback(
    (matchId: number) => {
      navigate(`/connect-five/matches/${matchId}`);
    },
    [navigate],
  );

  const handleOpponentChange = useCallback(
    (
      user: UserReadSerializer | null,
      setFieldTouched: FormikHelpers<FormValues>['setFieldTouched'],
      setFieldValue: FormikHelpers<FormValues>['setFieldValue'],
    ) => {
      setFieldValue('opponent', user);
      setFieldTouched('opponent', true, false);
    },
    [],
  );

  const handlePublicMatchesPageChange = useCallback((page: number) => {
    setPublicMatchesPage(page);
  }, []);

  const loadChallenges = useCallback(async () => {
    // Challenges are between two members, a signed-out visitor has none
    if (!isAuthenticated || !self.id) return;

    const {generation} = sessionScope.current;
    const incomingResponse = await getConnectFiveChallenges({
      mine: 'received',
      status: ConnectFiveChallengeStatus.PENDING,
    });
    const outgoingResponse = await getConnectFiveChallenges({
      mine: 'sent',
      status: ConnectFiveChallengeStatus.PENDING,
    });

    if (!live.current || generation !== sessionScope.current.generation) return;
    dispatch(setIncomingChallenges(incomingResponse.results));
    dispatch(setOutgoingChallenges(outgoingResponse.results));
  }, [dispatch, isAuthenticated, self.id]);

  const loadEloSnapshots = useCallback(async () => {
    // The ELO history is a member's own, a signed-out visitor has none
    if (!isAuthenticated) {
      setIsEloLoading(false);
      return;
    }

    try {
      setEloError(null);
      setIsEloLoading(true);
      const response = await getConnectFiveEloSnapshots();
      setEloSnapshots(response);
    } catch (error) {
      displayErrorToast('Unable to load ELO history.');
      setEloError('Unable to load ELO history.');
    } finally {
      setIsEloLoading(false);
    }
  }, [isAuthenticated]);

  const loadLeaderboardEntry = useCallback(async () => {
    if (!self?.id) {
      setSelfLeaderboardEntry(null);
      setSelfLeaderboardRank(null);
      setIsLeaderboardLoading(false);
      return;
    }

    setIsLeaderboardLoading(true);

    try {
      const fetchLeaderboardEntry = async (
        url: string | null,
        entriesProcessed: number,
      ): Promise<{entry: ConnectFiveLeaderboardEntry; rank: number} | null> => {
        const response = url ? await getConnectFiveLeaderboard({url}) : await getConnectFiveLeaderboard();
        const entryIndex = response.results.findIndex((entry) => entry.user.id === self.id);

        if (entryIndex !== -1) {
          return {
            entry: response.results[entryIndex],
            rank: entriesProcessed + entryIndex + 1,
          };
        }

        if (!response.next) {
          return null;
        }

        return fetchLeaderboardEntry(response.next, entriesProcessed + response.results.length);
      };

      const result = await fetchLeaderboardEntry(null, 0);

      if (!result) {
        setSelfLeaderboardEntry(null);
        setSelfLeaderboardRank(null);
        return;
      }

      setSelfLeaderboardEntry(result.entry);
      setSelfLeaderboardRank(result.rank);
    } catch (error) {
      displayErrorToast('Unable to load leaderboard info.');
    } finally {
      setIsLeaderboardLoading(false);
    }
  }, [self?.id]);

  const loadMatches = useCallback(async () => {
    const {generation} = sessionScope.current;
    matchesRequest.current += 1;
    const requestNumber = matchesRequest.current;
    const isCurrent = () =>
      live.current && generation === sessionScope.current.generation && requestNumber === matchesRequest.current;
    setIsMatchesLoading(true);
    setMatchesError(null);

    try {
      // A signed-out visitor has no matches of their own, they only get the matches that anyone can watch
      const [selfMatchesResponse, publicMatchesResponse] = await Promise.all([
        isAuthenticated ? getConnectFiveMatches({mine: 'self'}) : null,
        getConnectFiveMatches({mine: 'exclude', status: ConnectFiveMatchStatus.ACTIVE}),
      ]);
      if (!isCurrent()) return;
      const selfMatches = selfMatchesResponse?.results ?? [];
      const filteredPublicMatches = self?.id
        ? publicMatchesResponse.results.filter((match) => !isMatchParticipant(match, self.id))
        : publicMatchesResponse.results;

      dispatch(setActiveMatches(selfMatches.filter((match) => match.status === ConnectFiveMatchStatus.ACTIVE)));
      dispatch(setCompletedMatches(selfMatches.filter((match) => match.status !== ConnectFiveMatchStatus.ACTIVE)));
      setPublicMatches(filteredPublicMatches);
    } catch (error) {
      if (isCurrent()) setMatchesError('We could not load matches right now. Please try again.');
    } finally {
      if (isCurrent()) setIsMatchesLoading(false);
    }
  }, [dispatch, isAuthenticated, self?.id]);

  useEffect(() => {
    live.current = true;
    return () => {
      live.current = false;
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([loadChallenges(), loadMatches()]);
    };

    loadData();
  }, [loadChallenges, loadMatches]);

  useEffect(() => {
    loadEloSnapshots();
  }, [loadEloSnapshots]);

  useEffect(() => {
    loadLeaderboardEntry();
  }, [loadLeaderboardEntry]);

  useEffect(() => {
    if (activeMatchesTotalPages && activeMatchesPage > activeMatchesTotalPages) {
      setActiveMatchesPage(activeMatchesTotalPages);
    } else if (!activeMatchesTotalPages && activeMatchesPage !== 1) {
      setActiveMatchesPage(1);
    }

    if (completedMatchesTotalPages && completedMatchesPage > completedMatchesTotalPages) {
      setCompletedMatchesPage(completedMatchesTotalPages);
    } else if (!completedMatchesTotalPages && completedMatchesPage !== 1) {
      setCompletedMatchesPage(1);
    }
    if (publicMatchesTotalPages && publicMatchesPage > publicMatchesTotalPages) {
      setPublicMatchesPage(publicMatchesTotalPages);
    } else if (!publicMatchesTotalPages && publicMatchesPage !== 1) {
      setPublicMatchesPage(1);
    }
  }, [
    activeMatchesPage,
    activeMatchesTotalPages,
    completedMatchesPage,
    completedMatchesTotalPages,
    publicMatchesPage,
    publicMatchesTotalPages,
  ]);

  const isRecordLoading = isLeaderboardLoading || (!selfLeaderboardEntry && isMatchesLoading);
  const eloLabel = (() => {
    const elo = selfLeaderboardEntry?.elo ?? self.connect_five_elo ?? eloChartData[eloChartData.length - 1]?.elo;

    if (elo !== undefined) {
      return formatEloValue(elo);
    }

    return isLeaderboardLoading || isEloLoading ? '–' : 'None yet';
  })();
  const rankLabel = (() => {
    if (isLeaderboardLoading) {
      return '–';
    }

    if (selfLeaderboardRank) {
      return `#${selfLeaderboardRank.toLocaleString()}`;
    }

    return 'Unranked';
  })();
  const recordLabel = (() => {
    if (isRecordLoading) {
      return '–';
    }

    if (selfLeaderboardEntry) {
      return `${selfLeaderboardEntry.wins}W – ${selfLeaderboardEntry.losses}L`;
    }

    return `${selfMatchRecord.wins}W – ${selfMatchRecord.losses}L`;
  })();

  const renderAmountField = (
    name: 'maxSpendAmount' | 'stakeAmount',
    label: string,
    errors: FormikErrors<FormValues>,
    touched: FormikTouched<FormValues>,
  ) => {
    const error = touched[name] ? errors[name] : undefined;
    const id = `challenge-${name}`;

    return (
      <S.Field>
        <S.FieldLabel htmlFor={id}>{label}</S.FieldLabel>
        <S.AmountControl>
          <S.AmountInput
            $hasError={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            aria-invalid={!!error}
            id={id}
            inputMode="numeric"
            min={0}
            name={name}
            placeholder="0"
            step={1}
            type="number"
          />
          <S.AmountUnit aria-hidden="true">TNB</S.AmountUnit>
        </S.AmountControl>
        {error && <S.FieldError id={`${id}-error`}>{error}</S.FieldError>}
      </S.Field>
    );
  };

  const renderChallengeCard = (
    challenge: ConnectFiveChallenge,
    opponent: UserReadSerializer | null,
    actions?: ReactNode,
  ) => {
    const createdLabel = shortDate(challenge.created_date, true);
    const statusBadge = getChallengeStatusBadge(challenge.status);

    return (
      <S.ChallengeCard key={challenge.id}>
        <S.CardHeader>
          <S.CardPlayer>
            <Avatar size="40px" src={opponent?.avatar ?? null} />
            <S.CardPlayerText>
              <S.CardPlayerName>{opponent?.username ?? 'Unknown player'}</S.CardPlayerName>
              <S.CardMeta>{createdLabel}</S.CardMeta>
            </S.CardPlayerText>
          </S.CardPlayer>
          <S.Badge $tone={statusBadge.tone}>{statusBadge.label}</S.Badge>
        </S.CardHeader>
        <S.TermGrid>
          <S.Term>
            <S.TermLabel>Stake</S.TermLabel>
            <S.TermValue>{challenge.stake_amount.toLocaleString()} TNB</S.TermValue>
          </S.Term>
          <S.Term>
            <S.TermLabel>Max spend</S.TermLabel>
            <S.TermValue>{challenge.max_spend_amount.toLocaleString()} TNB</S.TermValue>
          </S.Term>
          <S.Term>
            <S.TermLabel>Time limit</S.TermLabel>
            <S.TermValue>{Math.round(challenge.time_limit_seconds / 60)} min</S.TermValue>
          </S.Term>
        </S.TermGrid>
        {actions && <S.CardActions>{actions}</S.CardActions>}
      </S.ChallengeCard>
    );
  };

  const renderChallengePanel = () => {
    return (
      <S.Panel aria-labelledby="challenge-player">
        <S.PanelHeader>
          <RivalryEmblem />
          <div>
            <S.Eyebrow>Start a rivalry</S.Eyebrow>
            <S.PanelTitle id="challenge-player" tabIndex={-1}>
              Challenge a player
            </S.PanelTitle>
          </div>
        </S.PanelHeader>
        <S.Lead>Pick an opponent, set your terms, and make the first move.</S.Lead>
        <Formik initialValues={initialValues} onSubmit={handleChallengeSubmit} validationSchema={validationSchema}>
          {({dirty, errors, handleSubmit, isSubmitting, isValid, setFieldTouched, setFieldValue, touched, values}) => (
            <S.Form onSubmit={handleSubmit}>
              <S.MemberSearch
                errors={errors}
                label="Find a member"
                name="opponent"
                onChange={(user) => handleOpponentChange(user, setFieldTouched, setFieldValue)}
                placeholder="Search by username"
                touched={touched}
                value={values.opponent}
              />
              <S.FieldRow>
                {renderAmountField('stakeAmount', 'Stake', errors, touched)}
                {renderAmountField('maxSpendAmount', 'Max spend', errors, touched)}
              </S.FieldRow>
              <TimeOptions idPrefix="challenge" />
              <S.Terms>{getChallengeTerms(values)}</S.Terms>
              <S.PanelActions>
                <S.PrimaryButton aria-busy={isSubmitting} disabled={!dirty || !isValid || isSubmitting} type="submit">
                  <Icon aria-hidden path={mdiSwordCross} size="20px" />
                  {isSubmitting ? 'Sending…' : 'Send challenge'}
                </S.PrimaryButton>
              </S.PanelActions>
            </S.Form>
          )}
        </Formik>
      </S.Panel>
    );
  };

  const renderChallenges = (
    title: string,
    challenges: ConnectFiveChallenge[],
    getCardProps: (challenge: ConnectFiveChallenge) => {actions: ReactNode; opponent: UserReadSerializer | null},
  ) => {
    const headingId = `${title.toLowerCase().replace(/\s+/g, '-')}-heading`;

    return (
      <S.ListPanel aria-labelledby={headingId}>
        <S.ListHeader>
          <S.ListTitle id={headingId}>{title}</S.ListTitle>
          <S.Count>{challenges.length}</S.Count>
        </S.ListHeader>
        <S.CardGrid>
          {challenges.map((challenge) => {
            const {actions, opponent} = getCardProps(challenge);
            return renderChallengeCard(challenge, opponent, actions);
          })}
        </S.CardGrid>
      </S.ListPanel>
    );
  };

  const renderEloChart = () => {
    if (isEloLoading) {
      return (
        <S.ChartState role="status">
          <StoneLoader />
          <span>Loading your ELO history…</span>
        </S.ChartState>
      );
    }

    if (eloError) {
      return (
        <S.ChartState>
          <span>{eloError}</span>
        </S.ChartState>
      );
    }

    if (!eloChartData.length) {
      return (
        <S.ChartState>
          <span>No ELO history yet.</span>
          <small>Play a ranked match against another member to start your line.</small>
        </S.ChartState>
      );
    }

    return (
      <S.ChartBody>
        <ResponsiveContainer height="100%" width="100%">
          <AreaChart data={eloChartData} margin={{bottom: 0, left: 0, right: 8, top: 8}}>
            <defs>
              <linearGradient id={ELO_FILL_ID} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={cosmos.gold} stopOpacity={0.3} />
                <stop offset="100%" stopColor={cosmos.gold} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(206, 181, 255, 0.12)" vertical={false} />
            <XAxis
              axisLine={{stroke: 'rgba(206, 181, 255, 0.25)'}}
              dataKey="date"
              minTickGap={24}
              tick={{fill: cosmos.mist, fontSize: 12}}
              tickFormatter={formatEloDateLabel}
              tickLine={false}
              tickMargin={8}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              domain={['dataMin - 40', 'dataMax + 40']}
              tick={{fill: cosmos.mist, fontSize: 12}}
              tickFormatter={formatEloValue}
              tickLine={false}
              width={48}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1b1339',
                border: `1px solid ${cosmos.edgeBright}`,
                borderRadius: 12,
                boxShadow: '0 12px 28px rgba(8, 4, 24, 0.5)',
                fontSize: 13,
              }}
              cursor={{stroke: 'rgba(255, 217, 144, 0.45)'}}
              formatter={(value) => formatEloValue(Number(value))}
              itemStyle={{color: cosmos.gold}}
              labelFormatter={formatEloTooltipLabel}
              labelStyle={{color: cosmos.mist}}
            />
            <Area
              activeDot={{fill: cosmos.gold, r: 5, stroke: cosmos.night, strokeWidth: 2}}
              dataKey="elo"
              fill={`url(#${ELO_FILL_ID})`}
              name="ELO"
              stroke={cosmos.gold}
              strokeWidth={2.5}
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      </S.ChartBody>
    );
  };

  // Visitors can play the computer immediately; accounts unlock multiplayer and rewards.
  const renderGuestPanel = () => {
    return (
      <S.Panel aria-labelledby="challenge-player">
        <S.PanelHeader>
          <RivalryEmblem />
          <div>
            <S.Eyebrow>Start a rivalry</S.Eyebrow>
            <S.PanelTitle id="challenge-player" tabIndex={-1}>
              Challenge a player
            </S.PanelTitle>
          </div>
        </S.PanelHeader>
        <S.Lead>
          A little strategy. A great rivalry. Create an account to earn rewards from eligible computer wins and
          challenge other players.
        </S.Lead>
        <S.AuthButtons />
        <S.Steps>
          {GUIDE.map(({description, title}, index) => (
            <S.Step key={title}>
              <S.StepStone $size={30} $tone={(['obsidian', 'ivory', 'gold'] as StoneTone[])[index]}>
                {index + 1}
              </S.StepStone>
              <div>
                <S.StepTitle>{title}</S.StepTitle>
                <S.StepText>{description}</S.StepText>
              </div>
            </S.Step>
          ))}
        </S.Steps>
        <S.GuestArt>
          <WonBoardArt />
        </S.GuestArt>
      </S.Panel>
    );
  };

  const renderMatchCard = (match: ConnectFiveMatch) => {
    const createdLabel = shortDate(match.created_date, true);
    const finishReason = getFinishReasonLabel(match);
    const isActive = match.status === ConnectFiveMatchStatus.ACTIVE;
    const opponentSide = getOpponentSide(match, self?.id);
    const opponent = opponentSide === 'a' ? match.player_a : match.player_b;
    const statusBadge = MATCH_BADGES[getMatchOutcome(match, self?.id)];
    const winnerName = isActive ? null : getConnectFiveWinnerName(match);

    return (
      <S.MatchCard
        aria-label={`Open match ${match.id}`}
        key={match.id}
        onClick={() => handleMatchCardClick(match.id)}
        type="button"
      >
        <S.CardHeader>
          <S.CardPlayer>
            <PlayerAvatar side={opponentSide} src={opponent?.avatar ?? null} />
            <S.CardPlayerText>
              <S.CardPlayerName>
                {opponent?.username ?? (match.mode === 'computer' ? 'Computer' : 'Unknown player')}
              </S.CardPlayerName>
              <S.CardMeta>
                {match.mode === 'computer'
                  ? `${capitalize(match.difficulty)} computer · ${createdLabel}`
                  : createdLabel}
              </S.CardMeta>
            </S.CardPlayerText>
          </S.CardPlayer>
          <S.CardArrow path={mdiArrowRight} size="20px" />
        </S.CardHeader>
        <S.Details>
          <S.DetailRow>
            <S.DetailLabel>Status</S.DetailLabel>
            <S.Badge $tone={statusBadge.tone}>{statusBadge.label}</S.Badge>
          </S.DetailRow>
          {finishReason && (
            <S.DetailRow>
              <S.DetailLabel>Finish reason</S.DetailLabel>
              <S.DetailValue>{finishReason}</S.DetailValue>
            </S.DetailRow>
          )}
          {winnerName && (
            <S.DetailRow>
              <S.DetailLabel>Winner</S.DetailLabel>
              <S.DetailValue>{winnerName}</S.DetailValue>
            </S.DetailRow>
          )}
        </S.Details>
      </S.MatchCard>
    );
  };

  const renderMatchHistory = () => {
    return (
      <S.ListPanel aria-labelledby="match-history-heading">
        <S.ListHeader>
          <S.ListTitle id="match-history-heading">Match history</S.ListTitle>
          <S.Count>{completedMatchesSorted.length}</S.Count>
        </S.ListHeader>
        <S.CardGrid>{visibleCompletedMatches.map(renderMatchCard)}</S.CardGrid>
        {hasMoreCompletedMatches && (
          <S.LoadMoreRow>
            <S.GhostButton onClick={handleCompletedMatchesLoadMore} type="button">
              Load more
            </S.GhostButton>
          </S.LoadMoreRow>
        )}
      </S.ListPanel>
    );
  };

  const renderPlayerPanel = () => {
    return (
      <S.PlayerPanel aria-labelledby="player-record-title">
        <S.PlayerSummary>
          <S.PlayerIdentity>
            <S.AvatarRing>
              <Avatar size="72px" src={self?.avatar ?? null} />
            </S.AvatarRing>
            <S.PlayerHeading>
              <S.Eyebrow>Your record</S.Eyebrow>
              <S.PlayerName id="player-record-title">{self?.username ?? 'Unknown player'}</S.PlayerName>
            </S.PlayerHeading>
          </S.PlayerIdentity>
          <S.StatGrid>
            <S.Stat>
              <S.StatLabel>ELO</S.StatLabel>
              <S.StatValue $isGold>{eloLabel}</S.StatValue>
            </S.Stat>
            <S.Stat>
              <S.StatLabel>Rank</S.StatLabel>
              <S.StatValue>{rankLabel}</S.StatValue>
            </S.Stat>
            <S.Stat>
              <S.StatLabel>Record</S.StatLabel>
              <S.StatValue>{recordLabel}</S.StatValue>
            </S.Stat>
          </S.StatGrid>
          <S.RecentForm>
            <S.RecentHeader>
              <S.StatLabel>Last five games</S.StatLabel>
              <S.RecentLegend aria-hidden="true">
                <span>
                  <Stone $size={8} $tone="gold" />
                  Win
                </span>
                <span>
                  <Stone $size={8} $tone="obsidian" />
                  Loss
                </span>
              </S.RecentLegend>
            </S.RecentHeader>
            <S.RecentStones aria-label="Last five games, oldest first" role="list">
              {recentResults.map(({id, label, tone}) => (
                <S.RecentStone aria-label={label} key={id} role="listitem" title={label}>
                  <Stone $size={18} $tone={tone} />
                </S.RecentStone>
              ))}
            </S.RecentStones>
          </S.RecentForm>
        </S.PlayerSummary>
        <S.EloArea>
          <S.EloHeader>
            <S.SectionTitle>Your ELO</S.SectionTitle>
            <S.SectionNote>Ranked multiplayer matches build your ELO history.</S.SectionNote>
          </S.EloHeader>
          {renderEloChart()}
        </S.EloArea>
      </S.PlayerPanel>
    );
  };

  const renderPublicMatchCard = (match: ConnectFiveMatch) => {
    const createdLabel = shortDate(match.created_date, true);
    const finishReason = getFinishReasonLabel(match);
    const isActive = match.status === ConnectFiveMatchStatus.ACTIVE;
    const statusBadge = MATCH_BADGES[getMatchOutcome(match)];
    const winnerName = isActive ? null : getConnectFiveWinnerName(match);

    return (
      <S.MatchCard
        aria-label={`Open match ${match.id}`}
        key={match.id}
        onClick={() => handleMatchCardClick(match.id)}
        type="button"
      >
        <S.CardHeader>
          <S.Versus>
            <S.VersusPlayer>
              <PlayerAvatar side="a" size={36} src={match.player_a.avatar} />
              <S.VersusName>{match.player_a.username}</S.VersusName>
            </S.VersusPlayer>
            <S.VersusMark>vs</S.VersusMark>
            <S.VersusPlayer>
              <PlayerAvatar side="b" size={36} src={match.player_b?.avatar ?? null} />
              <S.VersusName>{match.player_b?.username ?? 'Computer'}</S.VersusName>
            </S.VersusPlayer>
          </S.Versus>
          <S.CardArrow path={mdiArrowRight} size="20px" />
        </S.CardHeader>
        <S.CardMeta>{createdLabel}</S.CardMeta>
        <S.Details>
          <S.DetailRow>
            <S.DetailLabel>Status</S.DetailLabel>
            <S.Badge $tone={statusBadge.tone}>{statusBadge.label}</S.Badge>
          </S.DetailRow>
          {finishReason && (
            <S.DetailRow>
              <S.DetailLabel>Finish reason</S.DetailLabel>
              <S.DetailValue>{finishReason}</S.DetailValue>
            </S.DetailRow>
          )}
          {winnerName && (
            <S.DetailRow>
              <S.DetailLabel>Winner</S.DetailLabel>
              <S.DetailValue>{winnerName}</S.DetailValue>
            </S.DetailRow>
          )}
        </S.Details>
      </S.MatchCard>
    );
  };

  const renderWatchMatches = () => {
    if (isMatchesLoading) {
      return (
        <S.EmptyState role="status">
          <StoneLoader />
          <S.EmptyText>Finding live matches...</S.EmptyText>
        </S.EmptyState>
      );
    }

    if (matchesError) {
      return (
        <S.EmptyState>
          <S.EmptyText role="alert">{matchesError}</S.EmptyText>
          <S.GhostButton onClick={loadMatches} type="button">
            Try again
          </S.GhostButton>
        </S.EmptyState>
      );
    }

    if (publicMatchesSorted.length) {
      return (
        <>
          <S.CardGrid>{paginatedPublicMatches.map(renderPublicMatchCard)}</S.CardGrid>
          <S.Pagination
            currentPage={publicMatchesPage}
            onPageChange={handlePublicMatchesPageChange}
            totalPages={publicMatchesTotalPages}
          />
        </>
      );
    }

    return (
      <S.EmptyState>
        <EmptyBoardArt />
        <S.EmptyTitle>The board is waiting.</S.EmptyTitle>
        <S.EmptyText>
          No public matches are live right now.{' '}
          {isAuthenticated
            ? 'Challenge a player to get things started.'
            : 'Check back soon to watch the next rivalry unfold.'}
        </S.EmptyText>
      </S.EmptyState>
    );
  };

  const renderYourMatches = () => {
    return (
      <S.ListPanel aria-labelledby="your-matches-heading">
        <S.ListHeader>
          <S.ListTitle id="your-matches-heading">Your matches</S.ListTitle>
          <S.Count>{activeMatchesSorted.length}</S.Count>
        </S.ListHeader>
        <S.CardGrid>{paginatedActiveMatches.map(renderMatchCard)}</S.CardGrid>
        <S.Pagination
          currentPage={activeMatchesPage}
          onPageChange={handleActiveMatchesPageChange}
          totalPages={activeMatchesTotalPages}
        />
      </S.ListPanel>
    );
  };

  return (
    <S.Container {...analyticsArea('connect_five_lobby')} className={className}>
      <S.Content>
        <ComputerSetup key={self.id}>
          {({isCreating, onPlay, panel}) => (
            <>
              <Hero isCreating={isCreating} onPlay={onPlay} />
              <S.Deck>
                {panel}
                {isAuthenticated ? renderChallengePanel() : renderGuestPanel()}
              </S.Deck>
            </>
          )}
        </ComputerSetup>

        {incomingChallenges.length > 0 &&
          renderChallenges('Incoming challenges', incomingChallenges, (challenge) => ({
            actions: (
              <S.SmallGoldButton onClick={() => handleAcceptChallenge(challenge.id)} type="button">
                Accept
              </S.SmallGoldButton>
            ),
            opponent: challenge.challenger,
          }))}

        {outgoingChallenges.length > 0 &&
          renderChallenges('Outgoing challenges', outgoingChallenges, (challenge) => ({
            actions: (
              <S.GhostButton onClick={() => handleCancelChallenge(challenge.id)} type="button">
                Cancel
              </S.GhostButton>
            ),
            opponent: challenge.opponent,
          }))}

        {activeMatchesSorted.length > 0 && renderYourMatches()}

        {isAuthenticated && renderPlayerPanel()}

        <TopEarners />

        <S.ListPanel aria-labelledby="watch-live-heading">
          <S.ListHeader>
            <LiveEmblem />
            <S.ListHeading>
              <S.Eyebrow>Spectate</S.Eyebrow>
              <S.ListTitle id="watch-live-heading">Watch live</S.ListTitle>
              <S.ListDescription>Take a seat and see how the next winning line unfolds.</S.ListDescription>
            </S.ListHeading>
            {publicMatchesSorted.length > 0 && <S.Count>{publicMatchesSorted.length} live</S.Count>}
          </S.ListHeader>
          {renderWatchMatches()}
        </S.ListPanel>

        {completedMatchesSorted.length > 0 && renderMatchHistory()}
      </S.Content>
    </S.Container>
  );
};

export default ConnectFiveHome;
