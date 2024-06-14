import {Route, Routes} from 'react-router-dom';

import {ShopToolbarType} from 'enums';
import {SFC} from 'types';
import BuyAddresses from './BuyAddresses';
import BuyCatalog from './BuyCatalog';
import BuyCheckout from './BuyCheckout';
import BuyOrders from './BuyOrders';
import BuyProductDetails from './BuyProductDetails';
import Layout from './Layout';
import SellOrders from './SellOrders';
import SellProducts from './SellProducts';
import * as S from './Styles';

const Shop: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        {/* TODO: replace these hardcoded paths with those in constants/paths.ts */}
        <Route path="/buy/*" element={<Layout toolbarType={ShopToolbarType.BUY} />}>
          <Route path="addresses" element={<BuyAddresses />} />
          <Route path="catalog" element={<BuyCatalog />} />
          <Route path="checkout" element={<BuyCheckout />} />
          <Route path="orders" element={<BuyOrders />} />
          <Route path="products/:id" element={<BuyProductDetails />} />
        </Route>
        <Route path="/sell/*" element={<Layout toolbarType={ShopToolbarType.SELL} />}>
          <Route path="orders" element={<SellOrders />} />
          <Route path="products" element={<SellProducts />} />
        </Route>
      </Routes>
    </S.Container>
  );
};

export default Shop;
