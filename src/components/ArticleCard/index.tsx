import Line from 'components/Line';
import CoreLogo from 'components/CoreLogo';
import { SFC } from 'types';
import * as S from './Styles';
import { Article } from 'types/articles';

export interface ArticleDetailsProps {
  article: Article;
}

const ArticleDetail: SFC<ArticleDetailsProps> = ({ className, article }) => {
  return (
    <>
      <S.Container className={className}>
        <S.Box>
          <S.BoxLeft>
            <CoreLogo logo={article.logo} />
            <S.Text>
              <S.Ticker>{article.ticker}</S.Ticker>
            </S.Text>
          </S.BoxLeft>
        </S.Box>
        <Line />
        <S.Domain>{article.detail}</S.Domain>
      </S.Container>
    </>
  );
};

export default ArticleDetail;
