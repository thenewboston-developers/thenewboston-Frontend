import {FC} from 'react';
import {useSelector} from 'react-redux';

import Button from 'components/Button';
import {useToggle} from 'hooks';
import CourseModal from 'modals/ContributionCreateModal';
import Contribution from 'components/Contributions/Contribution';
import PanelHeading from 'components/PanelHeading';
import {Col, Row} from 'styles/components/GridStyle';
import {Contribution as TContribution} from 'types';
import {getIa} from 'selectors/state';

import * as S from './Styles';

interface ContributionsProps {
  className?: string;
  contributionsList: TContribution[];
  panelHeading: string;
  selfContributions?: boolean;
}

const Contributions: FC<ContributionsProps> = ({
  className,
  contributionsList,
  panelHeading,
  selfContributions = false,
}) => {
  const ia = useSelector(getIa).ia;
  const [createNewContributionModalIsOpen, toggleCreateNewContributionModal] = useToggle(false);

  const renderCreateNewContributionModal = () => {
    return createNewContributionModalIsOpen ? <CourseModal close={toggleCreateNewContributionModal} /> : null;
  };

  return (
    <div className={className}>
      <S.PanelHeadingContainer>
        <PanelHeading heading={panelHeading} />
        {selfContributions && <Button onClick={toggleCreateNewContributionModal} text="Create New" />}
      </S.PanelHeadingContainer>
      <Row $horizontalGap="15px" $verticalGap="5px">
        {contributionsList.map((contribution) => (
          <Col key={contribution.id} size={6}>
            <Contribution contribution={contribution} ia={ia}></Contribution>
          </Col>
        ))}
      </Row>
      {selfContributions && renderCreateNewContributionModal()}
    </div>
  );
};

export default Contributions;
