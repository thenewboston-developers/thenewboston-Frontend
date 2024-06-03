import {useEffect, FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import CoreLogo from 'components/CoreLogo';
import DefaultAvatar from 'assets/default-avatar.svg';
import PanelHeading from 'components/PanelHeading';
import {AppDispatch} from 'types';
import {displayErrorToast} from 'utils/toasts';
import {getContributors as getContributorsState} from 'selectors/state';
import {getPositionIcon} from 'utils/contributions';
import {
  getTopContributors as _getTopContributors,
  resetContributors as _resetContributors,
} from 'dispatchers/contributors';

import * as S from './Styles';

interface TopContributorsProps {
  className?: string;
}

const TopContributors: FC<TopContributorsProps> = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {items, isLoading} = useSelector(getContributorsState);
  const topConstributors = items;

  useEffect(() => {
    (async () => {
      try {
        dispatch(_resetContributors());
        await dispatch(_getTopContributors());
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching top contributors');
      }
    })();
  }, [dispatch]);

  const renderContributorList = () => {
    if (isLoading) {
      return (
        <S.ContributorList>
          <S.Loader />
        </S.ContributorList>
      );
    }

    if (topConstributors.length === 0 && !isLoading) {
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
        {topConstributors.map((contributor) => (
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

  return (
    <section className={className}>
      <PanelHeading
        heading={topConstributors.length ? `Top ${topConstributors.length} Contributors` : 'Top Contributors'}
      />
      {renderContributorList()}
    </section>
  );
};

export default TopContributors;
