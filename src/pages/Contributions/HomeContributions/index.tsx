import ContributionsCumulativeChart from 'components/Contributions/ContributionsCumulativeChart';
import LatestContributions from 'components/Contributions/LatestContributions';
import TopContributors from 'components/Contributions/TopContributors';
import {Col, Row} from 'styles/components/GridStyle';

const HomeContributions = () => {
  return (
    <Row>
      <Col size={4}>
        <TopContributors />
      </Col>
      <Col size={8}>
        <ContributionsCumulativeChart />
      </Col>
      <br />
      <Col size={12}>
        <LatestContributions />
      </Col>
    </Row>
  );
};

export default HomeContributions;
