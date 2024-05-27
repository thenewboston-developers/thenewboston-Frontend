import {AppDispatch, SFC} from 'types';
import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';
import EmptyText from 'components/EmptyText';
import {getContributions as _getContributions} from 'dispatchers/contributions';
import {Col, Row} from 'styles/components/GridStyle';
import {getContributions} from 'selectors/state';
import TopContributors from './TopContributors';
import TotalContributionsChart from './TotalContributionsChart';
import LatestContributions from './LatestContributions';
import * as S from './Styles';

const Home: SFC = ({className}) => {
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
    <>
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
    </>
  );
};
export default Home;
