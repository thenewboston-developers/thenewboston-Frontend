import {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import ContributionsCumulativeChartSkeleton from 'components/Contributions/Skeleton/ContributionsCumulativeChartSkeleton';
import PanelHeading from 'components/PanelHeading';
import TNBLogo from 'components/TNBLogo';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import {
  getContributionsCumulative as _getContributionsCumulative,
  resetContributionsCumulative as _resetContributionsCumulative,
} from 'dispatchers/contributionsCumulative';
import {getContributionsCumulative as getContributionsCumulativeState} from 'selectors/state';

import * as S from './Styles';

interface ContributionsCumulativeChartProps {
  className?: string;
}

const ContributionsCumulativeChart: SFC<ContributionsCumulativeChartProps> = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {items, isLoading} = useSelector(getContributionsCumulativeState);
  const cumulativeContributions = items;

  const fetchContributionsCumulative = useCallback(async () => {
    try {
      dispatch(_resetContributionsCumulative());
      await dispatch(_getContributionsCumulative());
    } catch (error) {
      console.error(error);
      displayErrorToast('Error fetching cumulative contributions for chart');
    }
  }, [dispatch]);

  useEffect(() => {
    fetchContributionsCumulative();
  }, [fetchContributionsCumulative]);

  const CustomAxisTick = ({x, y, payload}: any) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-30)">
          {formatDate(payload.value)}
        </text>
      </g>
    );
  };

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    return `${newDate.getMonth() + 1}/${newDate.getDate()}`;
  };

  const renderAmountContainer = () => {
    const totalReward = cumulativeContributions[cumulativeContributions.length - 1]?.total_rewards || 0;
    return (
      <S.AmountContainer>
        <TNBLogo size="20px" />
        <S.Amount>{totalReward.toLocaleString()}</S.Amount>
      </S.AmountContainer>
    );
  };

  const renderHeader = () => {
    return (
      <S.ChartHeaderContainer>
        <PanelHeading heading="Total Contributions" />
        {renderAmountContainer()}
      </S.ChartHeaderContainer>
    );
  };

  const renderContent = () => {
    return (
      <ResponsiveContainer height={380} width="100%">
        <AreaChart data={cumulativeContributions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="created_date" tick={<CustomAxisTick />} />
          <YAxis dataKey="total_rewards" />
          <Tooltip />
          <Area type="monotone" dataKey="total_rewards" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  if (isLoading) {
    return <ContributionsCumulativeChartSkeleton />;
  }

  return (
    <>
      {renderHeader()}
      <S.Container className={className}>{renderContent()}</S.Container>
    </>
  );
};

export default ContributionsCumulativeChart;
