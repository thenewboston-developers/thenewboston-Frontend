import React, {useEffect, useState} from 'react';

import DefaultAvatar from 'assets/default-avatar.png';
import SectionHeading from 'components/SectionHeading';
import {Card} from 'styles/components/CardStyle';
import {getTopContributors} from 'utils/contributors';
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
            <S.ContributorListItem key={contributor.user.id}>
              <S.PositionIcon src={contributor.positionIcon || DefaultAvatar} alt={`Position ${contributor.user.id}`} />
              <S.Avatar src={contributor.user.avatar || DefaultAvatar} alt={`${contributor.user.username} avatar`} />
              <S.ContributorName>{contributor.user.username}</S.ContributorName>
              {contributor.core.logo && <S.CoreLogo src={contributor.core.logo} alt="Core logo" />}
              <S.ContributionAmount>{contributor.totalRewardAmount.toLocaleString()}</S.ContributionAmount>
            </S.ContributorListItem>
          ))}
        </S.ContributorList>
      </Card>
    </div>
  );
};

export default TopContributors;
