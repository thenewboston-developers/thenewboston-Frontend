import {
  CONTRIBUTION_TYPES,
  HOW_TO_BECOME_GITHUB_CONTRIBUTOR,
  HOW_TO_BECOME_MANUAL_CONTRIBUTOR,
  HOW_CONTRIBUTION_IS_DETERMINED,
  OVERVIEW,
} from 'constants/contributionsLearnMore';
import LearnMoreCard from 'components/LearnMore/Card';
import {SFC} from 'types';

import * as S from './Styles';

const LearnMore: SFC = ({className}) => {
  const firstRowMinHeight = '430px';
  const secondRowMinHeight = '380px';

  const renderContent = () => (
    <>
      <S.Row>
        <S.Col size={6}>
          <LearnMoreCard content={OVERVIEW} minHeight={firstRowMinHeight} />
        </S.Col>
        <S.Col size={6}>
          <LearnMoreCard content={CONTRIBUTION_TYPES} minHeight={firstRowMinHeight} />
        </S.Col>
      </S.Row>
      <S.Row>
        <S.Col size={4}>
          <LearnMoreCard content={HOW_TO_BECOME_GITHUB_CONTRIBUTOR} minHeight={secondRowMinHeight} />
        </S.Col>
        <S.Col size={4}>
          <LearnMoreCard content={HOW_TO_BECOME_MANUAL_CONTRIBUTOR} minHeight={secondRowMinHeight} />
        </S.Col>
        <S.Col size={4}>
          <LearnMoreCard content={HOW_CONTRIBUTION_IS_DETERMINED} minHeight={secondRowMinHeight} />
        </S.Col>
      </S.Row>
    </>
  );

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default LearnMore;
