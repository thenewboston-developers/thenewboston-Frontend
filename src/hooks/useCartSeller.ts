import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getCartProducts} from 'selectors/state';
import {UserReadSerializer} from 'types';

const useCartSeller = (): UserReadSerializer | null => {
  const cartProducts = useSelector(getCartProducts);

  return useMemo(() => {
    const cartProductList = Object.values(cartProducts);
    return !!cartProductList.length ? cartProductList[0].product.seller : null;
  }, [cartProducts]);
};

export default useCartSeller;
