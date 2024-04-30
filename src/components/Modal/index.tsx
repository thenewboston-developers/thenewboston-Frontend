import {ReactNode} from 'react';
import {createPortal} from 'react-dom';
import noop from 'lodash/noop';
import {mdiClose} from '@mdi/js';

import Icon from 'components/Icon';
import {SFC} from 'types';
import * as S from './Styles';

export interface ModalProps {
  children: ReactNode;
  close(): void;
  disableOverlayClick?: boolean;
  header: string;
}

const Modal: SFC<ModalProps> = ({children, className, close, disableOverlayClick = false, header}) => {
  return createPortal(
    <>
      <S.Overlay onClick={disableOverlayClick ? noop : close} />
      <S.Modal className={className}>
        <S.Header>
          <S.Text>{header}</S.Text>
          <Icon icon={mdiClose} onClick={close} size={26} />
        </S.Header>
        <S.Content>{children}</S.Content>
      </S.Modal>
    </>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default Modal;
