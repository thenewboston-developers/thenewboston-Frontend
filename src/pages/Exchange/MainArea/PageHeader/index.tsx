import {ReactNode} from 'react';

import {SFC} from 'types';

import * as S from './Styles';

interface PageHeaderProps {
  children?: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
}

const PageHeader: SFC<PageHeaderProps> = ({children, className, description, eyebrow, title}) => {
  return (
    <S.Container className={className}>
      <S.Copy>
        <S.Eyebrow>{eyebrow}</S.Eyebrow>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.Copy>
      {children && <S.Actions>{children}</S.Actions>}
    </S.Container>
  );
};

export default PageHeader;
