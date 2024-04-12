import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import TotalContributionsChart from 'pages/Contributions/TotalContributionsChart';
import TopContributors from 'pages/Contributions/TopContributors';
import {getContributions as _getContributions} from 'dispatchers/contributions';
import {getContributions} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';

interface ContributionsProps {
  className?: string;
}

const Contributions: SFC<ContributionsProps> = ({className}) => {
  const contributions = useSelector(getContributions);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(_getContributions());
  }, [dispatch]);

  const contributionList = useMemo(() => {
    return orderBy(Object.values(contributions), ['created_date'], ['asc']);
  }, [contributions]);

  return (
    <S.Container className={className}>
      <S.Row>
        <S.TopContributorsCard>
          <TopContributors contributions={contributionList} />
        </S.TopContributorsCard>
        <S.TotalContributionsChartCard>
          <TotalContributionsChart contributions={contributionList} />
        </S.TotalContributionsChartCard>
      </S.Row>
    </S.Container>
  );
};

export default Contributions;
