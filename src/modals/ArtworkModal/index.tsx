import React, {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {Input} from 'components/FormElements';
import {createArtwork, updateArtwork} from 'dispatchers/artworks';
import {ToastType} from 'enums';
import {AppDispatch, Artwork, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

export interface ArtworkModalProps {
  artwork?: Artwork;
  close(): void;
  description?: string;
  imageUrl: string;
}

const ArtworkModal: SFC<ArtworkModalProps> = ({artwork, className, close, description, imageUrl}) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = useMemo(
    () => ({
      description: artwork?.description || description || '',
      name: artwork?.name || '',
    }),
    [artwork?.description, artwork?.name, description],
  );

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      if (artwork) {
        await dispatch(updateArtwork(artwork.id, values));
        displayToast('Artwork updated!', ToastType.SUCCESS);
      } else {
        await dispatch(createArtwork({image_url: imageUrl, ...values}));
        displayToast('Artwork created!', ToastType.SUCCESS);
      }

      close();
    } catch (error) {
      console.error(error);
      const verb = artwork ? 'updating' : 'creating';
      displayErrorToast(`Error ${verb} artwork`);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required(),
      name: yup.string().required(),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header={artwork ? 'Edit Artwork' : 'Create Artwork'}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, isValid, touched}) => (
          <Form>
            <Input errors={errors} label="Name" name="name" touched={touched} />
            <Input errors={errors} label="Description" name="description" touched={touched} />
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

export default ArtworkModal;
