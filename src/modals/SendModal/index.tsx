import {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Field, Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import EmojiBox from 'components/EmojiPicker';
import {FileInput, Input, Select} from 'components/FormElements';
import ImagePreview from 'components/ImagePreview';
import UserLabel from 'components/UserLabel';
import {createPost} from 'dispatchers/posts';
import {ToastType} from 'enums';
import {useActiveWallet} from 'hooks';
import {getSelf, getWallets} from 'selectors/state';
import {AppDispatch, SFC, UserReadSerializer} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';
import yup from 'utils/yup';

import * as S from './Styles';

export interface SendModalProps {
  close(): void;
  recipient: UserReadSerializer;
}

const SendModal: SFC<SendModalProps> = ({className, close, recipient}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);
  const wallets = useSelector(getWallets);
  const activeWallet = useActiveWallet();

  const myWallets = useMemo(() => {
    return Object.values(wallets).filter((wallet) => wallet.owner === self.id);
  }, [self.id, wallets]);

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

  const handleSubmit = async (values: FormValues): Promise<void> => {
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
      close();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || 'Error sending coins';
      displayErrorToast(errorMessage);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
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
            <S.TransferInfo>
              <S.UserRow>
                <S.Label>From:</S.Label>
                <UserLabel avatar={self.avatar} description="" id={self.id!} username={self.username!} />
              </S.UserRow>
              <S.Arrow>↓</S.Arrow>
              <S.UserRow>
                <S.Label>To:</S.Label>
                <UserLabel avatar={recipient.avatar} description="" id={recipient.id} username={recipient.username} />
              </S.UserRow>
            </S.TransferInfo>

            <Select errors={errors} label="Select Wallet" name="wallet_id" options={walletOptions} touched={touched} />

            <Input errors={errors} label="Amount" name="price_amount" touched={touched} type="number" />

            <S.Div>
              <S.Textarea
                errors={errors}
                label="Message (optional)"
                name="content"
                placeholder="Add a message..."
                touched={touched}
              />
              <EmojiBox setFieldValue={setFieldValue} value={values.content} field="content" />
            </S.Div>

            {!values.image && (
              <Field component={FileInput} name="image" onChange={handleFileChange} touched={touched} />
            )}
            <ImagePreview
              onClear={async () => {
                await setFieldValue('image', '');
                setPreview(null);
              }}
              src={preview}
            />

            <S.Bumper />
            <Button
              dirty={dirty}
              disabled={isSubmitting || !values.price_amount}
              isSubmitting={isSubmitting}
              isValid={isValid}
              text="Send"
              type={ButtonType.submit}
            />
          </Form>
        )}
      </Formik>
    </S.Modal>
  );
};

export default SendModal;
