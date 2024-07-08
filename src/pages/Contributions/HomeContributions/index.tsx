import ContributionsCumulativeChart from 'components/Contributions/ContributionsCumulativeChart';
import ContributionsList from 'components/Contributions/Contributions';
import ContributionsSkeleton from 'components/Contributions/Skeleton';
import TopContributorsSkeleton from 'components/Contributions/Skeleton/TopContributorsSkeleton';
import Loader from 'components/Loader';
import TopContributors from 'components/Contributions/TopContributors';
import useContributions from 'hooks/useContributions';
import {Col, Row} from 'styles/components/GridStyle';

const HomeContributions = () => {
  const {items, isInitialLoading} = useContributions();
  const contributionsList = Object.values(items);

  const getSkeleton = (n: number) => <ContributionsSkeleton dataLength={n} />;

  return (
    <Row>
      <Col size={4}>
        <TopContributorsSkeleton />
      </Col>
    </Row>
  );

  if (isInitialLoading) {
    // return getSkeleton(4);
    return <TopContributorsSkeleton />;
    return <Loader className="align-screen-center" size={24} />;
  }

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
        <ContributionsList contributionsList={contributionsList.slice(0, 50)} panelHeading="Latest Contributions" />
      </Col>
    </Row>
  );
};

export default HomeContributions;
