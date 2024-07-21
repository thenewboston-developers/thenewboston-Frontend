import ContributionsCardSkeleton from 'components/Contributions/Skeleton/ContributionsCardSkeleton';
import ContributionsList from 'components/Contributions/Contributions';
import useContributions from 'hooks/useContributions';
import {Col} from 'styles/components/GridStyle';

const MyContributions = () => {
  const {items, hasMore, isInitialLoading, fetchMoreContributions} = useContributions(true);
  const contributionsList = Object.values(items);
  const panelHeading = 'My Contributions';

  if (isInitialLoading) {
    return <ContributionsCardSkeleton dataLength={4} panelHeading={panelHeading} />;
  }

  return (
    <Col size={12}>
      <ContributionsList
        contributionsList={contributionsList}
        fetchMore={fetchMoreContributions}
        hasMore={hasMore}
        panelHeading={panelHeading}
        selfContributions={true}
      />
    </Col>
  );
};

export default MyContributions;
