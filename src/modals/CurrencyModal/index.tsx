import {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Form, Formik} from 'formik';

import Button from 'components/Button';
import {ButtonColor, ButtonType} from 'components/Button/types';
import {FileInput, FormField} from 'components/FormElements';
import ImagePreview from 'components/ImagePreview';
import {ModalFooterButton} from 'components/Modal';
import {createCurrency, updateCurrency} from 'dispatchers/currencies';
import {getSelf} from 'selectors/state';
import {AppDispatch, Currency, SFC} from 'types';
import {handleFormikAPIError} from 'utils/forms';
import {socialUsernameValidators} from 'utils/socialUsernameValidation';
import {displayErrorToast} from 'utils/toasts';
import yup from 'utils/yup';

import * as S from './Styles';

export interface CurrencyModalProps {
  close(): void;
  currency?: Currency;
  onSuccess?: () => void;
}

const CurrencyModal: SFC<CurrencyModalProps> = ({className, close, currency, onSuccess}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const self = useSelector(getSelf);

  const isEditMode = !!currency;

  const initialValues = useMemo(
    () => ({
      description: currency?.description || '',
      discord_username: currency?.discord_username || '',
      domain: currency?.domain || '',
      facebook_username: currency?.facebook_username || '',
      github_username: currency?.github_username || '',
      instagram_username: currency?.instagram_username || '',
      linkedin_username: currency?.linkedin_username || '',
      logo: currency?.logo || '',
      pinterest_username: currency?.pinterest_username || '',
      reddit_username: currency?.reddit_username || '',
      ticker: currency?.ticker || '',
      tiktok_username: currency?.tiktok_username || '',
      twitch_username: currency?.twitch_username || '',
      x_username: currency?.x_username || '',
      youtube_username: currency?.youtube_username || '',
    }),
    [currency],
  );

  type FormValues = typeof initialValues;

  useEffect(() => {
    if (initialValues.logo) {
      setPreview(initialValues.logo);
    }
  }, [initialValues.logo]);

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          if (img.width !== 512 || img.height !== 512) {
            displayErrorToast('Logo must be 512x512 pixels');
            event.target.value = '';
            setFieldValue('logo', '');
            return;
          }
          setPreview(reader.result as string);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: FormValues, helpers: any): Promise<void> => {
    try {
      const requestData = new FormData();

      if (isEditMode) {
        // Always append description to ensure empty values are sent
        requestData.append('description', values.description);
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

        if (initialValues.logo !== values.logo) {
          requestData.append('logo', values.logo);
        }

        await dispatch(updateCurrency(currency.id, requestData));
      } else {
        // Create mode
        if (values.description) {
          requestData.append('description', values.description);
        }

        if (self.is_staff && values.domain) {
          requestData.append('domain', values.domain);
        }

        requestData.append('ticker', values.ticker);
        requestData.append('logo', values.logo);
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

        const createdCurrency = await dispatch(createCurrency(requestData));
        onSuccess?.();
        close();
        navigate(`/currencies/${createdCurrency.id}`);
      }

      onSuccess?.();
      close();
    } catch (error) {
      const errorMessage = isEditMode ? 'Error updating currency' : 'Error creating currency';
      handleFormikAPIError(error, helpers, errorMessage);
    }
  };

  const validationSchema = useMemo(() => {
    const schema: any = {
      description: yup.string().max(500, 'Description must be at most 500 characters'),
      logo: yup.string().required('Logo is required (512x512 px)'),
    };

    if (!isEditMode) {
      schema.ticker = yup
        .string()
        .required('Ticker is required')
        .matches(/^[A-Z]+$/, 'Ticker must contain only uppercase letters')
        .max(5, 'Ticker must be at most 5 characters');

      if (self.is_staff) {
        schema.domain = yup.string();
      }
    }

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
  }, [isEditMode, self.is_staff]);

  return (
    <S.Modal className={className} close={close} header={isEditMode ? 'Edit Currency' : 'Create Currency'}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, touched, isValid, setFieldValue, values}) => (
          <Form>
            <S.ModalContent>
              <S.Section>
                {!isEditMode && (
                  <>
                    <FormField>
                      <S.Input errors={errors} label="Ticker" name="ticker" touched={touched} />
                    </FormField>
                    {self.is_staff && (
                      <FormField>
                        <S.Input errors={errors} label="Domain (optional)" name="domain" touched={touched} />
                      </FormField>
                    )}
                  </>
                )}
                <S.SectionHeading>Logo</S.SectionHeading>
                {!values.logo && (
                  <FormField>
                    <FileInput
                      errors={errors}
                      label="Logo (required, 512x512 pixels)"
                      name="logo"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e, setFieldValue)}
                      touched={touched}
                    />
                  </FormField>
                )}
                <ImagePreview
                  onClear={async () => {
                    await setFieldValue('logo', '');
                    setPreview(null);
                  }}
                  src={preview}
                />
              </S.Section>

              <S.Section>
                <S.SectionHeading>Description</S.SectionHeading>
                <FormField>
                  <S.Textarea errors={errors} label="" name="description" touched={touched} />
                </FormField>
              </S.Section>

              <S.Section>
                <S.SectionHeading>Social Media</S.SectionHeading>
                <S.SocialMediaGrid>
                  <FormField>
                    <S.Input errors={errors} label="Discord" name="discord_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <S.Input errors={errors} label="Reddit" name="reddit_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <S.Input errors={errors} label="Facebook" name="facebook_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <S.Input errors={errors} label="TikTok" name="tiktok_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <S.Input errors={errors} label="GitHub" name="github_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <S.Input errors={errors} label="Twitch" name="twitch_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <S.Input errors={errors} label="Instagram" name="instagram_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <S.Input errors={errors} label="X" name="x_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <S.Input errors={errors} label="LinkedIn" name="linkedin_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <S.Input errors={errors} label="YouTube" name="youtube_username" touched={touched} />
                  </FormField>
                  <FormField>
                    <S.Input errors={errors} label="Pinterest" name="pinterest_username" touched={touched} />
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

export default CurrencyModal;
