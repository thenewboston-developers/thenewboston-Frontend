import {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';
import * as S from './Styles';
import ImagePreview from 'components/ImagePreview';
import DefaultAvatar from '../../assets/default-avatar.svg';
import {noop} from 'lodash-es';
import {createPortal} from 'react-dom';

export interface ProfileAvatarModalProps {
  close(): void;
  disableOverlayClick?: boolean;
}

const ProfileAvatarModal: SFC<ProfileAvatarModalProps> = ({disableOverlayClick = false, close}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const self = useSelector(getSelf);

  const initialValues = useMemo(
    () => ({
      avatar: self.avatar || DefaultAvatar,
    }),
    [self.avatar],
  );

  useEffect(() => {
    if (!initialValues.avatar) return;
    setPreview(initialValues.avatar);
  }, [initialValues]);

  return createPortal(
    <>
      <S.Overlay onClick={disableOverlayClick ? noop : close} />
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

export default ProfileAvatarModal;
