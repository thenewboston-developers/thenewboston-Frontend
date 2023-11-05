import {useSelector} from 'react-redux';
import {Navigate, Route, Routes} from 'react-router-dom';

import Art from 'pages/Art';
import Cores from 'pages/Cores';
import Exchange from 'pages/Exchange';
import Profile from 'pages/Profile';
import Shop from 'pages/Shop';
import Wallets from 'pages/Wallets';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';
import * as S from './Styles';

const MainArea: SFC = ({className}) => {
  const self = useSelector(getSelf);

  return (
    <S.Container className={className}>
      <Routes>
        <Route path="/art/*" element={<Art />} />
        <Route path="/cores" element={<Cores />} />
        <Route path="/exchange/*" element={<Exchange />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/shop/*" element={<Shop />} />
        <Route path="/wallets" element={<Wallets />} />
        <Route path="*" element={<Navigate to={`/profile/${self.id}`} replace />} />
      </Routes>
    </S.Container>
  );
};

export default MainArea;
