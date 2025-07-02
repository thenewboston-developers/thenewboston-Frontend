import {createPortal} from 'react-dom';

import {SFC} from 'types';

import * as S from './Styles';

export interface ImageModalProps {
  close(): void;
  imageSrc: string;
}

const FullScreenImageModal: SFC<ImageModalProps> = ({imageSrc, close}) => {
  return createPortal(
    <>
      <S.Overlay onClick={close} />
      <S.Modal>
        <S.FullScreenImage onClick={close} src={imageSrc} />
      </S.Modal>
    </>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default FullScreenImageModal;
