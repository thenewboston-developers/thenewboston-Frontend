import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getWallets} from 'api/wallets';
import Button from 'components/Button';
import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import {ModalBody, ModalFooter} from 'components/Modal';
import {ToastType} from 'enums';
import {getManager} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC, Wallet} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';

import * as S from './Styles';
import WalletCard from './WalletCard';

export interface WalletSelectModalProps {
  close(): void;
}

const WalletSelectModal: SFC<WalletSelectModalProps> = ({className, close}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageWallets, setCurrentPageWallets] = useState<Wallet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);

  const pageSize = 12;
  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    if (manager.activeWallet) {
      setSelectedWallet(manager.activeWallet);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await getWallets({page: currentPage, page_size: pageSize});
        setCurrentPageWallets(response.results);
        setTotalCount(response.count);
      } catch (error) {
        displayErrorToast('Error fetching wallets');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleButtonClick = async () => {
    if (!selectedWallet) return;

    setSubmitting(true);
    try {
      dispatch(updateManager({activeWallet: selectedWallet}));
      displayToast(`${selectedWallet.currency.ticker} wallet selected`, ToastType.SUCCESS);
      close();
    } catch (error) {
      displayErrorToast('Error selecting wallet');
    } finally {
      setSubmitting(false);
    }
  };

  const handleWalletClick = (wallet: Wallet) => {
    setSelectedWallet(wallet.id === selectedWallet?.id ? null : wallet);
  };

  const renderContent = () => {
    if (isLoading) return <Loader />;
    if (!currentPageWallets.length) return <EmptyText>No wallets available</EmptyText>;

    return (
      <>
        <S.WalletCardContainer>
          {currentPageWallets.map((wallet) => (
            <WalletCard
              isSelected={selectedWallet?.id === wallet.id}
              key={wallet.id}
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
      <ModalFooter>
        <Button
          disabled={selectedWallet === null || submitting}
          isSubmitting={submitting}
          onClick={handleButtonClick}
          text="Submit"
        />
      </ModalFooter>
    </S.Modal>
  );
};

export default WalletSelectModal;
