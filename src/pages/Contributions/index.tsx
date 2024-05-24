import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import EmptyText from 'components/EmptyText';
import TotalContributionsChart from './TotalContributionsChart';
import LatestContributions from './LatestContributions';
import TopContributors from './TopContributors';
import {getContributions as _getContributions} from 'dispatchers/contributions';
import {getTopContributions as _getTopContributions} from 'dispatchers/topContributions';
import {Col, Row} from 'styles/components/GridStyle';
import {getContributions, getTopContributions} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';

interface ContributionsProps {
  className?: string;
}

const Contributions: SFC<ContributionsProps> = ({className}) => {
  const contributions = useSelector(getContributions);
  const topContributions = useSelector(getTopContributions);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedFilter, setSelectedFilter] = useState<string>('none');

  useEffect(() => {
    dispatch(_getContributions());
  }, [dispatch]);
  useEffect(() => {
    dispatch(_getTopContributions(selectedFilter));
  }, [selectedFilter, dispatch]);

  const topContributionList = useMemo(() => {
    return Object.values(topContributions);
  }, [topContributions]);
  const contributionList = useMemo(() => {
    return orderBy(Object.values(contributions), ['created_date'], ['asc']);
  }, [contributions]);

  if (!(contributionList && contributionList.length)) {
    return (
      <S.Container className={className}>
        <EmptyText>No Contributions found</EmptyText>
      </S.Container>
    );
  }
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <S.Container className={className}>
      <Row>
        <Col size={4}>
          <TopContributors topContributions={topContributionList} onFilterChange={handleFilterChange} />
        </Col>
        <Col size={8}>
          <TotalContributionsChart contributions={contributionList} />
        </Col>
        <br />
        <Col size={12}>
          <LatestContributions contributions={contributionList} />
        </Col>
      </Row>
    </S.Container>
  );
};

export default Contributions;
