import ListRenderer from 'components/ListRenderer';
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
          <Skeleton circle height={50} width={50} />
        </S.Avatar>
        <Row>
          <Skeleton width={100} />
          <Skeleton width={50} />
        </Row>
      </S.AvatarContainer>
      <S.SkeletonSection>
        <Skeleton width="80%" />
        <Skeleton width="60%" />
      </S.SkeletonSection>
      <S.SkeletonSection>
        <Skeleton height={30} width="20%" />
      </S.SkeletonSection>
      <S.SkeletonSection>
        <Skeleton height={80} width="100%" />
      </S.SkeletonSection>
    </S.Container>
  );

  return <ListRenderer dataLength={dataLength} renderItem={() => renderContent()} />;
};

export default PostSkeleton;
