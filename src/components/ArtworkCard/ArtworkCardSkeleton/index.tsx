import ListRenderer from 'components/ListRenderer';
import Skeleton from 'components/Skeleton';
import {SFC} from 'types';

import * as S from './Styles';

interface ArtworkCardSkeletonProps {
  dataLength: number;
}

const ArtworkCardSkeleton: SFC<ArtworkCardSkeletonProps> = ({dataLength}) => {
  const renderContent = () => (
    <S.Container>
      <S.ImageContainer>
        <Skeleton borderRadius="16px 16px 0px 0px" height={250} />
      </S.ImageContainer>
      <S.DescriptionContainer>
        <Skeleton width="60%" height={25} />
        <S.Br />
        <Skeleton />
        <Skeleton />
        <Skeleton width="50%" />
      </S.DescriptionContainer>
      <S.Line>
        <Skeleton width="100%" height={1} />
      </S.Line>
      <S.PriceContainer>
        <S.Logo>
          <Skeleton circle width={25} height={25} />
        </S.Logo>
        <S.Price>
          <Skeleton width={70} height={20} />
        </S.Price>
      </S.PriceContainer>
    </S.Container>
  );

  return <ListRenderer dataLength={dataLength} renderItem={() => renderContent()} />;
};

export default ArtworkCardSkeleton;
