import React, {Dispatch, SetStateAction, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';

import {AppDispatch, Artwork, SFC} from 'types';
import {createArtwork, updateArtwork} from 'dispatchers/artworks';
import {displayErrorToasts, displayToast} from 'utils/toasts';
import {Input, Select, Textarea} from 'components/FormElements';
import {mdiContentSaveOutline, mdiCubeScan} from '@mdi/js';
import {ToastType} from 'enums';
import {usePriceCoreOptions} from 'hooks';
import * as S from './Styles';
import Button, {ButtonType} from 'components/Button';
import Icon from '@mdi/react';
import yup from 'utils/yup';

export interface ArtworkModalProps {
  artwork?: Artwork;
  close(): void;
  description?: string;
  imageUrl: string;
  currentIndex?: number;
  setIsImageSaved?: Dispatch<SetStateAction<number[]>>;
}

const ArtworkModal: SFC<ArtworkModalProps> = ({
  artwork,
  className,
  close,
  description,
  imageUrl,
  currentIndex,
  setIsImageSaved,
}) => {
  enum SaveTypeTab {
    SELL = 'Sell On Marketplace',
    SAVE = 'Save As Draft',
  }

  const dispatch = useDispatch<AppDispatch>();
  const priceCoreOptions = usePriceCoreOptions();
  const [activeTab, setActiveTab] = useState<SaveTypeTab>(SaveTypeTab.SELL);

  const renderTabs = (artworkVl: Artwork | null) => {
    return (
      <>
        {!artworkVl?.price_amount && (
          <S.Tabs>
            <S.CustomTab isActive={activeTab === SaveTypeTab.SELL} onClick={() => setActiveTab(SaveTypeTab.SELL)}>
              <Icon path={mdiCubeScan} size={'16px'} />
              Sell on Marketplace
            </S.CustomTab>
            <S.CustomTab isActive={activeTab === SaveTypeTab.SAVE} onClick={() => setActiveTab(SaveTypeTab.SAVE)}>
              <Icon path={mdiContentSaveOutline} size={'16px'} />
              Save As Draft
            </S.CustomTab>
          </S.Tabs>
        )}
      </>
    );
  };

  const initialValues = useMemo(
    () => ({
      description: artwork?.description || description || '',
      name: artwork?.name || '',
      price_amount: artwork?.price_amount?.toString() || '',
      price_core: artwork?.price_core?.toString() || '',
    }),
    [artwork?.description, artwork?.name, artwork?.price_amount, artwork?.price_core, description],
  );

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const requestData = {
        ...values,
        price_amount: values.price_amount === '' ? null : parseInt(values.price_amount, 10),
        price_core: values.price_core === '0' ? null : values.price_core,
      };

      if (artwork) {
        await dispatch(updateArtwork(artwork.id, requestData));
        displayToast('Artwork updated!', ToastType.SUCCESS);
      } else {
        await dispatch(createArtwork({image_url: imageUrl, ...requestData}));
        displayToast('Artwork created!', ToastType.SUCCESS);
        if (setIsImageSaved && (currentIndex === 0 || currentIndex)) {
          setIsImageSaved((prev) => [...prev, currentIndex]);
        }
      }

      close();
    } catch (error: any) {
      console.error(error);
      const defaultErrorMessage = `Error ${artwork ? 'updating' : 'creating'} artwork`;
      displayErrorToasts(error?.response?.data || [defaultErrorMessage]);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required(),
      name: yup.string().required(),
      price_amount: yup.number(),
      price_core: yup.number(),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header={artwork ? 'Edit Artwork' : 'Create Artwork'}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, isValid, touched}) => {
          return (
            <>
              {renderTabs(artwork ? artwork : null)}
              <S.Divider />
              <Form>
                <Input errors={errors} label="NAME" name="name" touched={touched} />
                <Textarea errors={errors} label="DESCRIPTION" name="description" touched={touched} />
                {activeTab === SaveTypeTab.SELL && (
                  <S.Row>
                    <Select
                      errors={errors}
                      label="CURRENCY"
                      name="price_core"
                      options={priceCoreOptions}
                      touched={touched}
                    />
                    <S.Container>
                      <Input errors={errors} label="PRICE AMOUNT" name="price_amount" touched={touched} type="number" />
                    </S.Container>
                  </S.Row>
                )}{' '}
                <Button
                  dirty={dirty}
                  disabled={isSubmitting}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                  text={activeTab === SaveTypeTab.SELL ? 'Sell artwork' : 'Save as draft'}
                  type={ButtonType.submit}
                />
              </Form>
            </>
          );
        }}
      </Formik>
    </S.Modal>
  );
};

export default ArtworkModal;
