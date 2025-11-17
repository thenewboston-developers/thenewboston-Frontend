import {ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

import {createBonsai, deleteBonsai, getBonsais, updateBonsai} from 'api/bonsais';
import {getCurrencies} from 'api/currencies';
import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import SectionHeading from 'components/SectionHeading';
import {ToastType} from 'enums';
import {getSelf} from 'selectors/state';
import {Bonsai, BonsaiPayload, Currency, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';

import * as S from './Styles';

interface FormHighlight {
  id?: number;
  text: string;
}

interface FormImage {
  id?: number;
  url: string;
}

interface FormValues extends Omit<BonsaiPayload, 'price_currency_id' | 'price_amount' | 'highlights' | 'images'> {
  cultivar: string;
  genus: string;
  highlights: FormHighlight[];
  images: FormImage[];
  price_amount: string;
  price_currency_id: number | '';
}

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

const Admin: SFC = ({className}) => {
  const self = useSelector(getSelf);
  const [bonsais, setBonsais] = useState<Bonsai[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedBonsai, setSelectedBonsai] = useState<Bonsai | null>(null);
  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const [isLoadingBonsais, setIsLoadingBonsais] = useState(false);
  const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const mapBonsaiToForm = useCallback(
    (bonsai: Bonsai): FormValues => ({
      cultivar: bonsai.cultivar,
      description: bonsai.description,
      genus: bonsai.genus,
      highlights: bonsai.highlights.map((highlight) => ({id: highlight.id, text: highlight.text})),
      images: bonsai.images.map((image) => ({id: image.id, url: image.url})),
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

  const handleSelectBonsai = useCallback((bonsai: Bonsai) => {
    setIsCreatingNew(false);
    setSelectedBonsai(bonsai);
  }, []);

  const fetchBonsais = useCallback(async (shouldSelectFirst = false) => {
    setIsLoadingBonsais(true);
    try {
      const response = await getBonsais();
      setBonsais(response);
      setSelectedBonsai((prev) => {
        if ((shouldSelectFirst || !prev) && response.length) {
          return response[0];
        }

        if (!prev) {
          return prev;
        }

        const updated = response.find((bonsai) => bonsai.slug === prev.slug);
        return updated ?? prev;
      });
    } catch (error) {
      displayErrorToast('Unable to load bonsai entries');
    } finally {
      setIsLoadingBonsais(false);
    }
  }, []);

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
    fetchBonsais(true);
    fetchCurrencies();
  }, [fetchBonsais, fetchCurrencies, self.is_staff]);

  const handleCreateNew = () => {
    setIsCreatingNew(true);
    setSelectedBonsai(null);
    setFormValues(defaultFormValues);
  };

  useEffect(() => {
    if (selectedBonsai) {
      setFormValues(mapBonsaiToForm(selectedBonsai));
    }
  }, [mapBonsaiToForm, selectedBonsai]);

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

  const handleImageChange = (index: number, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      images: prev.images.map((image, idx) => (idx === index ? {...image, url: value} : image)),
    }));
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
      images: [...prev.images, {url: ''}],
    }));

  const removeImage = (index: number) =>
    setFormValues((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index),
    }));

  const buildPayload = (): BonsaiPayload | null => {
    const {
      slug,
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
      !slug.trim() ||
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

    return {
      cultivar: cultivar.trim(),
      slug: slug.trim(),
      name: name.trim(),
      species: species.trim(),
      genus: genus.trim(),
      style: style.trim(),
      size: size.trim(),
      origin: origin.trim(),
      pot: pot.trim(),
      teaser: teaser.trim(),
      description: description.trim(),
      price_amount: numericPrice.toString(),
      price_currency_id,
      status,
      highlights: highlights
        .filter((highlight) => highlight.text.trim().length)
        .map((highlight, index) => ({
          id: highlight.id,
          order: index,
          text: highlight.text.trim(),
        })),
      images: images
        .filter((image) => image.url.trim().length)
        .map((image, index) => ({
          id: image.id,
          order: index,
          url: image.url.trim(),
        })),
    };
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!self.is_staff) return;
    const payload = buildPayload();
    if (!payload) return;
    setIsSaving(true);
    try {
      const response =
        selectedBonsai && !isCreatingNew
          ? await updateBonsai(selectedBonsai.slug, payload)
          : await createBonsai(payload);
      setSelectedBonsai(response);
      setFormValues(mapBonsaiToForm(response));
      setIsCreatingNew(false);
      displayToast(selectedBonsai && !isCreatingNew ? 'Bonsai updated' : 'Bonsai created', ToastType.SUCCESS);
      await fetchBonsais();
    } catch (error) {
      displayErrorToast(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedBonsai) return;
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm('Delete this bonsai? This cannot be undone.');
    if (!confirmed) return;
    setIsDeleting(true);
    try {
      await deleteBonsai(selectedBonsai.slug);
      displayToast('Bonsai deleted', ToastType.SUCCESS);
      setSelectedBonsai(null);
      setFormValues(defaultFormValues);
      setIsCreatingNew(true);
      await fetchBonsais(bonsais.length > 1);
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

  const renderBonsaiColumnContent = () => {
    if (isLoadingBonsais) {
      return (
        <S.InventoryLoader>
          <Loader size={28} />
        </S.InventoryLoader>
      );
    }

    if (bonsais.length) {
      return (
        <S.InventoryList>
          {bonsais.map((bonsai) => (
            <S.InventoryButton
              $isActive={!isCreatingNew && selectedBonsai?.slug === bonsai.slug}
              key={bonsai.slug}
              onClick={() => handleSelectBonsai(bonsai)}
              type="button"
            >
              <div>
                <S.BonsaiName>{bonsai.name}</S.BonsaiName>
                <S.BonsaiMeta>{bonsai.slug}</S.BonsaiMeta>
              </div>
              <S.StatusBadge $status={bonsai.status}>
                {bonsai.status === 'published' ? 'Published' : 'Draft'}
              </S.StatusBadge>
            </S.InventoryButton>
          ))}
        </S.InventoryList>
      );
    }

    return <EmptyText>No bonsai found.</EmptyText>;
  };

  if (!self.is_staff) {
    return <Navigate to="/bonsai/home" replace />;
  }

  return (
    <S.Container className={className}>
      <SectionHeading heading="Manage Bonsai" />
      <S.Content>
        <S.InventoryColumn>
          <S.InventoryColumnHeader>
            <S.InventoryColumnTitle>Inventory</S.InventoryColumnTitle>
            <S.SecondaryButton onClick={handleCreateNew} type="button">
              New Bonsai
            </S.SecondaryButton>
          </S.InventoryColumnHeader>
          {renderBonsaiColumnContent()}
        </S.InventoryColumn>

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
              formValues.images.map((image, index) => (
                <S.ArrayItem key={image.id ?? index}>
                  <S.Input
                    onChange={(event) => handleImageChange(index, event.target.value)}
                    placeholder="https://example.com/bonsai.jpg"
                    value={image.url}
                  />
                  <S.RemoveButton onClick={() => removeImage(index)} type="button">
                    Remove
                  </S.RemoveButton>
                </S.ArrayItem>
              ))
            ) : (
              <EmptyText>No images yet.</EmptyText>
            )}
          </S.ArraySection>

          <S.FormActions>
            {selectedBonsai && !isCreatingNew ? (
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
      </S.Content>
    </S.Container>
  );
};

export default Admin;
