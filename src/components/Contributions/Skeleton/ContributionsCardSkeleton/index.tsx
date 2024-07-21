import PanelHeading from 'components/PanelHeading';
import Skeleton from 'components/Skeleton';
import {Row, Col} from 'styles/components/GridStyle';
import {SFC} from 'types';

import * as S from './Styles';

interface ContributionsCardSkeletonProps {
  dataLength: number;
  panelHeading: string;
}

const ContributionsCardSkeleton: SFC<ContributionsCardSkeletonProps> = ({dataLength, panelHeading}) => {
  const getContributionCard = (key: number) => (
    <S.CardContainer key={key}>
      <S.CardHeader>
        <S.CardItem>
          <Skeleton circle width={45} height={45} />
          <Skeleton width={100} height={25} />
        </S.CardItem>
      </S.CardHeader>
      <S.Line />
      <S.CardBody>
        <Row>
          <Col size={6}>
            <Skeleton width={130} height={30} />
          </Col>
          <Col size={6}>
            <Skeleton width={130} height={30} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col size={6}>
            <Skeleton width={130} height={30} />
          </Col>
          <Col size={6}>
            <Skeleton width={130} height={30} />
          </Col>
        </Row>
      </S.CardBody>
      <S.Line />
      <S.CardBody>
        <Row>
          <Col size={12}>
            <Skeleton width="100%" height={100} />
          </Col>
        </Row>
      </S.CardBody>
    </S.CardContainer>
  );

  return (
    <S.Container>
      <PanelHeading heading={panelHeading} />
      <br />
      <Row>
        {Array.from({length: dataLength}, (_, index) => (
          <Col size={6} key={index}>
            {getContributionCard(index)}
          </Col>
        ))}
      </Row>
    </S.Container>
  );
};

export default ContributionsCardSkeleton;
