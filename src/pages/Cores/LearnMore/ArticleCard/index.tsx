import {SFC} from 'types';
import * as S from './Styles';
import ArticleDetail from 'components/ArticleCard';
import {Article} from 'types/articles';

export interface ArticleCardProps {
  article: Article;
  element?: any;
}

// eslint-disable-next-line prettier/prettier
const ArticleCard: SFC<ArticleCardProps> = ({ className, article, element: element }) => {
  return (
    <>
      <S.Container className={className}>
        <ArticleDetail article={article} element={element} />
      </S.Container>
    </>
  );
};

export default ArticleCard;
