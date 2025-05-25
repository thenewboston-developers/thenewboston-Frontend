import {useState} from 'react';
import {createPortal} from 'react-dom';
import {SFC} from 'types';

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
        <S.ImagePreviewContainer>
          <S.ImagePreview
            onClear={() => {
              setPreview(null);
              close();
            }}
            src={preview}
          ></S.ImagePreview>
        </S.ImagePreviewContainer>
      </S.Modal>
    </>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default FullScreenImageModal;
