import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import UnknownCore from 'assets/unknown-core.png';
import {useActiveOrderAddress} from 'hooks';
import {getCartProducts, getCores, getWallets} from 'selectors/state';
import {CartProduct, SFC} from 'types';
import * as S from './Styles';

interface PriceCoreTotal {
  [price_core: number]: number;
}

const PaymentDetails: SFC = ({className}) => {
  const activeOrderAddress = useActiveOrderAddress();
  const cartProducts = useSelector(getCartProducts);
  const cores = useSelector(getCores);
  const wallets = useSelector(getWallets);

  const cartProductList = useMemo(() => {
    return Object.values(cartProducts);
  }, [cartProducts]);

  const totalPrices = useMemo((): PriceCoreTotal => {
    return cartProductList.reduce((acc: PriceCoreTotal, cartProduct: CartProduct) => {
      const price_core = cartProduct.product.price_core;
      const price_amount = cartProduct.product.price_amount;
      const quantity = cartProduct.quantity;
      acc[price_core] = (acc[price_core] || 0) + price_amount * quantity;
      return acc;
    }, {});
  }, [cartProductList]);

  const totalPriceErrors = useMemo((): string[] => {
    const results: string[] = [];

    for (const [price_core, total] of Object.entries(totalPrices)) {
      const coreId = Number(price_core);
      const core = cores[coreId];
      const wallet = Object.values(wallets).find((_wallet) => _wallet.core.id === coreId);

      if (!core) {
        results.push(`No core with ID ${coreId}`);
      } else if (!wallet) {
        results.push(`No wallet found ${core.ticker}`);
      } else if (total > wallet.balance) {
        const ticker = core.ticker;
        results.push(
          `Total price of ${total.toLocaleString()} ${ticker} exceeds available balance of ${wallet.balance.toLocaleString()} ${ticker}`,
        );
      }
    }

    return results;
  }, [cores, totalPrices, wallets]);

  const handleButtonClick = () => {
    console.log('Click');
  };

  const renderPriceContainers = () => {
    return Object.entries(totalPrices).map(([price_core, total]) => (
      <S.PriceContainer key={price_core}>
        <S.CoreLogo alt="core logo" src={cores[Number(price_core)].logo || UnknownCore} />
        <S.Amount>{total.toLocaleString()}</S.Amount>
      </S.PriceContainer>
    ));
  };

  const renderPriceError = () => {
    return totalPriceErrors.map((errorMessage) => <S.ErrorMessage key={errorMessage}>{errorMessage}</S.ErrorMessage>);
  };

  return (
    <S.Container className={className}>
      {renderPriceContainers()}
      <S.Button
        disabled={!activeOrderAddress || !cartProductList.length || !!totalPriceErrors.length}
        onClick={handleButtonClick}
        text="Place Order"
      />
      {renderPriceError()}
    </S.Container>
  );
};

export default PaymentDetails;
