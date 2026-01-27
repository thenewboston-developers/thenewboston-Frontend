import {ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {mdiArrowRight} from '@mdi/js';
import {Formik, FormikHelpers} from 'formik';
import orderBy from 'lodash/orderBy';

import {
  acceptConnectFiveChallenge,
  cancelConnectFiveChallenge,
  createConnectFiveChallenge,
  getConnectFiveChallenges,
  getConnectFiveMatches,
} from 'api/connectFive';
import Badge, {BadgeStyle} from 'components/Badge';
import Button, {ButtonType} from 'components/Button';
import EmptyText from 'components/EmptyText';
import {FormField, Input, Select} from 'components/FormElements';
import Loader from 'components/Loader';
import UserLabel from 'components/UserLabel';
import UserSearchInput from 'components/UserSearchInput';
import {ConnectFiveChallengeStatus, ConnectFiveMatchStatus} from 'enums';
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
import {AppDispatch, ConnectFiveChallenge, ConnectFiveMatch, SelectOption, SFC, UserReadSerializer} from 'types';
import {shortDate} from 'utils/dates';
import {handleFormikAPIError} from 'utils/forms';
import yup from 'utils/yup';

import * as S from './Styles';

const timeLimitOptions: SelectOption[] = [
  {displayName: '5 minutes', value: '300'},
  {displayName: '10 minutes', value: '600'},
  {displayName: '15 minutes', value: '900'},
  {displayName: '30 minutes', value: '1800'},
];

const MATCHES_PER_PAGE = 10;

const initialValues = {
  maxSpendAmount: '',
  opponent: null as UserReadSerializer | null,
  stakeAmount: '',
  timeLimitSeconds: '600',
};

type FormValues = typeof initialValues;

const getChallengeStatusBadge = (status: string) => {
  const label = status.replace('_', ' ');
  const formattedLabel = label.charAt(0).toUpperCase() + label.slice(1);

  if (status === ConnectFiveChallengeStatus.PENDING) {
    return {badgeStyle: BadgeStyle.primary, label: 'Pending'};
  }

  if (status === ConnectFiveChallengeStatus.ACCEPTED) {
    return {badgeStyle: BadgeStyle.success, label: 'Accepted'};
  }

  if (status === ConnectFiveChallengeStatus.CANCELLED) {
    return {badgeStyle: BadgeStyle.warning, label: 'Cancelled'};
  }

  if (status === ConnectFiveChallengeStatus.EXPIRED) {
    return {badgeStyle: BadgeStyle.danger, label: 'Expired'};
  }

  return {badgeStyle: BadgeStyle.neutral, label: formattedLabel};
};

const getFinishReasonLabel = (match: ConnectFiveMatch): string | null => {
  if (match.status === ConnectFiveMatchStatus.FINISHED_CONNECT5) {
    return 'Connect 5';
  }

  if (match.status === ConnectFiveMatchStatus.FINISHED_RESIGN) {
    return 'Resignation';
  }

  if (match.status === ConnectFiveMatchStatus.FINISHED_TIMEOUT) {
    return 'Timeout';
  }

  return null;
};

const getOpponent = (match: ConnectFiveMatch, selfId?: number | null): UserReadSerializer | null => {
  if (selfId) {
    if (match.player_a.id === selfId) return match.player_b;
    if (match.player_b.id === selfId) return match.player_a;
  }

  return match.player_b ?? match.player_a;
};

const getStatusBadge = (match: ConnectFiveMatch, selfId?: number | null) => {
  if (match.status === ConnectFiveMatchStatus.ACTIVE) {
    return {badgeStyle: BadgeStyle.primary, label: 'In progress'};
  }

  if (match.status === ConnectFiveMatchStatus.DRAW) {
    return {badgeStyle: BadgeStyle.neutral, label: 'Draw'};
  }

  if (match.status === ConnectFiveMatchStatus.CANCELLED) {
    return {badgeStyle: BadgeStyle.warning, label: 'Cancelled'};
  }

  if (match.winner && selfId) {
    if (match.winner === selfId) {
      return {badgeStyle: BadgeStyle.success, label: 'You won!'};
    }

    return {badgeStyle: BadgeStyle.danger, label: 'You lost'};
  }

  return {badgeStyle: BadgeStyle.neutral, label: 'Finished'};
};

const ConnectFiveHome: SFC = ({className}) => {
  const [activeMatchesPage, setActiveMatchesPage] = useState(1);
  const [completedMatchesPage, setCompletedMatchesPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const activeMatches = useSelector(getConnectFiveActiveMatches);
  const completedMatches = useSelector(getConnectFiveCompletedMatches);
  const dispatch = useDispatch<AppDispatch>();
  const incomingChallenges = useSelector(getConnectFiveIncomingChallenges);
  const navigate = useNavigate();
  const outgoingChallenges = useSelector(getConnectFiveOutgoingChallenges);
  const self = useSelector(getSelf);

  const activeMatchesSorted = useMemo(() => {
    return orderBy(activeMatches, ['created_date'], ['desc']);
  }, [activeMatches]);

  const activeMatchesTotalPages = useMemo(() => {
    return Math.ceil(activeMatchesSorted.length / MATCHES_PER_PAGE);
  }, [activeMatchesSorted.length]);

  const completedMatchesSorted = useMemo(() => {
    return orderBy(completedMatches, ['created_date'], ['desc']);
  }, [completedMatches]);

  const completedMatchesTotalPages = useMemo(() => {
    return Math.ceil(completedMatchesSorted.length / MATCHES_PER_PAGE);
  }, [completedMatchesSorted.length]);

  const paginatedActiveMatches = useMemo(() => {
    const startIndex = (activeMatchesPage - 1) * MATCHES_PER_PAGE;
    return activeMatchesSorted.slice(startIndex, startIndex + MATCHES_PER_PAGE);
  }, [activeMatchesPage, activeMatchesSorted]);

  const paginatedCompletedMatches = useMemo(() => {
    const startIndex = (completedMatchesPage - 1) * MATCHES_PER_PAGE;
    return completedMatchesSorted.slice(startIndex, startIndex + MATCHES_PER_PAGE);
  }, [completedMatchesPage, completedMatchesSorted]);

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

  const handleAcceptChallenge = useCallback(
    async (challengeId: number) => {
      const match = await acceptConnectFiveChallenge(challengeId);
      dispatch(removeIncomingChallenge(challengeId));
      dispatch(upsertMatch(match));
      navigate(`/connect-five/games/${match.challenge}`);
    },
    [dispatch, navigate],
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
        helpers.resetForm();
        navigate(`/connect-five/games/${challenge.id}`);
      } catch (error) {
        handleFormikAPIError(error, helpers, 'Error creating challenge');
      }
    },
    [dispatch, navigate, self?.id],
  );

  const handleCompletedMatchesPageChange = useCallback((page: number) => {
    setCompletedMatchesPage(page);
  }, []);

  const handleMatchCardClick = useCallback(
    (challengeId: number) => {
      navigate(`/connect-five/games/${challengeId}`);
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

  const loadChallenges = useCallback(async () => {
    const incomingResponse = await getConnectFiveChallenges({
      mine: 'received',
      status: ConnectFiveChallengeStatus.PENDING,
    });
    const outgoingResponse = await getConnectFiveChallenges({
      mine: 'sent',
      status: ConnectFiveChallengeStatus.PENDING,
    });

    dispatch(setIncomingChallenges(incomingResponse.results));
    dispatch(setOutgoingChallenges(outgoingResponse.results));
  }, [dispatch]);

  const loadMatches = useCallback(async () => {
    const matchesResponse = await getConnectFiveMatches();
    const matches = matchesResponse.results;
    dispatch(setActiveMatches(matches.filter((match) => match.status === ConnectFiveMatchStatus.ACTIVE)));
    dispatch(setCompletedMatches(matches.filter((match) => match.status !== ConnectFiveMatchStatus.ACTIVE)));
  }, [dispatch]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([loadChallenges(), loadMatches()]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [loadChallenges, loadMatches]);

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
  }, [activeMatchesPage, activeMatchesTotalPages, completedMatchesPage, completedMatchesTotalPages]);

  const renderActiveMatches = () => {
    if (isLoading) {
      return (
        <S.EmptyState>
          <Loader />
        </S.EmptyState>
      );
    }
    if (!activeMatchesSorted.length) return <EmptyText>No active games.</EmptyText>;

    return (
      <>
        <S.MatchList>{paginatedActiveMatches.map(renderMatchCard)}</S.MatchList>
        <S.Pagination
          currentPage={activeMatchesPage}
          onPageChange={handleActiveMatchesPageChange}
          totalPages={activeMatchesTotalPages}
        />
      </>
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
        <S.ChallengeHeader>
          <UserLabel
            avatar={opponent?.avatar ?? null}
            clickable={false}
            description={`Created ${createdLabel}`}
            id={opponent?.id ?? null}
            username={opponent?.username ?? 'Unknown player'}
          />
          <Badge badgeStyle={statusBadge.badgeStyle}>{statusBadge.label}</Badge>
        </S.ChallengeHeader>
        <S.ChallengeInfo>
          <S.ChallengeInfoRow>
            <S.ChallengeInfoLabel>Stake</S.ChallengeInfoLabel>
            <S.ChallengeInfoValue>{challenge.stake_amount.toLocaleString()} TNB</S.ChallengeInfoValue>
          </S.ChallengeInfoRow>
          <S.ChallengeInfoRow>
            <S.ChallengeInfoLabel>Max spend</S.ChallengeInfoLabel>
            <S.ChallengeInfoValue>{challenge.max_spend_amount.toLocaleString()} TNB</S.ChallengeInfoValue>
          </S.ChallengeInfoRow>
          <S.ChallengeInfoRow>
            <S.ChallengeInfoLabel>Time limit</S.ChallengeInfoLabel>
            <S.ChallengeInfoValue>{Math.round(challenge.time_limit_seconds / 60)} min</S.ChallengeInfoValue>
          </S.ChallengeInfoRow>
        </S.ChallengeInfo>
        {actions && <S.ChallengeActions>{actions}</S.ChallengeActions>}
      </S.ChallengeCard>
    );
  };

  const renderCompletedMatches = () => {
    if (isLoading) {
      return (
        <S.EmptyState>
          <Loader />
        </S.EmptyState>
      );
    }
    if (!completedMatchesSorted.length) return <EmptyText>No completed games.</EmptyText>;

    return (
      <>
        <S.MatchList>{paginatedCompletedMatches.map(renderMatchCard)}</S.MatchList>
        <S.Pagination
          currentPage={completedMatchesPage}
          onPageChange={handleCompletedMatchesPageChange}
          totalPages={completedMatchesTotalPages}
        />
      </>
    );
  };

  const renderIncomingChallenges = () => {
    if (isLoading) {
      return (
        <S.EmptyState>
          <Loader />
        </S.EmptyState>
      );
    }
    if (!incomingChallenges.length) return <EmptyText>No incoming challenges.</EmptyText>;
    return (
      <S.ChallengeList>
        {incomingChallenges.map((challenge) =>
          renderChallengeCard(
            challenge,
            challenge.challenger,
            <Button onClick={() => handleAcceptChallenge(challenge.id)} text="Accept" />,
          ),
        )}
      </S.ChallengeList>
    );
  };

  const renderMatchCard = (match: ConnectFiveMatch) => {
    const createdLabel = shortDate(match.created_date, true);
    const finishReason = getFinishReasonLabel(match);
    const isActive = match.status === ConnectFiveMatchStatus.ACTIVE;
    const opponent = getOpponent(match, self?.id);
    const statusBadge = getStatusBadge(match, self?.id);

    return (
      <S.MatchCard
        aria-label={`Open game ${match.id}`}
        key={match.id}
        onClick={() => handleMatchCardClick(match.challenge)}
        type="button"
      >
        <S.MatchHeader>
          <S.MatchHeaderMain>
            <UserLabel
              avatar={opponent?.avatar ?? null}
              clickable={false}
              description={`Created ${createdLabel}`}
              id={opponent?.id ?? null}
              username={opponent?.username ?? 'Unknown player'}
            />
          </S.MatchHeaderMain>
          <S.MatchIcon path={mdiArrowRight} size="20px" />
        </S.MatchHeader>
        <S.MatchInfo>
          <S.MatchInfoRow>
            <S.MatchInfoLabel>Status</S.MatchInfoLabel>
            <Badge badgeStyle={statusBadge.badgeStyle}>{statusBadge.label}</Badge>
          </S.MatchInfoRow>
          {finishReason && (
            <S.MatchInfoRow>
              <S.MatchInfoLabel>Finish reason</S.MatchInfoLabel>
              <S.MatchInfoValue>{finishReason}</S.MatchInfoValue>
            </S.MatchInfoRow>
          )}
          {!isActive && match.winner && (
            <S.MatchInfoRow>
              <S.MatchInfoLabel>Winner</S.MatchInfoLabel>
              <S.MatchInfoValue>
                {match.winner === match.player_a.id ? match.player_a.username : match.player_b.username}
              </S.MatchInfoValue>
            </S.MatchInfoRow>
          )}
        </S.MatchInfo>
      </S.MatchCard>
    );
  };

  const renderOutgoingChallenges = () => {
    if (isLoading) {
      return (
        <S.EmptyState>
          <Loader />
        </S.EmptyState>
      );
    }
    if (!outgoingChallenges.length) return <EmptyText>No outgoing challenges.</EmptyText>;
    return (
      <S.ChallengeList>
        {outgoingChallenges.map((challenge) =>
          renderChallengeCard(
            challenge,
            challenge.opponent,
            <Button onClick={() => handleCancelChallenge(challenge.id)} text="Cancel" />,
          ),
        )}
      </S.ChallengeList>
    );
  };

  return (
    <S.Container className={className}>
      <S.Content>
        <S.Section>
          <S.SectionTitle>Send a challenge</S.SectionTitle>
          <Formik initialValues={initialValues} onSubmit={handleChallengeSubmit} validationSchema={validationSchema}>
            {({
              dirty,
              errors,
              handleSubmit,
              isSubmitting,
              isValid,
              setFieldTouched,
              setFieldValue,
              touched,
              values,
            }) => (
              <S.Form onSubmit={handleSubmit}>
                <FormField>
                  <UserSearchInput
                    errors={errors}
                    label="Search for recipient"
                    name="opponent"
                    onChange={(user) => handleOpponentChange(user, setFieldTouched, setFieldValue)}
                    touched={touched}
                    value={values.opponent}
                  />
                </FormField>
                <S.FormRow>
                  <FormField>
                    <Input errors={errors} label="Stake (TNB)" name="stakeAmount" touched={touched} type="number" />
                  </FormField>
                  <FormField>
                    <Input
                      errors={errors}
                      label="Max spend (TNB)"
                      name="maxSpendAmount"
                      touched={touched}
                      type="number"
                    />
                  </FormField>
                </S.FormRow>
                <FormField>
                  <Select
                    errors={errors}
                    label="Total time per player"
                    name="timeLimitSeconds"
                    options={timeLimitOptions}
                    touched={touched}
                  />
                </FormField>
                <S.SubmitRow>
                  <Button
                    dirty={dirty}
                    isSubmitting={isSubmitting}
                    isValid={isValid}
                    text={isSubmitting ? 'Sending...' : 'Send challenge'}
                    type={ButtonType.submit}
                  />
                </S.SubmitRow>
              </S.Form>
            )}
          </Formik>
        </S.Section>

        <S.GamesSection>
          <S.GamesSectionTitle>Incoming challenges</S.GamesSectionTitle>
          {renderIncomingChallenges()}
        </S.GamesSection>

        <S.GamesSection>
          <S.GamesSectionTitle>Outgoing challenges</S.GamesSectionTitle>
          {renderOutgoingChallenges()}
        </S.GamesSection>

        <S.GamesSection>
          <S.GamesSectionTitle>Active games</S.GamesSectionTitle>
          {renderActiveMatches()}
        </S.GamesSection>

        <S.GamesSection>
          <S.GamesSectionTitle>Game history</S.GamesSectionTitle>
          {renderCompletedMatches()}
        </S.GamesSection>
      </S.Content>
    </S.Container>
  );
};

export default ConnectFiveHome;
