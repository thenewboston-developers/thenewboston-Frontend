import {createPortal} from 'react-dom';
import {SFC} from 'types';
import {useState} from 'react';
import * as S from './Styles';
import DefaultAvatar from '../../assets/default-avatar.svg';

export interface ImageModalProps {
  close(): void;
  image: string | null;
}

const ImageModal: SFC<ImageModalProps> = ({image, close}) => {
  const [preview, setPreview] = useState<string | null>(image ? image : DefaultAvatar);

  return createPortal(
    <>
      <S.Modal>
        <S.ImagePreviewWrapper>
          <S.ImagePreviewCustom
            onClear={() => {
              setPreview(null);
              close();
            }}
            src={preview}
          ></S.ImagePreviewCustom>
        </S.ImagePreviewWrapper>
      </S.Modal>
    </>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default ImageModal;
