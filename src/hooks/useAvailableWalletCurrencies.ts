import {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

import {getAvailableWalletCurrencies} from 'api/currencies';
import {getWallets} from 'selectors/state';
import {Currency} from 'types';
import {displayErrorToast} from 'utils/toasts';

const useAvailableWalletCurrencies = (): Currency[] => {
  const [allCurrencies, setAllCurrencies] = useState<Currency[]>([]);
  const wallets = useSelector(getWallets);

  const existingWalletCurrencyIds = useMemo(
    () => new Set(Object.values(wallets).map(({currency}) => currency.id)),
    [wallets],
  );

  useEffect(() => {
    (async () => {
      try {
        const currencies = await getAvailableWalletCurrencies();
        setAllCurrencies(currencies);
      } catch (error) {
        displayErrorToast('Error fetching available currencies');
      }
    })();
  }, []);

  return useMemo(
    () => allCurrencies.filter(({id}) => !existingWalletCurrencyIds.has(id)),
    [allCurrencies, existingWalletCurrencyIds],
  );
};

export default useAvailableWalletCurrencies;
