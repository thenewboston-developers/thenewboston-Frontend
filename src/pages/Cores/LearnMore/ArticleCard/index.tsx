import {SFC} from 'types';
import * as S from './Styles';
import ArticleDetail from 'components/ArticleCard';
import {Article} from 'types/articles';

export interface ArticleCardProps {
  article: Article;
}

const ArticleCard: SFC<ArticleCardProps> = ({className, article}) => {
  return (
    <>
      <S.Container className={className}>
        <ArticleDetail article={article} />
      </S.Container>
    </>
  );
};

export default ArticleCard;
