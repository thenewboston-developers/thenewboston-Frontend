import React, {useEffect, useState} from 'react';

import DefaultAvatar from 'assets/default-avatar.png';
import SectionHeading from 'components/SectionHeading';
import {Card} from 'styles/components/CardStyle';
import {ContributionCard, ContributionCardHeader} from 'components/Contributions/ContributionCard';
import {ContributorInfo} from 'components/Contributions/ContributorInfo';
import {getTopContributors} from 'utils/contributions';
import {Contribution, Contributor} from 'types';
import * as S from './Styles';

interface TopContributorsProps {
  className?: string;
  contributions: Contribution[];
}

const TopContributors: React.FC<TopContributorsProps> = ({className, contributions}) => {
  const [topContributors, setTopContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    setTopContributors(getTopContributors(contributions));
  }, [contributions]);

  return (
    <div className={className}>
      <SectionHeading
        heading={topContributors.length ? `Top ${topContributors.length} Contributors` : 'Top Contributors'}
      />
      <Card>
        <S.ContributorList>
          {topContributors.map((contributor) => (
            <ContributionCard key={contributor.user.id}>
              <ContributionCardHeader>
                <S.PositionIcon
                  src={contributor.positionIcon || DefaultAvatar}
                  alt={`Position ${contributor.user.id}`}
                />
                <ContributorInfo
                  core={contributor.core}
                  user={contributor.user}
                  rewardAmount={contributor.totalRewardAmount}
                />
              </ContributionCardHeader>
            </ContributionCard>
          ))}
        </S.ContributorList>
      </Card>
    </div>
  );
};

export default TopContributors;
