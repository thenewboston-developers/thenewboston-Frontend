import {useEffect, useState} from 'react';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {getMintChartData} from 'api/mintChartData';
import Loader from 'components/Loader';
import {colors} from 'styles';
import {Currency, MintChartDataResponse, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

interface ChartData {
  amount: number;
  date: string;
  total: number;
}

interface MintHistoryChartProps {
  currency: Currency;
  refreshTrigger?: number;
}

const MintHistoryChart: SFC<MintHistoryChartProps> = ({className, currency, refreshTrigger}) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [mintChartDataResponse, setMintChartDataResponse] = useState<MintChartDataResponse | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getMintChartData({currency: currency.id});
        setMintChartDataResponse(response);

        // Transform the data for recharts
        const transformedData = response.data_points.map((point) => ({
          amount: point.amount_minted,
          date: new Date(point.timestamp).toLocaleDateString(),
          total: point.cumulative_total,
        }));

        setChartData(transformedData);
      } catch (error) {
        displayErrorToast('Error loading mint history');
      } finally {
        setLoading(false);
      }
    })();
  }, [currency.id, refreshTrigger]);

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const formatTooltipValue = (value: number) => {
    return value.toLocaleString();
  };

  if (loading) {
    return (
      <S.Container className={className}>
        <S.LoaderWrapper>
          <Loader />
        </S.LoaderWrapper>
      </S.Container>
    );
  }

  if (!mintChartDataResponse || chartData.length === 0) {
    return null;
  }

  return (
    <S.Container className={className}>
      <S.ChartTitle>Minting History</S.ChartTitle>
      <S.ChartWrapper>
        <ResponsiveContainer height={300} width="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis dataKey="date" stroke={colors.secondary} />
            <YAxis tickFormatter={formatYAxis} stroke={colors.secondary} />
            <Tooltip
              formatter={formatTooltipValue}
              contentStyle={{backgroundColor: colors.white, border: `1px solid ${colors.border}`, borderRadius: '8px'}}
            />
            <Bar dataKey="total" fill={colors.palette.blue[500]} name="Cumulative Total" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </S.ChartWrapper>
    </S.Container>
  );
};

export default MintHistoryChart;
