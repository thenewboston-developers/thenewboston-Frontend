import {Route, Routes} from 'react-router-dom';

import {SFC} from 'types';
import Layout from './Layout';
import * as S from './Styles';

const Shop: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        <Route path="/buyer/*" element={<Layout toolbarType="buyer" />}>
          <Route path="catalog" element={<div>buyer catalog</div>} />
        </Route>
        <Route path="/seller/*" element={<Layout toolbarType="seller" />}>
          <Route path="orders" element={<div>seller orders</div>} />
        </Route>
      </Routes>
    </S.Container>
  );
};

export default Shop;
