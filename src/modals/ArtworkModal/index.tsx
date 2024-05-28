import React, {Dispatch, SetStateAction, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {Input, Select} from 'components/FormElements';
import {createArtwork, updateArtwork} from 'dispatchers/artworks';
import {ToastType} from 'enums';
import {usePriceCoreOptions} from 'hooks';
import {AppDispatch, Artwork, SFC} from 'types';
import {displayErrorToasts, displayToast} from 'utils/toasts';
import yup from 'utils/yup';
import * as S from './Styles';
import Tab from 'components/Tab';
import Icon from '@mdi/react';
import {mdiCartArrowDown, mdiCartArrowUp} from '@mdi/js';

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
  const [activeTab, setActiveTab] = useState<SaveTypeTab>(SaveTypeTab.SAVE);

  const renderTabs = () => {
    return (
      <S.Tabs>
        <Tab isActive={activeTab === SaveTypeTab.SELL} onClick={() => setActiveTab(SaveTypeTab.SELL)}>
          <Icon path={mdiCartArrowDown} size={'16px'} />
          Sell on Marketplace
        </Tab>
        <Tab isActive={activeTab === SaveTypeTab.SAVE} onClick={() => setActiveTab(SaveTypeTab.SAVE)}>
          <Icon path={mdiCartArrowUp} size={'16px'} />
          Save As Draft
        </Tab>
      </S.Tabs>
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
        {({dirty, errors, isSubmitting, isValid, touched}) => (
          <>
            {renderTabs()}
            <Form>
              <Input errors={errors} label="Name" name="name" touched={touched} />
              <Input errors={errors} label="Description" name="description" touched={touched} />
              {activeTab === SaveTypeTab.SELL && (
                <>
                  <Select
                    errors={errors}
                    label="Currency"
                    name="price_core"
                    options={priceCoreOptions}
                    touched={touched}
                  />
                  <Input errors={errors} label="Price Amount" name="price_amount" touched={touched} type="number" />
                </>
              )}{' '}
              <Button
                dirty={dirty}
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
                isValid={isValid}
                text={activeTab === SaveTypeTab.SELL ? 'Sell on Marketplace' : 'Save as Draft'}
                type={ButtonType.submit}
              />
            </Form>
          </>
        )}
      </Formik>
    </S.Modal>
  );
};

export default ArtworkModal;
