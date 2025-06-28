import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import Button from 'components/Button';
import {ButtonColor, ButtonType} from 'components/Button/types';
import {FileInput, FormField, Input} from 'components/FormElements';
import ImagePreview from 'components/ImagePreview';
import {ModalFooterButton} from 'components/Modal';
import {updateUser} from 'dispatchers/users';
import {getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {handleFormikAPIError} from 'utils/forms';

import * as S from './Styles';

export interface ProfileEditModalProps {
  close(): void;
}

const ProfileEditModal: SFC<ProfileEditModalProps> = ({className, close}) => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const initialValues = useMemo(
    () => ({
      avatar: self.avatar || '',
      discord_username: self.discord_username || '',
      facebook_username: self.facebook_username || '',
      github_username: self.github_username || '',
      instagram_username: self.instagram_username || '',
      linkedin_username: self.linkedin_username || '',
      pinterest_username: self.pinterest_username || '',
      reddit_username: self.reddit_username || '',
      tiktok_username: self.tiktok_username || '',
      twitch_username: self.twitch_username || '',
      x_username: self.x_username || '',
      youtube_username: self.youtube_username || '',
    }),
    [self],
  );

  type FormValues = typeof initialValues;

  useEffect(() => {
    if (!initialValues.avatar) return;
    setPreview(initialValues.avatar);
  }, [initialValues]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setAvatarFile(file);
      setFieldValue('avatar', file);

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: FormValues, helpers: any): Promise<void> => {
    try {
      const requestData = new FormData();

      // Only append avatar if it's a new file or being cleared
      if (avatarFile) {
        requestData.append('avatar', avatarFile);
      } else if (values.avatar === '' && initialValues.avatar !== '') {
        // User cleared the avatar
        requestData.append('avatar', '');
      }

      requestData.append('discord_username', values.discord_username);
      requestData.append('facebook_username', values.facebook_username);
      requestData.append('github_username', values.github_username);
      requestData.append('instagram_username', values.instagram_username);
      requestData.append('linkedin_username', values.linkedin_username);
      requestData.append('pinterest_username', values.pinterest_username);
      requestData.append('reddit_username', values.reddit_username);
      requestData.append('tiktok_username', values.tiktok_username);
      requestData.append('twitch_username', values.twitch_username);
      requestData.append('x_username', values.x_username);
      requestData.append('youtube_username', values.youtube_username);
      await dispatch(updateUser(self.id!, requestData));
      close();
    } catch (error) {
      handleFormikAPIError(error, helpers, 'Error updating profile');
    }
  };

  return (
    <S.Modal className={className} close={close} header="Edit Profile">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({dirty, errors, isSubmitting, isValid, setFieldValue, touched, values}) => (
          <Form>
            <S.ModalContent>
              <S.Section>
                <S.SectionHeading>Avatar</S.SectionHeading>
                {!values.avatar && (
                  <FileInput
                    errors={errors}
                    name="avatar"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e, setFieldValue)}
                    touched={touched}
                  />
                )}
                <ImagePreview
                  onClear={async () => {
                    await setFieldValue('avatar', '');
                    setPreview(null);
                    setAvatarFile(null);
                  }}
                  src={preview}
                />
              </S.Section>

              <S.Section>
                <S.SectionHeading>Social Media</S.SectionHeading>
                <S.SocialMediaGrid>
                  <FormField>
                    <Input errors={errors} label="Discord" name="discord_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <Input errors={errors} label="Reddit" name="reddit_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <Input errors={errors} label="Facebook" name="facebook_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <Input errors={errors} label="TikTok" name="tiktok_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <Input errors={errors} label="GitHub" name="github_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <Input errors={errors} label="Twitch" name="twitch_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <Input errors={errors} label="Instagram" name="instagram_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <Input errors={errors} label="X" name="x_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <Input errors={errors} label="LinkedIn" name="linkedin_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <Input errors={errors} label="YouTube" name="youtube_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <Input errors={errors} label="Pinterest" name="pinterest_username" touched={touched} />
                  </FormField>
                </S.SocialMediaGrid>
              </S.Section>
            </S.ModalContent>

            <S.ModalFooter>
              <ModalFooterButton color={ButtonColor.secondary} onClick={close} text="Cancel" type={ButtonType.button} />
              <Button
                dirty={dirty}
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
                isValid={isValid}
                text="Submit"
                type={ButtonType.submit}
              />
            </S.ModalFooter>
          </Form>
        )}
      </Formik>
    </S.Modal>
  );
};

export default ProfileEditModal;
