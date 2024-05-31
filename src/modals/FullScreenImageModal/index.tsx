import {createPortal} from 'react-dom';
import {SFC} from 'types';
import {useState} from 'react';
import * as S from './Styles';

export interface ImageModalProps {
  close(): void;
  imageSrc: string;
}

const FullScreenImageModal: SFC<ImageModalProps> = ({imageSrc, close}) => {
  const [preview, setPreview] = useState<string | null>(imageSrc);

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

export default FullScreenImageModal;
