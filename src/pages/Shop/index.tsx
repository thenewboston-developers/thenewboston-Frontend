import {Route, Routes} from 'react-router-dom';

import {ShopToolbarType} from 'enums';
import {SFC} from 'types';
import Layout from './Layout';
import * as S from './Styles';

const Shop: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        <Route path="/buy/*" element={<Layout toolbarType={ShopToolbarType.BUY} />}>
          <Route path="catalog" element={<div>buyer catalog</div>} />
        </Route>
        <Route path="/sell/*" element={<Layout toolbarType={ShopToolbarType.SELL} />}>
          <Route path="orders" element={<div>seller orders</div>} />
        </Route>
      </Routes>
    </S.Container>
  );
};

export default Shop;
