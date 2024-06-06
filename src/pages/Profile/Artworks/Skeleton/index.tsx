import * as S from './Styles';
import {SFC} from 'types';

interface ArtWorksSkeletonProps {
  dataLength: number;
}

const ArtWorksSkeleton: SFC<ArtWorksSkeletonProps> = ({dataLength}) => {
  return (
    <>
      {Array(dataLength)
        .fill(0)
        .map((_, index) => (
          <div key={index}>
            <S.BoxSkeleton />
            <S.TextSkeleton $width={'70%'} />
            <S.TextSkeleton />
          </div>
        ))}
    </>
  );
};

export default ArtWorksSkeleton;
