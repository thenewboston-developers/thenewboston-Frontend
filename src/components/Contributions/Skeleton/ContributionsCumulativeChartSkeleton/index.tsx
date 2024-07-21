import PanelHeading from 'components/PanelHeading';
import Skeleton from 'components/Skeleton';
import {Row, Col} from 'styles/components/GridStyle';
import {SFC} from 'types';

import * as S from './Styles';

const ContributionsCumulativeChartSkeleton: SFC = () => {
  const renderContent = () => (
    <S.Container>
      <S.ChartHeader>
        <PanelHeading heading="Total Contributions" />
        <S.AmountContainer>
          <Skeleton circle width={25} height={25} />
          <Skeleton width={80} height={20} />
        </S.AmountContainer>
      </S.ChartHeader>
      <S.ChartContainer>
        <Row>
          <Col size={12}>
            <Skeleton width="100%" height={380} />
          </Col>
        </Row>
      </S.ChartContainer>
    </S.Container>
  );

  return renderContent();
};

export default ContributionsCumulativeChartSkeleton;
