import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import Button from 'components/Button';
import EmptyText from 'components/EmptyText';
import SectionHeading from 'components/SectionHeading';
import {useToggle} from 'hooks';
import CoreModal from 'modals/CoreModal';
import {getCores} from 'selectors/state';
import {SFC} from 'types';
import CoreCard from '../CoreCard';
import * as S from './Styles';
import {articlesData} from './ArticlesData';
import ArticleCard from './ArticleCard';

const LearnMore: SFC = ({className}) => {
  const [coreModalIsOpen, toggleCoreModal] = useToggle(false);
  const articles = articlesData;

  const renderContent = () => {
    if (!!articles.length) return renderArticles();
    return <EmptyText>No articles to display.</EmptyText>;
  };

  const renderArticles = () => {
    const coreCards = articles.map((article) =>
      article.type === 'list' ? null : <ArticleCard article={article} key={article.id} />,
    );
    return <S.CardsContainer>{coreCards}</S.CardsContainer>;
  };

  const renderDataInArticles = (data: string[]) => {
    <S.ListContainer>
      <S.Line />
      {data.map((item, index) => (
        <S.ListItem key={index}>
          <S.RoleNumber>{index + 1}</S.RoleNumber>
          <S.Content>{item}</S.Content>
        </S.ListItem>
      ))}
    </S.ListContainer>;
  };

  return (
    <>
      <S.Container className={className}>{renderContent()}</S.Container>
      {coreModalIsOpen ? <CoreModal close={toggleCoreModal} /> : null}
    </>
  );
};

export default LearnMore;
