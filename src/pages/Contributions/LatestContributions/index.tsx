import {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import Contribution from 'components/Contributions/Contribution';
import PanelHeading from 'components/PanelHeading';
import {Col, Row} from 'styles/components/GridStyle';
import {Contribution as TContribution} from 'types';
import {getIa} from 'selectors/state';

interface LatestContributionsProps {
  className?: string;
  contributions: TContribution[];
}

const LatestContributions: FC<LatestContributionsProps> = ({className, contributions}) => {
  const ia = useSelector(getIa).ia;

  const contributionsList = useMemo(() => {
    return orderBy(Object.values(contributions), ['created_date'], ['desc']);
  }, [contributions]);

  const latestContributionsList = contributionsList.slice(0, 50);

  return (
    <div className={className}>
      <PanelHeading heading="Latest Contributions" />
      <Row $horizontalGap="15px" $verticalGap="5px">
        {latestContributionsList.map((contribution) => (
          <Col key={contribution.id} size={6}>
            <Contribution contribution={contribution} ia={ia}></Contribution>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default LatestContributions;
