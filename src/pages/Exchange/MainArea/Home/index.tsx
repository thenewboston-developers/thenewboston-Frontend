import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {mdiMenuDown, mdiMenuUp} from '@mdi/js';
import {Area, AreaChart, ResponsiveContainer} from 'recharts';

import {getTradeHistoryItems} from 'api/tradeHistoryItems';
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import {SFC, TradeHistoryItem} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

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
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [sortState, setSortState] = useState<SortState>({field: 'market_cap', direction: 'desc'});
  const [tradeHistoryItems, setTradeHistoryItems] = useState<TradeHistoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const ordering = sortState.direction === 'desc' ? `-${sortState.field}` : sortState.field;
        const response = await getTradeHistoryItems(ordering);
        setTradeHistoryItems(response.results);
      } catch (err) {
        displayErrorToast('Error fetching trade history');
        setError('Failed to load trade history data');
      } finally {
        setLoading(false);
      }
    })();
  }, [sortState]);

  const formatPercentage = (value: number) => {
    return Math.abs(value).toFixed(2);
  };

  const formatWholeNumber = (value: number) => {
    return Math.floor(value).toLocaleString();
  };

  const handleCoinClick = (assetPairId: number) => {
    navigate(`/exchange/trade/${assetPairId}`);
  };

  const handleSort = (field: SortField) => {
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

  const renderSortIcon = (field: SortField, position: 'left' | 'right' = 'right') => {
    if (sortState.field !== field) return null;
    const icon = <Icon icon={sortState.direction === 'asc' ? mdiMenuUp : mdiMenuDown} size={16} />;
    return position === 'left' ? icon : icon;
  };

  const renderSparkline = (data: number[]) => {
    const chartData = data.map((value) => ({value}));
    const isPositive = data[data.length - 1] >= data[0];

    return (
      <ResponsiveContainer height={40} width="100%">
        <AreaChart data={chartData} margin={{bottom: 0, left: 0, right: 0, top: 0}}>
          <Area
            dataKey="value"
            fill={isPositive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'}
            stroke={isPositive ? '#22c55e' : '#ef4444'}
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
        <S.LoaderContainer>
          <Loader size={48} />
        </S.LoaderContainer>
      </S.Container>
    );
  }

  if (error) {
    return (
      <S.Container className={className}>
        <S.ErrorMessage>{error}</S.ErrorMessage>
      </S.Container>
    );
  }

  return (
    <S.Container className={className}>
      <S.TableWrapper>
        <S.ScrollWrapper>
          <S.Table>
            <S.TableHeader>
              <S.TableRow>
                <S.HeaderCell $clickable $sticky onClick={() => handleSort('asset_pair__primary_currency__ticker')}>
                  <S.HeaderContent>
                    Coin
                    {renderSortIcon('asset_pair__primary_currency__ticker', 'right')}
                  </S.HeaderContent>
                </S.HeaderCell>
                <S.HeaderCell $align="right" $clickable onClick={() => handleSort('price')}>
                  <S.HeaderContent $align="right">
                    {renderSortIcon('price', 'left')}
                    Price (TNB)
                  </S.HeaderContent>
                </S.HeaderCell>
                <S.HeaderCell $align="right" $clickable onClick={() => handleSort('change_1h')}>
                  <S.HeaderContent $align="right">
                    {renderSortIcon('change_1h', 'left')}
                    1h
                  </S.HeaderContent>
                </S.HeaderCell>
                <S.HeaderCell $align="right" $clickable onClick={() => handleSort('change_24h')}>
                  <S.HeaderContent $align="right">
                    {renderSortIcon('change_24h', 'left')}
                    24h
                  </S.HeaderContent>
                </S.HeaderCell>
                <S.HeaderCell $align="right" $clickable onClick={() => handleSort('change_7d')}>
                  <S.HeaderContent $align="right">
                    {renderSortIcon('change_7d', 'left')}
                    7d
                  </S.HeaderContent>
                </S.HeaderCell>
                <S.HeaderCell $align="right" $clickable onClick={() => handleSort('volume_24h')}>
                  <S.HeaderContent $align="right">
                    {renderSortIcon('volume_24h', 'left')}
                    24h Volume
                  </S.HeaderContent>
                </S.HeaderCell>
                <S.HeaderCell $align="right" $clickable onClick={() => handleSort('market_cap')}>
                  <S.HeaderContent $align="right">
                    {renderSortIcon('market_cap', 'left')}
                    Market Cap (TNB)
                  </S.HeaderContent>
                </S.HeaderCell>
                <S.HeaderCell $align="right">Last 7 Days</S.HeaderCell>
              </S.TableRow>
            </S.TableHeader>
            <S.TableBody>
              {tradeHistoryItems.map((item, index) => (
                <S.TableRow key={index}>
                  <S.DataCell $clickable $sticky onClick={() => handleCoinClick(item.asset_pair.id)}>
                    <S.CoinInfo>
                      <S.Logo
                        alt={item.asset_pair.primary_currency.ticker}
                        src={item.asset_pair.primary_currency.logo}
                      />
                      <S.TickerPair>{item.asset_pair.primary_currency.ticker}</S.TickerPair>
                    </S.CoinInfo>
                  </S.DataCell>
                  <S.DataCell $align="right">{formatWholeNumber(item.price)}</S.DataCell>
                  <S.DataCell $align="right">
                    <S.PercentageChange $isPositive={item.change_1h >= 0}>
                      <Icon icon={item.change_1h >= 0 ? mdiMenuUp : mdiMenuDown} size={24} />
                      {formatPercentage(item.change_1h)}%
                    </S.PercentageChange>
                  </S.DataCell>
                  <S.DataCell $align="right">
                    <S.PercentageChange $isPositive={item.change_24h >= 0}>
                      <Icon icon={item.change_24h >= 0 ? mdiMenuUp : mdiMenuDown} size={24} />
                      {formatPercentage(item.change_24h)}%
                    </S.PercentageChange>
                  </S.DataCell>
                  <S.DataCell $align="right">
                    <S.PercentageChange $isPositive={item.change_7d >= 0}>
                      <Icon icon={item.change_7d >= 0 ? mdiMenuUp : mdiMenuDown} size={24} />
                      {formatPercentage(item.change_7d)}%
                    </S.PercentageChange>
                  </S.DataCell>
                  <S.DataCell $align="right">{formatWholeNumber(item.volume_24h)}</S.DataCell>
                  <S.DataCell $align="right">{formatWholeNumber(item.market_cap)}</S.DataCell>
                  <S.DataCell $align="right">
                    <S.SparklineContainer>{renderSparkline(item.sparkline)}</S.SparklineContainer>
                  </S.DataCell>
                </S.TableRow>
              ))}
            </S.TableBody>
          </S.Table>
        </S.ScrollWrapper>
      </S.TableWrapper>
    </S.Container>
  );
};

export default Home;
