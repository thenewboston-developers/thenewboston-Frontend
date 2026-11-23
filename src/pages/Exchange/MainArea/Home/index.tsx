import {MouseEvent, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {
  mdiArrowDown,
  mdiArrowUp,
  mdiBookOpenPageVariantOutline,
  mdiMenuDown,
  mdiMenuUp,
  mdiSwapHorizontal,
} from '@mdi/js';
import MdiIcon from '@mdi/react';
import {Area, AreaChart, ResponsiveContainer} from 'recharts';

import {getTradeHistoryItems} from 'api/tradeHistoryItems';
import Loader from 'components/Loader';
import PageHeader from 'components/PageHeader';
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
  const [totalMarkets, setTotalMarkets] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [tradeHistoryItems, setTradeHistoryItems] = useState<TradeHistoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError('');
        const ordering = sortState.direction === 'desc' ? `-${sortState.field}` : sortState.field;
        const response = await getTradeHistoryItems(ordering, currentPage, PAGE_SIZE);
        setTradeHistoryItems(response.results);
        setTotalMarkets(response.count);
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

  const renderMarkets = () => {
    if (loading) {
      return (
        <S.LoaderPanel aria-label="Loading markets" role="status">
          <Loader />
        </S.LoaderPanel>
      );
    }

    if (error) {
      return <S.ErrorMessage role="alert">{error}</S.ErrorMessage>;
    }

    if (!tradeHistoryItems.length) {
      return (
        <S.EmptyState>
          <S.EmptyText>No markets to display</S.EmptyText>
          <S.EmptySubtext>There is no trading activity to show yet.</S.EmptySubtext>
        </S.EmptyState>
      );
    }

    return (
      <>
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
              {tradeHistoryItems.map((item) => (
                <S.TableRow key={item.asset_pair.id} onClick={() => handleCoinClick(item.asset_pair.id)}>
                  <S.DataCell>
                    <S.CoinLink onClick={handleCoinLinkClick} to={`/exchange/trade/${item.asset_pair.id}`}>
                      <S.Logo alt="" src={item.asset_pair.primary_currency.logo} />
                      <S.CoinDetails>
                        <S.Ticker>{item.asset_pair.primary_currency.ticker}</S.Ticker>
                        <S.QuoteCurrency>{item.asset_pair.secondary_currency.ticker} pair</S.QuoteCurrency>
                      </S.CoinDetails>
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
      </>
    );
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

  return (
    <S.Container className={className}>
      <S.Content>
        <PageHeader
          description="Discover community currencies, explore market activity, and find your next trading pair."
          eyebrow="The community exchange"
          title="A market for every idea."
        >
          <Link to="/exchange/learn-more">
            <MdiIcon aria-hidden="true" path={mdiBookOpenPageVariantOutline} size="20px" />
            How trading works
          </Link>
        </PageHeader>
        <S.Overview aria-label="Exchange overview">
          <S.OverviewItem>
            <S.OverviewLabel>Markets to explore</S.OverviewLabel>
            <S.OverviewValue>{totalMarkets === null ? '—' : totalMarkets.toLocaleString()}</S.OverviewValue>
          </S.OverviewItem>
          <S.OverviewItem>
            <S.OverviewLabel>Find your market</S.OverviewLabel>
            <S.OverviewValue>Currency pairs</S.OverviewValue>
          </S.OverviewItem>
          <S.OverviewItem>
            <S.OverviewLabel>Your price. Your trade.</S.OverviewLabel>
            <S.OverviewValue>Limit orders</S.OverviewValue>
          </S.OverviewItem>
        </S.Overview>
        <S.SectionHeader>
          <div>
            <S.SectionTitle>Explore the markets</S.SectionTitle>
            <S.SectionDescription>Select a currency to open its trading desk.</S.SectionDescription>
          </div>
          <S.MarketLabel>
            <MdiIcon aria-hidden="true" path={mdiSwapHorizontal} size="18px" />
            Currency pairs
          </S.MarketLabel>
        </S.SectionHeader>
        {renderMarkets()}
      </S.Content>
    </S.Container>
  );
};

export default Home;
