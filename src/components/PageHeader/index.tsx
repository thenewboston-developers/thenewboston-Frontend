import {ReactNode} from 'react';

import BannerArt from 'components/BannerArt';
import {BannerArtVariant} from 'enums';
import {SFC} from 'types';

import * as S from './Styles';

interface PageHeaderProps {
  art: BannerArtVariant;
  children?: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
}

const PageHeader: SFC<PageHeaderProps> = ({art, children, className, description, eyebrow, title}) => {
  return (
    <S.Container className={className}>
      <BannerArt variant={art} />
      <S.Copy>
        <S.Eyebrow $art={art}>{eyebrow}</S.Eyebrow>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.Copy>
      {children && <S.Actions>{children}</S.Actions>}
    </S.Container>
  );
};

export default PageHeader;
