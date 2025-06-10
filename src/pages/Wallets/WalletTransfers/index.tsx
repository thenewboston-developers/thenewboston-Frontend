import {useCallback, useEffect, useState} from 'react';
import InfiniteScrollComponent from 'react-infinite-scroll-component';

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
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [next, setNext] = useState<string | null>(null);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const activeWallet = useActiveWallet();

  useEffect(() => {
    if (!activeWallet) return;

    (async () => {
      setIsLoading(true);
      try {
        const response = await getTransfers(activeWallet.currency.id);
        setTransfers(response.results);
        setNext(response.next);
        setHasMore(!!response.next);
      } catch (error) {
        displayErrorToast('Error fetching transfers');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [activeWallet]);

  const fetchMoreTransfers = useCallback(async () => {
    if (!activeWallet || isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await getTransfers(activeWallet.currency.id, next);
      setTransfers((prev) => [...prev, ...response.results]);
      setNext(response.next);
      setHasMore(!!response.next);
    } catch (error) {
      displayErrorToast('Error fetching more transfers');
    } finally {
      setIsLoading(false);
    }
  }, [activeWallet, hasMore, isLoading, next]);

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
    const action = isReceived ? 'sent' : 'received';
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
    if (isLoading && !transfers.length) {
      return (
        <S.LoaderWrapper>
          <Loader size={24} />
        </S.LoaderWrapper>
      );
    }

    if (!transfers.length) {
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

    return (
      <InfiniteScrollComponent
        dataLength={transfers.length}
        endMessage={null}
        hasMore={hasMore}
        loader={
          <S.LoaderWrapper>
            <Loader size={24} />
          </S.LoaderWrapper>
        }
        next={fetchMoreTransfers}
        scrollThreshold={0.9}
        scrollableTarget="main-scrollable-area"
      >
        <S.TransfersList>{transfers.map(renderTransfer)}</S.TransfersList>
      </InfiniteScrollComponent>
    );
  };

  if (!activeWallet) return null;

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default WalletTransfers;
