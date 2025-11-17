import {ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {Navigate, useNavigate, useParams} from 'react-router-dom';

import {createBonsai, deleteBonsai, getBonsai, updateBonsai} from 'api/bonsais';
import {getCurrencies} from 'api/currencies';
import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import SectionHeading from 'components/SectionHeading';
import {ToastType} from 'enums';
import {getSelf} from 'selectors/state';
import {Bonsai, BonsaiStatus, Currency, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';

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
  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const [isLoadingBonsai, setIsLoadingBonsai] = useState(mode === 'edit');
  const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      setFormValues(defaultFormValues);
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
        setFormValues(mapBonsaiToForm(response));
      } catch (error) {
        displayErrorToast('Unable to load bonsai details');
        navigate('/bonsai/manage');
      } finally {
        setIsLoadingBonsai(false);
      }
    })();
  }, [bonsaiIdParam, isCreateMode, mapBonsaiToForm, navigate, self.is_staff]);

  const handleInputChange =
    (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {value} = event.target;
      setFormValues((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleSelectChange = (field: keyof FormValues) => (event: ChangeEvent<HTMLSelectElement>) => {
    const {value} = event.target;
    let nextValue: string | number | '' = value;

    if (field === 'price_currency_id') {
      nextValue = value ? Number(value) : '';
    }

    setFormValues((prev) => ({
      ...prev,
      [field]: nextValue,
    }));
  };

  const handleHighlightChange = (index: number, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      highlights: prev.highlights.map((highlight, idx) => (idx === index ? {...highlight, text: value} : highlight)),
    }));
  };

  const handleImageFileChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormValues((prev) => ({
        ...prev,
        images: prev.images.map((image, idx) =>
          idx === index ? {...image, file, preview: reader.result as string} : image,
        ),
      }));
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const addHighlight = () =>
    setFormValues((prev) => ({
      ...prev,
      highlights: [...prev.highlights, {text: ''}],
    }));

  const removeHighlight = (index: number) =>
    setFormValues((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, idx) => idx !== index),
    }));

  const addImage = () =>
    setFormValues((prev) => ({
      ...prev,
      images: [...prev.images, createEmptyFormImage()],
    }));

  const removeImage = (index: number) =>
    setFormValues((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index),
    }));

  const buildFormData = (): FormData | null => {
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
    } = formValues;

    if (
      !formSlug.trim() ||
      !name.trim() ||
      !species.trim() ||
      !genus.trim() ||
      !cultivar.trim() ||
      !style.trim() ||
      !size.trim() ||
      !origin.trim() ||
      !pot.trim() ||
      !teaser.trim() ||
      !description.trim()
    ) {
      displayErrorToast('Please complete all required text fields.');
      return null;
    }

    if (!price_currency_id || !price_amount.trim()) {
      displayErrorToast('Please enter a price and currency.');
      return null;
    }

    const numericPrice = Number(price_amount);
    if (!Number.isInteger(numericPrice) || numericPrice < 1) {
      displayErrorToast('Price must be a positive whole number.');
      return null;
    }

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
    formData.append('price_amount', numericPrice.toString());
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!self.is_staff) return;
    const formData = buildFormData();
    if (!formData) return;
    setIsSaving(true);
    try {
      if (!isCreateMode && currentBonsai) {
        const response = await updateBonsai(currentBonsai.id, formData);
        setCurrentBonsai(response);
        setFormValues(mapBonsaiToForm(response));
        displayToast('Bonsai updated', ToastType.SUCCESS);
      } else {
        await createBonsai(formData);
        displayToast('Bonsai created', ToastType.SUCCESS);
        navigate('/bonsai/manage');
      }
    } catch (error) {
      displayErrorToast(error);
    } finally {
      setIsSaving(false);
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

  const isFormValid = useMemo(() => {
    return (
      !!formValues.slug.trim() &&
      !!formValues.name.trim() &&
      !!formValues.species.trim() &&
      !!formValues.genus.trim() &&
      !!formValues.cultivar.trim() &&
      !!formValues.style.trim() &&
      !!formValues.size.trim() &&
      !!formValues.origin.trim() &&
      !!formValues.pot.trim() &&
      !!formValues.teaser.trim() &&
      !!formValues.description.trim() &&
      !!formValues.price_amount.trim() &&
      !!formValues.price_currency_id
    );
  }, [formValues]);

  if (!self.is_staff) {
    return <Navigate to="/bonsai/home" replace />;
  }

  const heading = isCreateMode ? 'Create Bonsai' : 'Edit Bonsai';

  return (
    <S.Container className={className}>
      <SectionHeading
        heading={heading}
        rightContent={
          <S.HeaderActions>
            <S.SecondaryButton onClick={() => navigate('/bonsai/manage')} type="button">
              Back to Manage
            </S.SecondaryButton>
          </S.HeaderActions>
        }
      />
      {isLoadingBonsai ? (
        <S.LoaderWrapper>
          <Loader />
        </S.LoaderWrapper>
      ) : (
        <S.Form onSubmit={handleSubmit}>
          <S.FieldGroup>
            <S.Label>Slug</S.Label>
            <S.Input onChange={handleInputChange('slug')} value={formValues.slug} />
          </S.FieldGroup>
          <S.FieldGroup>
            <S.Label>Name</S.Label>
            <S.Input onChange={handleInputChange('name')} value={formValues.name} />
          </S.FieldGroup>
          <S.FormRow>
            <S.FieldGroup>
              <S.Label>Species</S.Label>
              <S.Input onChange={handleInputChange('species')} value={formValues.species} />
            </S.FieldGroup>
            <S.FieldGroup>
              <S.Label>Genus</S.Label>
              <S.Input onChange={handleInputChange('genus')} value={formValues.genus} />
            </S.FieldGroup>
            <S.FieldGroup>
              <S.Label>Style</S.Label>
              <S.Input onChange={handleInputChange('style')} value={formValues.style} />
            </S.FieldGroup>
          </S.FormRow>
          <S.FormRow>
            <S.FieldGroup>
              <S.Label>Cultivar</S.Label>
              <S.Input onChange={handleInputChange('cultivar')} value={formValues.cultivar} />
            </S.FieldGroup>
          </S.FormRow>
          <S.FormRow>
            <S.FieldGroup>
              <S.Label>Size</S.Label>
              <S.Input onChange={handleInputChange('size')} value={formValues.size} />
            </S.FieldGroup>
            <S.FieldGroup>
              <S.Label>Origin</S.Label>
              <S.Input onChange={handleInputChange('origin')} value={formValues.origin} />
            </S.FieldGroup>
          </S.FormRow>
          <S.FieldGroup>
            <S.Label>Pot</S.Label>
            <S.Input onChange={handleInputChange('pot')} value={formValues.pot} />
          </S.FieldGroup>
          <S.FormRow>
            <S.FieldGroup>
              <S.Label>Status</S.Label>
              <S.Select onChange={handleSelectChange('status')} value={formValues.status}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </S.Select>
            </S.FieldGroup>
            <S.FieldGroup>
              <S.Label>Currency</S.Label>
              <S.Select
                disabled={isLoadingCurrencies}
                onChange={handleSelectChange('price_currency_id')}
                value={formValues.price_currency_id}
              >
                <option value="">Select currency</option>
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.id}>
                    {currency.ticker}
                  </option>
                ))}
              </S.Select>
            </S.FieldGroup>
            <S.FieldGroup>
              <S.Label>Price</S.Label>
              <S.Input onChange={handleInputChange('price_amount')} type="number" value={formValues.price_amount} />
            </S.FieldGroup>
          </S.FormRow>
          <S.FieldGroup>
            <S.Label>Teaser</S.Label>
            <S.Textarea onChange={handleInputChange('teaser')} rows={2} value={formValues.teaser} />
          </S.FieldGroup>
          <S.FieldGroup>
            <S.Label>Description</S.Label>
            <S.Textarea onChange={handleInputChange('description')} rows={5} value={formValues.description} />
          </S.FieldGroup>

          <S.ArraySection>
            <S.ArrayHeader>
              <S.ArrayTitle>Highlights</S.ArrayTitle>
              <S.SecondaryButton onClick={addHighlight} type="button">
                Add highlight
              </S.SecondaryButton>
            </S.ArrayHeader>
            {formValues.highlights.length ? (
              formValues.highlights.map((highlight, index) => (
                <S.ArrayItem key={highlight.id ?? index}>
                  <S.Input
                    onChange={(event) => handleHighlightChange(index, event.target.value)}
                    value={highlight.text}
                  />
                  <S.RemoveButton onClick={() => removeHighlight(index)} type="button">
                    Remove
                  </S.RemoveButton>
                </S.ArrayItem>
              ))
            ) : (
              <EmptyText>No highlights yet.</EmptyText>
            )}
          </S.ArraySection>

          <S.ArraySection>
            <S.ArrayHeader>
              <S.ArrayTitle>Images</S.ArrayTitle>
              <S.SecondaryButton onClick={addImage} type="button">
                Add image
              </S.SecondaryButton>
            </S.ArrayHeader>
            {formValues.images.length ? (
              formValues.images.map((image, index) => {
                const inputId = `bonsai-image-${image.clientId}`;
                const altText = formValues.name ? `${formValues.name} image ${index + 1}` : `Bonsai image ${index + 1}`;

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
                      <S.FileButton htmlFor={inputId}>{image.preview ? 'Replace image' : 'Upload image'}</S.FileButton>
                      <S.HiddenFileInput
                        accept="image/*"
                        id={inputId}
                        onChange={handleImageFileChange(index)}
                        type="file"
                      />
                      {image.file ? <S.FileName>{image.file.name}</S.FileName> : null}
                    </S.ImageControls>
                    <S.RemoveButton onClick={() => removeImage(index)} type="button">
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
              <S.DangerButton disabled={isDeleting} onClick={handleDelete} type="button">
                {isDeleting ? 'Deleting...' : 'Delete'}
              </S.DangerButton>
            ) : (
              <div />
            )}
            <S.PrimaryButton disabled={!isFormValid || isSaving} type="submit">
              {isSaving ? 'Saving...' : 'Save'}
            </S.PrimaryButton>
          </S.FormActions>
        </S.Form>
      )}
    </S.Container>
  );
};

export default Admin;
