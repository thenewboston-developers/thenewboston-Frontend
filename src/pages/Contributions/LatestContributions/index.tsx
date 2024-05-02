import {FC, useMemo} from 'react';
import {Link} from 'react-router-dom';
import orderBy from 'lodash/orderBy';
import {
  mdiCalendarOutline,
  mdiCodeBrackets,
  mdiFaceWomanOutline,
  mdiGithub,
  mdiSquareRoundedBadgeOutline,
} from '@mdi/js';

import Line from 'components/Line';
import PanelHeading from 'components/PanelHeading';
import ReadMoreLess from 'components/ReadMoreLess';
import {
  ContributionCard,
  ContributionCardBody,
  ContributionCardHeader,
  ContributionCardItem,
} from 'components/Contributions/ContributionCard';
import {ContributorInfo} from 'components/Contributions/ContributorInfo';
import {Col, Row} from 'styles/components/GridStyle';
import {Contribution} from 'types';
import {getTimeAgo} from 'utils/dates';
import {getPullRequestUrl, getRepositoryUrl, getUserProfileUrl} from 'utils/github';
import * as S from './Styles';

interface LatestContributionsProps {
  className?: string;
  contributions: Contribution[];
}

const LatestContributions: FC<LatestContributionsProps> = ({className, contributions}) => {
  const contributionsList = useMemo(() => {
    return orderBy(Object.values(contributions), ['created_date'], ['desc']);
  }, [contributions]);
  const latestContributionsList = contributionsList.slice(0, 50);

  const userProfileLink = (contribution: Contribution) => `/profile/${contribution.user.id}`;
  const githubUserProfileLink = (contribution: Contribution) =>
    getUserProfileUrl(contribution.github_user.github_username);
  const githubRepositoryLink = (contribution: Contribution) =>
    getRepositoryUrl(contribution.repo.owner_name, contribution.repo.name);
  const githubPullRequestLink = (contribution: Contribution) =>
    getPullRequestUrl(contribution.repo.owner_name, contribution.repo.name, contribution.pull.issue_number);

  return (
    <div className={className}>
      <PanelHeading heading="Latest Contributions" />
      <Row $horizontalGap="15px" $verticalGap="5px">
        {latestContributionsList.map((contribution) => (
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
                  <ContributionCardItem
                    iconPath={mdiGithub}
                    iconLink={githubUserProfileLink(contribution)}
                    isIconLinkExternal={true}
                  >
                    <Link to={githubUserProfileLink(contribution)} target="_blank">
                      {contribution.github_user.github_username}
                    </Link>
                  </ContributionCardItem>
                </Col>
                <Col size={6}>
                  <ContributionCardItem
                    iconPath={mdiCodeBrackets}
                    iconLink={githubRepositoryLink(contribution)}
                    isIconLinkExternal={true}
                  >
                    <Link to={githubRepositoryLink(contribution)} target="_blank">
                      {contribution.repo.name}
                    </Link>
                  </ContributionCardItem>
                </Col>
              </ContributionCardBody>
              <ContributionCardBody>
                <Col size={6}>
                  <ContributionCardItem
                    iconPath={mdiSquareRoundedBadgeOutline}
                    iconLink={contribution?.pull ? githubPullRequestLink(contribution) : ''}
                    isIconLinkExternal={true}
                  >
                    {contribution?.pull ? (
                      <Link to={githubPullRequestLink(contribution)} target="_blank">
                        {contribution.pull.title}
                      </Link>
                    ) : (
                      'Not Found'
                    )}
                  </ContributionCardItem>
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
                  <ContributionCardItem iconPath={mdiFaceWomanOutline} iconLink={userProfileLink(contribution)}>
                    <S.DescriptionHeading>
                      <Link to={userProfileLink(contribution)}>
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
    </div>
  );
};

export default LatestContributions;
