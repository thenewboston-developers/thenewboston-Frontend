import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from 'dispatchers/users';
import {Field, Form, Formik} from 'formik';
import {getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';

import Button, {ButtonType} from 'components/Button';
import {FileInput} from 'components/FormElements';
import ImagePreview from 'components/ImagePreview';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

export interface ProfileEditModalProps {
  close(): void;
}

const ProfileEditModal: SFC<ProfileEditModalProps> = ({className, close}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const initialValues = useMemo(
    () => ({
      avatar: self.avatar || '',
    }),
    [self.avatar],
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
      requestData.append('avatar', values.avatar);
      await dispatch(updateUser(self.id!, requestData));
      close();
    } catch (error) {
      displayErrorToast('Error updating avatar');
    }
  };

  return (
    <S.Modal className={className} close={close} header="Edit Profile">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({dirty, isSubmitting, isValid, setFieldValue, touched, values}) => (
          <Form>
            {!values.avatar && (
              <Field component={FileInput} name="avatar" onChange={handleFileChange} touched={touched} />
            )}
            <ImagePreview
              onClear={async () => {
                await setFieldValue('avatar', '');
                setPreview(null);
              }}
              src={preview}
            />
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
