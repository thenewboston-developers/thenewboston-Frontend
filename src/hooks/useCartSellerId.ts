import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getCartProducts} from 'selectors/state';

const useCartSellerId = (): number | null => {
  const cartProducts = useSelector(getCartProducts);

  return useMemo(() => {
    const cartProductList = Object.values(cartProducts);
    return !!cartProductList.length ? cartProductList[0].product.seller.id : null;
  }, [cartProducts]);
};

export default useCartSellerId;
