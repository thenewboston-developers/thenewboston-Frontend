import {articlesData} from './ArticlesData';
import {SFC} from 'types';
import {useToggle} from 'hooks';
import * as S from './Styles';
import ArticleCard from './ArticleCard';
import CoreModal from 'modals/CoreModal';
import EmptyText from 'components/EmptyText';

const LearnMore: SFC = ({className}) => {
  const [coreModalIsOpen, toggleCoreModal] = useToggle(false);
  const articles = articlesData;

  const renderContent = () => {
    if (!!articles.length) return renderArticles();
    return <EmptyText>No articles to display.</EmptyText>;
  };

  const renderArticles = () => {
    const coreCards = articles.map((article) => {
      if (article.type === 'list') {
        return <ArticleCard article={article} key={article.id} element={renderDataInArticles(article.data)} />;
      } else if (article.type === 'normal') {
        return <ArticleCard article={article} key={article.id} />;
      } else if (article.type === 'code') {
        return <RenderCode data={article} />;
      }
    });
    return <S.CardsContainer>{coreCards}</S.CardsContainer>;
  };

  const renderDataInArticles = (data?: object) => {
    console.log(data);
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

  const RenderCode = (data: any) => {
    return (
      <S.CodeContainer>
        <S.ListItem>
          <S.Img alt="tag icon" src={data.data.logo}></S.Img>
          <S.ContentTitle>{data.data.title}</S.ContentTitle>
        </S.ListItem>
        <S.Code>{JSON.stringify(data.data.data, null, 2).replace(/\\n/g, '\n')}</S.Code>
        <br />
        <S.Detail>{data.data.detail}</S.Detail>
      </S.CodeContainer>
    );
  };

  return (
    <>
      <S.Container className={className}>{renderContent()}</S.Container>
      {coreModalIsOpen ? <CoreModal close={toggleCoreModal} /> : null}
    </>
  );
};

export default LearnMore;
