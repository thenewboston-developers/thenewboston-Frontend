import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import UnknownCurrency from 'assets/unknown-currency.png';
import {getCurrency} from 'dispatchers/currencies';
import {getCurrencies} from 'selectors/state';
import {AppDispatch} from 'types';

const useCurrencyLogo = (currencyId: number) => {
  const [logo, setLogo] = useState<string>(UnknownCurrency);
  const currencies = useSelector(getCurrencies);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const currency = currencies[currencyId];
    if (currency) {
      setLogo(currency.logo);
    } else if (currencyId) {
      // Fetch the currency if not in store
      dispatch(getCurrency(currencyId))
        .then((currencyData) => {
          setLogo(currencyData.logo);
        })
        .catch(() => {
          setLogo(UnknownCurrency);
        });
    }
  }, [currencyId, currencies, dispatch]);

  return logo;
};

export default useCurrencyLogo;
