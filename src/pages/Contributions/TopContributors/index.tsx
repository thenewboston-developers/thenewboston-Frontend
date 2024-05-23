import {FC} from 'react';

import DefaultAvatar from 'assets/default-avatar.svg';
import CoreLogo from 'components/CoreLogo';
import PanelHeading from 'components/PanelHeading';
import {Contributor} from 'types';
import * as S from './Styles';

interface TopContributorsProps {
  className?: string;
  topContributors: Contributor[];
}

const TopContributors: FC<TopContributorsProps> = ({className, topContributors}) => {
  const renderContributorList = () => {
    return (
      <S.ContributorList>
        {topContributors.map((contributor) => (
          <S.ContributorContainer key={contributor.user.id}>
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
