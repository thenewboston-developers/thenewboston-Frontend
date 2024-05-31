import {FC} from 'react';
import {Link} from 'react-router-dom';
import {
  mdiCalendarOutline,
  mdiCodeBrackets,
  mdiFaceWomanOutline,
  mdiGithub,
  mdiSquareRoundedBadgeOutline,
} from '@mdi/js';

import {
  ContributionCard,
  ContributionCardBody,
  ContributionCardHeader,
  ContributionCardItem,
} from 'components/Contributions/ContributionCard';
import Line from 'components/Line';
import ReadMoreLess from 'components/ReadMoreLess';
import {Col} from 'styles/components/GridStyle';
import {Contribution as TContribution, UserReadSerializer} from 'types';
import {ContributorInfo} from 'components/Contributions/ContributorInfo';
import {getPullRequestUrl, getRepositoryUrl, getUserProfileUrl} from 'utils/github';
import {getTimeAgo} from 'utils/dates';
import * as S from './Styles';

interface ContributionProps {
  className?: string;
  contribution: TContribution;
  ia?: UserReadSerializer | null;
}

const Contribution: FC<ContributionProps> = ({className, contribution, ia}) => {
  const githubRepositoryLink = contribution.repo
    ? getRepositoryUrl(contribution.repo.owner_name, contribution.repo.name)
    : '';
  const githubUserProfileLink = contribution.github_user
    ? getUserProfileUrl(contribution.github_user.github_username)
    : '';
  const githubPullRequestLink =
    contribution.repo && contribution.pull
      ? getPullRequestUrl(contribution.repo.owner_name, contribution.repo.name, contribution.pull.issue_number)
      : '';
  const iaProfileLink = ia ? `/profile/${ia.id}` : '';
  const NO_GITHUB_DETAILS_FOUND_TEXT = 'Not Found';

  return (
    <div className={className}>
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
            <ContributionCardItem iconPath={mdiGithub} iconLink={githubUserProfileLink} isIconLinkExternal={true}>
              {githubUserProfileLink ? (
                <Link to={githubUserProfileLink} target="_blank">
                  {contribution?.github_user?.github_username}
                </Link>
              ) : (
                NO_GITHUB_DETAILS_FOUND_TEXT
              )}
            </ContributionCardItem>
          </Col>
          <Col size={6}>
            <ContributionCardItem iconPath={mdiCodeBrackets} iconLink={githubRepositoryLink} isIconLinkExternal={true}>
              {githubRepositoryLink ? (
                <Link to={githubRepositoryLink} target="_blank">
                  {contribution?.repo?.name || NO_GITHUB_DETAILS_FOUND_TEXT}
                </Link>
              ) : (
                NO_GITHUB_DETAILS_FOUND_TEXT
              )}
            </ContributionCardItem>
          </Col>
        </ContributionCardBody>
        <ContributionCardBody>
          <Col size={6}>
            <ContributionCardItem
              iconPath={mdiSquareRoundedBadgeOutline}
              iconLink={githubPullRequestLink}
              isIconLinkExternal={true}
            >
              {githubPullRequestLink ? (
                <Link to={githubPullRequestLink} target="_blank">
                  {contribution?.pull?.title || ''}
                </Link>
              ) : (
                NO_GITHUB_DETAILS_FOUND_TEXT
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
            <ContributionCardItem avatarSrc={ia?.avatar || ''} iconPath={mdiFaceWomanOutline} iconLink={iaProfileLink}>
              <S.DescriptionHeading>
                <Link to={iaProfileLink}>
                  <b>ia</b>
                </Link>
                <small style={{marginLeft: '5px'}}>{getTimeAgo(contribution.created_date)}</small>
              </S.DescriptionHeading>
            </ContributionCardItem>
            <S.Description>
              <ReadMoreLess
                text={contribution?.pull?.assessment_explanation || contribution?.assessment_explanation || ''}
                maxLength={180}
              />
            </S.Description>
          </div>
        </ContributionCardHeader>
      </ContributionCard>
    </div>
  );
};

export default Contribution;
