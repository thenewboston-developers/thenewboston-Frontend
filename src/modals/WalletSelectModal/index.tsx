import {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getWallets} from 'api/wallets';
import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import {ModalBody} from 'components/Modal';
import {ToastType, WalletTab} from 'enums';
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
  const [animationType, setAnimationType] = useState<'deselect' | 'select' | null>(null);
  const [animationWalletId, setAnimationWalletId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageWallets, setCurrentPageWallets] = useState<Wallet[]>([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [contentContainerHeight, setContentContainerHeight] = useState<number | null>(null);
  const closeModalTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const pageSize = 12;
  const requestIdRef = useRef(0);
  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 300);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    let isCancelled = false;

    (async () => {
      setIsLoading(true);
      try {
        const response = await getWallets({
          page: currentPage,
          page_size: pageSize,
          search: debouncedSearchTerm || undefined,
        });

        if (isCancelled || requestIdRef.current !== requestId) {
          return;
        }

        setCurrentPageWallets(response.results);
        setTotalCount(response.count);
      } catch (error) {
        if (isCancelled || requestIdRef.current !== requestId) {
          return;
        }

        setCurrentPageWallets([]);
        setTotalCount(0);
        displayErrorToast('Error fetching wallets');
      } finally {
        if (!isCancelled && requestIdRef.current === requestId) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [currentPage, debouncedSearchTerm, pageSize]);

  useEffect(() => {
    return () => {
      if (closeModalTimeoutRef.current) {
        clearTimeout(closeModalTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const contentContainerElement = contentContainerRef.current;
    if (!contentContainerElement) {
      return;
    }

    const handleContentContainerResize = () => {
      setContentContainerHeight(contentContainerElement.getBoundingClientRect().height);
    };

    handleContentContainerResize();
    window.addEventListener('resize', handleContentContainerResize);

    return () => {
      window.removeEventListener('resize', handleContentContainerResize);
    };
  }, [currentPageWallets, totalPages]);

  const handleSelectedWalletCardAnimationComplete = () => {
    if (!animationType) {
      return;
    }

    if (closeModalTimeoutRef.current) {
      clearTimeout(closeModalTimeoutRef.current);
    }

    const closeDelayInMilliseconds = animationType === 'select' ? 500 : 300;
    closeModalTimeoutRef.current = setTimeout(() => {
      closeModalTimeoutRef.current = null;
      setAnimationType(null);
      setAnimationWalletId(null);
      close();
    }, closeDelayInMilliseconds);
  };

  const handleWalletCardClick = (wallet: Wallet) => {
    const isCurrentlySelected = manager.activeWallet?.id === wallet.id;

    if (isCurrentlySelected) {
      setAnimationType('deselect');
      setAnimationWalletId(wallet.id);
      dispatch(updateManager({activeWallet: null, activeWalletTab: null}));
      displayToast(`${wallet.currency.ticker} wallet deselected`, ToastType.SUCCESS);
      return;
    }

    setAnimationType('select');
    setAnimationWalletId(wallet.id);
    dispatch(updateManager({activeWallet: wallet, activeWalletTab: WalletTab.TRANSFERS}));
    displayToast(`${wallet.currency.ticker} wallet selected`, ToastType.SUCCESS);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(target.value);
  };

  const renderContent = () => {
    const hasSearchTerm = debouncedSearchTerm !== '';

    if (isLoading) {
      if (contentContainerHeight === null) {
        return <Loader />;
      }

      return (
        <S.LoaderContainer $height={contentContainerHeight}>
          <Loader />
        </S.LoaderContainer>
      );
    }
    if (!currentPageWallets.length) {
      return <EmptyText>{hasSearchTerm ? 'No wallets found' : 'No wallets available'}</EmptyText>;
    }

    return (
      <S.ContentContainer ref={contentContainerRef}>
        <S.WalletCardContainer>
          {currentPageWallets.map((wallet) => (
            <WalletCard
              isSelected={manager.activeWallet?.id === wallet.id}
              key={wallet.id}
              onAnimationComplete={
                wallet.id === animationWalletId ? handleSelectedWalletCardAnimationComplete : undefined
              }
              onClick={() => handleWalletCardClick(wallet)}
              wallet={wallet}
            />
          ))}
        </S.WalletCardContainer>
        {totalPages > 1 && (
          <S.Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
        )}
      </S.ContentContainer>
    );
  };

  return (
    <S.Modal className={className} close={close} header="Select a Wallet">
      <ModalBody>
        <S.SearchInput onChange={handleSearchInputChange} placeholder="Search wallets..." value={searchTerm} />
        {renderContent()}
      </ModalBody>
    </S.Modal>
  );
};

export default WalletSelectModal;
