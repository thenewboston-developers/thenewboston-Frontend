import {ReactNode} from 'react';

import Line from 'components/Line';
import {SFC} from 'types';
import * as S from './Styles';

export interface SectionHeadingProps {
  heading: string;
  rightContent?: ReactNode;
  subHeading?: string;
}

const SectionHeading: SFC<SectionHeadingProps> = ({className, heading, rightContent, subHeading}) => {
  return (
    <S.Container className={className}>
      <S.Contents>
        <S.Left>
          <S.Heading>{heading}</S.Heading>
          <S.SubHeading>{subHeading ? subHeading : null}</S.SubHeading>
        </S.Left>
        <S.Right>{rightContent ? rightContent : null}</S.Right>
      </S.Contents>
      <Line />
    </S.Container>
  );
};

export default SectionHeading;
