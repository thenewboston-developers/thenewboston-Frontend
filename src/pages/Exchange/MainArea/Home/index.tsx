import {MouseEvent, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {mdiArrowDown, mdiArrowUp, mdiMenuDown, mdiMenuUp} from '@mdi/js';
import {Area, AreaChart, ResponsiveContainer} from 'recharts';

import {getTradeHistoryItems} from 'api/tradeHistoryItems';
import Loader from 'components/Loader';
import {colors} from 'styles';
import {SFC, TradeHistoryItem} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const PAGE_SIZE = 100;

type ChangeDirection = 'down' | 'flat' | 'up';

type SortField =
  | 'asset_pair__primary_currency__ticker'
  | 'price'
  | 'change_1h'
  | 'change_24h'
  | 'change_7d'
  | 'volume_24h'
  | 'market_cap';

interface SortState {
  field: SortField;
  direction: 'asc' | 'desc';
}

const Home: SFC = ({className}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [sortState, setSortState] = useState<SortState>({field: 'market_cap', direction: 'desc'});
  const [totalPages, setTotalPages] = useState(1);
  const [tradeHistoryItems, setTradeHistoryItems] = useState<TradeHistoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const ordering = sortState.direction === 'desc' ? `-${sortState.field}` : sortState.field;
        const response = await getTradeHistoryItems(ordering, currentPage, PAGE_SIZE);
        setTradeHistoryItems(response.results);
        setTotalPages(Math.ceil(response.count / PAGE_SIZE));
      } catch (err) {
        displayErrorToast('Error fetching trade history');
        setError('Failed to load trade history data');
      } finally {
        setLoading(false);
      }
    })();
  }, [currentPage, sortState]);

  const formatPercentage = (value: number) => {
    return Math.abs(value).toFixed(2);
  };

  const formatWholeNumber = (value: number) => {
    return Math.floor(value).toLocaleString();
  };

  const getAriaSort = (field: SortField) => {
    if (sortState.field !== field) return undefined;
    return sortState.direction === 'asc' ? 'ascending' : 'descending';
  };

  // The direction follows the displayed (rounded) value, so a change that reads as 0.00% stays neutral
  const getChangeDirection = (value: number): ChangeDirection => {
    const roundedValue = Number(value.toFixed(2));
    if (roundedValue > 0) return 'up';
    if (roundedValue < 0) return 'down';
    return 'flat';
  };

  const handleCoinClick = (assetPairId: number) => {
    navigate(`/exchange/trade/${assetPairId}`);
  };

  // The link navigates on its own, so the click must not reach the row handler and navigate a second time
  const handleCoinLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (field: SortField) => {
    setCurrentPage(1);
    setSortState((prevState) => {
      if (prevState.field === field) {
        return {
          field,
          direction: prevState.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return {
        field,
        direction: 'desc',
      };
    });
  };

  const renderPercentageChange = (value: number) => {
    const direction = getChangeDirection(value);

    return (
      <S.PercentageChange $direction={direction}>
        {direction !== 'flat' && (
          <>
            <S.ChangeIcon path={direction === 'up' ? mdiMenuUp : mdiMenuDown} size="18px" />
            <S.VisuallyHidden>{direction === 'up' ? 'Up' : 'Down'}</S.VisuallyHidden>
          </>
        )}
        {formatPercentage(value)}%
      </S.PercentageChange>
    );
  };

  const renderSortableHeaderCell = (field: SortField, label: string, align: 'left' | 'right' = 'right') => {
    return (
      <S.HeaderCell $align={align} aria-sort={getAriaSort(field)} scope="col">
        <S.SortButton $isActive={sortState.field === field} onClick={() => handleSort(field)} type="button">
          {align === 'right' && renderSortIcon(field)}
          {label}
          {align === 'left' && renderSortIcon(field)}
        </S.SortButton>
      </S.HeaderCell>
    );
  };

  const renderSortIcon = (field: SortField) => {
    if (sortState.field !== field) return null;
    return <S.SortIcon path={sortState.direction === 'asc' ? mdiArrowUp : mdiArrowDown} size="14px" />;
  };

  const renderSparkline = (data: number[]) => {
    const chartData = data.map((value) => ({value}));
    const isPositive = data[data.length - 1] >= data[0];
    const color = isPositive ? colors.palette.green[600] : colors.palette.red[500];

    return (
      <ResponsiveContainer height={40} width="100%">
        <AreaChart data={chartData} margin={{bottom: 0, left: 0, right: 0, top: 0}}>
          <Area
            dataKey="value"
            fill={color}
            fillOpacity={0.1}
            stroke={color}
            strokeWidth={1.5}
            type="monotone"
            yAxisId={0}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  if (loading) {
    return (
      <S.Container className={className}>
        <S.Content>
          <S.LoaderPanel>
            <Loader />
          </S.LoaderPanel>
        </S.Content>
      </S.Container>
    );
  }

  if (error) {
    return (
      <S.Container className={className}>
        <S.Content>
          <S.ErrorMessage>{error}</S.ErrorMessage>
        </S.Content>
      </S.Container>
    );
  }

  if (!tradeHistoryItems.length) {
    return (
      <S.Container className={className}>
        <S.Content>
          <S.EmptyState>
            <S.EmptyText>No markets to display</S.EmptyText>
            <S.EmptySubtext>There is no trading activity to show yet.</S.EmptySubtext>
          </S.EmptyState>
        </S.Content>
      </S.Container>
    );
  }

  return (
    <S.Container className={className}>
      <S.Content>
        <S.TableWrapper>
          <S.Table aria-label="Markets">
            <S.TableHeader>
              <S.TableRow>
                {renderSortableHeaderCell('asset_pair__primary_currency__ticker', 'Coin', 'left')}
                {renderSortableHeaderCell('price', 'Price (TNB)')}
                {renderSortableHeaderCell('change_1h', '1h')}
                {renderSortableHeaderCell('change_24h', '24h')}
                {renderSortableHeaderCell('change_7d', '7d')}
                {renderSortableHeaderCell('volume_24h', '24h Volume')}
                {renderSortableHeaderCell('market_cap', 'Market Cap (TNB)')}
                <S.HeaderCell $align="right" scope="col">
                  Last 7 Days
                </S.HeaderCell>
              </S.TableRow>
            </S.TableHeader>
            <S.TableBody>
              {tradeHistoryItems.map((item, index) => (
                <S.TableRow key={index} onClick={() => handleCoinClick(item.asset_pair.id)}>
                  <S.DataCell>
                    <S.CoinLink onClick={handleCoinLinkClick} to={`/exchange/trade/${item.asset_pair.id}`}>
                      <S.Logo alt="" src={item.asset_pair.primary_currency.logo} />
                      <S.Ticker>{item.asset_pair.primary_currency.ticker}</S.Ticker>
                    </S.CoinLink>
                  </S.DataCell>
                  <S.DataCell $align="right">{formatWholeNumber(item.price)}</S.DataCell>
                  <S.DataCell $align="right">{renderPercentageChange(item.change_1h)}</S.DataCell>
                  <S.DataCell $align="right">{renderPercentageChange(item.change_24h)}</S.DataCell>
                  <S.DataCell $align="right">{renderPercentageChange(item.change_7d)}</S.DataCell>
                  <S.DataCell $align="right">{formatWholeNumber(item.volume_24h)}</S.DataCell>
                  <S.DataCell $align="right">{formatWholeNumber(item.market_cap)}</S.DataCell>
                  <S.DataCell $align="right">
                    <S.SparklineContainer>{renderSparkline(item.sparkline)}</S.SparklineContainer>
                  </S.DataCell>
                </S.TableRow>
              ))}
            </S.TableBody>
          </S.Table>
        </S.TableWrapper>
        <S.Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
      </S.Content>
    </S.Container>
  );
};

export default Home;
