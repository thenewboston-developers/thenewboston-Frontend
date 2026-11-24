import {useEffect, useRef, useState} from 'react';
import {mdiArrowRight, mdiGamepadVariantOutline, mdiTrophyOutline, mdiWalletOutline} from '@mdi/js';
import Icon from '@mdi/react';

import {getGameFund} from 'api/gameFund';
import {useIsAuthenticated} from 'hooks';
import useAnalyticsExposure from 'hooks/useAnalyticsExposure';
import {GameFund as GameFundData} from 'types/gameFund';
import {captureGameRewardOffer} from 'utils/gameAnalytics';

import ContributionModal from './ContributionModal';
import RewardIllustration from './RewardIllustration';
import * as S from './Styles';

const GameFund = () => {
  const [contributionIsOpen, setContributionIsOpen] = useState(false);
  const [fund, setFund] = useState<GameFundData | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [success, setSuccess] = useState('');
  const isAuthenticated = useIsAuthenticated();
  const fundExposure = useAnalyticsExposure<HTMLParagraphElement>(fund ? `game_fund:${isAuthenticated}` : null, () =>
    captureGameRewardOffer(
      {
        auth_state: isAuthenticated ? 'authenticated' : 'guest',
        reward_amount: fund?.reward_amount ?? 0,
        rewards_available: !!fund?.available && !loadError,
      },
      'game_fund',
    ),
  );
  const latestRead = useRef(0);
  const rewardsAvailable = !!fund?.available && !loadError;

  useEffect(() => {
    const controller = new AbortController();
    let polling = true;
    let timer: ReturnType<typeof setTimeout>;
    const load = async () => {
      latestRead.current += 1;
      const sequence = latestRead.current;
      try {
        const data = await getGameFund(controller.signal);
        if (polling && sequence === latestRead.current) {
          setFund(data);
          setLoadError(false);
        }
      } catch {
        if (polling && sequence === latestRead.current) setLoadError(true);
      } finally {
        if (polling) timer = setTimeout(load, 30000);
      }
    };
    load();
    return () => {
      polling = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, [retryKey]);

  const handleContributionSuccess = (updatedFund: GameFundData, message: string) => {
    latestRead.current += 1;
    setFund(updatedFund);
    setLoadError(false);
    setSuccess(message);
  };

  let availability = 'Checking rewards…';
  if (loadError) availability = 'Reward status unavailable';
  else if (fund) {
    if (!fund.enabled) availability = 'Rewards paused';
    else availability = fund.available ? 'Rewards available' : 'More rewards on the way';
  }

  return (
    <S.Card aria-labelledby="game-fund-title">
      <S.Hero>
        <S.Overview>
          <S.Eyebrow>YOUR NEXT WIN IS WORTH MORE</S.Eyebrow>
          <S.Heading id="game-fund-title">
            Play for fun.
            <br />
            <span>Win real coins.</span>
          </S.Heading>
          <S.HeroDescription ref={fundExposure}>
            Beat the computer. Earn TNB. Get coins straight to your wallet when you play signed in and rewards are
            available.
          </S.HeroDescription>
          <S.PlayLink href="#featured-game-heading">
            Choose a game <Icon aria-hidden="true" path={mdiArrowRight} size="19px" />
          </S.PlayLink>
          <S.PlayNote>Free to play. A little skill goes a long way.</S.PlayNote>
        </S.Overview>
        <S.RewardShowcase aria-label="Win games to earn TNB coins">
          <S.Status $available={rewardsAvailable} role="status">
            <S.StatusDot aria-hidden="true" $available={rewardsAvailable} />
            {availability}
          </S.Status>
          <RewardIllustration />
          <S.RewardAmount>
            <strong>{fund ? `+${fund.reward_amount.toLocaleString()}` : '—'}</strong>
            <S.RewardUnit>
              TNB<span>per funded win</span>
            </S.RewardUnit>
          </S.RewardAmount>
          <S.Flow aria-label="Play, win, earn coins">
            <S.FlowStep>
              <Icon aria-hidden="true" path={mdiGamepadVariantOutline} size="20px" />
              Play
            </S.FlowStep>
            <Icon aria-hidden="true" path={mdiArrowRight} size="16px" />
            <S.FlowStep>
              <Icon aria-hidden="true" path={mdiTrophyOutline} size="20px" />
              Win
            </S.FlowStep>
            <Icon aria-hidden="true" path={mdiArrowRight} size="16px" />
            <S.FlowStep>
              <Icon aria-hidden="true" path={mdiWalletOutline} size="20px" />
              Earn coins
            </S.FlowStep>
          </S.Flow>
        </S.RewardShowcase>
      </S.Hero>
      <S.Pool aria-label="Game reward pool">
        {fund ? (
          <S.Stats>
            <S.Stat>
              <dt>{loadError ? 'Last known reward pool' : 'In the reward pool'}</dt>
              <dd>
                {fund.balance.toLocaleString()} <span>TNB</span>
              </dd>
            </S.Stat>
            <S.Stat>
              <dt>Rewards funded</dt>
              <dd>
                {fund.wins_remaining.toLocaleString()} <span>wins</span>
              </dd>
            </S.Stat>
            <S.Stat>
              <dt>Paid to players</dt>
              <dd>
                {fund.total_paid.toLocaleString()} <span>TNB</span>
              </dd>
            </S.Stat>
          </S.Stats>
        ) : (
          <S.PoolMessage role="status">
            {loadError ? 'The fund balance is temporarily unavailable.' : 'Loading the reward pool…'}
          </S.PoolMessage>
        )}
        {loadError && (
          <S.RefreshButton onClick={() => setRetryKey((value) => value + 1)} type="button">
            Refresh fund balance
          </S.RefreshButton>
        )}
      </S.Pool>
      <S.Footer>
        <S.RewardDetails>
          <summary>How rewards work</summary>
          <S.DetailsText>
            Sign in before starting a computer match to qualify.{' '}
            {fund ? `Win to earn ${fund.reward_amount.toLocaleString()} TNB when rewards are available. ` : ''}
            Rewards are paid when a qualifying match ends; coins are not reserved when you start. If{' '}
            {fund
              ? `fewer than ${fund.reward_amount.toLocaleString()} TNB are available`
              : 'the reward pool cannot cover your win'}{' '}
            or rewards are paused, free play continues without a reward. Guest wins do not earn coins, and later
            contributions or account creation do not pay for earlier wins.
          </S.DetailsText>
        </S.RewardDetails>
        <S.ContributeLink
          aria-haspopup="dialog"
          onClick={() => {
            setSuccess('');
            setContributionIsOpen(true);
          }}
          type="button"
        >
          Contribute to the reward pool <span aria-hidden="true">↗</span>
        </S.ContributeLink>
      </S.Footer>
      {success && <S.Success role="status">{success}</S.Success>}
      {contributionIsOpen && (
        <ContributionModal
          close={() => setContributionIsOpen(false)}
          onSuccess={handleContributionSuccess}
          rewardAmount={fund?.reward_amount ?? 10}
        />
      )}
    </S.Card>
  );
};

export default GameFund;
