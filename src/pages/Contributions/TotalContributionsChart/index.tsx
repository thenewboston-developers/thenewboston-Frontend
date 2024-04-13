import {CartesianGrid, AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import SectionHeading from 'components/SectionHeading';
import {SFC} from 'types';
import {Card} from 'styles/components/CardStyle';

interface TotalContributionsChartProps {
  className?: string;
  contributions: any;
}

const TotalContributionsChart: SFC<TotalContributionsChartProps> = ({className, contributions}) => {
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
    <div className={className}>
      <SectionHeading heading="Total Contributions" />
      <Card>
        <ResponsiveContainer height={380} width="100%">
          <AreaChart data={contributions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="created_date" tick={<CustomAxisTick />} />
            <YAxis dataKey="reward_amount" />
            <Tooltip />
            <Area type="monotone" dataKey="reward_amount" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default TotalContributionsChart;
