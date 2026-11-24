import {PATH_AUTHENTICATION, PATH_GAMES} from 'constants/paths';
import useAnalyticsExposure from 'hooks/useAnalyticsExposure';
import {ComputerReward} from 'types/gameFund';
import {getAuthenticationPath} from 'utils/authentication';
import {captureGameRewardOffer, captureGameSignupClick} from 'utils/gameAnalytics';

import * as S from './Styles';

const ComputerRewardNotice = ({guest, reward}: {guest?: boolean; reward?: ComputerReward | null}) => {
  const exposure = useAnalyticsExposure<HTMLDivElement>(
    reward?.status === 'guest' ? `guest_reward:${window.location.pathname}` : null,
    () =>
      captureGameRewardOffer(
        {auth_state: 'guest', reward_amount: reward?.amount ?? 0, reward_status: 'guest'},
        'guest_reward',
      ),
  );
  if (!reward) return null;
  if (reward.status === 'guest')
    return (
      <S.Notice $guest ref={exposure} role="status">
        <S.RewardAmount>{reward.amount.toLocaleString()} TNB</S.RewardAmount>
        <strong>Great win. Imagine that in your wallet.</strong>
        <span>
          With an account, this win would have earned you {reward.amount.toLocaleString()} coins. Create your free
          account to earn rewards on future eligible wins while the community fund has coins.
        </span>
        <S.CreateAccount
          onClick={() => captureGameSignupClick('guest_reward')}
          to={getAuthenticationPath(PATH_AUTHENTICATION.CREATE_ACCOUNT, PATH_GAMES)}
        >
          Create a free account
        </S.CreateAccount>
        <S.FinePrint>This was a guest game. No coins were earned or reserved.</S.FinePrint>
      </S.Notice>
    );
  if (reward.status === 'paid')
    return (
      <S.Notice $paid role="status">
        <strong>+{reward.amount.toLocaleString()} TNB game reward</strong>
        <span>Paid to your wallet from the community game fund.</span>
      </S.Notice>
    );
  if (reward.status === 'fund_empty')
    return (
      <S.Notice role="status">
        <strong>No reward was available when this match ended.</strong>
        <span>Computer games remain free. Future wins can earn rewards when the fund is replenished.</span>
        {guest && (
          <S.CreateAccount
            onClick={() => captureGameSignupClick('game_match')}
            to={getAuthenticationPath(PATH_AUTHENTICATION.CREATE_ACCOUNT, PATH_GAMES)}
          >
            Create an account for future rewards
          </S.CreateAccount>
        )}
      </S.Notice>
    );
  return (
    <S.Notice role="status">
      <span>This result did not qualify for a computer-win reward.</span>
    </S.Notice>
  );
};

export default ComputerRewardNotice;
