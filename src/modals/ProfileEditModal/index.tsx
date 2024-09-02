import {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Field, Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import ImagePreview from 'components/ImagePreview';
import {AppDispatch, SFC} from 'types';
import {FileInput} from 'components/FormElements';
import {ToastType} from 'enums';
import {displayErrorToast, displayToast} from 'utils/toasts';
import {getSelf} from 'selectors/state';
import {updateUser} from 'dispatchers/users';

import * as S from './Styles';

export interface ProfileEditModalProps {
  close(): void;
}

const ProfileEditModal: SFC<ProfileEditModalProps> = ({className, close}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isAvatarCleared, setIsAvatarCleared] = useState<boolean | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const initialValues = useMemo(
    () => ({
      avatar: self.avatar || '',
      discord_username: self.discord_username || '',
    }),
    [self.avatar, self.discord_username],
  );

  type FormValues = typeof initialValues;

  useEffect(() => {
    if (!initialValues.avatar) return;
    setPreview(initialValues.avatar);
  }, [initialValues]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const requestData = new FormData();
      if (initialValues.avatar !== values.avatar) requestData.append('avatar', values.avatar);
      requestData.append('is_avatar_cleared', isAvatarCleared ? 'True' : 'False');
      requestData.append('discord_username', values.discord_username);
      await dispatch(updateUser(self.id!, requestData));
      close();
      displayToast('Profile successfully updated', ToastType.SUCCESS);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error updating your profile');
    }
  };

  return (
    <S.Modal className={className} close={close} header="Edit Profile">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({dirty, errors, isSubmitting, isValid, setFieldValue, touched, values}) => (
          <Form>
            <S.FormField>
              <S.FormLabel>Profile Picture</S.FormLabel>
              {!values.avatar && (
                <Field component={FileInput} name="avatar" onChange={handleFileChange} touched={touched} />
              )}
              <ImagePreview
                onClear={async () => {
                  await setFieldValue('avatar', '');
                  setPreview(null);
                  setIsAvatarCleared(true);
                }}
                src={preview}
              />
            </S.FormField>
            <S.FormField>
              <S.FormLabel>Link your TNB Account to Discord</S.FormLabel>
              <S.FormTextInput
                errors={errors}
                touched={touched}
                name="discord_username"
                placeholder="Discord Username"
              />
            </S.FormField>
            <S.Bumper />
            <Button
              dirty={dirty}
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              isValid={isValid}
              text="Submit"
              type={ButtonType.submit}
            />
          </Form>
        )}
      </Formik>
    </S.Modal>
  );
};

export default ProfileEditModal;
