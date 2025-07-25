import {useNavigate} from 'react-router-dom';

import rank1Image from 'assets/badges/rank1.png';
import rank2Image from 'assets/badges/rank2.png';
import rank3Image from 'assets/badges/rank3.png';
import Badge, {BadgeStyle} from 'components/Badge';
import {SFC, UserWallet} from 'types';

import * as S from './Styles';

export interface WalletCardProps {
  userWallet: UserWallet;
}

const WalletCard: SFC<WalletCardProps> = ({className, userWallet}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/currencies/${userWallet.currency.id}`);
  };

  return (
    <S.Container className={className} onClick={handleCardClick}>
      <S.CoinInfo>
        <S.Avatar size="64px" src={userWallet.currency.logo} />
        <S.CoinDetails>
          <S.CoinName>{userWallet.currency.ticker}</S.CoinName>
          <S.CoinAmount>{userWallet.balance.toLocaleString()}</S.CoinAmount>
        </S.CoinDetails>
      </S.CoinInfo>
      <S.Line />
      <S.BottomRow>
        <S.RankContainer>
          {userWallet.rank === 1 && <S.RankBadge alt="Rank 1" src={rank1Image} />}
          {userWallet.rank === 2 && <S.RankBadge alt="Rank 2" src={rank2Image} />}
          {userWallet.rank === 3 && <S.RankBadge alt="Rank 3" src={rank3Image} />}
          <S.Rank>
            {userWallet.rank <= 3
              ? `of ${userWallet.total_users.toLocaleString()}`
              : `#${userWallet.rank} of ${userWallet.total_users.toLocaleString()}`}
          </S.Rank>
        </S.RankContainer>
        {userWallet.is_owner && <Badge badgeStyle={BadgeStyle.primary}>Owner</Badge>}
      </S.BottomRow>
    </S.Container>
  );
};

export default WalletCard;
