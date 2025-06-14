import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik, FormikHelpers} from 'formik';
import orderBy from 'lodash/orderBy';

import wallet from 'assets/wallet.svg';
import Button, {ButtonType} from 'components/Button';
import EmptyText from 'components/EmptyText';
import ExpandableWire from 'components/ExpandableWire';
import {CURRENCY_TRANSACTION_FEE} from 'constants/protocol';
import {createWalletWithdraw} from 'dispatchers/wallets';
import {WireType} from 'enums';
import {useActiveWallet} from 'hooks';
import {getWires} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import yup, {accountNumberSchema} from 'utils/yup';

import * as S from './Styles';

const WalletWithdraw: SFC = ({className}) => {
  const activeWallet = useActiveWallet();
  const dispatch = useDispatch<AppDispatch>();
  const wires = useSelector(getWires);

  const initialValues = {
    accountNumber: '',
    amount: '',
  };

  type FormValues = typeof initialValues;

  const getTotal = (amount: string): number => {
    return parseInt(amount, 10) + CURRENCY_TRANSACTION_FEE;
  };

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
      const requestData = {
        account_number: values.accountNumber,
        amount: getTotal(values.amount),
      };
      await dispatch(createWalletWithdraw(activeWallet!.id, requestData));
      resetForm();
    } catch (error) {
      displayErrorToast('Error withdrawing funds');
    }
  };

  const renderWithdraws = () => {
    if (!activeWallet) return [];

    const withdrawals = orderBy(Object.values(wires), ['created_date'], ['desc']).filter(
      (wire) => wire.currency === activeWallet.currency.id && wire.wire_type === WireType.WITHDRAW,
    );

    if (withdrawals.length === 0) {
      return <EmptyText>No withdrawals yet</EmptyText>;
    }

    return withdrawals.map((wire) => <ExpandableWire key={wire.id} wire={wire} />);
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      accountNumber: accountNumberSchema.required('Account number is required'),
      amount: yup.number().integer('Amount must be an integer').moreThan(1).required('Amount is required'),
    });
  }, []);

  if (!activeWallet) return null;

  const isInternalCurrency = activeWallet.currency.domain === null;

  if (isInternalCurrency) {
    return (
      <S.InternalCurrencyMessage className={className}>
        <S.Title>Withdrawals Not Available</S.Title>
        <S.Text>
          This is an internal currency that exists only within our platform. Withdrawals to external addresses are not
          supported.
        </S.Text>
      </S.InternalCurrencyMessage>
    );
  }

  return (
    <S.Container className={className}>
      <S.Panel>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {({dirty, errors, isSubmitting, isValid, touched, values}) => (
            <S.Form>
              <S.AmountLogoInput
                errors={errors}
                label="Amount"
                name="amount"
                logo={activeWallet.currency.logo}
                touched={touched}
              />
              <S.Input errors={errors} label="Account Number" name="accountNumber" touched={touched} />
              <S.DetailRowContainer>
                <S.DetailRow>
                  <S.Label>FEE</S.Label>
                  <S.Value>{CURRENCY_TRANSACTION_FEE}</S.Value>
                </S.DetailRow>
                <S.Line />
                <S.DetailRow>
                  <S.Label>TOTAL</S.Label>
                  <S.Value>
                    {values.amount ? (
                      <span>
                        {getTotal(values.amount).toLocaleString()} {activeWallet.currency.ticker}
                      </span>
                    ) : (
                      `0 ${activeWallet.currency.ticker}`
                    )}
                  </S.Value>
                </S.DetailRow>
              </S.DetailRowContainer>
              <Button
                dirty={dirty}
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
                isValid={isValid}
                text={`Withdraw ${activeWallet.currency.ticker}`}
                type={ButtonType.submit}
              />
            </S.Form>
          )}
        </Formik>
        <S.Image alt="wallet" src={wallet} />
      </S.Panel>

      <S.WithdrawSection>
        <S.Title>Withdrawal History</S.Title>
        {renderWithdraws()}
      </S.WithdrawSection>
    </S.Container>
  );
};

export default WalletWithdraw;
