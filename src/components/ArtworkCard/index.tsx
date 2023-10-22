import {Artwork, SFC} from 'types';
import * as S from './Styles';

export interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: SFC<ArtworkCardProps> = ({artwork, className}) => {
  return (
    <S.Container className={className}>
      <S.Thumbnail thumbnailUrl={artwork.image} />
      <S.Bottom>
        <S.Name>{artwork.name}</S.Name>
        <S.Description>{artwork.description}</S.Description>
      </S.Bottom>
    </S.Container>
  );
};

export default ArtworkCard;
