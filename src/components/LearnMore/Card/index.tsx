import {ReactNode} from 'react';

import {LearnMore, SFC} from 'types';

import * as S from './Styles';

export interface LearnMoreCardProps {
  children?: ReactNode;
  content: LearnMore;
  contentWidth?: string;
  displayStyle?: 'flex' | 'block';
  minHeight?: string;
}

const LearnMoreCard: SFC<LearnMoreCardProps> = ({content, contentWidth, displayStyle, minHeight, children = null}) => {
  // TODO (muhammad) LOW: Replace this logic of splitting \n with something more better/robust.
  const paragraphs = content.detail.split('\n').filter((paragraph) => paragraph.trim() !== '');
  return (
    <>
      <S.Container $displayStyle={displayStyle} $minHeight={minHeight}>
        <S.ContentContainer $width={contentWidth}>
          <S.LogoContainer>
            <S.Logo src={content.logo}></S.Logo>
          </S.LogoContainer>
          <S.Title>{content.title}</S.Title>
          <S.Content>
            {paragraphs.map((paragraph, index) => (
              <p key={index} style={{marginBottom: '1em'}}>
                {paragraph}
              </p>
            ))}
          </S.Content>
          {content?.img ? <S.Img src={content.img} /> : null}
        </S.ContentContainer>
        {children}
      </S.Container>
    </>
  );
};

export default LearnMoreCard;
