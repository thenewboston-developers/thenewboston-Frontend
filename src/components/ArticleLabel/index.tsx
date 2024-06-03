import {SFC} from 'types';
import * as S from './Styles';
import {Article} from 'types/articles';

export interface ArticleDetailsProps {
  article: Article;
  element: any;
}

const ArticleDetail: SFC<ArticleDetailsProps> = ({className, article, element}) => {
  const paragraphs = article.detail.split('\n').filter((paragraph) => paragraph.trim() !== '');
  return (
    <>
      <S.Container className={className}>
        <S.Box>
          <S.BoxLeft>
            <S.ArticleLogo>
              <S.Img src={article.logo}></S.Img>
            </S.ArticleLogo>
          </S.BoxLeft>
        </S.Box>
        <S.Text>
          <S.Ticker>{article.title}</S.Ticker>
        </S.Text>
        {article.detail !== '' ? (
          <>
            <S.Divider />
            <S.Domain>
              {paragraphs.map((paragraph, index) => (
                <p key={index} style={{marginBottom: '1em'}}>
                  {paragraph}
                </p>
              ))}
            </S.Domain>
          </>
        ) : (
          element
        )}
      </S.Container>
    </>
  );
};

export default ArticleDetail;
