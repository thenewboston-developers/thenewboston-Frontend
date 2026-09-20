import {ReactNode} from 'react';

import {SFC} from 'types';

import * as S from './Styles';

export interface SectionHeadingProps {
  heading: string;
  rightContent?: ReactNode;
  subHeading?: string;
  renderLine?: boolean;
}

const SectionHeading: SFC<SectionHeadingProps> = ({
  className,
  heading,
  rightContent,
  subHeading,
  renderLine = true,
}) => {
  return (
    <S.Container className={className}>
      <S.Contents>
        <S.Left>
          <S.Heading>{heading}</S.Heading>
          {subHeading ? <S.SubHeading>{subHeading}</S.SubHeading> : null}
        </S.Left>
        {rightContent ? <S.Right>{rightContent}</S.Right> : null}
      </S.Contents>
      {renderLine ? <S.Line /> : null}
    </S.Container>
  );
};

export default SectionHeading;
