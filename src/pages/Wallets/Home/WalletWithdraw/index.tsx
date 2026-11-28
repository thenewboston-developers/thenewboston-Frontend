import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik, FormikHelpers} from 'formik';
import orderBy from 'lodash/orderBy';

import wallet from 'assets/wallet.svg';
import Button, {ButtonType} from 'components/Button';
import EmptyText from 'components/EmptyText';
import ExpandableWire from 'components/ExpandableWire';
import {FormField} from 'components/FormElements';
import {CURRENCY_TRANSACTION_FEE} from 'constants/protocol';
import {createWalletWithdraw} from 'dispatchers/wallets';
import {getWires as getWiresAction} from 'dispatchers/wires';
import {WireType} from 'enums';
import {getManager, getWires} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {handleFormikAPIError} from 'utils/forms';
import yup, {accountNumberSchema} from 'utils/yup';

import * as S from './Styles';

const WalletWithdraw: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const wires = useSelector(getWires);
  const {activeWallet} = manager;

  useEffect(() => {
    dispatch(getWiresAction());
  }, [dispatch]);

  const initialValues = {
    accountNumber: '',
    amount: '',
  };

  type FormValues = typeof initialValues;

  const getTotal = (amount: string): number => {
    return parseInt(amount, 10) + CURRENCY_TRANSACTION_FEE;
  };

  const handleSubmit = async (values: FormValues, helpers: FormikHelpers<FormValues>): Promise<void> => {
    try {
      const requestData = {
        account_number: values.accountNumber,
        amount: getTotal(values.amount),
      };
      await dispatch(createWalletWithdraw(activeWallet!.id, requestData));
      helpers.resetForm();
    } catch (error) {
      handleFormikAPIError(error, helpers, 'Error withdrawing funds');
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

  // Only a currency that lives on another network can be sent out to an account there
  if (!activeWallet || activeWallet.currency.domain === null) return null;

  return (
    <S.Container aria-label={`Withdraw ${activeWallet.currency.ticker}`} className={className}>
      <S.Heading>Withdraw {activeWallet.currency.ticker}</S.Heading>
      <S.SubHeading>
        Send {activeWallet.currency.ticker} from your wallet to an account on {activeWallet.currency.domain}.
      </S.SubHeading>
      <S.Panel>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {({dirty, errors, isSubmitting, isValid, touched, values}) => (
            <S.Form>
              <FormField>
                <S.AmountLogoInput
                  errors={errors}
                  label="Amount"
                  name="amount"
                  logo={activeWallet.currency.logo}
                  touched={touched}
                />
              </FormField>
              <FormField>
                <S.Input errors={errors} label="Account Number" name="accountNumber" touched={touched} />
              </FormField>
              <FormField>
                <S.DetailRowContainer>
                  <S.DetailRow>
                    <S.Label>Fee</S.Label>
                    <S.Value>{CURRENCY_TRANSACTION_FEE}</S.Value>
                  </S.DetailRow>
                  <S.Line />
                  <S.DetailRow>
                    <S.Label>Total</S.Label>
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
              </FormField>
              <FormField>
                <Button
                  dirty={dirty}
                  disabled={isSubmitting}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                  text={`Withdraw ${activeWallet.currency.ticker}`}
                  type={ButtonType.submit}
                />
              </FormField>
            </S.Form>
          )}
        </Formik>
        <S.Image alt="wallet" src={wallet} />
      </S.Panel>

      <S.WithdrawSection>
        <S.Title>Withdrawal history</S.Title>
        {renderWithdraws()}
      </S.WithdrawSection>
    </S.Container>
  );
};

export default WalletWithdraw;
