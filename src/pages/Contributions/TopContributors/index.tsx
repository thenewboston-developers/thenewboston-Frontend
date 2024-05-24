import {FC, useEffect, useState} from 'react';

import DefaultAvatar from 'assets/default-avatar.svg';
import CoreLogo from 'components/CoreLogo';
import PanelHeading from 'components/PanelHeading';
import {TopContribution, TopContributor} from 'types/topContributions';
import {getTopContributors} from 'utils/topContributions';
import * as S from './Styles';
import {mdiSwapHorizontal} from '@mdi/js';
import ContributorContainer from 'components/Contributions/ContributorContainer';

interface TopContributorsProps {
  className?: string;
  topContributions: TopContribution[];
  onFilterChange: (filter: string) => void;
}

const TopContributors: FC<TopContributorsProps> = ({topContributions, onFilterChange}) => {
  const [topContributors, setTopContributors] = useState<TopContributor[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  useEffect(() => {
    setTopContributors(getTopContributors(topContributions));
  }, [topContributions]);

  const handleOptionClick = (filter: string) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  const menuOptions = [
    {
      disabled: true,
      label: 'FILTER BY',
    },
    {
      checked: selectedFilter === 'none',
      label: 'None',
      onClick: () => handleOptionClick('none'),
      radio: true,
      radioName: 'timeFilter',
    },
    {
      checked: selectedFilter === 'today',
      label: 'Today',
      onClick: () => handleOptionClick('today'),
      radio: true,
      radioName: 'timeFilter',
    },
    {
      checked: selectedFilter === 'week',
      label: 'This Week',
      onClick: () => handleOptionClick('week'),
      radio: true,
      radioName: 'timeFilter',
    },
    {
      checked: selectedFilter === 'all',
      label: 'All Time',
      onClick: () => handleOptionClick('all'),
      radio: true,
      radioName: 'timeFilter',
    },
  ];

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
              {contributor.user.logo_url && <CoreLogo logo={contributor.user.logo_url} width="22px" />}
              &nbsp;
              {contributor.user.total.toLocaleString()}
            </S.RewardAmountContainer>
          </S.ContributorContainer>
        ))}
      </S.ContributorList>
    );
  };

  return (
    <section>
      <ContributorContainer>
        <PanelHeading
          heading={topContributors.length ? `Top ${topContributors.length} Contributors` : 'Top Contributors'}
        />
        <S.DropdownMenu title={'filter'} icon={mdiSwapHorizontal} options={menuOptions} />
      </ContributorContainer>
      {renderContributorList()}
    </section>
  );
};

export default TopContributors;
