import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ContributionsList from 'components/Contributions/Contributions';
import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import Toolbar from './Toolbar';
import TopContributors from './TopContributors';
import ContributionsCumulativeChart from './ContributionsCumulativeChart';
import {AppDispatch, SFC} from 'types';
import {Col, Row} from 'styles/components/GridStyle';
import {UserIdFilterValues} from 'enums';
import {displayErrorToast} from 'utils/toasts';
import {
  getContributions as _getContributions,
  resetContributions as _resetContributions,
} from 'dispatchers/contributions';
import {getContributions} from 'selectors/state';

import * as S from './Styles';

interface ContributionsProps {
  className?: string;
  selfContributions?: boolean;
}

const Contributions: SFC<ContributionsProps> = ({className, selfContributions = false}) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const {items, hasMore, isLoading} = useSelector(getContributions);
  const contributions = items;
  const dispatch = useDispatch<AppDispatch>();

  const contributionList = useMemo(() => {
    return Object.values(contributions);
  }, [contributions]);

  const apiParams = useMemo(() => {
    if (selfContributions) {
      return {user_id: UserIdFilterValues.SELF};
    } else {
      return {};
    }
  }, [selfContributions]);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setIsInitialLoading(true);
        await dispatch(_resetContributions());
        await dispatch(_getContributions(apiParams));
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching contributions');
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchContributions();
  }, [apiParams, dispatch]);

  const fetchMoreContributions = async () => {
    if (!isLoading) {
      await dispatch(_getContributions());
    }
  };

  const renderContent = () => {
    if (isInitialLoading) {
      return <Loader className="align-screen-center" size={24} />;
    }
    if (selfContributions) {
      return renderSelfContributionsContent();
    } else {
      return renderHomeContributionsContent();
    }
  };

  const renderHomeContributionsContent = () => {
    if (!contributionList?.length) {
      return renderEmptyText();
    }
    return (
      <>
        <Col size={4}>
          <TopContributors />
        </Col>
        <Col size={8}>
          <ContributionsCumulativeChart />
        </Col>
        <br />
        <Col size={12}>
          <ContributionsList
            contributionsList={contributionList.slice(0, 50)}
            panelHeading={'Latest Contributions'}
            selfContributions={selfContributions}
          />
        </Col>
      </>
    );
  };

  const renderSelfContributionsContent = () => {
    return (
      <Col size={12}>
        <ContributionsList
          contributionsList={contributionList}
          fetchMore={fetchMoreContributions}
          hasMore={hasMore}
          panelHeading={'My Contributions'}
          selfContributions={selfContributions}
        />
        {!contributionList?.length ? renderEmptyText() : null}
      </Col>
    );
  };

  const renderEmptyText = () => {
    return (
      <Col size={12}>
        <EmptyText>No contributions found</EmptyText>
      </Col>
    );
  };

  return (
    <S.Container className={className}>
      <Toolbar />
      <S.ContributionsContainer>
        <Row>{renderContent()}</Row>
      </S.ContributionsContainer>
    </S.Container>
  );
};

export default Contributions;
