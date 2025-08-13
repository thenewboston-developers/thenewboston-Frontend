import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import {ModalBody} from 'components/Modal';
import {getWallets as _getWallets} from 'dispatchers/wallets';
import {ToastType} from 'enums';
import {getManager, getWallets, getWalletsPagination} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC, Wallet} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';

import * as S from './Styles';
import WalletCard from './WalletCard';

export interface WalletSelectModalProps {
  close(): void;
}

const WalletSelectModal: SFC<WalletSelectModalProps> = ({className, close}) => {
  const [animationType, setAnimationType] = useState<'select' | 'deselect' | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const pagination = useSelector(getWalletsPagination);
  const wallets = useSelector(getWallets);
  const walletList = useMemo(() => orderBy(Object.values(wallets), [(wallet) => wallet.currency.ticker]), [wallets]);

  const pageSize = 12;
  const totalPages = useMemo(() => Math.ceil(pagination.count / pageSize), [pagination.count]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        await dispatch(_getWallets(currentPage, pageSize));
      } catch (error) {
        displayErrorToast('Error fetching wallets');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [currentPage, dispatch]);

  const handleAnimationComplete = () => {
    if (animationType === 'select') {
      setTimeout(() => {
        close();
      }, 500);
    } else if (animationType === 'deselect') {
      setTimeout(() => {
        close();
      }, 300);
    }
    setAnimationType(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleWalletClick = (wallet: Wallet) => {
    const isCurrentlySelected = manager.activeWalletId === wallet.id;

    if (isCurrentlySelected) {
      setAnimationType('deselect');
      dispatch(updateManager({activeWalletId: null}));
      displayToast(`${wallet.currency.ticker} wallet deselected`, ToastType.SUCCESS);
    } else {
      setAnimationType('select');
      dispatch(updateManager({activeWalletId: wallet.id}));
      displayToast(`${wallet.currency.ticker} wallet selected`, ToastType.SUCCESS);
    }
  };

  const renderContent = () => {
    if (isLoading) return <Loader />;
    if (!walletList.length) return <EmptyText>No wallets available</EmptyText>;

    return (
      <>
        <S.WalletCardContainer>
          {walletList.map((wallet) => (
            <WalletCard
              isSelected={manager.activeWalletId === wallet.id}
              key={wallet.id}
              onAnimationComplete={handleAnimationComplete}
              onClick={() => handleWalletClick(wallet)}
              wallet={wallet}
            />
          ))}
        </S.WalletCardContainer>
        {totalPages > 1 && (
          <S.Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
        )}
      </>
    );
  };

  return (
    <S.Modal className={className} close={close} header="Select Wallet">
      <ModalBody>{renderContent()}</ModalBody>
    </S.Modal>
  );
};

export default WalletSelectModal;
