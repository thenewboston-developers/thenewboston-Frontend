import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import orderBy from 'lodash/orderBy';
import {
  mdiGithub,
  mdiCodeBrackets,
  mdiSquareRoundedBadgeOutline,
  mdiCalendarOutline,
  mdiFaceWomanOutline,
} from '@mdi/js';

import SectionHeading from 'components/SectionHeading';
import ReadMoreLess from 'components/ReadMoreLess';
import {
  ContributionCard,
  ContributionCardHeader,
  ContributionCardBody,
  ContributionCardItem,
} from 'components/Contributions/ContributionCard';
import {ContributorInfo} from 'components/Contributions/ContributorInfo';
import {Card} from 'styles/components/CardStyle';
import {Row, Col} from 'styles/components/GridStyle';
import {getTimeAgo} from 'utils/dates';
import Line from 'components/Line';
import {Contribution} from 'types';
import * as S from './Styles';

interface LatestContributionsProps {
  className?: string;
  contributions: Contribution[];
}

const LatestContributions: React.FC<LatestContributionsProps> = ({className, contributions}) => {
  const latestContributions = contributions.slice(0, 20);

  const latestContributionList = useMemo(() => {
    return orderBy(Object.values(latestContributions), ['created_date'], ['desc']);
  }, [latestContributions]);

  const userProfileLink = (id: number) => `/profile/${id}`;

  return (
    <div className={className}>
      <SectionHeading heading="Latest Contributions" />
      <Card>
        <Row verticalgap="5px" horizontalgap="15px">
          {latestContributionList.map((contribution) => (
            <Col key={contribution.id} size={6}>
              <ContributionCard key={contribution.user.id}>
                <ContributionCardHeader>
                  <ContributorInfo
                    core={contribution.core}
                    user={contribution.user}
                    rewardAmount={contribution.reward_amount}
                  />
                </ContributionCardHeader>
                <Line />
                <ContributionCardBody>
                  <Col size={6}>
                    <ContributionCardItem iconPath={mdiGithub}>
                      {contribution.github_user.github_username}
                    </ContributionCardItem>
                  </Col>
                  <Col size={6}>
                    <ContributionCardItem iconPath={mdiCodeBrackets}>{contribution.repo.name}</ContributionCardItem>
                  </Col>
                </ContributionCardBody>
                <ContributionCardBody>
                  <Col size={6}>
                    <ContributionCardItem iconPath={mdiSquareRoundedBadgeOutline}>Notifications</ContributionCardItem>
                  </Col>
                  <Col size={6}>
                    <ContributionCardItem iconPath={mdiCalendarOutline}>
                      {new Date(contribution.created_date).toLocaleDateString()}
                    </ContributionCardItem>
                  </Col>
                </ContributionCardBody>
                <Line />
                <ContributionCardHeader>
                  <div>
                    <ContributionCardItem
                      iconPath={mdiFaceWomanOutline}
                      iconLink={userProfileLink(contribution.user.id)}
                    >
                      <S.DescriptionHeading>
                        <Link to={userProfileLink(contribution.user.id)}>
                          <b>ia</b>
                        </Link>
                        <small style={{marginLeft: '5px'}}>{getTimeAgo(contribution.created_date)}</small>
                      </S.DescriptionHeading>
                    </ContributionCardItem>
                    <S.Description>
                      <ReadMoreLess text={contribution?.pull?.assessment_explanation} maxLength={180} />
                    </S.Description>
                  </div>
                </ContributionCardHeader>
              </ContributionCard>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default LatestContributions;
