import ContributionsList from 'components/Contributions/Contributions';
import Loader from 'components/Loader';
import useContributions from 'hooks/useContributions';
import {Col} from 'styles/components/GridStyle';

const MyContributions = () => {
  const {items, hasMore, isInitialLoading, fetchMoreContributions} = useContributions(true);
  const contributionsList = Object.values(items);

  if (isInitialLoading) {
    return <Loader className="align-screen-center" size={24} />;
  }

  return (
    <Col size={12}>
      <ContributionsList
        contributionsList={contributionsList}
        fetchMore={fetchMoreContributions}
        hasMore={hasMore}
        panelHeading="My Contributions"
        selfContributions={true}
      />
    </Col>
  );
};

export default MyContributions;
