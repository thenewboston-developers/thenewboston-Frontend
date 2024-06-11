import {useCallback} from 'react';

import {
  BENEFITS,
  MISSION_STATEMENT,
  SYSTEM_ARCHITECTURE,
  SYSTEM_ARCHITECTURE_CODE,
  USE_CASES,
  VISION_STATEMENT,
} from 'constants/coresLearnMore';
import LearnMoreCard from 'components/LearnMore/Card';
import LearnMoreList from 'components/LearnMore/List';
import Code from 'components/Code';
import {SFC, LearnMore as TLearnMore} from 'types';

import * as S from './Styles';

const LearnMore: SFC = ({className}) => {
  const getLearnMoreList = useCallback((obj?: object) => <LearnMoreList list={obj ? Object.values(obj) : []} />, []);

  const getVisionStatement = useCallback(() => {
    return <LearnMoreCard content={VISION_STATEMENT} />;
  }, []);

  const getMissionStatement = useCallback(() => {
    return <LearnMoreCard content={MISSION_STATEMENT} />;
  }, []);

  const getBenefits = useCallback(() => {
    return <LearnMoreCard content={BENEFITS} children={getLearnMoreList(BENEFITS.obj)} />;
  }, [getLearnMoreList]);

  const getUseCases = useCallback(() => {
    return <LearnMoreCard content={USE_CASES} children={getLearnMoreList(USE_CASES.obj)} />;
  }, [getLearnMoreList]);

  const getSystemArchitecture = useCallback(() => {
    const getCodeSection = (data: TLearnMore) => {
      return (
        <S.CodeContainer>
          <S.CodeTitleContainer>
            <S.Img alt="tag icon" src={data.logo}></S.Img>
            <S.CodeTitle>{data.title}</S.CodeTitle>
          </S.CodeTitleContainer>
          <Code data={data.obj} />
          <br />
          <S.CodeDetail>{data.detail}</S.CodeDetail>
        </S.CodeContainer>
      );
    };

    return (
      <LearnMoreCard content={SYSTEM_ARCHITECTURE} contentDisplayStyle="flex" contentWidth="50%">
        {getCodeSection(SYSTEM_ARCHITECTURE_CODE)}
      </LearnMoreCard>
    );
  }, []);

  const renderContent = () => (
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

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default LearnMore;
