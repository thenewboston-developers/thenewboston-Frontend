import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import Button from 'components/Button';
import {ButtonColor, ButtonType} from 'components/Button/types';
import EmojiPicker from 'components/EmojiPicker';
import {FormField} from 'components/FormElements';
import Loader from 'components/Loader';
import PostImagesInput from 'components/PostImagesInput';
import UserLabel from 'components/UserLabel';
import UserSearchInput from 'components/UserSearchInput';
import {createPost} from 'dispatchers/posts';
import {getAllUserWallets} from 'dispatchers/wallets';
import {ToastType} from 'enums';
import {usePostImages} from 'hooks';
import {getManager, getSelf, getWallets, isLoadingWallets} from 'selectors/state';
import {AppDispatch, SFC, UserReadSerializer} from 'types';
import {handleFormikAPIError} from 'utils/forms';
import {getPostImagesErrorMessage} from 'utils/postImages';
import {displayErrorToast, displayToast} from 'utils/toasts';
import yup from 'utils/yup';

import * as S from './Styles';

export interface SendModalProps {
  close(): void;
  onSuccess?(): void;
  // Left out when the modal is opened without anyone in mind: the sender then picks the recipient inside it
  recipient?: UserReadSerializer;
}

const SendModal: SFC<SendModalProps> = ({className, close, onSuccess, recipient}) => {
  const [selectedRecipient, setSelectedRecipient] = useState<UserReadSerializer | null>(recipient || null);
  const {addImages, images, removeImage, uploadImages, uploadProgress} = usePostImages();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(isLoadingWallets);
  const manager = useSelector(getManager);
  const self = useSelector(getSelf);
  const wallets = useSelector(getWallets);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getAllUserWallets());
      } catch (error) {
        displayErrorToast('Error fetching wallets');
      }
    })();
  }, [dispatch]);

  const myWallets = useMemo(() => {
    return Object.values(wallets);
  }, [wallets]);

  const walletOptions = useMemo(() => {
    return myWallets.map((wallet) => ({
      displayName: `${wallet.currency.ticker} (${wallet.balance.toLocaleString()})`,
      value: wallet.id,
    }));
  }, [myWallets]);

  const initialValues = useMemo(
    () => ({
      content: '',
      price_amount: '',
      wallet_id: manager.activeWallet?.id || (walletOptions.length > 0 ? walletOptions[0].value : ''),
    }),
    [manager.activeWallet?.id, walletOptions],
  );

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues, helpers: any): Promise<void> => {
    try {
      const selectedWallet = myWallets.find((wallet) => wallet.id === parseInt(values.wallet_id as any));
      if (!selectedWallet) {
        displayErrorToast('Please select a wallet');
        return;
      }

      if (!selectedRecipient) {
        displayErrorToast('Please choose who to send the coins to');
        return;
      }

      const imageIds = await uploadImages();
      if (!imageIds) return;

      await dispatch(
        createPost({
          content: values.content,
          image_ids: imageIds,
          price_amount: values.price_amount,
          price_currency: selectedWallet.currency.id,
          recipient: selectedRecipient.id,
        }),
      );
      displayToast('Coins sent successfully!', ToastType.SUCCESS);

      if (onSuccess) onSuccess();
      close();
    } catch (error: any) {
      const imagesErrorMessage = getPostImagesErrorMessage(error);

      if (imagesErrorMessage) {
        displayErrorToast(imagesErrorMessage);
        return;
      }

      const errorMessage = error?.response?.data?.error ?? 'Error sending coins';
      handleFormikAPIError(error, helpers, errorMessage);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      content: yup.string().required('Message is required'),
      price_amount: yup
        .number()
        .required('Amount is required')
        .positive('Amount must be greater than 0')
        .integer('Amount must be a whole number')
        .test('sufficient-balance', 'Insufficient funds', (value, context) => {
          const walletId = context.parent.wallet_id;
          const selectedWallet = myWallets.find((wallet) => wallet.id === parseInt(walletId as any));
          return selectedWallet ? value <= selectedWallet.balance : false;
        }),
      wallet_id: yup.string().required('Please select a wallet'),
    });
  }, [myWallets]);

  if (isLoading) {
    return (
      <S.Modal close={close} header="Send Coins">
        <S.ModalBody>
          <S.LoaderContainer>
            <Loader size={48} />
            <S.LoadingText>Loading wallets...</S.LoadingText>
          </S.LoaderContainer>
        </S.ModalBody>
      </S.Modal>
    );
  }

  if (myWallets.length === 0) {
    return (
      <S.Modal className={className} close={close} header="Send Coins">
        <S.NoWalletsMessage>
          You don't have any wallets yet. Please create a wallet first to send coins.
        </S.NoWalletsMessage>
        <Button onClick={close} text="Close" />
      </S.Modal>
    );
  }

  const renderAvailableBalance = (walletId: number | string) => {
    const selectedWallet = myWallets.find((wallet) => wallet.id === parseInt(walletId as any));
    if (!selectedWallet) return null;

    return (
      <S.Hint>
        Available: {selectedWallet.balance.toLocaleString()} {selectedWallet.currency.ticker}
      </S.Hint>
    );
  };

  const renderRecipient = () => {
    if (!recipient) {
      return (
        <FormField>
          <UserSearchInput
            errors={{}}
            label="Send to"
            name="recipient"
            onChange={setSelectedRecipient}
            touched={{}}
            value={selectedRecipient}
          />
        </FormField>
      );
    }

    return (
      <S.TransferInfo>
        <S.UserRow>
          <S.Label>From</S.Label>
          <UserLabel avatar={self.avatar} description="" id={self.id!} username={self.username!} />
        </S.UserRow>
        <S.Arrow>↓</S.Arrow>
        <S.UserRow>
          <S.Label>To</S.Label>
          <UserLabel avatar={recipient.avatar} description="" id={recipient.id} username={recipient.username} />
        </S.UserRow>
      </S.TransferInfo>
    );
  };

  return (
    <S.Modal className={className} close={close} header="Send Coins">
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, isValid, setFieldValue, touched, values}) => (
          <Form>
            <S.ModalBody>
              {renderRecipient()}

              <FormField>
                <S.Select
                  errors={errors}
                  label="Select Wallet"
                  name="wallet_id"
                  options={walletOptions}
                  touched={touched}
                />
              </FormField>

              <FormField>
                <S.Input errors={errors} label="Amount" name="price_amount" touched={touched} type="number" />
                {renderAvailableBalance(values.wallet_id)}
              </FormField>

              <FormField>
                <S.TextareaContainer>
                  <S.Textarea errors={errors} label="Message" name="content" touched={touched} />
                  <EmojiPicker
                    displayMode="textarea"
                    field="content"
                    setFieldValue={setFieldValue}
                    value={values.content}
                  />
                </S.TextareaContainer>
                <S.Hint>Posted to the feed together with the coins.</S.Hint>
              </FormField>

              <PostImagesInput
                disabled={isSubmitting}
                images={images}
                onAdd={addImages}
                onRemove={removeImage}
                uploadProgress={uploadProgress}
              />
            </S.ModalBody>

            <S.ModalFooter>
              <Button color={ButtonColor.secondary} onClick={close} text="Cancel" type={ButtonType.button} />
              <Button
                dirty={dirty}
                disabled={isSubmitting || !selectedRecipient || !values.price_amount}
                isSubmitting={isSubmitting}
                isValid={isValid}
                text="Send"
                type={ButtonType.submit}
              />
            </S.ModalFooter>
          </Form>
        )}
      </Formik>
    </S.Modal>
  );
};

export default SendModal;
