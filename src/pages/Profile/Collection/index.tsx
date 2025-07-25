import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {getUserWallets} from 'api/userWallets';
import EmptyText from 'components/EmptyText';
import {SFC, UserWallet} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';
import WalletCard from './WalletCard';

const Collection: SFC = ({className}) => {
  const [loading, setLoading] = useState(true);
  const [wallets, setWallets] = useState<UserWallet[]>([]);
  const {id} = useParams();
  const userId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    (async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const response = await getUserWallets(userId);
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
          <WalletCard key={wallet.id} wallet={wallet} />
        ))}
      </S.WalletsGrid>
    );
  };

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default Collection;
