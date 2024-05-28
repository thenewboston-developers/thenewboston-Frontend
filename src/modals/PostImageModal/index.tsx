import {useEffect, useState} from 'react';
import {SFC} from 'types';

import * as S from './Styles';
import {createPortal} from 'react-dom';

export interface ProfileAvatarModalProps {
  close(): void;
  disableOverlayClick?: boolean;
  image: any;
}

const PostImageModal: SFC<ProfileAvatarModalProps> = ({image}) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!image) return;
    setPreview(image);
  }, [image]);

  return createPortal(
    <>
      <S.Modal>
        <S.ImagePreviewCustom
          onClear={() => {
            setPreview(null);
          }}
          src={preview}
        ></S.ImagePreviewCustom>
      </S.Modal>
    </>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default PostImageModal;
