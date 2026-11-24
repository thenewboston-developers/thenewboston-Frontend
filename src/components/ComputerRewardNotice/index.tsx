import {PATH_AUTHENTICATION, PATH_GAMES} from 'constants/paths';
import useAnalyticsExposure from 'hooks/useAnalyticsExposure';
import {ComputerReward} from 'types/gameFund';
import {getAuthenticationPath} from 'utils/authentication';
import {captureGameRewardOffer, captureGameSignupClick} from 'utils/gameAnalytics';

import RewardArtwork from './RewardArtwork';
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
        <S.GuestContent>
          <S.Eyebrow>YOUR NEXT WIN COULD PAY OFF</S.Eyebrow>
          <S.RewardAmount>
            {reward.amount.toLocaleString()} <span>TNB</span>
          </S.RewardAmount>
          <S.GuestTitle>Great win. Imagine that in your wallet.</S.GuestTitle>
          <S.GuestDescription>
            With an account, this win would have earned you {reward.amount.toLocaleString()} coins. Make your next
            victory count with rewards on eligible computer wins while the community fund has coins.
          </S.GuestDescription>
          <S.CreateAccount
            onClick={() => captureGameSignupClick('guest_reward')}
            to={getAuthenticationPath(PATH_AUTHENTICATION.CREATE_ACCOUNT, PATH_GAMES)}
          >
            Create a free account <span aria-hidden="true">→</span>
          </S.CreateAccount>
          <S.FinePrint>This was a guest game. No coins were earned or reserved.</S.FinePrint>
        </S.GuestContent>
        <S.Artwork>
          <RewardArtwork />
          <S.ArtworkCaption>PLAY. WIN. EARN.</S.ArtworkCaption>
        </S.Artwork>
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
