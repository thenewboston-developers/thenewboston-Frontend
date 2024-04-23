import {FC, useEffect, useState} from 'react';

import DefaultAvatar from 'assets/default-avatar.png';
import CoreLogo from 'components/CoreLogo';
import PanelHeading from 'components/PanelHeading';
import {Contribution, Contributor} from 'types';
import {getTopContributors} from 'utils/contributions';
import * as S from './Styles';

interface TopContributorsProps {
  className?: string;
  contributions: Contribution[];
}

const TopContributors: FC<TopContributorsProps> = ({className, contributions}) => {
  const [topContributors, setTopContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    setTopContributors(getTopContributors(contributions));
  }, [contributions]);

  const renderContributorList = () => {
    return (
      <S.ContributorList>
        {topContributors.map((contributor) => (
          <S.ContributorContainer>
            <S.UserLabelContainer>
              <S.PositionIcon src={contributor.positionIcon || DefaultAvatar} alt={`Position ${contributor.user.id}`} />
              <S.UserLabel
                avatar={contributor.user.avatar}
                description=""
                id={contributor.user.id}
                username={contributor.user.username}
              />
            </S.UserLabelContainer>
            <S.RewardAmountContainer>
              {contributor.core.logo && <CoreLogo logo={contributor.core.logo} width="22px" />}
              &nbsp;
              {contributor.totalRewardAmount.toLocaleString()}
            </S.RewardAmountContainer>
          </S.ContributorContainer>
        ))}
      </S.ContributorList>
    );
  };

  return (
    <section className={className}>
      <PanelHeading
        heading={topContributors.length ? `Top ${topContributors.length} Contributors` : 'Top Contributors'}
      />
      {renderContributorList()}
    </section>
  );
};

export default TopContributors;
