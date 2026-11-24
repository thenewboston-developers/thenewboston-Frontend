import {PATH_AUTHENTICATION, PATH_GAMES} from 'constants/paths';
import useAnalyticsExposure from 'hooks/useAnalyticsExposure';
import {ComputerReward} from 'types/gameFund';
import {getAuthenticationPath} from 'utils/authentication';
import {captureGameRewardOffer, captureGameSignupClick} from 'utils/gameAnalytics';

import PaidRewardArtwork from './PaidRewardArtwork';
import RewardArtwork from './RewardArtwork';
import * as S from './Styles';

const ComputerRewardNotice = ({
  guest,
  reward,
  subdued = false,
}: {
  guest?: boolean;
  reward?: ComputerReward | null;
  subdued?: boolean;
}) => {
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
        <S.GuestLayout>
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
        </S.GuestLayout>
      </S.Notice>
    );
  if (reward.status === 'paid')
    return (
      <S.Notice $paid role="status">
        <S.PaidLayout>
          <S.PaidContent>
            <S.PaymentBadge>
              <svg aria-hidden="true" fill="none" focusable="false" viewBox="0 0 16 16">
                <circle cx="8" cy="8" fill="currentColor" r="8" />
                <path
                  d="m4.5 8 2.2 2.2 4.8-4.7"
                  stroke="#fffdf1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.6"
                />
              </svg>
              Payment confirmed
            </S.PaymentBadge>
            <S.PaidAmount>
              +{reward.amount.toLocaleString()} <S.PaidCurrency>TNB</S.PaidCurrency>
              <S.PaidRewardLabel> game reward</S.PaidRewardLabel>
            </S.PaidAmount>
            <S.PaidTitle>That win just paid off.</S.PaidTitle>
            <S.PaidDescription>Paid to your wallet from the community game fund.</S.PaidDescription>
          </S.PaidContent>
          <S.PaidArtwork>
            <PaidRewardArtwork />
          </S.PaidArtwork>
        </S.PaidLayout>
      </S.Notice>
    );
  if (reward.status === 'fund_empty')
    return (
      <S.Notice $subdued={subdued} role="status">
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
    <S.Notice $subdued={subdued} role="status">
      {subdued && <S.RewardLabel>No reward this round</S.RewardLabel>}
      <span>This result did not qualify for a computer-win reward.</span>
    </S.Notice>
  );
};

export default ComputerRewardNotice;
