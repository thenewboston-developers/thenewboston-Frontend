import ListRenderer from 'components/ListRenderer';
import Skeleton from 'components/Skeleton';
import {SFC} from 'types';

import * as S from './Styles';

interface PostSkeletonProps {
  dataLength: number;
}

const PostSkeleton: SFC<PostSkeletonProps> = ({dataLength}) => {
  const renderContent = () => (
    <S.Container>
      <S.Header>
        <Skeleton circle height={40} width={40} />
        <S.HeaderText>
          <Skeleton height={14} width={120} />
          <Skeleton height={12} width={72} />
        </S.HeaderText>
      </S.Header>
      <S.Body>
        <Skeleton width="92%" />
        <Skeleton width="78%" />
        <Skeleton width="56%" />
      </S.Body>
      <S.ActionBar>
        <Skeleton borderRadius={999} height={34} width={84} />
        <Skeleton borderRadius={999} height={34} width={128} />
      </S.ActionBar>
      <S.Composer>
        <Skeleton borderRadius={12} height={40} />
      </S.Composer>
    </S.Container>
  );

  return <ListRenderer dataLength={dataLength} renderItem={() => renderContent()} />;
};

export default PostSkeleton;
