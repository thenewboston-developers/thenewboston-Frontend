import React from 'react';

import PanelHeading from 'components/PanelHeading';
import Skeleton from 'components/Skeleton';
import {Row, Col} from 'styles/components/GridStyle';
import {SFC} from 'types';

import * as S from './Styles';

const TopContributorsSkeleton: SFC = () => {
  const CONTRIBUTORS_COUNT = 3;

  const getContributor = (key: number) => (
    <React.Fragment key={key}>
      <Row>
        <Col size={2}>
          <S.LogoContainer>
            <Skeleton circle width={45} height={45} />
          </S.LogoContainer>
        </Col>
        <Col size={10}>
          <S.NameContainer>
            <Skeleton width="100%" height={30} />
          </S.NameContainer>
        </Col>
      </Row>
      {key < CONTRIBUTORS_COUNT - 1 && <S.Line />}
    </React.Fragment>
  );

  const renderContent = () => (
    <S.Container>
      <PanelHeading heading="Top Contributors" />
      <S.ContributorCardContainer>
        {[...Array(CONTRIBUTORS_COUNT)].map((_, index) => getContributor(index))}
      </S.ContributorCardContainer>
    </S.Container>
  );

  return renderContent();
};

export default TopContributorsSkeleton;
