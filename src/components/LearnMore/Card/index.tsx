import {ReactNode} from 'react';

import {SFC} from 'types';

import * as S from './Styles';

interface LearnMoreData {
  detail: string;
  img?: string;
  logo?: string;
  obj?: object;
  title: string;
}

export interface LearnMoreCardProps {
  children?: ReactNode;
  content: LearnMoreData;
  contentWidth?: string;
  displayStyle?: 'flex' | 'block';
  minHeight?: string;
}

const LearnMoreCard: SFC<LearnMoreCardProps> = ({content, contentWidth, displayStyle, minHeight, children = null}) => {
  return (
    <>
      <S.Container $displayStyle={displayStyle} $minHeight={minHeight}>
        <S.ContentContainer $width={contentWidth}>
          <S.LogoContainer>
            <S.Logo src={content.logo}></S.Logo>
          </S.LogoContainer>
          <S.Title>{content.title}</S.Title>
          <S.Content>
            <S.DetailText>{content.detail}</S.DetailText>
          </S.Content>
          {content?.img ? <S.Img src={content.img} /> : null}
        </S.ContentContainer>
        {children}
      </S.Container>
    </>
  );
};

export default LearnMoreCard;
