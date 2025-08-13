import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {getTransfers} from 'api/transfers';
import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import Loader from 'components/Loader';
import UserLabel from 'components/UserLabel';
import {getManager} from 'selectors/state';
import {SFC, Transfer} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const ITEMS_PER_PAGE = 20;

const WalletTransfers: SFC = ({className}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [previousPage, setPreviousPage] = useState(1);
  const [previousWalletId, setPreviousWalletId] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const manager = useSelector(getManager);
  const {activeWallet} = manager;

  useEffect(() => {
    if (!activeWallet) return;

    // Prevent duplicate API calls when navigating back to wallets page
    // This check ensures we don't fetch if neither wallet nor page has changed
    if (previousWalletId === activeWallet.id && previousPage === currentPage) return;

    const walletChanged = previousWalletId !== null && previousWalletId !== activeWallet.id;

    if (walletChanged) {
      setCurrentPage(1);
    }

    setPreviousWalletId(activeWallet.id);
    setPreviousPage(currentPage);

    (async () => {
      setIsLoading(true);
      try {
        const url =
          currentPage === 1
            ? null
            : `${process.env.REACT_APP_API_URL}/api/transfers?currency=${activeWallet.currency.id}&page=${currentPage}`;

        const response = await getTransfers(activeWallet.currency.id, url);
        setTransfers(response.results);
        setTotalCount(response.count);
      } catch (error) {
        displayErrorToast('Error fetching transfers');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [activeWallet, currentPage, previousWalletId, previousPage]);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({behavior: 'smooth', top: 0});
  };

  const renderTransfer = (transfer: Transfer) => {
    const isReceived = transfer.amount > 0;
    const action = isReceived ? 'sent coins to you' : 'received coins from you';
    const source = transfer.comment_id ? 'comment' : 'post';
    const description = `${action} via ${source}`;

    return (
      <S.TransferItem key={`${transfer.post_id}-${transfer.comment_id}-${transfer.timestamp}`}>
        <S.TransferLeft>
          <S.TransferHeader>
            <UserLabel
              avatar={transfer.counterparty.avatar}
              description={description}
              id={transfer.counterparty.id}
              username={transfer.counterparty.username}
            />
          </S.TransferHeader>
          <S.TransferContent>{transfer.content}</S.TransferContent>
        </S.TransferLeft>
        <S.TransferRight>
          <S.Amount $isReceived={isReceived}>
            {isReceived ? '+' : '-'}
            {Math.abs(transfer.amount).toLocaleString()}
          </S.Amount>
          <S.TransferMeta>
            <S.Date>{formatDate(transfer.timestamp)}</S.Date>
            <S.Time>{formatTime(transfer.timestamp)}</S.Time>
          </S.TransferMeta>
        </S.TransferRight>
      </S.TransferItem>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <S.LoaderWrapper>
          <Loader size={24} />
        </S.LoaderWrapper>
      );
    }

    if (!transfers.length && currentPage === 1) {
      return (
        <S.EmptyPageWrapper>
          <EmptyPage
            bottomText="Transfers will appear here when you send or receive funds"
            graphic={LeavesEmptyState}
            topText="No transfers yet!"
          />
        </S.EmptyPageWrapper>
      );
    }

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return (
      <>
        <S.WhitePanel>
          <S.TransfersList>{transfers.map(renderTransfer)}</S.TransfersList>
        </S.WhitePanel>
        <S.Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
      </>
    );
  };

  if (!activeWallet) return null;

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default WalletTransfers;
