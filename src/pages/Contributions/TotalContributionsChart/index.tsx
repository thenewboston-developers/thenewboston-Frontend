import {CartesianGrid, AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import PanelHeading from 'components/PanelHeading';
import {SFC} from 'types';
import {getCumulativeContributions} from 'utils/contributions';
import * as S from './Styles';

interface TotalContributionsChartProps {
  className?: string;
  contributions: any;
}

const TotalContributionsChart: SFC<TotalContributionsChartProps> = ({className, contributions}) => {
  const cumulativeContributions = getCumulativeContributions(contributions);

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth() + 1}`;
  };

  const CustomAxisTick = ({x, y, payload}: any) => (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-30)">
        {formatDate(payload.value)}
      </text>
    </g>
  );

  return (
    <>
      <PanelHeading heading="Total Contributions" />
      <S.Container className={className}>
        <ResponsiveContainer height={380} width="100%">
          <AreaChart data={cumulativeContributions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="created_date" tick={<CustomAxisTick />} />
            <YAxis dataKey="total_rewards" />
            <Tooltip />
            <Area type="monotone" dataKey="total_rewards" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </S.Container>
    </>
  );
};

export default TotalContributionsChart;
