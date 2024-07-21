import ContributionsCardSkeleton from 'components/Contributions/Skeleton/ContributionsCardSkeleton';
import ContributionsList from 'components/Contributions/Contributions';
import useContributions from 'hooks/useContributions';

const LatestContributions = () => {
  const {items, isInitialLoading} = useContributions();
  const contributionsList = Object.values(items);
  const panelHeading = 'Latest Contributions';

  if (isInitialLoading) {
    return <ContributionsCardSkeleton dataLength={4} panelHeading={panelHeading} />;
  }

  return <ContributionsList contributionsList={contributionsList.slice(0, 50)} panelHeading={panelHeading} />;
};

export default LatestContributions;
