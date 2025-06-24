import {useEffect, useState} from 'react';

import {getTransfers} from 'api/transfers';
import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import Loader from 'components/Loader';
import UserLabel from 'components/UserLabel';
import {useActiveWallet} from 'hooks';
import {SFC, Transfer} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const WalletTransfers: SFC = ({className}) => {
  const [activeCurrencyId, setActiveCurrencyId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const activeWallet = useActiveWallet();
  const itemsPerPage = 20;

  useEffect(() => {
    if (!activeWallet) return;

    if (activeCurrencyId !== null && activeCurrencyId !== activeWallet.currency.id) {
      setCurrentPage(1);
    }
    setActiveCurrencyId(activeWallet.currency.id);
  }, [activeWallet, activeCurrencyId]);

  useEffect(() => {
    if (!activeWallet || activeCurrencyId !== activeWallet.currency.id) return;

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
  }, [activeWallet, activeCurrencyId, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({behavior: 'smooth', top: 0});
  };

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

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
      <>
        <S.TransfersList>{transfers.map(renderTransfer)}</S.TransfersList>
        <S.Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
      </>
    );
  };

  if (!activeWallet) return null;

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default WalletTransfers;
