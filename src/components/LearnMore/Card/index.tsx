import {ReactNode} from 'react';

import {LearnMore, SFC} from 'types';

import * as S from './Styles';

export interface LearnMoreCardProps {
  children?: ReactNode;
  className?: string;
  content: LearnMore;
  contentDisplayStyle?: 'flex' | 'block';
  contentWidth?: string;
}

const LearnMoreCard: SFC<LearnMoreCardProps> = ({
  className,
  content,
  contentDisplayStyle,
  contentWidth,
  children = null,
}) => {
  // TODO (muhammad) LOW: Replace this logic of splitting \n with something more better/robust.
  const paragraphs = content.detail.split('\n').filter((paragraph) => paragraph.trim() !== '');
  return (
    <>
      <S.Container className={className}>
        <S.LogoContainer>
          <S.Logo src={content.logo}></S.Logo>
        </S.LogoContainer>
        <S.Title>{content.title}</S.Title>
        <S.ContentContainer $displayStyle={contentDisplayStyle}>
          <S.Content $width={contentWidth}>
            {paragraphs.map((paragraph, index) => (
              <p key={index} style={{marginBottom: '1em'}}>
                {paragraph}
              </p>
            ))}
          </S.Content>
          {children}
        </S.ContentContainer>
      </S.Container>
    </>
  );
};

export default LearnMoreCard;
