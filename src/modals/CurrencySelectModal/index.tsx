import {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getWallets} from 'api/wallets';
import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import {ModalBody} from 'components/Modal';
import {ToastType} from 'enums';
import {getManager} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC, Wallet} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';

import WalletCard from '../WalletSelectModal/WalletCard';

import * as S from './Styles';

export interface CurrencySelectModalProps {
  close(): void;
}

const CurrencySelectModal: SFC<CurrencySelectModalProps> = ({className, close}) => {
  const [animationCurrencyId, setAnimationCurrencyId] = useState<number | null>(null);
  const [animationType, setAnimationType] = useState<'deselect' | 'select' | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageWallets, setCurrentPageWallets] = useState<Wallet[]>([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [contentContainerHeight, setContentContainerHeight] = useState<number | null>(null);
  const closeModalTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentRequestIdRef = useRef(0);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const pageSize = 12;
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
    const requestId = currentRequestIdRef.current + 1;
    currentRequestIdRef.current = requestId;
    let isCancelled = false;

    (async () => {
      setIsLoading(true);
      try {
        const response = await getWallets({
          page: currentPage,
          page_size: pageSize,
          search: debouncedSearchTerm || undefined,
        });

        if (isCancelled || currentRequestIdRef.current !== requestId) {
          return;
        }

        setCurrentPageWallets(response.results);
        setTotalCount(response.count);
      } catch (error) {
        if (isCancelled || currentRequestIdRef.current !== requestId) {
          return;
        }

        setCurrentPageWallets([]);
        setTotalCount(0);
        displayErrorToast('Error fetching wallets');
      } finally {
        if (!isCancelled && currentRequestIdRef.current === requestId) {
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

  const handleCurrencyWalletCardAnimationComplete = () => {
    if (!animationType) {
      return;
    }

    if (closeModalTimeoutRef.current) {
      clearTimeout(closeModalTimeoutRef.current);
    }

    const closeDelayInMilliseconds = animationType === 'select' ? 500 : 300;
    closeModalTimeoutRef.current = setTimeout(() => {
      closeModalTimeoutRef.current = null;
      setAnimationCurrencyId(null);
      setAnimationType(null);
      close();
    }, closeDelayInMilliseconds);
  };

  const handleCurrencyWalletClick = (wallet: Wallet) => {
    const isCurrentlySelected = manager.activeCommentCurrency?.id === wallet.currency.id;

    if (isCurrentlySelected) {
      setAnimationCurrencyId(wallet.currency.id);
      setAnimationType('deselect');
      dispatch(updateManager({activeCommentCurrency: null}));
      displayToast(`${wallet.currency.ticker} deselected`, ToastType.SUCCESS);
      return;
    }

    setAnimationCurrencyId(wallet.currency.id);
    setAnimationType('select');
    dispatch(updateManager({activeCommentCurrency: wallet.currency}));
    displayToast(`${wallet.currency.ticker} selected`, ToastType.SUCCESS);
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
      return <EmptyText>{hasSearchTerm ? 'No currencies found' : 'No wallets available'}</EmptyText>;
    }

    return (
      <S.ContentContainer ref={contentContainerRef}>
        <S.WalletCardContainer>
          {currentPageWallets.map((wallet) => (
            <WalletCard
              isSelected={manager.activeCommentCurrency?.id === wallet.currency.id}
              key={wallet.id}
              onAnimationComplete={
                wallet.currency.id === animationCurrencyId ? handleCurrencyWalletCardAnimationComplete : undefined
              }
              onClick={() => handleCurrencyWalletClick(wallet)}
              wallet={wallet}
            />
          ))}
        </S.WalletCardContainer>
        {totalPages > 1 ? (
          <S.Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
        ) : null}
      </S.ContentContainer>
    );
  };

  return (
    <S.Modal className={className} close={close} header="Select a Currency">
      <ModalBody>
        <S.SearchInput onChange={handleSearchInputChange} placeholder="Search currencies..." value={searchTerm} />
        {renderContent()}
      </ModalBody>
    </S.Modal>
  );
};

export default CurrencySelectModal;
