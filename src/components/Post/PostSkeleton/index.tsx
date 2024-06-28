import React from 'react';

import Skeleton from 'components/Skeleton';
import {Row} from 'styles/components/GridStyle';
import {SFC} from 'types';

import * as S from './Styles';

interface PostSkeletonProps {
  dataLength: number;
}

const PostSkeleton: SFC<PostSkeletonProps> = ({dataLength}) => {
  const renderContent = () => (
    <S.Container>
      <S.AvatarContainer>
        <S.Avatar>
          <Skeleton circle width={50} height={50} />
        </S.Avatar>
        <Row>
          <Skeleton width={100} />
          <Skeleton width={50} />
        </Row>
      </S.AvatarContainer>
      <S.Div>
        <Skeleton width="80%" />
        <Skeleton width="60%" />
      </S.Div>
      <S.Div>
        <Skeleton width="20%" height={30} />
      </S.Div>
      <S.Div>
        <Skeleton width="100%" height={80} />
      </S.Div>
    </S.Container>
  );

  return (
    <React.Fragment>
      {Array.from({length: dataLength}, (_, index) => (
        <div key={index}>{renderContent()}</div>
      ))}
    </React.Fragment>
  );
};

export default PostSkeleton;
