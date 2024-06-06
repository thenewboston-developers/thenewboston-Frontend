import Skeleton from 'react-loading-skeleton';
import * as S from './Styles';
import {SFC} from 'types';

interface ArtworkCardSkeletonProps {
  dataLength: number;
}

const ArtworkCardSkeleton: SFC<ArtworkCardSkeletonProps> = ({dataLength}) => {
  const renderContent = () => {
    return (
      <>
        <S.BoxSkeleton />
        <S.TextSkeleton $width={'30%'} />
        <S.TextSkeleton />
        <S.TextSkeleton $width={'70%'} />
        <S.Div>
          <S.Avatar>
            <Skeleton circle width={25} height={25} />
          </S.Avatar>
          <S.Text>
            <S.TextSkeleton width={'50%'} />
          </S.Text>
        </S.Div>
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

export default ArtworkCardSkeleton;
