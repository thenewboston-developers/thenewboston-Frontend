import Button from 'components/Button';
import {useToggle} from 'hooks';
import ArtworkModal from 'modals/ArtworkModal';
import {SFC} from 'types';
import * as S from './Styles';

export interface ImagePreviewProps {
  description: string;
  imageUrl: string;
}

const ImagePreview: SFC<ImagePreviewProps> = ({className, description, imageUrl}) => {
  const [artworkModalIsOpen, toggleArtworkModal] = useToggle(false);

  return (
    <>
      <S.Container className={className}>
        <S.Img key={imageUrl} src={imageUrl} />
        <Button onClick={toggleArtworkModal} text="Save" />
      </S.Container>
      {artworkModalIsOpen ? (
        <ArtworkModal close={toggleArtworkModal} description={description} imageUrl={imageUrl} />
      ) : null}
    </>
  );
};

export default ImagePreview;
