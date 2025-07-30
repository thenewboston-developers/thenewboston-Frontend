import {useEffect, useState} from 'react';
import {Area, AreaChart, ResponsiveContainer} from 'recharts';

import {getTradeHistoryItems} from 'api/tradeHistoryItems';
import Loader from 'components/Loader';
import {SFC, TradeHistoryItem} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const Home: SFC = ({className}) => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [tradeHistoryItems, setTradeHistoryItems] = useState<TradeHistoryItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getTradeHistoryItems();
        setTradeHistoryItems(response.results);
      } catch (err) {
        displayErrorToast('Error fetching trade history');
        setError('Failed to load trade history data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const formatCurrency = (value: number) => {
    if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  const formatPercentage = (value: number) => {
    const formatted = value.toFixed(2);
    return value >= 0 ? `+${formatted}%` : `${formatted}%`;
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
        <S.Table>
          <S.TableHeader>
            <S.TableRow>
              <S.HeaderCell $sticky>Market</S.HeaderCell>
              <S.HeaderCell>Price</S.HeaderCell>
              <S.HeaderCell>1h %</S.HeaderCell>
              <S.HeaderCell>24h %</S.HeaderCell>
              <S.HeaderCell>7d %</S.HeaderCell>
              <S.HeaderCell>24h Volume</S.HeaderCell>
              <S.HeaderCell>Market Cap</S.HeaderCell>
              <S.HeaderCell>Last 7 Days</S.HeaderCell>
            </S.TableRow>
          </S.TableHeader>
          <S.TableBody>
            {tradeHistoryItems.map((item, index) => (
              <S.TableRow key={index}>
                <S.DataCell $sticky>
                  <S.MarketInfo>
                    <S.Logo alt={item.primary_currency.ticker} src={item.primary_currency.logo} />
                    <S.TickerPair>
                      {item.primary_currency.ticker}/{item.secondary_currency.ticker}
                    </S.TickerPair>
                  </S.MarketInfo>
                </S.DataCell>
                <S.DataCell>{formatCurrency(item.price)}</S.DataCell>
                <S.DataCell>
                  <S.PercentageChange $isPositive={item.change_1h >= 0}>
                    {formatPercentage(item.change_1h)}
                  </S.PercentageChange>
                </S.DataCell>
                <S.DataCell>
                  <S.PercentageChange $isPositive={item.change_24h >= 0}>
                    {formatPercentage(item.change_24h)}
                  </S.PercentageChange>
                </S.DataCell>
                <S.DataCell>
                  <S.PercentageChange $isPositive={item.change_7d >= 0}>
                    {formatPercentage(item.change_7d)}
                  </S.PercentageChange>
                </S.DataCell>
                <S.DataCell>{formatCurrency(item.volume_24h)}</S.DataCell>
                <S.DataCell>{formatCurrency(item.market_cap)}</S.DataCell>
                <S.DataCell>
                  <S.SparklineContainer>{renderSparkline(item.sparkline)}</S.SparklineContainer>
                </S.DataCell>
              </S.TableRow>
            ))}
          </S.TableBody>
        </S.Table>
      </S.TableWrapper>
    </S.Container>
  );
};

export default Home;
