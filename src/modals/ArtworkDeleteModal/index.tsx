import {useDispatch} from 'react-redux';

import {deleteArtwork} from 'dispatchers/artworks';
import {ToastType} from 'enums';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';
import * as S from './Styles';

export interface ArtworkDeleteModalProps {
  artworkId: number;
  close(): void;
}

const ArtworkDeleteModal: SFC<ArtworkDeleteModalProps> = ({artworkId, className, close}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleButtonClick = async () => {
    try {
      await dispatch(deleteArtwork(artworkId));
      displayToast('Artwork deleted!', ToastType.SUCCESS);
      close();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error deleting artwork');
    }
  };

  return (
    <S.Modal className={className} close={close} header="Warning">
      <div>Are you sure you want to delete this artwork?</div>
      <S.ButtonContainer>
        <S.Button onClick={handleButtonClick} text="Yes" />
      </S.ButtonContainer>
    </S.Modal>
  );
};

export default ArtworkDeleteModal;
