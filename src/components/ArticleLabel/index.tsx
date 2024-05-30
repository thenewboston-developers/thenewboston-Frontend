import CoreLogo from 'components/CoreLogo';
import {SFC} from 'types';
import * as S from './Styles';
import {Article} from 'types/articles';

export interface ArticleDetailsProps {
  article: Article;
  element: any;
}

const ArticleDetail: SFC<ArticleDetailsProps> = ({className, article, element}) => {
  return (
    <>
      <S.Container className={className}>
        <S.Box>
          <S.BoxLeft>
            <CoreLogo logo={article.logo} />
          </S.BoxLeft>
        </S.Box>
        <S.Text>
          <S.Ticker>{article.title}</S.Ticker>
        </S.Text>
        {article.detail !== '' ? (
          <>
            <S.Divider />
            <S.Domain>{article.detail}</S.Domain>
          </>
        ) : (
          element
        )}
      </S.Container>
    </>
  );
};

export default ArticleDetail;
