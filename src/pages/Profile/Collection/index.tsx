import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {getWallets} from 'api/wallets';
import Avatar from 'components/Avatar';
import EmptyText from 'components/EmptyText';
import {SFC, Wallet} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const Collection: SFC = ({className}) => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const userId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    (async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const response = await getWallets({user: userId, has_balance: true});
        setWallets(response);
      } catch (error) {
        displayErrorToast('Error fetching user wallets');
        setWallets([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  const renderContent = () => {
    if (loading) {
      return <S.LoadingText>Loading collection...</S.LoadingText>;
    }

    if (wallets.length === 0) {
      return <EmptyText>No coins in collection</EmptyText>;
    }

    return (
      <S.WalletsGrid>
        {wallets.map((wallet) => (
          <S.WalletCard key={wallet.id} onClick={() => navigate(`/currencies/${wallet.currency.id}`)}>
            <S.CoinInfo>
              <Avatar size="40px" src={wallet.currency.logo} />
              <S.CoinDetails>
                <S.CoinName>{wallet.currency.ticker}</S.CoinName>
                <S.CoinAmount>{wallet.balance.toLocaleString()}</S.CoinAmount>
              </S.CoinDetails>
            </S.CoinInfo>
          </S.WalletCard>
        ))}
      </S.WalletsGrid>
    );
  };

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default Collection;
