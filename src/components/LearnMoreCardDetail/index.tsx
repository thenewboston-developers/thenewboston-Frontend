import {SFC} from 'types';
import * as S from './Styles';
import * as learnMoreContent from 'types/learnMoreContent';

export interface LearnMoreCardDetailProps {
  learnMoreContent: learnMoreContent.LearnMoreContent;
  element: any;
}

const LearnMoreCardDetail: SFC<LearnMoreCardDetailProps> = ({className, learnMoreContent: content, element}) => {
  const paragraphs = content.detail.split('\n').filter((paragraph) => paragraph.trim() !== '');
  return (
    <>
      <S.Container className={className}>
        <S.ImageBox>
          <S.LearnMoreLogo>
            <S.Img src={content.logo}></S.Img>
          </S.LearnMoreLogo>
        </S.ImageBox>
        <S.Text>
          <S.LearnMoreCardTitle>{content.title}</S.LearnMoreCardTitle>
        </S.Text>
        {content.detail !== '' ? (
          <>
            <S.Divider />
            <S.LearnMoreCardContent>
              {paragraphs.map((paragraph, index) => (
                <p key={index} style={{marginBottom: '1em'}}>
                  {paragraph}
                </p>
              ))}
            </S.LearnMoreCardContent>
          </>
        ) : (
          element
        )}
      </S.Container>
    </>
  );
};

export default LearnMoreCardDetail;
