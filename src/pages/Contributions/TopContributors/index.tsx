import React, {useEffect, useState} from 'react';

import CoreLogo from 'components/CoreLogo';
import DefaultAvatar from 'assets/default-avatar.png';
import SectionHeading from 'components/SectionHeading';
import {Card} from 'styles/components/CardStyle';
import {Contribution, Contributor} from 'types';
import {ContributionCard} from 'components/Contributions/ContributionCard';
import {getTopContributors} from 'utils/contributions';
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
    <section className={className}>
      <SectionHeading
        heading={topContributors.length ? `Top ${topContributors.length} Contributors` : 'Top Contributors'}
      />
      <Card>
        <S.ContributorList>
          {topContributors.map((contributor) => (
            <ContributionCard key={contributor.user.id}>
              <S.ContributorContainer>
                <S.UserLabelContainer>
                  <S.PositionIcon
                    src={contributor.positionIcon || DefaultAvatar}
                    alt={`Position ${contributor.user.id}`}
                  />
                  <S.UserLabel
                    avatar={contributor.user.avatar}
                    description=""
                    id={contributor.user.id}
                    username={contributor.user.username}
                  />
                </S.UserLabelContainer>
                <S.RewardAmountContainer>
                  {contributor.core.logo && <CoreLogo logo={contributor.core.logo} width="20px" />}
                  &nbsp;
                  {contributor.totalRewardAmount.toLocaleString()}
                </S.RewardAmountContainer>
              </S.ContributorContainer>
            </ContributionCard>
          ))}
        </S.ContributorList>
      </Card>
    </section>
  );
};

export default TopContributors;
