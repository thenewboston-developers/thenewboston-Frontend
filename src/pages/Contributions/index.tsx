import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import EmptyText from 'components/EmptyText';
import TotalContributionsChart from './TotalContributionsChart';
import LatestContributions from './LatestContributions';
import TopContributors from './TopContributors';
import {getContributions as _getContributions} from 'dispatchers/contributions';
import {Row, Col} from 'styles/components/GridStyle';
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
        <Col size={4}>
          <TopContributors contributions={contributionList} />
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
