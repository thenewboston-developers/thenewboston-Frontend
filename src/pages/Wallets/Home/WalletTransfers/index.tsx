import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {mdiAlertCircleOutline, mdiArrowBottomLeft, mdiArrowTopRight, mdiSwapHorizontal} from '@mdi/js';
import MdiIcon from '@mdi/react';

import {getTransfers} from 'api/transfers';
import Avatar from 'components/Avatar';
import Skeleton from 'components/Skeleton';
import Tab from 'components/Tab';
import Tabs from 'components/Tabs';
import {POST_DETAIL_COMMENT_PARAM} from 'constants/paths';
import {SFC, Transfer, TransferDirection, Wallet} from 'types';
import {displayErrorToast} from 'utils/toasts';

import {getTransferKey, groupTransfersByDay, mergeTransfers} from '../utils';

import * as S from './Styles';

export interface WalletTransfersProps {
  // Changes when coins were just sent from this page, which the list then picks up
  refreshKey: number;
  wallet: Wallet;
}

type DirectionFilter = TransferDirection | 'all';

const DIRECTION_FILTERS: {label: string; value: DirectionFilter}[] = [
  {label: 'All', value: 'all'},
  {label: 'Received', value: 'received'},
  {label: 'Sent', value: 'sent'},
];

const EMPTY_MESSAGES: Record<DirectionFilter, {text: string; title: string}> = {
  all: {
    text: 'Coins you send or receive through posts and comments will show up here.',
    title: 'No activity yet',
  },
  received: {
    text: 'Coins other people send you through posts and comments will show up here.',
    title: 'Nothing received yet',
  },
  sent: {
    text: 'Coins you send to other people through posts and comments will show up here.',
    title: 'Nothing sent yet',
  },
};

const SKELETON_ROW_COUNT = 5;

const WalletTransfers: SFC<WalletTransfersProps> = ({className, refreshKey, wallet}) => {
  const [direction, setDirection] = useState<DirectionFilter>('all');
  const [hasFailed, setHasFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const balanceRef = useRef({balance: wallet.balance, walletId: wallet.id});
  const refreshKeyRef = useRef(refreshKey);
  const requestIdRef = useRef(0);
  const currencyId = wallet.currency.id;
  const groups = useMemo(() => groupTransfersByDay(transfers), [transfers]);
  const {ticker} = wallet.currency;

  const fetchFirstPage = useCallback(
    async (keepLoadedTransfers: boolean) => {
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;

      try {
        const response = await getTransfers({
          currency: currencyId,
          direction: direction === 'all' ? undefined : direction,
        });
        if (requestIdRef.current !== requestId) return;

        setHasFailed(false);
        setTotalCount(response.count);
        setTransfers((current) => (keepLoadedTransfers ? mergeTransfers(current, response.results) : response.results));
      } catch (error) {
        if (requestIdRef.current !== requestId) return;
        // A refresh behind the scenes keeps what is already on the page, so only a visible load reports its failure
        if (!keepLoadedTransfers) setHasFailed(true);
      } finally {
        if (requestIdRef.current === requestId) setIsLoading(false);
      }
    },
    [currencyId, direction],
  );

  const loadFirstPage = useCallback(() => {
    setHasFailed(false);
    setIsLoading(true);
    setPage(1);
    setTotalCount(0);
    setTransfers([]);
    fetchFirstPage(false);
  }, [fetchFirstPage]);

  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage]);

  useEffect(() => {
    if (refreshKeyRef.current === refreshKey) return;
    refreshKeyRef.current = refreshKey;
    fetchFirstPage(true);
  }, [fetchFirstPage, refreshKey]);

  // The balance moves when coins arrive while the page is open, so the newest transfers are fetched again
  useEffect(() => {
    const previous = balanceRef.current;
    balanceRef.current = {balance: wallet.balance, walletId: wallet.id};

    if (previous.walletId === wallet.id && previous.balance !== wallet.balance) fetchFirstPage(true);
  }, [fetchFirstPage, wallet.balance, wallet.id]);

  const formatTime = (timestamp: string): string =>
    new Date(timestamp).toLocaleTimeString(undefined, {hour: 'numeric', minute: '2-digit'});

  const getPostPath = ({comment_id, post_id}: Transfer): string | null => {
    if (post_id === null) return null;
    return comment_id === null ? `/posts/${post_id}` : `/posts/${post_id}?${POST_DETAIL_COMMENT_PARAM}=${comment_id}`;
  };

  const handleShowMoreClick = async () => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setIsLoadingMore(true);

    try {
      const response = await getTransfers({
        currency: currencyId,
        direction: direction === 'all' ? undefined : direction,
        page: page + 1,
      });
      if (requestIdRef.current !== requestId) return;

      setPage(page + 1);
      setTotalCount(response.count);
      // Transfers made since the list was loaded push older ones onto this page, where they would appear twice
      setTransfers((current) => {
        const currentKeys = new Set(current.map(getTransferKey));
        return [...current, ...response.results.filter((transfer) => !currentKeys.has(getTransferKey(transfer)))];
      });
    } catch (error) {
      if (requestIdRef.current === requestId) displayErrorToast('Error fetching transfers');
    } finally {
      setIsLoadingMore(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <S.SkeletonList aria-busy="true" aria-label="Loading activity">
          {Array.from({length: SKELETON_ROW_COUNT}, (_, index) => (
            <S.SkeletonRow key={index}>
              <Skeleton circle height={40} width={40} />
              <S.SkeletonLines>
                <Skeleton height={14} width="40%" />
                <Skeleton height={12} width="70%" />
              </S.SkeletonLines>
              <Skeleton height={16} width={72} />
            </S.SkeletonRow>
          ))}
        </S.SkeletonList>
      );
    }

    if (hasFailed) {
      return (
        <S.Empty role="alert">
          <S.EmptyIcon>
            <MdiIcon aria-hidden="true" path={mdiAlertCircleOutline} size="24px" />
          </S.EmptyIcon>
          <S.EmptyTitle>Activity could not be loaded</S.EmptyTitle>
          <S.EmptyText>Your coins are safe. Check your connection and try again.</S.EmptyText>
          <S.RetryButton onClick={loadFirstPage} type="button">
            Try again
          </S.RetryButton>
        </S.Empty>
      );
    }

    if (!transfers.length) {
      const {text, title} = EMPTY_MESSAGES[direction];

      return (
        <S.Empty>
          <S.EmptyIcon>
            <MdiIcon aria-hidden="true" path={mdiSwapHorizontal} size="24px" />
          </S.EmptyIcon>
          <S.EmptyTitle>{title}</S.EmptyTitle>
          <S.EmptyText>{text}</S.EmptyText>
        </S.Empty>
      );
    }

    return (
      <>
        {groups.map((group) => (
          <S.Group key={group.label}>
            <S.GroupLabel>{group.label}</S.GroupLabel>
            <S.List>{group.transfers.map(renderTransfer)}</S.List>
          </S.Group>
        ))}
        <S.Footer>
          <S.Count>
            Showing {transfers.length.toLocaleString()} of {Math.max(totalCount, transfers.length).toLocaleString()}
          </S.Count>
          {transfers.length < totalCount ? (
            <S.ShowMoreButton disabled={isLoadingMore} onClick={handleShowMoreClick} type="button">
              {isLoadingMore ? 'Loading...' : 'Show more'}
            </S.ShowMoreButton>
          ) : null}
        </S.Footer>
      </>
    );
  };

  const renderTransfer = (transfer: Transfer) => {
    const {amount, comment_id, content, counterparty, timestamp} = transfer;
    const isReceived = amount > 0;
    const postPath = getPostPath(transfer);
    const source = comment_id === null ? 'post' : 'comment';

    const row = (
      <>
        <S.AvatarWrapper>
          <Avatar size="40px" src={counterparty.avatar} />
          <S.DirectionBadge $isReceived={isReceived}>
            <MdiIcon aria-hidden="true" path={isReceived ? mdiArrowBottomLeft : mdiArrowTopRight} size="12px" />
          </S.DirectionBadge>
        </S.AvatarWrapper>
        <S.Body>
          <S.Title>
            {isReceived ? 'Received from ' : 'Sent to '}
            <strong>{counterparty.username}</strong>
          </S.Title>
          {content ? <S.Message>{content}</S.Message> : null}
          <S.Meta>
            {formatTime(timestamp)} · In a {source}
          </S.Meta>
        </S.Body>
        <S.Amount $isReceived={isReceived}>
          {isReceived ? '+' : '−'}
          {Math.abs(amount).toLocaleString()}
          <S.AmountTicker>{ticker}</S.AmountTicker>
        </S.Amount>
      </>
    );

    return (
      <li key={getTransferKey(transfer)}>
        {postPath ? <S.RowLink to={postPath}>{row}</S.RowLink> : <S.Row>{row}</S.Row>}
      </li>
    );
  };

  return (
    <S.Container aria-label={`${ticker} activity`} className={className}>
      <S.Header>
        <S.HeaderText>
          <S.Heading>Activity</S.Heading>
          <S.SubHeading>Coins sent and received through posts and comments</S.SubHeading>
        </S.HeaderText>
        <Tabs>
          {DIRECTION_FILTERS.map(({label, value}) => (
            <Tab isActive={direction === value} key={value} onClick={() => setDirection(value)}>
              {label}
            </Tab>
          ))}
        </Tabs>
      </S.Header>
      {renderContent()}
    </S.Container>
  );
};

export default WalletTransfers;
