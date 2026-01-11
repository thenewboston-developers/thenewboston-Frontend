import {ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Formik, FormikHelpers} from 'formik';

import {
  acceptConnectFiveChallenge,
  cancelConnectFiveChallenge,
  createConnectFiveChallenge,
  getConnectFiveChallenges,
  getConnectFiveMatches,
} from 'api/connectFive';
import Button, {ButtonType} from 'components/Button';
import EmptyText from 'components/EmptyText';
import {FormField, Input, Select} from 'components/FormElements';
import SectionHeading from 'components/SectionHeading';
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
import {handleFormikAPIError} from 'utils/forms';
import yup from 'utils/yup';

import * as S from './Styles';

const timeLimitOptions: SelectOption[] = [
  {displayName: '5 minutes', value: '300'},
  {displayName: '10 minutes', value: '600'},
  {displayName: '15 minutes', value: '900'},
  {displayName: '30 minutes', value: '1800'},
];

const initialValues = {
  maxSpendAmount: '',
  opponent: null as UserReadSerializer | null,
  stakeAmount: '',
  timeLimitSeconds: '600',
};

type FormValues = typeof initialValues;

const ConnectFiveHome: SFC = ({className}) => {
  const [isLoading, setIsLoading] = useState(false);

  const activeMatches = useSelector(getConnectFiveActiveMatches);
  const completedMatches = useSelector(getConnectFiveCompletedMatches);
  const dispatch = useDispatch<AppDispatch>();
  const incomingChallenges = useSelector(getConnectFiveIncomingChallenges);
  const navigate = useNavigate();
  const outgoingChallenges = useSelector(getConnectFiveOutgoingChallenges);
  const self = useSelector(getSelf);

  const handleAcceptChallenge = useCallback(
    async (challengeId: number) => {
      const match = await acceptConnectFiveChallenge(challengeId);
      dispatch(removeIncomingChallenge(challengeId));
      dispatch(upsertMatch(match));
      navigate(`/connect-five/games/${match.challenge}`);
    },
    [dispatch, navigate],
  );

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

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      maxSpendAmount: yup.number().integer('Enter a whole number').min(0).required('Max spend is required'),
      opponent: yup.mixed().required('Opponent is required'),
      stakeAmount: yup.number().integer('Enter a whole number').min(0).required('Stake is required'),
      timeLimitSeconds: yup.string().required('Time limit is required'),
    });
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([loadChallenges(), loadMatches()]);
      setIsLoading(false);
    };

    loadData();
  }, [loadChallenges, loadMatches]);

  const renderActiveMatches = () => {
    if (isLoading) return <S.EmptyState>Loading games...</S.EmptyState>;
    if (!activeMatches.length) return <EmptyText>No active games.</EmptyText>;
    return activeMatches.map(renderMatchCard);
  };

  const renderChallengeCard = (challenge: ConnectFiveChallenge, actions?: ReactNode) => {
    return (
      <S.ChallengeCard key={challenge.id}>
        <S.ChallengeHeader>
          <S.ChallengeTitle>Challenge #{challenge.id}</S.ChallengeTitle>
          <S.ChallengeStatus>{challenge.status}</S.ChallengeStatus>
        </S.ChallengeHeader>
        <S.ChallengeDetails>
          <span>Stake: {challenge.stake_amount.toLocaleString()} TNB</span>
          <span>Max spend: {challenge.max_spend_amount.toLocaleString()} TNB</span>
          <span>Time: {Math.round(challenge.time_limit_seconds / 60)} min</span>
        </S.ChallengeDetails>
        {actions && <S.ChallengeActions>{actions}</S.ChallengeActions>}
      </S.ChallengeCard>
    );
  };

  const renderCompletedMatches = () => {
    if (isLoading) return <S.EmptyState>Loading games...</S.EmptyState>;
    if (!completedMatches.length) return <EmptyText>No completed games.</EmptyText>;
    return completedMatches.map(renderMatchCard);
  };

  const renderIncomingChallenges = () => {
    if (isLoading) return <S.EmptyState>Loading challenges...</S.EmptyState>;
    if (!incomingChallenges.length) return <EmptyText>No incoming challenges.</EmptyText>;
    return incomingChallenges.map((challenge) =>
      renderChallengeCard(challenge, <Button onClick={() => handleAcceptChallenge(challenge.id)} text="Accept" />),
    );
  };

  const renderMatchCard = (match: ConnectFiveMatch) => {
    const statusLabel = match.status.replace('finished_', '').replace('_', ' ');

    return (
      <S.MatchCard key={match.id}>
        <S.MatchHeader>
          <S.MatchTitle>Game #{match.id}</S.MatchTitle>
          <S.MatchStatus>{statusLabel}</S.MatchStatus>
        </S.MatchHeader>
        <S.MatchDetails>
          <span>Prize pool: {match.prize_pool_total.toLocaleString()} TNB</span>
          <span>Time limit: {Math.round(match.time_limit_seconds / 60)} min</span>
        </S.MatchDetails>
        <S.MatchActions>
          <Button onClick={() => navigate(`/connect-five/games/${match.challenge}`)} text="Open" />
        </S.MatchActions>
      </S.MatchCard>
    );
  };

  const renderOutgoingChallenges = () => {
    if (isLoading) return <S.EmptyState>Loading challenges...</S.EmptyState>;
    if (!outgoingChallenges.length) return <EmptyText>No outgoing challenges.</EmptyText>;
    return outgoingChallenges.map((challenge) =>
      renderChallengeCard(challenge, <Button onClick={() => handleCancelChallenge(challenge.id)} text="Cancel" />),
    );
  };

  return (
    <S.Container className={className}>
      <S.Header>
        <SectionHeading heading="Connect 5" />
        <S.Subtitle>Challenge another player to a TNB-only Connect 5 match.</S.Subtitle>
      </S.Header>

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

        <S.Section>
          <S.SectionTitle>Incoming challenges</S.SectionTitle>
          {renderIncomingChallenges()}
        </S.Section>

        <S.Section>
          <S.SectionTitle>Outgoing challenges</S.SectionTitle>
          {renderOutgoingChallenges()}
        </S.Section>

        <S.Section>
          <S.SectionTitle>Active games</S.SectionTitle>
          {renderActiveMatches()}
        </S.Section>

        <S.Section>
          <S.SectionTitle>Game history</S.SectionTitle>
          {renderCompletedMatches()}
        </S.Section>
      </S.Content>
    </S.Container>
  );
};

export default ConnectFiveHome;
