import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import Button from 'components/Button';
import {ButtonColor, ButtonType} from 'components/Button/types';
import {FileInput, FormField, Input, Textarea} from 'components/FormElements';
import {ModalFooter} from 'components/Modal';
import {updateUser} from 'dispatchers/users';
import {getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {handleFormikAPIError} from 'utils/forms';
import {socialUsernameValidators} from 'utils/socialUsernameValidation';
import yup from 'utils/yup';

import * as S from './Styles';

export interface ProfileEditModalProps {
  close(): void;
}

const ProfileEditModal: SFC<ProfileEditModalProps> = ({className, close}) => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const initialValues = useMemo(
    () => ({
      avatar: self.avatar || '',
      banner: self.banner || '',
      bio: self.bio || '',
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
    if (initialValues.avatar) {
      setPreview(initialValues.avatar);
    }
    if (initialValues.banner) {
      setBannerPreview(initialValues.banner);
    }
  }, [initialValues]);

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
    fieldName: 'avatar' | 'banner',
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (fieldName === 'avatar') {
        setAvatarFile(file);
        setFieldValue('avatar', file);
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setBannerFile(file);
        setFieldValue('banner', file);
        const reader = new FileReader();
        reader.onloadend = () => setBannerPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
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

      // Only append banner if it's a new file or being cleared
      if (bannerFile) {
        requestData.append('banner', bannerFile);
      } else if (values.banner === '' && initialValues.banner !== '') {
        // User cleared the banner
        requestData.append('banner', '');
      }

      requestData.append('bio', values.bio);
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

  const validationSchema = useMemo(() => {
    const schema: any = {
      bio: yup.string().max(160, 'Bio must be at most 160 characters'),
    };

    // Add social media username validation
    Object.entries(socialUsernameValidators).forEach(([platform, validator]) => {
      const fieldName = `${platform}_username`;
      schema[fieldName] = yup.string().test(`${platform}-username-validation`, (value, context) => {
        if (!value) return true; // Allow empty values
        const result = validator(value);
        return result.isValid ? true : context.createError({message: result.error});
      });
    });

    return yup.object().shape(schema);
  }, []);

  return (
    <S.Modal className={className} close={close} header="Edit Profile">
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, isValid, setFieldValue, touched, values}) => (
          <Form>
            <S.ModalBody>
              <S.Section>
                <S.SectionHeading>Avatar</S.SectionHeading>
                <div style={{display: values.avatar ? 'none' : 'block'}}>
                  <FileInput
                    errors={errors}
                    name="avatar"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e, setFieldValue, 'avatar')}
                    touched={touched}
                  />
                </div>
                <S.AvatarPreview
                  onClear={async () => {
                    await setFieldValue('avatar', '');
                    setPreview(null);
                    setAvatarFile(null);
                  }}
                  src={preview}
                />
                {errors.avatar && touched.avatar && preview && <S.ErrorMessage>{errors.avatar}</S.ErrorMessage>}
              </S.Section>

              <S.Section>
                <S.SectionHeading>Banner</S.SectionHeading>
                <div style={{display: values.banner ? 'none' : 'block'}}>
                  <FileInput
                    errors={errors}
                    name="banner"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e, setFieldValue, 'banner')}
                    touched={touched}
                  />
                </div>
                <S.BannerPreview
                  onClear={async () => {
                    await setFieldValue('banner', '');
                    setBannerPreview(null);
                    setBannerFile(null);
                  }}
                  src={bannerPreview}
                />
                {errors.banner && touched.banner && bannerPreview && <S.ErrorMessage>{errors.banner}</S.ErrorMessage>}
              </S.Section>

              <S.Section>
                <S.SectionHeading>Bio</S.SectionHeading>
                <FormField>
                  <Textarea
                    errors={errors}
                    label=""
                    maxLength={160}
                    name="bio"
                    placeholder="Tell us about yourself (160 characters max)"
                    touched={touched}
                  />
                </FormField>
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
            </S.ModalBody>

            <ModalFooter>
              <Button color={ButtonColor.secondary} onClick={close} text="Cancel" type={ButtonType.button} />
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
