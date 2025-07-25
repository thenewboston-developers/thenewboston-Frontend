import {useNavigate} from 'react-router-dom';

import rank1Image from 'assets/badges/rank1.png';
import rank2Image from 'assets/badges/rank2.png';
import rank3Image from 'assets/badges/rank3.png';
import Badge, {BadgeStyle} from 'components/Badge';
import {SFC, UserWallet} from 'types';

import * as S from './Styles';

export interface WalletCardProps {
  wallet: UserWallet;
}

const WalletCard: SFC<WalletCardProps> = ({className, wallet}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/currencies/${wallet.currency.id}`);
  };

  return (
    <S.Container className={className} onClick={handleCardClick}>
      <S.CoinInfo>
        <S.Avatar size="64px" src={wallet.currency.logo} />
        <S.CoinDetails>
          <S.CoinName>{wallet.currency.ticker}</S.CoinName>
          <S.CoinAmount>{wallet.balance.toLocaleString()}</S.CoinAmount>
        </S.CoinDetails>
      </S.CoinInfo>
      <S.Line />
      <S.BottomRow>
        <S.RankContainer>
          {wallet.rank === 1 && <S.RankBadge alt="Rank 1" src={rank1Image} />}
          {wallet.rank === 2 && <S.RankBadge alt="Rank 2" src={rank2Image} />}
          {wallet.rank === 3 && <S.RankBadge alt="Rank 3" src={rank3Image} />}
          <S.Rank>
            {wallet.rank <= 3
              ? `of ${wallet.total_users.toLocaleString()}`
              : `#${wallet.rank} of ${wallet.total_users.toLocaleString()}`}
          </S.Rank>
        </S.RankContainer>
        {wallet.is_owner && <Badge badgeStyle={BadgeStyle.primary}>Owner</Badge>}
      </S.BottomRow>
    </S.Container>
  );
};

export default WalletCard;
