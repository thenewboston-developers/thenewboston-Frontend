import {ReactNode, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {
  acceptConnectFiveChallenge,
  cancelConnectFiveChallenge,
  declineConnectFiveChallenge,
  getConnectFiveChallenge,
} from 'api/connectFive';
import Badge, {BadgeStyle} from 'components/Badge';
import Button from 'components/Button';
import {ButtonColor} from 'components/Button/types';
import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import {ConnectFiveChallengeStatus} from 'enums';
import {getConnectFiveChallengesById, getConnectFiveMatchesById, getSelf} from 'selectors/state';
import {removeIncomingChallenge, upsertChallenge, upsertMatch} from 'store/connectFive';
import {AppDispatch, SFC} from 'types';
import {shortDate} from 'utils/dates';
import {displayErrorToast} from 'utils/toasts';

import * as MatchStyles from '../Match/Styles';

import * as S from './Styles';

type ChallengeAction = 'accept' | 'cancel' | 'decline';

type StatusBadge = {badgeStyle: BadgeStyle; label: string};

const getChallengeStatusBadge = (status: string): StatusBadge => {
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

  if (status === ConnectFiveChallengeStatus.DECLINED) {
    return {badgeStyle: BadgeStyle.danger, label: 'Declined'};
  }

  if (status === ConnectFiveChallengeStatus.EXPIRED) {
    return {badgeStyle: BadgeStyle.danger, label: 'Expired'};
  }

  return {badgeStyle: BadgeStyle.neutral, label: formattedLabel};
};

const ConnectFiveChallenge: SFC = ({className}) => {
  const [activeAction, setActiveAction] = useState<ChallengeAction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {challengeId} = useParams();
  const challengesById = useSelector(getConnectFiveChallengesById);
  const dispatch = useDispatch<AppDispatch>();
  const matchesById = useSelector(getConnectFiveMatchesById);
  const navigate = useNavigate();
  const self = useSelector(getSelf);

  const challengeIdNumber = challengeId ? Number(challengeId) : null;
  const challenge = challengeIdNumber ? challengesById[challengeIdNumber] : null;
  const challengeStatus = challenge?.status ?? null;
  const challengerName = challenge?.challenger.username ?? 'challenger';
  const isChallenger = !!challenge && !!self?.id && challenge.challenger.id === self.id;
  const isOpponent = !!challenge && !!self?.id && challenge.opponent.id === self.id;
  const matchFromStore = challenge
    ? Object.values(matchesById).find((match) => match.challenge === challenge.id)
    : null;
  const matchId = challenge?.match_id ?? matchFromStore?.id ?? null;
  const opponentName = challenge?.opponent.username ?? 'opponent';
  const pendingVariant: 'challenger' | 'opponent' = isOpponent ? 'opponent' : 'challenger';
  const statusBadge = challengeStatus ? getChallengeStatusBadge(challengeStatus) : null;

  const handleAcceptChallenge = useCallback(async () => {
    if (!challenge) return;
    if (!isOpponent || challenge.status !== ConnectFiveChallengeStatus.PENDING) return;

    try {
      setActiveAction('accept');
      const match = await acceptConnectFiveChallenge(challenge.id);
      dispatch(removeIncomingChallenge(challenge.id));
      dispatch(upsertMatch({match, selfId: self?.id}));
      navigate(`/connect-five/matches/${match.id}`);
    } catch (error) {
      displayErrorToast('Failed to accept challenge.');
    } finally {
      setActiveAction(null);
    }
  }, [challenge, dispatch, isOpponent, navigate, self?.id]);

  const handleCancelChallenge = useCallback(async () => {
    if (!challenge) return;
    if (!isChallenger || challenge.status !== ConnectFiveChallengeStatus.PENDING) return;

    try {
      setActiveAction('cancel');
      const updatedChallenge = await cancelConnectFiveChallenge(challenge.id);
      dispatch(upsertChallenge({challenge: updatedChallenge, selfId: self?.id}));
    } catch (error) {
      displayErrorToast('Failed to cancel challenge.');
    } finally {
      setActiveAction(null);
    }
  }, [challenge, dispatch, isChallenger, self?.id]);

  const handleDeclineChallenge = useCallback(async () => {
    if (!challenge) return;
    if (!isOpponent || challenge.status !== ConnectFiveChallengeStatus.PENDING) return;

    try {
      setActiveAction('decline');
      const updatedChallenge = await declineConnectFiveChallenge(challenge.id);
      dispatch(upsertChallenge({challenge: updatedChallenge, selfId: self?.id}));
    } catch (error) {
      displayErrorToast('Failed to decline challenge.');
    } finally {
      setActiveAction(null);
    }
  }, [challenge, dispatch, isOpponent, self?.id]);

  const handleReturnHome = useCallback(() => {
    navigate('/connect-five/home');
  }, [navigate]);

  const loadChallenge = useCallback(async () => {
    if (!challengeIdNumber) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const challengeData = await getConnectFiveChallenge(challengeIdNumber, {mine: 'any'});
      dispatch(upsertChallenge({challenge: challengeData, selfId: self?.id}));
    } catch (error) {
      displayErrorToast('Unable to load challenge details.');
    } finally {
      setIsLoading(false);
    }
  }, [challengeIdNumber, dispatch, self?.id]);

  useEffect(() => {
    loadChallenge();
  }, [loadChallenge]);

  useEffect(() => {
    if (challengeStatus !== ConnectFiveChallengeStatus.ACCEPTED) return;
    if (!matchId) return;

    navigate(`/connect-five/matches/${matchId}`);
  }, [challengeStatus, matchId, navigate]);

  const renderActions = () => {
    if (!challenge) return null;

    if (challenge.status === ConnectFiveChallengeStatus.PENDING) {
      if (isChallenger) {
        return (
          <S.Actions>
            <Button
              color={ButtonColor.danger}
              disabled={activeAction !== null}
              isSubmitting={activeAction === 'cancel'}
              onClick={handleCancelChallenge}
              text="Cancel challenge"
            />
            <Button
              color={ButtonColor.secondary}
              disabled={activeAction !== null}
              onClick={handleReturnHome}
              text="Back to lobby"
            />
          </S.Actions>
        );
      }

      if (isOpponent) {
        return (
          <S.Actions>
            <Button
              color={ButtonColor.secondary}
              disabled={activeAction !== null}
              isSubmitting={activeAction === 'decline'}
              onClick={handleDeclineChallenge}
              text="Decline"
            />
            <Button
              disabled={activeAction !== null}
              isSubmitting={activeAction === 'accept'}
              onClick={handleAcceptChallenge}
              text="Accept"
            />
          </S.Actions>
        );
      }
    }

    return (
      <S.Actions>
        <Button onClick={handleReturnHome} text="Back to lobby" />
      </S.Actions>
    );
  };

  const renderContent = () => {
    if (!challenge) return null;

    const expiresLabel = shortDate(challenge.expires_at, true);
    const isPending = challenge.status === ConnectFiveChallengeStatus.PENDING;
    const statusTitle = (() => {
      if (challenge.status === ConnectFiveChallengeStatus.PENDING) {
        if (isOpponent) return `Challenge from ${challengerName}`;
        return `Waiting on ${opponentName}`;
      }

      if (challenge.status === ConnectFiveChallengeStatus.ACCEPTED) return 'Challenge accepted';
      if (challenge.status === ConnectFiveChallengeStatus.CANCELLED) return 'Challenge cancelled';
      if (challenge.status === ConnectFiveChallengeStatus.DECLINED) return 'Challenge declined';
      if (challenge.status === ConnectFiveChallengeStatus.EXPIRED) return 'Challenge expired';

      return 'Challenge update';
    })();
    const statusText: ReactNode = (() => {
      if (challenge.status === ConnectFiveChallengeStatus.PENDING) {
        if (isOpponent) {
          return (
            <>
              Accept the challenge from{' '}
              <MatchStyles.PendingChallengerName>{challengerName}</MatchStyles.PendingChallengerName> to start a match.
            </>
          );
        }
        return (
          <>
            We&apos;ll take you to the match as soon as{' '}
            <MatchStyles.PendingChallengerName>{opponentName}</MatchStyles.PendingChallengerName> accepts.
          </>
        );
      }

      if (challenge.status === ConnectFiveChallengeStatus.ACCEPTED) {
        return 'Match is starting. Hold tight!';
      }

      if (challenge.status === ConnectFiveChallengeStatus.CANCELLED) {
        if (isChallenger) return 'You cancelled this challenge.';
        return `${challengerName} cancelled this challenge.`;
      }

      if (challenge.status === ConnectFiveChallengeStatus.DECLINED) {
        if (isOpponent) return 'You declined this challenge.';
        return `${opponentName} declined this challenge.`;
      }

      if (challenge.status === ConnectFiveChallengeStatus.EXPIRED) {
        return 'This challenge expired before it was accepted.';
      }

      return 'This challenge is no longer active.';
    })();

    return (
      <S.Content>
        <MatchStyles.PendingState $variant={pendingVariant}>
          <MatchStyles.PendingContent>
            <MatchStyles.PendingIcon $variant={pendingVariant}>
              <MatchStyles.PendingIconInner $variant={pendingVariant} />
            </MatchStyles.PendingIcon>
            <div>
              <MatchStyles.PendingTitle $variant={pendingVariant}>{statusTitle}</MatchStyles.PendingTitle>
              <MatchStyles.PendingText>{statusText}</MatchStyles.PendingText>
              <MatchStyles.PendingShimmer $variant={pendingVariant} />
              {isPending && (
                <MatchStyles.PendingDots>
                  <MatchStyles.PendingDot $delay={0} $variant={pendingVariant} />
                  <MatchStyles.PendingDot $delay={0.2} $variant={pendingVariant} />
                  <MatchStyles.PendingDot $delay={0.4} $variant={pendingVariant} />
                </MatchStyles.PendingDots>
              )}
            </div>
          </MatchStyles.PendingContent>
        </MatchStyles.PendingState>
        <MatchStyles.MatchInfo>
          <MatchStyles.PanelHeader>
            <MatchStyles.PanelTitle>Challenge details</MatchStyles.PanelTitle>
          </MatchStyles.PanelHeader>
          <MatchStyles.InfoRow>
            <MatchStyles.InfoLabel>Status</MatchStyles.InfoLabel>
            {statusBadge && <Badge badgeStyle={statusBadge.badgeStyle}>{statusBadge.label}</Badge>}
          </MatchStyles.InfoRow>
          <MatchStyles.InfoRow>
            <MatchStyles.InfoLabel>Stake</MatchStyles.InfoLabel>
            <MatchStyles.InfoValue>{challenge.stake_amount.toLocaleString()} TNB</MatchStyles.InfoValue>
          </MatchStyles.InfoRow>
          <MatchStyles.InfoRow>
            <MatchStyles.InfoLabel>Max spend</MatchStyles.InfoLabel>
            <MatchStyles.InfoValue>{challenge.max_spend_amount.toLocaleString()} TNB</MatchStyles.InfoValue>
          </MatchStyles.InfoRow>
          <MatchStyles.InfoRow>
            <MatchStyles.InfoLabel>Time limit</MatchStyles.InfoLabel>
            <MatchStyles.InfoValue>{Math.round(challenge.time_limit_seconds / 60)} min</MatchStyles.InfoValue>
          </MatchStyles.InfoRow>
          <MatchStyles.InfoRow>
            <MatchStyles.InfoLabel>Expires</MatchStyles.InfoLabel>
            <MatchStyles.InfoValue>{expiresLabel}</MatchStyles.InfoValue>
          </MatchStyles.InfoRow>
        </MatchStyles.MatchInfo>
        {renderActions()}
      </S.Content>
    );
  };

  if (isLoading) {
    return (
      <MatchStyles.Container className={className}>
        <MatchStyles.LoadingContainer>
          <Loader />
        </MatchStyles.LoadingContainer>
      </MatchStyles.Container>
    );
  }

  if (!challenge) {
    return (
      <MatchStyles.Container className={className}>
        <EmptyText>Challenge not found.</EmptyText>
        <S.Actions>
          <Button onClick={handleReturnHome} text="Back to lobby" />
        </S.Actions>
      </MatchStyles.Container>
    );
  }

  return <MatchStyles.Container className={className}>{renderContent()}</MatchStyles.Container>;
};

export default ConnectFiveChallenge;
