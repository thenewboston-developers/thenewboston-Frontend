import {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {FieldArray, Form, Formik} from 'formik';

import {createBonsai, deleteBonsai, getBonsai, updateBonsai} from 'api/bonsais';
import {getCurrencies} from 'api/currencies';
import Button from 'components/Button';
import {ButtonColor, ButtonType} from 'components/Button/types';
import EmptyText from 'components/EmptyText';
import {FieldLabel, FormField} from 'components/FormElements';
import Loader from 'components/Loader';
import SectionHeading from 'components/SectionHeading';
import {ToastType} from 'enums';
import {getSelf} from 'selectors/state';
import {Bonsai, BonsaiStatus, Currency, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';
import yup from 'utils/yup';

import * as S from './Styles';

interface FormHighlight {
  id?: number;
  text: string;
}

interface FormImage {
  clientId: string;
  file?: File | null;
  id?: number;
  preview: string | null;
}

interface FormValues {
  cultivar: string;
  description: string;
  genus: string;
  highlights: FormHighlight[];
  images: FormImage[];
  name: string;
  origin: string;
  pot: string;
  price_amount: string;
  price_currency_id: number | '';
  size: string;
  slug: string;
  species: string;
  status: BonsaiStatus;
  style: string;
  teaser: string;
}

const generateImageClientId = () => Math.random().toString(36).slice(2, 11);

const createEmptyFormImage = (): FormImage => ({
  clientId: generateImageClientId(),
  file: null,
  preview: null,
});

const mapImageToFormImage = (image: Bonsai['images'][number]): FormImage => ({
  clientId: generateImageClientId(),
  file: null,
  id: image.id,
  preview: image.url ?? null,
});

const defaultFormValues: FormValues = {
  cultivar: '',
  description: '',
  genus: '',
  highlights: [],
  images: [],
  name: '',
  origin: '',
  pot: '',
  price_amount: '',
  price_currency_id: '',
  size: '',
  slug: '',
  species: '',
  status: 'draft',
  style: '',
  teaser: '',
};

interface AdminProps {
  mode: 'create' | 'edit';
}

const Admin: SFC<AdminProps> = ({className, mode}) => {
  const self = useSelector(getSelf);
  const {id: bonsaiIdParam} = useParams<{id?: string}>();
  const navigate = useNavigate();
  const isCreateMode = mode === 'create';
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [currentBonsai, setCurrentBonsai] = useState<Bonsai | null>(null);
  const [initialValues, setInitialValues] = useState<FormValues>(defaultFormValues);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoadingBonsai, setIsLoadingBonsai] = useState(mode === 'edit');
  const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(false);

  const mapBonsaiToForm = useCallback(
    (bonsai: Bonsai): FormValues => ({
      cultivar: bonsai.cultivar,
      description: bonsai.description,
      genus: bonsai.genus,
      highlights: bonsai.highlights.map((highlight) => ({id: highlight.id, text: highlight.text})),
      images: bonsai.images.map((image) => mapImageToFormImage(image)),
      name: bonsai.name,
      origin: bonsai.origin,
      pot: bonsai.pot,
      price_amount: bonsai.price_amount.toString(),
      price_currency_id: bonsai.price_currency.id,
      size: bonsai.size,
      slug: bonsai.slug,
      species: bonsai.species,
      status: bonsai.status,
      style: bonsai.style,
      teaser: bonsai.teaser,
    }),
    [],
  );

  const fetchCurrencies = useCallback(async () => {
    setIsLoadingCurrencies(true);
    try {
      const response = await getCurrencies({page_size: 200});
      setCurrencies(response.results);
    } catch (error) {
      displayErrorToast('Unable to load currencies');
    } finally {
      setIsLoadingCurrencies(false);
    }
  }, []);

  useEffect(() => {
    if (!self.is_staff) return;
    fetchCurrencies();
  }, [fetchCurrencies, self.is_staff]);

  useEffect(() => {
    if (!self.is_staff) return;
    if (isCreateMode) {
      setCurrentBonsai(null);
      setInitialValues(defaultFormValues);
      setIsLoadingBonsai(false);
      return;
    }

    if (!bonsaiIdParam) {
      navigate('/bonsai/manage');
      return;
    }

    (async () => {
      setIsLoadingBonsai(true);
      try {
        const response = await getBonsai(bonsaiIdParam, {useAuth: true});
        setCurrentBonsai(response);
        setInitialValues(mapBonsaiToForm(response));
      } catch (error) {
        displayErrorToast('Unable to load bonsai details');
        navigate('/bonsai/manage');
      } finally {
        setIsLoadingBonsai(false);
      }
    })();
  }, [bonsaiIdParam, isCreateMode, mapBonsaiToForm, navigate, self.is_staff]);

  const handleImageFileChange =
    (index: number, setFieldValue: (field: string, value: any) => void, values: FormValues) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedImages = values.images.map((image, idx) =>
          idx === index ? {...image, file, preview: reader.result as string} : image,
        );
        setFieldValue('images', updatedImages);
      };
      reader.readAsDataURL(file);
      event.target.value = '';
    };

  const addImage = (setFieldValue: (field: string, value: any) => void, values: FormValues) => {
    setFieldValue('images', [...values.images, createEmptyFormImage()]);
  };

  const removeImage = (index: number, setFieldValue: (field: string, value: any) => void, values: FormValues) => {
    setFieldValue(
      'images',
      values.images.filter((_, idx) => idx !== index),
    );
  };

  const buildFormData = (values: FormValues): FormData | null => {
    const {
      slug: formSlug,
      name,
      species,
      genus,
      cultivar,
      style,
      size,
      origin,
      pot,
      teaser,
      description,
      price_amount,
      price_currency_id,
      status,
      highlights,
      images,
    } = values;

    const formData = new FormData();
    formData.append('slug', formSlug.trim());
    formData.append('name', name.trim());
    formData.append('species', species.trim());
    formData.append('genus', genus.trim());
    formData.append('cultivar', cultivar.trim());
    formData.append('style', style.trim());
    formData.append('size', size.trim());
    formData.append('origin', origin.trim());
    formData.append('pot', pot.trim());
    formData.append('teaser', teaser.trim());
    formData.append('description', description.trim());
    formData.append('price_amount', price_amount.toString());
    formData.append('price_currency_id', price_currency_id.toString());
    formData.append('status', status);

    const highlightsPayload = highlights
      .filter((highlight) => highlight.text.trim().length)
      .map((highlight, index) => ({
        id: highlight.id,
        order: index,
        text: highlight.text.trim(),
      }));

    formData.append('highlights', JSON.stringify(highlightsPayload));

    const imagesPayload: {id?: number; image_field?: string; order: number}[] = [];

    for (let index = 0; index < images.length; index += 1) {
      const image = images[index];
      if (!image.id && !image.file) {
        displayErrorToast('Please upload a file for each new image.');
        return null;
      }

      const metadata: {id?: number; image_field?: string; order: number} = {
        id: image.id,
        order: index,
      };

      if (image.file) {
        const fieldName = `image_${image.clientId}`;
        metadata.image_field = fieldName;
        formData.append(fieldName, image.file);
      }

      imagesPayload.push(metadata);
    }

    formData.append('images', JSON.stringify(imagesPayload));

    return formData;
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    if (!self.is_staff) return;
    const formData = buildFormData(values);
    if (!formData) return;

    try {
      let response: Bonsai;
      if (!isCreateMode && currentBonsai) {
        response = await updateBonsai(currentBonsai.id, formData);
        setCurrentBonsai(response);
        setInitialValues(mapBonsaiToForm(response));
        displayToast('Bonsai updated', ToastType.SUCCESS);
      } else {
        response = await createBonsai(formData);
        displayToast('Bonsai created', ToastType.SUCCESS);
      }
      navigate(`/bonsai/${response.id}`);
    } catch (error) {
      displayErrorToast(error);
    }
  };

  const handleDelete = async () => {
    if (!currentBonsai) return;
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm('Delete this bonsai? This cannot be undone.');
    if (!confirmed) return;
    setIsDeleting(true);
    try {
      await deleteBonsai(currentBonsai.id);
      displayToast('Bonsai deleted', ToastType.SUCCESS);
      navigate('/bonsai/manage');
    } catch (error) {
      displayErrorToast(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        cultivar: yup.string().max(255, 'Cultivar must be at most 255 characters'),
        description: yup.string().required('Description is required'),
        genus: yup.string().max(255, 'Genus must be at most 255 characters'),
        name: yup.string().required('Name is required').max(255, 'Name must be at most 255 characters'),
        origin: yup.string(),
        pot: yup.string(),
        price_amount: yup
          .number()
          .typeError('Price must be a number')
          .required('Price is required')
          .positive('Price must be positive')
          .integer('Price must be a whole number'),
        price_currency_id: yup.number().required('Currency is required'),
        size: yup.string(),
        slug: yup.string().required('Slug is required').max(255, 'Slug must be at most 255 characters'),
        species: yup.string().max(255, 'Species must be at most 255 characters'),
        status: yup.string().oneOf(['draft', 'published']),
        style: yup.string().max(255, 'Style must be at most 255 characters'),
        teaser: yup.string().required('Teaser is required').max(500, 'Teaser must be at most 500 characters'),
      }),
    [],
  );

  if (!self.is_staff) {
    return <Navigate to="/bonsai/home" replace />;
  }

  const heading = isCreateMode ? 'Create Bonsai' : 'Edit Bonsai';

  return (
    <S.Container className={className}>
      <SectionHeading heading={heading} />{' '}
      {isLoadingBonsai ? (
        <S.LoaderWrapper>
          <Loader />
        </S.LoaderWrapper>
      ) : (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({dirty, errors, isSubmitting, isValid, setFieldValue, touched, values}) => {
            const formErrors = errors as {[field: string]: string};
            const formTouched = touched as {[field: string]: boolean};

            return (
              <Form>
                <S.FormContent>
                  <FormField>
                    <S.Input
                      errors={formErrors}
                      isRequired
                      label="Name"
                      maxLength={255}
                      name="name"
                      touched={formTouched}
                    />
                  </FormField>
                  <FormField>
                    <S.Input
                      errors={formErrors}
                      isRequired
                      label="Slug"
                      maxLength={255}
                      name="slug"
                      touched={formTouched}
                    />
                  </FormField>
                  <S.FormRow>
                    <FormField>
                      <S.Input
                        errors={formErrors}
                        label="Species"
                        maxLength={255}
                        name="species"
                        touched={formTouched}
                      />
                    </FormField>
                    <FormField>
                      <S.Input errors={formErrors} label="Genus" maxLength={255} name="genus" touched={formTouched} />
                    </FormField>
                    <FormField>
                      <S.Input errors={formErrors} label="Style" maxLength={255} name="style" touched={formTouched} />
                    </FormField>
                  </S.FormRow>
                  <S.FormRow>
                    <FormField>
                      <S.Input
                        errors={formErrors}
                        label="Cultivar"
                        maxLength={255}
                        name="cultivar"
                        touched={formTouched}
                      />
                    </FormField>
                  </S.FormRow>
                  <S.FormRow>
                    <FormField>
                      <S.Textarea errors={formErrors} label="Size" name="size" touched={formTouched} />
                    </FormField>
                    <FormField>
                      <S.Textarea errors={formErrors} label="Origin" name="origin" touched={formTouched} />
                    </FormField>
                  </S.FormRow>
                  <FormField>
                    <S.Textarea errors={formErrors} label="Pot" name="pot" touched={formTouched} />
                  </FormField>
                  <S.FormRow>
                    <FormField>
                      <FieldLabel text="Status" />
                      <S.Select
                        name="status"
                        onChange={(e) => setFieldValue('status', e.target.value)}
                        value={values.status}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </S.Select>
                    </FormField>
                    <FormField>
                      <FieldLabel isRequired text="Currency" />
                      <S.Select
                        $error={!!(errors.price_currency_id && touched.price_currency_id)}
                        disabled={isLoadingCurrencies}
                        name="price_currency_id"
                        onChange={(e) =>
                          setFieldValue('price_currency_id', e.target.value ? Number(e.target.value) : '')
                        }
                        value={values.price_currency_id}
                      >
                        <option value="">Select currency</option>
                        {currencies
                          .slice()
                          .sort((a, b) => a.ticker.localeCompare(b.ticker))
                          .map((currency) => (
                            <option key={currency.id} value={currency.id}>
                              {currency.ticker}
                            </option>
                          ))}
                      </S.Select>
                    </FormField>
                    <FormField>
                      <S.Input
                        errors={formErrors}
                        isRequired
                        label="Price"
                        name="price_amount"
                        touched={formTouched}
                        type="number"
                      />
                    </FormField>
                  </S.FormRow>
                  <FormField>
                    <S.Textarea
                      errors={formErrors}
                      isRequired
                      label="Teaser"
                      maxLength={500}
                      name="teaser"
                      touched={formTouched}
                    />
                  </FormField>
                  <FormField>
                    <S.Textarea
                      errors={formErrors}
                      isRequired
                      label="Description"
                      name="description"
                      touched={formTouched}
                    />
                  </FormField>

                  <S.ArraySection>
                    <FieldArray name="highlights">
                      {(arrayHelpers) => (
                        <>
                          <S.ArrayHeader>
                            <S.ArrayTitle>Highlights</S.ArrayTitle>
                            <Button
                              color={ButtonColor.secondary}
                              onClick={() => arrayHelpers.push({text: ''})}
                              text="Add highlight"
                              type={ButtonType.button}
                            />
                          </S.ArrayHeader>
                          {values.highlights.length ? (
                            values.highlights.map((highlight, index) => (
                              <S.ArrayItem key={highlight.id ?? index}>
                                <S.PlainInput
                                  onChange={(event) => setFieldValue(`highlights.${index}.text`, event.target.value)}
                                  value={highlight.text}
                                />
                                <S.RemoveButton onClick={() => arrayHelpers.remove(index)} type="button">
                                  Remove
                                </S.RemoveButton>
                              </S.ArrayItem>
                            ))
                          ) : (
                            <EmptyText>No highlights yet.</EmptyText>
                          )}
                        </>
                      )}
                    </FieldArray>
                  </S.ArraySection>

                  <S.ArraySection>
                    <S.ArrayHeader>
                      <S.ArrayTitle>Images</S.ArrayTitle>
                      <Button
                        color={ButtonColor.secondary}
                        onClick={() => addImage(setFieldValue, values)}
                        text="Add image"
                        type={ButtonType.button}
                      />
                    </S.ArrayHeader>
                    {values.images.length ? (
                      values.images.map((image, index) => {
                        const inputId = `bonsai-image-${image.clientId}`;
                        const altText = values.name ? `${values.name} image ${index + 1}` : `Bonsai image ${index + 1}`;

                        return (
                          <S.ArrayItem key={image.clientId}>
                            <S.ImagePreviewWrapper>
                              {image.preview ? (
                                <S.ImagePreview alt={altText} src={image.preview} />
                              ) : (
                                <S.ImagePlaceholder>No image</S.ImagePlaceholder>
                              )}
                            </S.ImagePreviewWrapper>
                            <S.ImageControls>
                              <S.FileButton htmlFor={inputId}>
                                {image.preview ? 'Replace image' : 'Upload image'}
                              </S.FileButton>
                              <S.HiddenFileInput
                                accept="image/*"
                                id={inputId}
                                onChange={handleImageFileChange(index, setFieldValue, values)}
                                type="file"
                              />
                              {image.file ? <S.FileName>{image.file.name}</S.FileName> : null}
                            </S.ImageControls>
                            <S.RemoveButton onClick={() => removeImage(index, setFieldValue, values)} type="button">
                              Remove
                            </S.RemoveButton>
                          </S.ArrayItem>
                        );
                      })
                    ) : (
                      <EmptyText>No images yet.</EmptyText>
                    )}
                  </S.ArraySection>

                  <S.FormActions>
                    {!isCreateMode && currentBonsai ? (
                      <Button
                        color={ButtonColor.danger}
                        disabled={isDeleting}
                        isSubmitting={isDeleting}
                        onClick={handleDelete}
                        text="Delete"
                        type={ButtonType.button}
                      />
                    ) : (
                      <div />
                    )}
                    <Button
                      dirty={dirty}
                      isSubmitting={isSubmitting}
                      isValid={isValid}
                      text="Save"
                      type={ButtonType.submit}
                    />
                  </S.FormActions>
                </S.FormContent>
              </Form>
            );
          }}
        </Formik>
      )}
    </S.Container>
  );
};

export default Admin;
