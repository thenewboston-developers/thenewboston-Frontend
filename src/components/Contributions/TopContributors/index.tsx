import {useEffect, FC, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import CoreLogo from 'components/CoreLogo';
import DefaultAvatar from 'assets/default_avatar.svg';
import PanelHeading from 'components/PanelHeading';
import TopContributorsSkeleton from 'components/Contributions/Skeleton/TopContributorsSkeleton';
import {AppDispatch} from 'types';
import {displayErrorToast} from 'utils/toasts';
import {getContributors as getContributorsState} from 'selectors/state';
import {getPositionIcon} from 'utils/contributions';
import {
  getTopContributors as _getTopContributors,
  resetContributors as _resetContributors,
} from 'dispatchers/contributors';

import * as S from './Styles';
import {CONTRIBUTION_DURATION_DAYS} from './constants';
import Filters from './Filters';

interface TopContributorsProps {
  className?: string;
}

const TopContributors: FC<TopContributorsProps> = ({className}) => {
  const [daysBack, setDaysBack] = useState<number | null>(CONTRIBUTION_DURATION_DAYS.WEEK);
  const dispatch = useDispatch<AppDispatch>();
  const {items, isLoading} = useSelector(getContributorsState);
  const topContributors = items;

  useEffect(() => {
    (async () => {
      try {
        dispatch(_resetContributors());
        await dispatch(_getTopContributors(daysBack));
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching top contributors');
      }
    })();
  }, [dispatch, daysBack]);

  const renderContributorList = () => {
    if (topContributors.length === 0 && !isLoading) {
      return (
        <S.ContributorList>
          <S.ContributorContainer>
            No top contributors found.
            <br />
            Looks like our contributors are on a break! Be the first to make a splash!
          </S.ContributorContainer>
        </S.ContributorList>
      );
    }

    return (
      <S.ContributorList>
        {topContributors.map((contributor) => (
          <S.ContributorContainer key={contributor.user.id}>
            <S.UserLabelContainer>
              <S.PositionIcon
                src={getPositionIcon(contributor.position) || DefaultAvatar}
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
              {contributor.core.logo && <CoreLogo logo={contributor.core.logo} width="22px" />}
              &nbsp;
              {contributor.total_reward_amount.toLocaleString()}
            </S.RewardAmountContainer>
          </S.ContributorContainer>
        ))}
      </S.ContributorList>
    );
  };

  if (isLoading) {
    return <TopContributorsSkeleton />;
  }

  const headerLabel = topContributors.length ? `Top ${topContributors.length} Contributors` : 'Top Contributors';

  const heading = (
    <div>
      {headerLabel}
      <S.FilterSpan>
        <Filters onClick={(value: number | null) => setDaysBack(value)} value={daysBack} />
      </S.FilterSpan>
    </div>
  );

  return (
    <section className={className}>
      <PanelHeading heading={heading} />
      {renderContributorList()}
    </section>
  );
};

export default TopContributors;
