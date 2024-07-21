import TopContributorsSkeleton from 'components/Contributions/Skeleton/TopContributorsSkeleton';
import ContributionsCumulativeChartSkeleton from 'components/Contributions/Skeleton/ContributionsCumulativeChartSkeleton';

import {Col, Row} from 'styles/components/GridStyle';

const HomeContributionsSkeleton = () => {
  return (
    <Row>
      <Col size={4}>
        <TopContributorsSkeleton />
      </Col>
      <Col size={8}>
        <ContributionsCumulativeChartSkeleton />
      </Col>
      <br />
      <Col size={12}>hello world</Col>
    </Row>
  );
};

export default HomeContributionsSkeleton;
