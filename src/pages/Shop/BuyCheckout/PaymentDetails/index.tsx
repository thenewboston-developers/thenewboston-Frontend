import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import Line from 'components/Line';
import UnknownCore from 'assets/unknown-core.png';
import {createOrder} from 'dispatchers/orders';
import {ToastType} from 'enums';
import {useActiveOrderAddress} from 'hooks';
import {getCartProducts, getCores, getWallets} from 'selectors/state';
import {setCartProducts} from 'store/cartProducts';
import {AppDispatch, CartProduct, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';
import * as S from './Styles';

interface PriceCoreTotal {
  [price_core: number]: number;
}

const PaymentDetails: SFC = ({className}) => {
  const activeOrderAddress = useActiveOrderAddress();
  const cartProducts = useSelector(getCartProducts);
  const cores = useSelector(getCores);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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

  const handleButtonClick = async () => {
    if (!activeOrderAddress) return;

    try {
      await dispatch(createOrder({address: activeOrderAddress.id}));
      dispatch(setCartProducts([]));
      displayToast('Order created!', ToastType.SUCCESS);
      navigate('/shop/buy/orders');
    } catch (error) {
      console.error(error);
      displayErrorToast('Error placing order');
    }
  };

  const renderPriceContainers = () => {
    return Object.entries(totalPrices).map(([price_core, total]) => (
      <S.PriceContainer key={price_core}>
        <S.Div>
          <S.CoreLogo alt="core logo" src={cores[Number(price_core)].logo || UnknownCore} />
          <S.Ticker>{cores[Number(price_core)].ticker || '-'}:</S.Ticker>
        </S.Div>
        <S.Amount>{total.toLocaleString()}</S.Amount>
      </S.PriceContainer>
    ));
  };

  const renderCoreElement = (coins: string) => {
    return <S.Img alt="logo" src={coins} />;
  };

  const renderTotalAmount = () => {
    if (Object.keys(totalPrices).length === 0) {
      return null;
    }
    const totalPrice = Object.values(totalPrices)
      .reduce((acc, price) => acc + price, 0)
      .toLocaleString();

    return (
      <S.Box>
        <S.Text> TOTAL:</S.Text>
        <S.Input>
          <S.Logo>
            {Object.entries(totalPrices).map(([price_core]) => {
              return <div key={price_core}>{renderCoreElement(cores[Number(price_core)].logo || UnknownCore)}</div>;
            })}
          </S.Logo>
          {totalPrice}
        </S.Input>
      </S.Box>
    );
  };

  const renderPriceError = () => {
    return totalPriceErrors.map((errorMessage) => <S.ErrorMessage key={errorMessage}>{errorMessage}</S.ErrorMessage>);
  };

  return (
    <S.Container className={className}>
      {renderPriceContainers()}
      <Line />
      {renderTotalAmount()}
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
