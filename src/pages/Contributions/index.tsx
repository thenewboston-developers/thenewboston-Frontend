import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import ContributionsList from 'components/Contributions/Contributions';
import EmptyText from 'components/EmptyText';
import Toolbar from './Toolbar';
import TopContributors from './TopContributors';
import TotalContributionsChart from './TotalContributionsChart';
import {AppDispatch, SFC} from 'types';
import {Col, Row} from 'styles/components/GridStyle';
import {UserIdFilterValues} from 'enums';
import {getContributions as _getContributions} from 'dispatchers/contributions';
import {getContributions} from 'selectors/state';
import {getTopContributors} from 'utils/contributions';
import * as S from './Styles';

interface ContributionsProps {
  className?: string;
  selfContributions?: boolean;
}

const Contributions: SFC<ContributionsProps> = ({className, selfContributions = false}) => {
  const {count, items, hasMore, isLoading} = useSelector(getContributions);
  const contributions = items;
  console.log(contributions, count, hasMore, isLoading);
  const dispatch = useDispatch<AppDispatch>();

  const apiParams = useMemo(() => {
    if (selfContributions) {
      return {user_id: UserIdFilterValues.SELF};
    } else {
      return {};
    }
  }, [selfContributions]);

  useEffect(() => {
    dispatch(_getContributions(apiParams));
  }, [apiParams, dispatch]);

  const contributionList = useMemo(() => {
    return orderBy(Object.values(contributions), ['created_date'], ['asc']);
  }, [contributions]);

  const renderContent = () => {
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
    const topContributors = getTopContributors(contributionList);
    return (
      <>
        {topContributors.length > 0 ? (
          <Col size={4}>
            <TopContributors topContributors={topContributors} />
          </Col>
        ) : null}
        <Col size={8}>
          <TotalContributionsChart contributions={contributionList} />
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
