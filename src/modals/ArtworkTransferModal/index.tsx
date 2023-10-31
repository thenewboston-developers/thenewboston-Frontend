import React, {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {Input} from 'components/FormElements';
import {getArtwork} from 'dispatchers/artworks';
import {createArtworkTransfer} from 'dispatchers/artworkTransfers';
import {ToastType} from 'enums';
import {AppDispatch, Artwork, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

interface ArtworkTransferModalProps {
  artwork: Artwork;
  close(): void;
}

const ArtworkTransferModal: SFC<ArtworkTransferModalProps> = ({artwork, className, close}) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = useMemo(
    () => ({
      new_owner: '',
    }),
    [],
  );

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      await dispatch(
        createArtworkTransfer({
          artwork: artwork.id,
          new_owner: parseInt(values.new_owner, 10),
        }),
      );
      await dispatch(getArtwork(artwork.id));
      displayToast('Artwork transferred successfully!', ToastType.SUCCESS);
      close();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error transferring artwork');
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      new_owner: yup.number().required().positive().integer().label('New Owner ID'),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header="Transfer Artwork">
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, isValid, touched}) => (
          <Form>
            <Input errors={errors} label="New Owner ID" name="new_owner" touched={touched} />
            <Button
              dirty={dirty}
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              isValid={isValid}
              text="Transfer"
              type={ButtonType.submit}
            />
          </Form>
        )}
      </Formik>
    </S.Modal>
  );
};

export default ArtworkTransferModal;
