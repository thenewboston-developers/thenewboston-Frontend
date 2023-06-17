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
  footer?: ReactNode;
  header: string;
}

const Modal: SFC<ModalProps> = ({children, className, close, disableOverlayClick = false, footer, header}) => {
  return createPortal(
    <>
      <S.Overlay onClick={disableOverlayClick ? noop : close} />
      <S.Modal className={className}>
        <S.Header>
          <span>{header}</span>
          <Icon icon={mdiClose} onClick={close} size={16} />
        </S.Header>
        <S.Content>{children}</S.Content>
        {footer}
      </S.Modal>
    </>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default Modal;
