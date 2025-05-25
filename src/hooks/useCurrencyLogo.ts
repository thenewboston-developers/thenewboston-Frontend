import {useSelector} from 'react-redux';

import UnknownCurrency from 'assets/unknown-currency.png';
import {getCurrencies} from 'selectors/state';

const useCurrencyLogo = (currencyId: number) => {
  const currencies = useSelector(getCurrencies);

  const currency = currencies[currencyId];
  return currency?.logo || UnknownCurrency;
};

export default useCurrencyLogo;
