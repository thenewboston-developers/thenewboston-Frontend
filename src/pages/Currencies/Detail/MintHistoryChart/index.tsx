import {useEffect, useState} from 'react';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {getMintChartData} from 'api/mintChartData';
import Loader from 'components/Loader';
import {colors, radii, shadows} from 'styles';
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
  refreshTrigger: number;
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

  const formatTooltipValue = (value: number) => {
    return value.toLocaleString();
  };

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
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
            <CartesianGrid stroke={colors.borderSubtle} strokeDasharray="3 3" vertical={false} />
            <XAxis
              axisLine={{stroke: colors.borderSubtle}}
              dataKey="date"
              stroke={colors.secondary}
              tick={{fontSize: 12}}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              stroke={colors.secondary}
              tick={{fontSize: 12}}
              tickFormatter={formatYAxis}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.borderSubtle}`,
                borderRadius: radii.medium,
                boxShadow: shadows.popover,
                fontSize: '13px',
              }}
              cursor={{fill: colors.palette.gray[100]}}
              formatter={formatTooltipValue}
            />
            <Bar
              dataKey="total"
              fill={colors.palette.blue[500]}
              maxBarSize={64}
              name="Cumulative Total"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </S.ChartWrapper>
    </S.Container>
  );
};

export default MintHistoryChart;
