import {SFC} from 'types';
import LearnMoreCardDetail from 'components/LearnMoreCardDetail';
import * as LearnMoreContent from 'constants/coresLearnMore';

import * as S from './Styles';

const LearnMore: SFC = ({className}) => {
  const VisionStatement = () => {
    return (
      <S.LearnMoreCardContainer className={className}>
        <LearnMoreCardDetail learnMoreContent={LearnMoreContent.VisionStatement} element={null} />
      </S.LearnMoreCardContainer>
    );
  };

  const MissionStatement = () => {
    return (
      <S.LearnMoreCardContainer className={className}>
        <LearnMoreCardDetail learnMoreContent={LearnMoreContent.MissionStatement} element={null} />
      </S.LearnMoreCardContainer>
    );
  };

  const SystemArchitecture = () => {
    return (
      <S.SystemArchContainer className={className}>
        <S.SystemArchLeft>
          <LearnMoreCardDetail learnMoreContent={LearnMoreContent.systemArchitecture} element={null} />
        </S.SystemArchLeft>
        <RenderCode data={LearnMoreContent.systemArchitectureCode} />
      </S.SystemArchContainer>
    );
  };

  const Benefits = () => {
    return (
      <S.LearnMoreCardContainer className={className}>
        <LearnMoreCardDetail
          learnMoreContent={LearnMoreContent.Benefits}
          element={renderDataInArticles(LearnMoreContent.Benefits.data)}
        />
      </S.LearnMoreCardContainer>
    );
  };

  const UseCases = () => {
    return (
      <S.LearnMoreCardContainer className={className}>
        <LearnMoreCardDetail
          learnMoreContent={LearnMoreContent.UseCases}
          element={renderDataInArticles(LearnMoreContent.UseCases.data)}
        />
      </S.LearnMoreCardContainer>
    );
  };

  const renderArticles = () => {
    return (
      <S.CardsContainer>
        <VisionStatement />
        <MissionStatement />
        <SystemArchitecture />
        <Benefits />
        <UseCases />
      </S.CardsContainer>
    );
  };

  const renderDataInArticles = (data?: object) => {
    const dataArr = data ? Object.values(data) : [];
    return (
      <S.ListContainer>
        <S.Line />
        {dataArr.map((item, index) => (
          <S.ListItem key={index}>
            <S.RoleNumber>{index + 1}</S.RoleNumber>
            <S.ListLine>
              <S.ContentTitle>{item[0]}</S.ContentTitle>
              <S.ContentDetail>{item[1]}</S.ContentDetail>
            </S.ListLine>
          </S.ListItem>
        ))}
      </S.ListContainer>
    );
  };
  const CodeViewer = ({data}: any) => {
    const renderValue = (value: any) => {
      if (typeof value === 'object' && value !== null) {
        return <CodeViewer data={value} />;
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

  const RenderCode = (data: any) => {
    return (
      <S.CodeContainer>
        <S.CodeTitle>
          <S.Img alt="tag icon" src={data.data.logo}></S.Img>
          <S.ContentTitle>{data.data.title}</S.ContentTitle>
        </S.CodeTitle>
        <CodeViewer data={data.data.data} />
        <br />
        <S.Detail>{data.data.detail}</S.Detail>
      </S.CodeContainer>
    );
  };

  return (
    <>
      <S.LearnMoreContainer className={className}>{renderArticles()}</S.LearnMoreContainer>
    </>
  );
};

export default LearnMore;
