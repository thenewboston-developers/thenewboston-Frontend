import {ChangeEvent, useEffect, useMemo, useRef, useState} from 'react';
import {mdiMagnify, mdiWeb} from '@mdi/js';
import MdiIcon from '@mdi/react';

import Skeleton from 'components/Skeleton';
import {DEFAULT_CURRENCY_TICKER} from 'constants/general';
import {SFC, Wallet} from 'types';

import {filterWallets, getWalletValue, Markets, sortWallets, WALLET_SORT_OPTIONS, WalletSort} from '../utils';

import * as S from './Styles';

export interface WalletListProps {
  activeWalletId: number | null;
  isLoading: boolean;
  onWalletClick(wallet: Wallet): void;
  prices: Markets['prices'];
  wallets: Wallet[];
}

const SKELETON_ROW_COUNT = 6;

const WalletList: SFC<WalletListProps> = ({activeWalletId, className, isLoading, onWalletClick, prices, wallets}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState(WalletSort.VALUE);
  const activeRowRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const visibleWallets = useMemo(
    () => sortWallets(filterWallets(wallets, searchTerm), sort, prices),
    [prices, searchTerm, sort, wallets],
  );

  // Keeps the open wallet in sight, also after the list is sorted again (prices arrive after the wallets do). Only the
  // list itself is scrolled, so the page never moves because of it
  useEffect(() => {
    const list = listRef.current;
    const row = activeRowRef.current;
    if (!list || !row) return;

    const listRect = list.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();

    if (rowRect.top < listRect.top) {
      list.scrollTop -= listRect.top - rowRect.top;
    } else if (rowRect.bottom > listRect.bottom) {
      list.scrollTop += rowRect.bottom - listRect.bottom;
    }
  }, [activeWalletId, visibleWallets]);

  const getDetail = ({currency}: Wallet): string => {
    if (currency.ticker === DEFAULT_CURRENCY_TICKER) return 'Base currency';

    const price = prices[currency.id];
    if (price !== undefined) return `${price.toLocaleString()} ${DEFAULT_CURRENCY_TICKER} each`;

    return currency.domain || 'Not traded yet';
  };

  const handleSearchChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(target.value);
  };

  const handleSortChange = ({target}: ChangeEvent<HTMLSelectElement>) => {
    setSort(target.value as WalletSort);
  };

  const renderRows = () => {
    if (isLoading && !wallets.length) {
      return Array.from({length: SKELETON_ROW_COUNT}, (_, index) => (
        <S.SkeletonRow key={index}>
          <Skeleton circle height={36} width={36} />
          <S.SkeletonLines>
            <Skeleton height={14} width={64} />
            <Skeleton height={10} width={96} />
          </S.SkeletonLines>
          <Skeleton height={14} width={72} />
        </S.SkeletonRow>
      ));
    }

    if (!visibleWallets.length) {
      return (
        <S.Empty>{searchTerm.trim() ? `No wallet matches "${searchTerm.trim()}"` : 'You have no wallets yet'}</S.Empty>
      );
    }

    return visibleWallets.map((wallet) => {
      const {balance, currency, id} = wallet;
      const isActive = id === activeWalletId;
      const isDefaultCurrency = currency.ticker === DEFAULT_CURRENCY_TICKER;
      const value = getWalletValue(wallet, prices);

      return (
        <li key={id}>
          <S.Row
            $isActive={isActive}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => onWalletClick(wallet)}
            ref={isActive ? activeRowRef : undefined}
            type="button"
          >
            <S.Logo alt="" src={currency.logo} />
            <S.Name>
              <S.Ticker>
                {currency.ticker}
                {currency.domain ? (
                  <MdiIcon aria-label="External currency" path={mdiWeb} size="14px" title="External currency" />
                ) : null}
              </S.Ticker>
              <S.Detail>{getDetail(wallet)}</S.Detail>
            </S.Name>
            <S.Amounts>
              <S.Balance $isEmpty={balance === 0}>{balance.toLocaleString()}</S.Balance>
              {!isDefaultCurrency && value !== null && balance > 0 ? (
                <S.Value>
                  ≈ {value.toLocaleString()} {DEFAULT_CURRENCY_TICKER}
                </S.Value>
              ) : null}
            </S.Amounts>
          </S.Row>
        </li>
      );
    });
  };

  return (
    <S.Container className={className}>
      <S.Controls>
        <S.SearchContainer>
          <S.SearchIcon aria-hidden="true" path={mdiMagnify} size="18px" />
          <S.SearchInput
            aria-label="Search wallets"
            onChange={handleSearchChange}
            placeholder="Search wallets"
            type="text"
            value={searchTerm}
          />
        </S.SearchContainer>
        <S.SortSelect aria-label="Sort wallets" onChange={handleSortChange} value={sort}>
          {WALLET_SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </S.SortSelect>
      </S.Controls>
      <S.List aria-busy={isLoading} aria-label="Your wallets" ref={listRef}>
        {renderRows()}
      </S.List>
    </S.Container>
  );
};

export default WalletList;
