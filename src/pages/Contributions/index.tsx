import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import EmptyText from 'components/EmptyText';
import LatestContributions from './LatestContributions';
import TopContributors from './TopContributors';
import TotalContributionsChart from './TotalContributionsChart';
import {AppDispatch, SFC} from 'types';
import {Col, Row} from 'styles/components/GridStyle';
import {getContributions as _getContributions} from 'dispatchers/contributions';
import {getContributions} from 'selectors/state';
import {getTopContributors} from 'utils/contributions';
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
  const topContributors = getTopContributors(contributionList);

  if (!(contributionList && contributionList.length)) {
    return (
      <S.Container className={className}>
        <EmptyText>No Contributions found</EmptyText>
      </S.Container>
    );
  }

  return (
    <S.Container className={className}>
      <Row>
        {topContributors.length > 0 ? (
          <Col size={4}>
            <TopContributors topContributors={topContributors} />
          </Col>
        ) : null}
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
