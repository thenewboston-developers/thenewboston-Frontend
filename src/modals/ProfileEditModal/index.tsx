import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import Button from 'components/Button';
import {ButtonColor, ButtonType} from 'components/Button/types';
import {FileInput} from 'components/FormElements';
import ImagePreview from 'components/ImagePreview';
import {ModalContent, ModalFooter, ModalFooterButton} from 'components/Modal';
import {updateUser} from 'dispatchers/users';
import {getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {handleFormikAPIError} from 'utils/forms';

import * as S from './Styles';

export interface ProfileEditModalProps {
  close(): void;
}

const ProfileEditModal: SFC<ProfileEditModalProps> = ({className, close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const [preview, setPreview] = useState<string | null>(null);

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

  const handleSubmit = async (values: FormValues, helpers: any): Promise<void> => {
    try {
      const requestData = new FormData();
      requestData.append('avatar', values.avatar);
      await dispatch(updateUser(self.id!, requestData));
      close();
    } catch (error) {
      handleFormikAPIError(error, helpers, 'Error updating avatar');
    }
  };

  return (
    <S.Modal className={className} close={close} header="Edit Profile">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({dirty, errors, isSubmitting, isValid, setFieldValue, touched, values}) => (
          <Form>
            <ModalContent>
              {!values.avatar && (
                <FileInput errors={errors} name="avatar" onChange={handleFileChange} touched={touched} />
              )}
              <ImagePreview
                onClear={async () => {
                  await setFieldValue('avatar', '');
                  setPreview(null);
                }}
                src={preview}
              />
            </ModalContent>

            <ModalFooter>
              <ModalFooterButton color={ButtonColor.secondary} onClick={close} text="Cancel" type={ButtonType.button} />
              <Button
                dirty={dirty}
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
                isValid={isValid}
                text="Submit"
                type={ButtonType.submit}
              />
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </S.Modal>
  );
};

export default ProfileEditModal;
