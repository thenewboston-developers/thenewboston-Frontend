import {
  BENEFITS,
  MISION_STATEMENT,
  SYSTEM_ARCHITECTURE,
  SYSTEM_ARCHITECTURE_CODE,
  USE_CASES,
  VISION_STATEMENT,
} from 'constants/coresLearnMore';
import LearnMoreCard from 'components/LearnMore/Card';
import LearnMoreList from 'components/LearnMore/List';
import {SFC, LearnMore as TLearnMore} from 'types';

import * as S from './Styles';

const LearnMore: SFC = ({className}) => {
  const getVisionStatement = () => {
    return <LearnMoreCard content={VISION_STATEMENT} />;
  };

  const getMissionStatement = () => {
    return <LearnMoreCard content={MISION_STATEMENT} />;
  };

  const getBenefits = () => {
    return <LearnMoreCard content={BENEFITS} children={getLearnMoreList(BENEFITS.obj)} />;
  };

  const getUseCases = () => {
    return <LearnMoreCard content={USE_CASES} children={getLearnMoreList(USE_CASES.obj)} />;
  };

  const getSystemArchitecture = () => {
    const getCode = (data: any) => {
      console.log(data);
      const renderValue = (value: any) => {
        if (typeof value === 'object' && value !== null) {
          return getCode(data);
        }
        return <span>{String(value)}</span>;
      };

      return (
        <S.Code>
          {`{`}
          {Object.entries(data).map(([key, value]) => (
            <S.CodeValueWrapper key={key}>
              {`"${key}": `}
              {renderValue(value)}
            </S.CodeValueWrapper>
          ))}
          {`}`}
        </S.Code>
      );
    };

    const getCodeSection = (data: TLearnMore) => {
      return (
        <S.CodeContainer>
          <S.CodeTitleContainer>
            <S.Img alt="tag icon" src={data.logo}></S.Img>
            <S.CodeTitle>{data.title}</S.CodeTitle>
          </S.CodeTitleContainer>
          {getCode(data.obj)}
          <br />
          <S.CodeDetail>{data.detail}</S.CodeDetail>
        </S.CodeContainer>
      );
    };

    return (
      <LearnMoreCard
        children={getCodeSection(SYSTEM_ARCHITECTURE_CODE)}
        content={SYSTEM_ARCHITECTURE}
        contentDisplayStyle="flex"
        contentWidth="50%"
      />
    );
  };

  const getLearnMoreList = (obj?: object) => {
    return <LearnMoreList list={obj ? Object.values(obj) : []} />;
  };

  const renderContent = () => {
    return (
      <>
        <S.Row>
          <S.Col size={6}>{getVisionStatement()}</S.Col>
          <S.Col size={6}>{getMissionStatement()}</S.Col>
        </S.Row>
        <S.Row>
          <S.Col size={12}>{getSystemArchitecture()}</S.Col>
        </S.Row>
        <S.Row>
          <S.Col size={6}>{getBenefits()}</S.Col>
          <S.Col size={6}>{getUseCases()}</S.Col>
        </S.Row>
      </>
    );
  };

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default LearnMore;
