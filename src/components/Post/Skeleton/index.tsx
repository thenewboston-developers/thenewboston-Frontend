import Skeleton from 'react-loading-skeleton';
import * as S from './Styles';
import {SFC} from 'types';

interface PostSkeletonProps {
  dataLength: number;
}

const PostSkeleton: SFC<PostSkeletonProps> = ({dataLength}) => {
  const renderContent = () => {
    return (
      <>
        <S.Div>
          <S.Left>
            <Skeleton circle width={50} height={50} />
          </S.Left>
          <S.Right>
            <S.TextSkeleton $width={'20%'} />
          </S.Right>
        </S.Div>
        <S.TextSkeleton />
        <S.TextSkeleton $width={'70%'} />
        <S.BoxSkeleton />
      </>
    );
  };
  return (
    <>
      {Array(dataLength)
        .fill(0)
        .map((_, index) => (
          <div key={index}>{renderContent()}</div>
        ))}
    </>
  );
};

export default PostSkeleton;
