import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {getCurrencies, getWallets} from 'selectors/state';
import {Currency} from 'types';

const useAvailableWalletCurrencies = (): Currency[] => {
  const currencies = useSelector(getCurrencies);
  const wallets = useSelector(getWallets);

  const existingWalletCurrencyIds = useMemo(
    () => new Set(Object.values(wallets).map(({currency}) => currency.id)),
    [wallets],
  );

  return useMemo(
    () => Object.values(currencies).filter(({id}) => !existingWalletCurrencyIds.has(id)),
    [currencies, existingWalletCurrencyIds],
  );
};

export default useAvailableWalletCurrencies;
