import {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import Button from 'components/Button';
import {ButtonColor, ButtonType} from 'components/Button/types';
import EmojiPicker from 'components/EmojiPicker';
import {FileInput, FormField} from 'components/FormElements';
import ImagePreview from 'components/ImagePreview';
import Loader from 'components/Loader';
import {ModalBody, ModalFooter} from 'components/Modal';
import UserLabel from 'components/UserLabel';
import {createPost} from 'dispatchers/posts';
import {getAllUserWallets} from 'dispatchers/wallets';
import {ToastType} from 'enums';
import {useActiveWallet} from 'hooks';
import {getSelf, getWallets, isLoadingWallets} from 'selectors/state';
import {AppDispatch, SFC, UserReadSerializer} from 'types';
import {handleFormikAPIError} from 'utils/forms';
import {displayErrorToast, displayToast} from 'utils/toasts';
import yup from 'utils/yup';

import * as S from './Styles';

export interface SendModalProps {
  close(): void;
  onSuccess?(): void;
  recipient: UserReadSerializer;
}

const SendModal: SFC<SendModalProps> = ({className, close, onSuccess, recipient}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const activeWallet = useActiveWallet();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(isLoadingWallets);
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
      image: '',
      price_amount: '',
      wallet_id: activeWallet?.id || (walletOptions.length > 0 ? walletOptions[0].value : ''),
    }),
    [activeWallet?.id, walletOptions],
  );

  type FormValues = typeof initialValues;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: FormValues, helpers: any): Promise<void> => {
    try {
      const selectedWallet = myWallets.find((wallet) => wallet.id === parseInt(values.wallet_id as any));
      if (!selectedWallet) {
        displayErrorToast('Please select a wallet');
        return;
      }

      const requestData = new FormData();
      requestData.append('content', values.content);
      requestData.append('recipient', recipient.id.toString());
      requestData.append('price_amount', values.price_amount);
      requestData.append('price_currency', selectedWallet.currency.id.toString());

      if (values.image) {
        requestData.append('image', values.image);
      }

      await dispatch(createPost(requestData));
      displayToast('Coins sent successfully!', ToastType.SUCCESS);

      if (onSuccess) onSuccess();
      close();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error ?? 'Error sending coins';
      handleFormikAPIError(error, helpers, errorMessage);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      content: yup.string().required('Content is required'),
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
        <ModalBody>
          <S.LoaderContainer>
            <Loader size={40} />
            <S.LoadingText>Loading wallets...</S.LoadingText>
          </S.LoaderContainer>
        </ModalBody>
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

  return (
    <S.Modal className={className} close={close} header="Send Coins">
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, isValid, setFieldValue, touched, values}) => (
          <Form>
            <ModalBody>
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
              </FormField>

              <FormField>
                <S.TextareaContainer>
                  <S.Textarea errors={errors} label="Content" name="content" touched={touched} />
                  <EmojiPicker
                    displayMode="textarea"
                    field="content"
                    setFieldValue={setFieldValue}
                    value={values.content}
                  />
                </S.TextareaContainer>
              </FormField>

              {!values.image && (
                <FormField>
                  <FileInput errors={errors} name="image" onChange={handleFileChange} touched={touched} />
                </FormField>
              )}
              <ImagePreview
                onClear={async () => {
                  await setFieldValue('image', '');
                  setPreview(null);
                }}
                src={preview}
              />
            </ModalBody>

            <ModalFooter>
              <Button color={ButtonColor.secondary} onClick={close} text="Cancel" type={ButtonType.button} />
              <Button
                dirty={dirty}
                disabled={isSubmitting || !values.price_amount}
                isSubmitting={isSubmitting}
                isValid={isValid}
                text="Send"
                type={ButtonType.submit}
              />
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </S.Modal>
  );
};

export default SendModal;
